"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "reset",
  aliases: ["hardreset"],
  category: "\u2699\uFE0F Settings",
  description: "Resets / Deletes all of the Setups as well as the prefix!",
  usage: "reset",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, themsg;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;

            if (!(message.member.guild.owner.id !== message.author.id)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You don't have permission for this Command! *Only the Server-Owner*")));

          case 4:
            themsg = message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Do you really want to reset all SETTINGS?").setDescription("*Reply with:* **__`yes`__**")).then(function (msg) {
              msg.channel.awaitMessages(function (m) {
                return m.author.id === message.author.id;
              }, {
                max: 1,
                time: 30 * 1000,
                errors: ['time']
              }).then(function _callee(collected) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(collected.first().content.toLowerCase() === "yes")) {
                          _context.next = 4;
                          break;
                        }

                        client.setups.set(message.guild.id, {
                          textchannel: "0",
                          voicechannel: "0",
                          category: "0",
                          message_cmd_info: "0",
                          message_queue_info: "0",
                          message_track_info: "0"
                        });
                        client.settings.set(message.guild.id, {
                          prefix: config.prefix,
                          djroles: [],
                          botchannel: []
                        });
                        return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Resetted everything!").setDescription("Prefix is now again: `".concat(config.prefix, "`\nNo more DJ ROLES, No more Setup, No more Bot Channels"))));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })["catch"](function (e) {
                console.log(String(e.stack).yellow);
                return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("CANCELLED CAUSE NOT THE RIGHT WORD / TIME RAN OUT!"));
              });
            });
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```"))));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 7]]);
  }
};