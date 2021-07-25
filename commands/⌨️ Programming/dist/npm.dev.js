"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var fetch = require("node-fetch");

var _require = require("http"),
    STATUS_CODES = _require.STATUS_CODES;

var _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed;

module.exports = {
  name: "npm",
  category: "⌨️ Programming",
  aliases: ["npmpackage", "npmpkg", "nodepackagemanager"],
  cooldown: 5,
  usage: "npm <package>",
  description: "Search the NPM Registry for a package information",
  run: function run(client, message, args, user, text, prefix) {
    var es, pkg, body, version, deps, maintainers, len, _len;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            pkg = args[0];

            if (pkg) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a NPM-PACKAGE").setDescription("Usage: `".concat(prefix, "npm <package>`"))
            }));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(fetch("https://registry.npmjs.com/".concat(pkg)).then(function (res) {
              if (res.status === 404) throw "No results found.";
              return res.json();
            }));

          case 7:
            body = _context.sent;
            version = body.versions[body["dist-tags"].latest];
            deps = version.dependencies ? Object.keys(version.dependencies) : null;
            maintainers = body.maintainers.map(function (user) {
              return user.name;
            });

            if (maintainers.length > 10) {
              len = maintainers.length - 10;
              maintainers = maintainers.slice(0, 10);
              maintainers.push("...".concat(len, " more."));
            }

            if (deps && deps.length > 10) {
              _len = deps.length - 10;
              deps = deps.slice(0, 10);
              deps.push("...".concat(_len, " more."));
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setTitle("NPM - ".concat(pkg)).setColor(es.color).setFooter(es.footertext, es.footericon).setURL("https://npmjs.com/package/".concat(pkg)).setAuthor(message.author.tag, message.author.displayAvatarURL({
                size: 64
              })).setDescription([body.description || "No Description.", "**Version:** ".concat(body["dist-tags"].latest), "**License:** ".concat(body.license), "**Author:** ".concat(body.author ? body.author.name : "Unknown"), "**Modified:** ".concat(new Date(body.time.modified).toDateString()), "**Dependencies:** ".concat(deps && deps.length ? deps.join(", ") : "None")].join("\n"))
            }));

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 16]]);
  }
};