"use strict";

var config = require("../.config.json");

var emoji = require("../../base-system/emoji.json");

var ee = require("../../base-system/embed.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "react",
  category: "\uD83D\uDEAB Administration",
  aliases: [""],
  description: "Closes the ticket",
  useage: "react <msgid> <Emoji>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, emojii, channel, _emojii;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.react");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 25;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.react");
              }
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 27:
            if (args[0]) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Include a MessageID").setDescription("Usage: `".concat(prefix, "react <msgid> <Emoji>`\nExample: `").concat(prefix, "react 442355791412854784 ").concat(emoji.msg.SUCCESS, "`"))));

          case 29:
            if (!(args[0].length != 18)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Include a Valid MessageID")));

          case 31:
            if (args[1]) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Include a Emoji").setDescription("Usage: `".concat(prefix, "react <msgid> <Emoji>`\nExample: `").concat(prefix, "react 442355791412854784 ").concat(emoji.msg.SUCCESS, "`"))));

          case 33:
            if (!args[1].includes("<")) {
              _context.next = 52;
              break;
            }

            emojii = args[1].split(":")[args[1].split(":").length - 1].replace(">", "");
            console.log(emojii);

            if (emojii) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Include a valid Emoji").setDescription("Usage: `".concat(prefix, "react <msgid> <Emoji>`\nExample: `").concat(prefix, "react 442355791412854784 ").concat(emoji.msg.SUCCESS, "`"))));

          case 38:
            message.channel.messages.fetch(args[0]).then(function (msg) {
              return msg.react(emojii)["catch"](function (e) {
                return console.log(String(e.stack).red);
              });
            })["catch"](function (e) {
              return console.log(String(e.stack).red);
            });

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 50;
              break;
            }

            _context.prev = 40;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 44;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 44:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 50;
            break;

          case 47:
            _context.prev = 47;
            _context.t1 = _context["catch"](40);
            console.log(_context.t1);

          case 50:
            _context.next = 56;
            break;

          case 52:
            _emojii = args[1];

            if (_emojii) {
              _context.next = 55;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Include a valid Emoji").setDescription("Usage: `".concat(prefix, "react <msgid> <Emoji>`\nExample: `").concat(prefix, "react 442355791412854784 ").concat(emoji.msg.SUCCESS, "`"))));

          case 55:
            message.channel.messages.fetch(args[0]).then(function (msg) {
              return msg.react(_emojii)["catch"](function (e) {
                return console.log(String(e.stack).red);
              });
            })["catch"](function (e) {
              console.log(String(e.stack).bgRed);
              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
            });

          case 56:
            _context.next = 62;
            break;

          case 58:
            _context.prev = 58;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 62:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 58], [9, 13, 17, 25], [18,, 20, 24], [40, 47]]);
  }
};