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
  name: "setup-autonsfw",
  category: "💪 Setup",
  aliases: ["setupautonsfw", "cmdlog", "autonsfw-setup", "autonsfwsetup"],
  cooldown: 5,
  usage: "setup-autonsfw  -->  Follow the Steps",
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do? | REPORT LOG").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== `\u2714\uFE0F Enable` / Set** Poster-Channel\n\n2\uFE0F\u20E3 **== `\u274C Disable`** AutoNsfw\n\n\uD83D\uDCD1 ** == Show Settings**\n\n**Note:**\n> *It will post only 1 Message every Minute*\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context2.sent;
            _context2.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("📑");
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](9);
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context2.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "set";else if (reaction.emoji.name === "2️⃣") temptype = "disable";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            if (!(temptype == "set")) {
              _context2.next = 32;
              break;
            }

            _context2.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("*Just ping the channel with #channel in the Chat*").setFooter(es.footertext, es.footericon)
            }));

          case 25:
            tempmsg = _context2.sent;
            _context2.next = 28;
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
                        _context.next = 11;
                        break;
                      }

                      if (!(!channel.nsfw || channel.nsfw == undefined)) {
                        _context.next = 7;
                        break;
                      }

                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | The Pinged Channel is not a NSFW Channel").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 7:
                      client.settings.set(message.guild.id, channel.id, "autonsfw");
                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now registered as the Auto Nsfw Poster Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Posting now, every Minute".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 11:
                      throw "NO CHANNEL PINGED";

                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 28:
            if (!timeouterror) {
              _context2.next = 30;
              break;
            }

            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 30:
            _context2.next = 43;
            break;

          case 32:
            if (!(temptype == "disable")) {
              _context2.next = 37;
              break;
            }

            client.settings.set(message.guild.id, "no", "autonsfw");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Disabled the Auto Nsfw Poster Channel").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will not send automatic NSFW Images to a Channel anymore".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 37:
            if (!(temptype == "thesettings")) {
              _context2.next = 42;
              break;
            }

            thesettings = client.settings.get(message.guild.id, "autonsfw");
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Settings of the Auto Nsfw Poster Channel").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Channel:** ".concat(thesettings == "no" ? "Not Setupped" : "<#".concat(thesettings, "> | `").concat(thesettings, "`"), "\n\n**Cooldown:** 1 Minute").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 42:
            return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 43:
            _context2.next = 49;
            break;

          case 45:
            _context2.prev = 45;
            _context2.t1 = _context2["catch"](1);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 49:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 45], [9, 15]]);
  }
};