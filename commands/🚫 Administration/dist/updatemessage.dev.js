"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    Message = _require.Message;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "updatemessage",
  category: "🚫 Administration",
  aliases: ["updatemsg", "updateembed", "uembed"],
  cooldown: 2,
  usage: "updatemessage <#Channel> <Message_ID>",
  description: "Allows you to update already send messages automatically!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, channel, id;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.updatemessage");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.updatemessage");
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
            channel = message.mentions.channels.filter(function (ch) {
              return ch.guild.id == message.guild.id;
            }).first() || message.guild.channels.cache.get(args[0]) || message.channel;
            id = args[1];

            if (!(!channel || channel == null || !channel.id || channel.id == 0)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't ping a Valid Channel").setDescription("Usage: `".concat(prefix, "copymessage <#Channel> <Message_ID>`"))));

          case 31:
            if (!(!id || id.length != 18)) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't add a Valid Message ID").setDescription("Usage: `".concat(prefix, "copymessage <#Channel> <Message_ID>`"))));

          case 33:
            message["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is a catch to prevent crash");
            });
            channel.messages.fetch(id).then(function (msg) {
              if (msg.content && !msg.embeds[0]) {
                return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is nothing to update"));
              }

              if (msg.embeds[0]) {
                var embed = msg.embeds[0];
                embed.footer ? embed.footer.text = es.footertext : embed.setFooter(es.footertext, es.footericon);
                embed.footer ? embed.footer.iconURL = es.footericon : embed.setFooter(es.footertext, es.footericon);
                embed.thumbnail ? embed.thumbnail.url = es.thumb ? es.footericon : null : embed;
                embed.color = es.color;
                msg.edit(embed);
              }

              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Updated the Embed in:").setDescription("<#".concat(channel.id, ">"))).then(function (msg) {
                msg["delete"]({
                  timeout: 3000
                })["catch"](function (e) {
                  console.log("Prevented a bug".gray);
                });
              });
            })["catch"](function (e) {
              console.log(String(e.stack).bgRed);
              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
            });

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 46;
              break;
            }

            _context.prev = 36;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 40;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 40:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 46;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context["catch"](36);
            console.log(_context.t1);

          case 46:
            _context.next = 52;
            break;

          case 48:
            _context.prev = 48;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t2.stack, "```"))));

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 48], [9, 13, 17, 25], [18,, 20, 24], [36, 43]]);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */