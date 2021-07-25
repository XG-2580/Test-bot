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
  name: "setup-logger",
  category: "💪 Setup",
  aliases: ["setuplogger", "logger-setup", "loggersetup", "setup-auditlog"],
  cooldown: 5,
  usage: "setup-logger  -->  Follow Steps",
  description: "Enable/Disable the Logger / Audit log System",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== `\u2714\uFE0F Enable` / Setup** the Logger System\n\n2\uFE0F\u20E3 **== `\u274C Disable`** the Logger System\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "channel";else if (reaction.emoji.name === "2️⃣") temptype = "disable";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 19:
            if (!timeouterror) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 21:
            if (!(temptype == "channel")) {
              _context.next = 31;
              break;
            }

            _context.next = 24;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 24:
            tempmsg = _context.sent;
            _context.next = 27;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var channel = message.mentions.channels.filter(function (ch) {
                return ch.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.settings.set(message.guild.id, channel.id, "logger.channel");
                  client.settings.set(message.guild.id, "", "logger.webhook_id");
                  client.settings.set(message.guild.id, "", "logger.webhook_token");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now send all logs into: `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 27:
            if (!timeouterror) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 29:
            _context.next = 43;
            break;

          case 31:
            if (!(temptype == "disable")) {
              _context.next = 42;
              break;
            }

            _context.prev = 32;
            client.settings.set(message.guild.id, "no", "logger.channel");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Disabled Logger, I wont log anything anymore").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 37:
            _context.prev = 37;
            _context.t1 = _context["catch"](32);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 40:
            _context.next = 43;
            break;

          case 42:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 45], [9, 14], [32, 37]]);
  }
};