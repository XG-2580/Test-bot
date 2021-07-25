"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    splitMessage = _require.splitMessage;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

var _require3 = require("util"),
    inspect = _require3.inspect;

module.exports = {
  name: "detailedeval",
  category: "\uD83D\uDC51 Owner",
  aliases: ["detailedevaluate", "detailevaluate", "detaileval"],
  description: "Eval a Command in detail! (not cutting of the resulted message)",
  usage: "detailedeval <CODE>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, evaled, string, evalEmbed, splitDescription;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (!("442355791412854784" !== message.author.id)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  Error | You are not allowed to run this command! Only the **`XG#2846`** is allowed to run this Cmd"))));

          case 3:
            if (args[0]) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  Error | You have to at least include one evaluation arguments"))));

          case 5:
            _context2.prev = 5;

            if (!args.join(" ").includes("token")) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", console.log("ERROR NO TOKEN GRABBING ;)".red));

          case 8:
            _context2.next = 10;
            return regeneratorRuntime.awrap(eval(args.join(" ")));

          case 10:
            evaled = _context2.sent;
            //make string out of the evaluation
            string = inspect(evaled); //if the token is included return error

            if (!string.includes(client.token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", console.log("ERROR NO TOKEN GRABBING ;)".red));

          case 14:
            //define queueembed
            evalEmbed = new MessageEmbed().setTitle("Milrato Development | Evaluation").setColor(es.color); //split the description

            splitDescription = splitMessage(string, {
              maxLength: 2040,
              "char": "\n",
              prepend: "",
              append: ""
            }); //For every description send a new embed

            splitDescription.forEach(function _callee(m) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      //(over)write embed description
                      evalEmbed.setDescription("```" + m + "```"); //send embed

                      message.channel.send(evalEmbed);

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](5);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  ERROR | An error occurred")).setDescription("```".concat(_context2.t0.message, "```"))));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[5, 19]]);
  }
};