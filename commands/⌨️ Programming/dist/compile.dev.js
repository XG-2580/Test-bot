"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var fetch = require("node-fetch");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

module.exports = {
  name: "compile",
  category: "⌨️ Programming",
  aliases: [""],
  cooldown: 5,
  usage: "compile <Code>",
  description: "Compile Code",
  run: function run(client, message, args, user, text, prefix) {
    var es, getCodeBlock, post, possiblecommands, _getCodeBlock, lang, code, cmd, src, res;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;

            getCodeBlock = function getCodeBlock(txt) {
              var match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
              if (!match) return {
                lang: null,
                code: txt
              };
              if (match[1] && !match[2]) return {
                lang: null,
                code: match[1]
              };
              return {
                lang: match[1],
                code: match[2]
              };
            };

            post = function post(message, _ref) {
              var cmd, src, id;
              return regeneratorRuntime.async(function post$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      cmd = _ref.cmd, src = _ref.src;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(fetch("http://coliru.stacked-crooked.com/share", {
                        method: "POST",
                        body: JSON.stringify({
                          cmd: cmd,
                          src: src
                        })
                      }).then(function (res) {
                        return res.text();
                      }));

                    case 3:
                      id = _context.sent;
                      return _context.abrupt("return", message.channel.send("**Output too long. View the results here:**\n> https://coliru.stacked-crooked.com/a/".concat(id)));

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            possiblecommands = {
              cpp: "g++ main.cpp -pthread -pedantic -Wall -Wextra && ./a.out",
              "c++": "g++ main.cpp -pthread -pedantic -Wall -Wextra && ./a.out",
              c: "mv main.cpp main.c && gcc main.c -pedantic -O2 -pthread -Wall -Wextra && ./a.out",
              ruby: "ruby main.cpp",
              rb: "ruby main.cpp",
              lua: "lua main.cpp",
              python: "python main.cpp",
              py: "python main.cpp",
              haskell: "runhaskell main.cpp",
              hs: "runhaskell main.cpp",
              bash: "bash main.cpp",
              sh: "sh main.cpp",
              shell: "sh main.cpp"
            };
            _getCodeBlock = getCodeBlock(args.join(" ")), lang = _getCodeBlock.lang, code = _getCodeBlock.code;

            if (!(!lang || !code)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a Valid Code").setDescription("Usage:\n".concat(prefix, "compile") + "\\`\\`\\`lang\nCode\n\\`\\`\\`\nCodeBlock language will be used to determine how to compile the code.")
            }));

          case 8:
            if (possiblecommands[lang]) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You provide an Invalid Language").setDescription("Supported ones: **".concat(Object.keys(possiblecommands).join(", "), "**"))
            }));

          case 10:
            cmd = possiblecommands[lang];
            src = code;
            _context2.next = 14;
            return regeneratorRuntime.awrap(fetch("http://coliru.stacked-crooked.com/compile", {
              method: "POST",
              body: JSON.stringify({
                cmd: cmd,
                src: src
              })
            }).then(function (res) {
              return res.text();
            }));

          case 14:
            res = _context2.sent;

            if (!(res.length < 1990)) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", message.channel.send(res, {
              code: lang
            }));

          case 17:
            return _context2.abrupt("return", post(message, {
              cmd: cmd,
              src: src
            }));

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](1);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```"))));

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 20]]);
  }
};