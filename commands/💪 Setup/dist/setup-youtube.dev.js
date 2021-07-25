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
  name: "setup-youtube",
  category: "💪 Setup",
  aliases: ["setupyoutube", "youtube-setup", "youtubesetup"],
  cooldown: 5,
  usage: "setup-youtube  -->  Follow Steps",
  description: "Manage the youtube logger, addstreamer, editstreamer, removestreamer, etc.",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, buffer, emojis, i, _i, _emojis, _emoji, _i2, _i3, _emojis2, _emoji2;

    return regeneratorRuntime.async(function run$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context6.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context6.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Set** Discord **Channel** for Posting new Vids\n        \n2\uFE0F\u20E3 **== Add** Youtube Channel\n        \n3\uFE0F\u20E3 **== Remove** Youtube Channel\n\n4\uFE0F\u20E3 **== Edit** Youtube Channel\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context6.sent;
            _context6.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](9);
            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 19:
            _context6.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "set";else if (reaction.emoji.name === "2️⃣") temptype = "add";else if (reaction.emoji.name === "3️⃣") temptype = "remove";else if (reaction.emoji.name === "4️⃣") temptype = "edit";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 21:
            if (!timeouterror) {
              _context6.next = 23;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            if (!(temptype == "set")) {
              _context6.next = 33;
              break;
            }

            _context6.next = 26;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("In which Channel should I post all Youtube Videos?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please just ping the Channel with #channel!").setFooter(es.footertext, es.footericon)
            }));

          case 26:
            tempmsg = _context6.sent;
            _context6.next = 29;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var msg;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      msg = collected.first();

                      if (!(msg && msg.mentions.channels.filter(function (ch) {
                        return ch.guild.id == msg.guild.id;
                      }).first())) {
                        _context.next = 6;
                        break;
                      }

                      client.social_log.set(message.guild.id, msg.mentions.channels.filter(function (ch) {
                        return ch.guild.id == msg.guild.id;
                      }).first().id, "youtube.dc_channel");
                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send all Youtube Notifications in `".concat(msg.mentions.channels.filter(function (ch) {
                        return ch.guild.id == msg.guild.id;
                      }).first().name, "`")).setDescription("DONT FORGET TO ADD A **YOUTUBE_CHANNELS**!!!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 6:
                      throw {
                        message: "YOU DID NOT PING A VALID CHANNEL"
                      };

                    case 7:
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
              _context6.next = 31;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 31:
            _context6.next = 78;
            break;

          case 33:
            if (!(temptype == "add")) {
              _context6.next = 45;
              break;
            }

            if (!(client.social_log.get(message.guild.id, "youtube.channels").length >= 5)) {
              _context6.next = 36;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | You've reached the maximum amount of youtube Channels (5)").setColor(es.wrongcolor).setDescription("Remove some others first...".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 36:
            _context6.next = 38;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna add? | Just send the LINK!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Example:\n          \nhttps://www.youtube.com/channel/UC1AgotpFHNhzolUtAjPgZqQ").setFooter(es.footertext, es.footericon)
            }));

          case 38:
            tempmsg = _context6.sent;
            _context6.next = 41;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee2(collected) {
              var msg;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      msg = collected.first();

                      if (!(msg && msg.content)) {
                        _context2.next = 10;
                        break;
                      }

                      if (!(msg.content.length > 0 && msg.content.length < 50 && !msg.content.toLowerCase().includes("youtube") && (!msg.content.toLowerCase().includes("channel") || !msg.content.toLowerCase().includes("c")))) {
                        _context2.next = 4;
                        break;
                      }

                      throw {
                        message: "YOU DID NOT SEND A VALID CHANNEL"
                      };

                    case 4:
                      if (!client.social_log.get(message.guild.id, "youtube.channels").includes(msg.content)) {
                        _context2.next = 6;
                        break;
                      }

                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | The Youtube Channel is already setup!").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

                    case 6:
                      client.social_log.push(message.guild.id, msg.content, "youtube.channels");
                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("added the Channel ".concat(msg.content)).setDescription("You can change the default message via the **\"edit\"**").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 10:
                      throw {
                        message: "YOU DID NOT SEND A VALID CHANNEL"
                      };

                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 41:
            if (!timeouterror) {
              _context6.next = 43;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 43:
            _context6.next = 78;
            break;

          case 45:
            if (!(temptype == "remove")) {
              _context6.next = 61;
              break;
            }

            if (!(client.social_log.get(message.guild.id, "youtube.channels").length <= 0)) {
              _context6.next = 48;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | You havent setup any Youtube Channels yet!").setColor(es.wrongcolor).setDescription("Add some others first...".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 48:
            buffer = "";
            emojis = ["0️⃣", "5️⃣"];

            for (i = 0; i < client.social_log.get(message.guild.id, "youtube.channels").length; i++) {
              buffer += "".concat(emojis[i], " ").concat(client.social_log.get(message.guild.id, "youtube.channels")[i]);
            }

            _context6.next = 53;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna remove? | Just react with the right one!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(buffer + "\n\n\n*React with the emoji regarding to the Channel you wanna remove*").setFooter(es.footertext, es.footericon)
            }));

          case 53:
            tempmsg = _context6.sent;

            for (_i = 0, _emojis = emojis; _i < _emojis.length; _i++) {
              _emoji = _emojis[_i];
              tempmsg.react(_emoji)["catch"](function (e) {
                return console.log(e);
              });
            }

            _context6.next = 57;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(function (reaction, user) {
              return user.id == message.author.id && emojis.includes(reaction.emoji.name);
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee3(collected) {
              var channel;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      channel = client.social_log.get(message.guild.id, "youtube.channels")[emojis.findIndex(function (emoji) {
                        return emoji == collected.first().emoji.name;
                      })];
                      client.social_log.remove(message.guild.id, channel, "youtube.channels");
                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("removed the Channel ".concat(channel)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 57:
            if (!timeouterror) {
              _context6.next = 59;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 59:
            _context6.next = 78;
            break;

          case 61:
            if (!(temptype == "edit")) {
              _context6.next = 77;
              break;
            }

            if (!(client.social_log.get(message.guild.id, "youtube.channels").length <= 0)) {
              _context6.next = 64;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | You havent setup any Youtube Channels yet!").setColor(es.wrongcolor).setDescription("Add some others first...".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 64:
            buffer = "";
            emojis = ["0️⃣", "5️⃣"];

            for (_i2 = 0; _i2 < client.social_log.get(message.guild.id, "youtube.channels").length; _i2++) {
              buffer += "".concat(emojis[_i2], " ").concat(client.social_log.get(message.guild.id, "youtube.channels")[_i2]);
            }

            _context6.next = 69;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel's Message do you wanna edit? | Just react with the right one!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(buffer + "\n\n\n*React with the emoji regarding to the Channel you wanna edit*").setFooter(es.footertext, es.footericon)
            }));

          case 69:
            tempmsg = _context6.sent;

            for (_i3 = 0, _emojis2 = emojis; _i3 < _emojis2.length; _i3++) {
              _emoji2 = _emojis2[_i3];
              tempmsg.react(_emoji2)["catch"](function (e) {
                return console.log(e);
              });
            }

            _context6.next = 73;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(function (reaction, user) {
              return user.id == message.author.id && emojis.includes(reaction.emoji.name);
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee5(collected) {
              var channel;
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      channel = client.social_log.get(message.guild.id, "youtube.channels")[emojis.findIndex(function (emoji) {
                        return emoji == collected.first().emoji.name;
                      })];
                      client.youtube_log.ensure(channel, {
                        oldvid: "",
                        message: "**{videoAuthorName}** uploaded \`{videoTitle}\`!\n**Watch it:** {videoURL}"
                      });
                      _context5.next = 4;
                      return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What should be the new Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n**CURRENT MESSAGE:**\n> ".concat(client.youtube_log.get(channel, "message")).substr(0, 2048)).addField("**VARIABLES**", "\n> `{url}` ... will be replaced with the video **LINK**\n> `{author}` ... will be replaced with the video's **Author**\n> `{title}` ... will be replaced with the video's **title**\n> `{date}` ... will be replaced with the video's **date**").setFooter(es.footertext, es.footericon)));

                    case 4:
                      tempmsg = _context5.sent;
                      _context5.next = 7;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee4(collected) {
                        var msg;
                        return regeneratorRuntime.async(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                msg = collected.first();

                                if (!(msg && msg.content)) {
                                  _context4.next = 6;
                                  break;
                                }

                                client.youtube_log.set(channel, msg.content, "message");
                                return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Changed the message for the Channel ".concat(channel)).setDescription("New Message:\n" + msg.content).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                              case 6:
                                throw {
                                  message: "YOU DID NOT SEND A VALID CHANNEL"
                                };

                              case 7:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        console.log(e);
                        timeouterror = e;
                      }));

                    case 7:
                      if (!timeouterror) {
                        _context5.next = 9;
                        break;
                      }

                      return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 9:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            })["catch"](function (e) {
              console.log(e);
              timeouterror = e;
            }));

          case 73:
            if (!timeouterror) {
              _context6.next = 75;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 75:
            _context6.next = 78;
            break;

          case 77:
            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 78:
            _context6.next = 84;
            break;

          case 80:
            _context6.prev = 80;
            _context6.t1 = _context6["catch"](1);
            console.log(String(_context6.t1.stack).bgRed);
            return _context6.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context6.t1)).substr(0, 2000), "```"))));

          case 84:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 80], [9, 16]]);
  }
};