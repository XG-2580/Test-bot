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
  name: "setup-counter",
  category: "💪 Setup",
  aliases: ["setupcounter", "counter-setup", "countersetup"],
  cooldown: 5,
  usage: "setup-counter  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thecmd, thesettings;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do? | REPORT LOG").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== `\u2714\uFE0F Enable` / Set** Poster-Channel\n\n2\uFE0F\u20E3 **== `\u274C Disable`** counter\n\n3\uFE0F\u20E3 **== Reset the __current__ Number to 0**\n\n\uD83D\uDCD1 ** == Show Settings**\n\n**Note:**\n> *It will post only 1 Message every Minute*\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context2.sent;
            _context2.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("📑");
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](9);
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 19:
            _context2.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "set";else if (reaction.emoji.name === "2️⃣") temptype = "disable";else if (reaction.emoji.name === "3️⃣") temptype = "resetNumber";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 21:
            if (!timeouterror) {
              _context2.next = 23;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            if (!(temptype == "set")) {
              _context2.next = 33;
              break;
            }

            _context2.next = 26;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("*Just ping the channel with #channel in the Chat*").setFooter(es.footertext, es.footericon)
            }));

          case 26:
            tempmsg = _context2.sent;
            _context2.next = 29;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var message, channel;
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
                      channel = message.mentions.channels.filter(function (ch) {
                        return ch.guild.id == message.guild.id;
                      }).first();

                      if (!channel) {
                        _context.next = 9;
                        break;
                      }

                      client.settings.set(message.guild.id, channel.id, "counter");
                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now registered as the Number-Counter-Chat")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Posting now, every Minute".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 9:
                      throw "NO CHANNEL PINGED";

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 29:
            if (!timeouterror) {
              _context2.next = 31;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 31:
            _context2.next = 49;
            break;

          case 33:
            if (!(temptype == "disable")) {
              _context2.next = 38;
              break;
            }

            client.settings.set(message.guild.id, "no", "counter");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Disabled the Number-Counter-Chat").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will not send automatic NSFW Images to a Channel anymore".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 38:
            if (!(temptype == "resetNumber")) {
              _context2.next = 43;
              break;
            }

            client.settings.set(message.guild.id, 0, "counternum");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Resetted the Number to 0").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("People now need to count from 1 again!".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 43:
            if (!(temptype == "thesettings")) {
              _context2.next = 48;
              break;
            }

            thesettings = client.settings.get(message.guild.id, "counter");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Settings of the Number-Counter-Chat").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Channel:** ".concat(thesettings == "no" ? "Not Setupped" : "<#".concat(thesettings, "> | `").concat(thesettings, "`"), "\n\n**Current Number:** `").concat(client.settings.get(message.guild.id, "counternum"), "`\n**Nest Number:** `").concat(Number(client.settings.get(message.guild.id, "counternum")) + 1, "`").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 48:
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 49:
            _context2.next = 55;
            break;

          case 51:
            _context2.prev = 51;
            _context2.t1 = _context2["catch"](1);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 55:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 51], [9, 16]]);
  }
};