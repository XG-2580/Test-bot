"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup-reportlog",
  category: "💪 Setup",
  aliases: ["setupreportlog", "cmdlog", "reportlog-setup", "reportlogsetup"],
  cooldown: 5,
  usage: "setup-reportlog  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thecmd;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context2.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do? | REPORT LOG").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== `\u2714\uFE0F Enable` / Set** Channel\n\n2\uFE0F\u20E3 **== `\u274C Disable`** Log\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context2.sent;
            _context2.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](9);
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 17:
            _context2.next = 19;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "set";else if (reaction.emoji.name === "2️⃣") temptype = "disable";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 19:
            if (!timeouterror) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 21:
            if (!(temptype == "set")) {
              _context2.next = 31;
              break;
            }

            _context2.next = 24;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("*Just ping the channel with #channel in the Chat*").setFooter(es.footertext, es.footericon)
            }));

          case 24:
            tempmsg = _context2.sent;
            _context2.next = 27;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var message;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      message = collected.first();

                      if (message) {
                        _context.next = 3;
                        break;
                      }

                      throw "NO MESSAGE SENT";

                    case 3:
                      if (!message.mentions.channels.filter(function (ch) {
                        return ch.guild.id == message.guild.id;
                      }).first()) {
                        _context.next = 8;
                        break;
                      }

                      client.settings.set(message.guild.id, message.mentions.channels.filter(function (ch) {
                        return ch.guild.id == message.guild.id;
                      }).first().id, "reportlog");
                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(message.mentions.channels.filter(function (ch) {
                        return ch.guild.id == message.guild.id;
                      }).first().name, "` is now registered as the Admin logger")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If someone executes an Admin Command, an Information will be sent in that Channel".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 8:
                      throw "NO CHANNEL PINGED";

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 27:
            if (!timeouterror) {
              _context2.next = 29;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 29:
            _context2.next = 37;
            break;

          case 31:
            if (!(temptype == "disable")) {
              _context2.next = 36;
              break;
            }

            client.settings.set(message.guild.id, "no", "reportlog");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Disabled the Admin logger").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If someone executes an Admin Command, **no** Information will be sent".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 36:
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 37:
            _context2.next = 43;
            break;

          case 39:
            _context2.prev = 39;
            _context2.t1 = _context2["catch"](1);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 43:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 39], [9, 14]]);
  }
};