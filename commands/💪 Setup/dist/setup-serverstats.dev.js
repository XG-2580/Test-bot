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
  name: "setup-serverstats",
  category: "💪 Setup",
  aliases: ["setupserverstats", "serverstats-setup", "serverstatssetup", "setup-serverstatser", "setupserverstatser"],
  cooldown: 5,
  usage: "setup-serverstats  -->  Follow the Steps",
  description: "This Setup allows you to specify a Channel which Name should be renamed every 10 Minutes to a Member Counter of Bots, Users, or Members",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, d2p, thesettings;
    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed"); //ensure the database

            client.setups.ensure(message.guild.id, {
              enabled: false,
              channel1: "no",
              message1: "🗣 Members: {member}",
              channel2: "no",
              message2: "🗣 Bots: {bot}",
              channel3: "no",
              message3: "🗣 All Users: {user}"
            }, "membercount");
            _context3.prev = 2;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context3.next = 9;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do? | REPORT LOG").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== ".concat(client.setups.get(message.guild.id, "membercount.enabled") ? "`❌ Disable`" : "`✔️ Enable`", "** Member Counter\n\n2\uFE0F\u20E3 **== Manage** 1. Member Counter\n\n3\uFE0F\u20E3 **== Manage** 2. Member Counter\n\n4\uFE0F\u20E3 **== Manage** 3. Member Counter\n\n\uD83D\uDCD1 ** == Show Settings**\n\n**Note:**\n> *It will update the Channels every 10 Minutes with a 2 min delay between each one!*\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

          case 9:
            tempmsg = _context3.sent;

            d2p = function d2p(bool) {
              return bool ? "`✔️ Enabled`" : "`❌ Disabled`";
            };

            _context3.prev = 11;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("📑");
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](11);
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            _context3.next = 24;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "toggle";else if (reaction.emoji.name === "2️⃣") temptype = "1";else if (reaction.emoji.name === "3️⃣") temptype = "2";else if (reaction.emoji.name === "4️⃣") temptype = "3";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 24:
            if (!timeouterror) {
              _context3.next = 26;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 26:
            if (!(temptype == "toggle")) {
              _context3.next = 31;
              break;
            }

            client.setups.set(message.guild.id, !client.setups.get(message.guild.id, "membercount.enabled"), "membercount.enabled");
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Member Counter Setup is now ".concat(d2p(client.setups.get(message.guild.id, "membercount.enabled")), "!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If you setupped the Member Counter 1, 2, or/and 3 it will change the Name every 10 Minutes!".substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 31:
            if (!(temptype == "1" || temptype == "2" || temptype == "3")) {
              _context3.next = 41;
              break;
            }

            _context3.next = 34;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("*Just ping the channel with #channel in the Chat / send the ID of the CHANNEL, (Text, Voice, ...)*").setFooter(es.footertext, es.footericon)
            }));

          case 34:
            tempmsg = _context3.sent;
            _context3.next = 37;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee2(collected) {
              var message, channel, settts, curmessage;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      message = collected.first();

                      if (message) {
                        _context2.next = 3;
                        break;
                      }

                      throw "NO MESSAGE SENT";

                    case 3:
                      channel = message.mentions.channels.filter(function (ch) {
                        return ch.guild.id == message.guild.id;
                      }).first() || message.guild.channels.cache.get(message.content);

                      if (!channel) {
                        _context2.next = 32;
                        break;
                      }

                      settts = client.setups.get(message.guild.id, "membercount");
                      curmessage = "";

                      if (!(temptype == "1")) {
                        _context2.next = 11;
                        break;
                      }

                      if (!(settts.channel2 == channel.id || settts.channel3 == channel.id)) {
                        _context2.next = 10;
                        break;
                      }

                      throw "This Channel is already setup!";

                    case 10:
                      curmessage = settts.message1;

                    case 11:
                      if (!(temptype == "2")) {
                        _context2.next = 15;
                        break;
                      }

                      if (!(settts.channel1 == channel.id || settts.channel3 == channel.id)) {
                        _context2.next = 14;
                        break;
                      }

                      throw "This Channel is already setup!";

                    case 14:
                      curmessage = settts.message2;

                    case 15:
                      if (!(temptype == "3")) {
                        _context2.next = 19;
                        break;
                      }

                      if (!(settts.channel2 == channel.id || settts.channel1 == channel.id)) {
                        _context2.next = 18;
                        break;
                      }

                      throw "This Channel is already setup!";

                    case 18:
                      curmessage = settts.message3;

                    case 19:
                      if (temptype == "1") client.setups.set(message.guild.id, channel.id, "membercount.channel1");
                      if (temptype == "2") client.setups.set(message.guild.id, channel.id, "membercount.channel2");
                      if (temptype == "3") client.setups.set(message.guild.id, channel.id, "membercount.channel3");
                      message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now registered as the Member Counter for Counter-").concat(temptype)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Current Name: `".concat(curmessage, "`").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                      _context2.next = 25;
                      return regeneratorRuntime.awrap(message.channel.send({
                        embed: new Discord.MessageEmbed().setTitle("What Should be the Name of the Channel?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Current Name: `".concat(curmessage, "`\n\n**Examples:**\n> `\uD83D\uDDE3 Members: {member}`\n> `\uD83D\uDDE3 Bots: {bot} `\n> `\uD83D\uDDE3 All Users: {user}`\n\n> `{member}` will be replaced with the amount of all Members (Humans)\n> `{bot}` will be replaced with the amount of all bots\n> `{user}` will be replaced with the amount of all users, no matter if bot or not\n\n*Send the Name NOW!, mind that the Name must be shorter then 32 Characters!!!*")).setFooter(es.footertext, es.footericon)
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
                        var message, name;
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
                                name = message.content;

                                if (!(name && name.length <= 32)) {
                                  _context.next = 12;
                                  break;
                                }

                                if (temptype == "1") client.setups.set(message.guild.id, name, "membercount.message1");
                                if (temptype == "2") client.setups.set(message.guild.id, name, "membercount.message2");
                                if (temptype == "3") client.setups.set(message.guild.id, name, "membercount.message3");
                                channel.setName(String(name).replace(/{user}/i, message.guild.memberCount).replace(/{member}/i, message.guild.members.cache.filter(function (member) {
                                  return !member.user.bot;
                                }).size).replace(/{bot}/i, message.guild.members.cache.filter(function (member) {
                                  return member.user.bot;
                                }).size).replace(/{users}/i, message.guild.memberCount).replace(/{members}/i, message.guild.members.cache.filter(function (member) {
                                  return !member.user.bot;
                                }).size).replace(/{bots}/i, message.guild.members.cache.filter(function (member) {
                                  return member.user.bot;
                                }).size));
                                return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` will now be renamed to: `").concat(name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Example: `".concat(String(name).replace(/{user}/i, message.guild.memberCount).replace(/{member}/i, message.guild.members.cache.filter(function (member) {
                                  return !member.user.bot;
                                }).size).replace(/{bot}/i, message.guild.members.cache.filter(function (member) {
                                  return member.user.bot;
                                }).size).replace(/{users}/i, message.guild.memberCount).replace(/{members}/i, message.guild.members.cache.filter(function (member) {
                                  return !member.user.bot;
                                }).size).replace(/{bots}/i, message.guild.members.cache.filter(function (member) {
                                  return member.user.bot;
                                }).size), "`").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 12:
                                throw "No Name added, or the Name is too long!";

                              case 13:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        console.log(e);
                        timeouterror = e;
                      }));

                    case 28:
                      if (!timeouterror) {
                        _context2.next = 30;
                        break;
                      }

                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 30:
                      _context2.next = 33;
                      break;

                    case 32:
                      throw "NO CHANNEL PINGED / NO ID ADDED";

                    case 33:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 37:
            if (!timeouterror) {
              _context3.next = 39;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 39:
            _context3.next = 51;
            break;

          case 41:
            if (!(temptype == "disable")) {
              _context3.next = 44;
              break;
            }

            _context3.next = 51;
            break;

          case 44:
            if (!(temptype == "thesettings")) {
              _context3.next = 50;
              break;
            }

            thesettings = client.setups.get(message.guild.id, "membercount");
            console.log(thesettings);
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Settings of the Member Counter Setup").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Enabled: ".concat(thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>", "\n\n**Channel-1: ").concat(thesettings.channel1 == "no" ? "Not Setupped" : "<#".concat(thesettings.channel1, "> | `").concat(thesettings.channel1, "`"), "**\n**Message of Channel-1:** `").concat(thesettings.message1.replace(/{user}/i, message.guild.memberCount).replace(/{member}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bot}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size).replace(/{users}/i, message.guild.memberCount).replace(/{members}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bots}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size), "`\n\n**Channel-2: ").concat(thesettings.channel2 == "no" ? "Not Setupped" : "<#".concat(thesettings.channel2, "> | `").concat(thesettings.channel2, "`"), "**\n**Message of Channel-1:** `").concat(thesettings.message2.replace(/{user}/i, message.guild.memberCount).replace(/{member}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bot}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size).replace(/{users}/i, message.guild.memberCount).replace(/{members}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bots}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size), "`\n\n**Channel-3: ").concat(thesettings.channel3 == "no" ? "Not Setupped" : "<#".concat(thesettings.channel3, "> | `").concat(thesettings.channel3, "`"), "**\n**Message of Channel-1:** `").concat(thesettings.message3.replace(/{user}/i, message.guild.memberCount).replace(/{member}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bot}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size).replace(/{users}/i, message.guild.memberCount).replace(/{members}/i, message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size).replace(/{bots}/i, message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size), "`\n\n**Cooldown:** Updating the Channels every `10 Minutes` with a 2min Delay between each one!").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 50:
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 51:
            _context3.next = 57;
            break;

          case 53:
            _context3.prev = 53;
            _context3.t1 = _context3["catch"](2);
            console.log(String(_context3.t1.stack).bgRed);
            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context3.t1)).substr(0, 2000), "```"))));

          case 57:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 53], [11, 19]]);
  }
};