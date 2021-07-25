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
  name: "setup-twitch",
  category: "💪 Setup",
  aliases: ["setuptwitch", "twitch-setup", "twitchsetup"],
  cooldown: 5,
  usage: "setup-twitch  -->  Follow Steps",
  description: "Manage the Twitch logger, temp role, ping role, adduser, removeuser, etc.",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context4.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context4.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Manage Channels** (Edit, Delete, etc.)\n\n2\uFE0F\u20E3 **== Create/Set Twitch-Channel**\n\n3\uFE0F\u20E3 **== Set Discord Twitch Logger Channel**\n\n4\uFE0F\u20E3 **== Set ACTIVE LIVE STREAMING ROLE**\n\n5\uFE0F\u20E3 **== Set Ghost Ping Role**\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context4.sent;
            _context4.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](9);
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context4.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 20:
            _context4.next = 22;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "manage";else if (reaction.emoji.name === "2️⃣") temptype = "set";else if (reaction.emoji.name === "3️⃣") temptype = "channel";else if (reaction.emoji.name === "4️⃣") temptype = "roleID_GIVE";else if (reaction.emoji.name === "5️⃣") temptype = "roleID_PING";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 22:
            if (!timeouterror) {
              _context4.next = 24;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 24:
            if (!(temptype == "set")) {
              _context4.next = 34;
              break;
            }

            _context4.next = 27;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Twitch Streamer do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please send me just the link, for example: `https://www.twitch.tv/milratodiscordbot`").setFooter(es.footertext, es.footericon)
            }));

          case 27:
            tempmsg = _context4.sent;
            _context4.next = 30;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee3(collected) {
              var msg, channelname;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      msg = collected.first().content;

                      if (!(msg && msg.toLowerCase().includes("https"))) {
                        _context3.next = 13;
                        break;
                      }

                      channelname = msg.split("/");
                      channelname = channelname[channelname.length - 1];
                      _context3.next = 6;
                      return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Which Discord User is he?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the User now! For example: ".concat(message.author)).setFooter(es.footertext, es.footericon)));

                    case 6:
                      tempmsg = _context3.sent;
                      _context3.next = 9;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee2(collected) {
                        var msg, discorduser;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                msg = collected.first().mentions.users.first();

                                if (!msg) {
                                  _context2.next = 12;
                                  break;
                                }

                                discorduser = msg.id;
                                _context2.next = 5;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Which Message should I post?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Send the Message now! For example: `".concat(message.author.username, " is live! go Check him out!`")).setFooter(es.footertext, es.footericon)));

                              case 5:
                                tempmsg = _context2.sent;
                                _context2.next = 8;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                }).then(function _callee(collected) {
                                  var msg, themsg;
                                  return regeneratorRuntime.async(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          msg = collected.first().content;

                                          if (!msg) {
                                            _context.next = 7;
                                            break;
                                          }

                                          themsg = msg;
                                          client.social_log.push(message.guild.id, {
                                            ChannelName: channelname,
                                            DISCORD_USER_ID: discorduser,
                                            twitch_stream_id: "",
                                            message: themsg
                                          }, "twitch.channels");
                                          return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ADDED the USER to the STREAMER LIST ").setDescription("DONT FORGET TO ADD A TWITCH_DISCORD_CHANNEL!!!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                                        case 7:
                                          throw {
                                            message: "YOU DID NOT SEND A VALID MESSAGE"
                                          };

                                        case 8:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  });
                                })["catch"](function (e) {
                                  console.log(e);
                                  timeouterror = e;
                                }));

                              case 8:
                                if (!timeouterror) {
                                  _context2.next = 10;
                                  break;
                                }

                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 10:
                                _context2.next = 13;
                                break;

                              case 12:
                                throw {
                                  message: "YOU DID NOT PING A VALID MEMBER"
                                };

                              case 13:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        console.log(e);
                        timeouterror = e;
                      }));

                    case 9:
                      if (!timeouterror) {
                        _context3.next = 11;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 11:
                      _context3.next = 14;
                      break;

                    case 13:
                      throw {
                        message: "YOU DID NOT SEND A VALID LINK"
                      };

                    case 14:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })["catch"](function (e) {
              console.log(e);
              timeouterror = e;
            }));

          case 30:
            if (!timeouterror) {
              _context4.next = 32;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 32:
            _context4.next = 69;
            break;

          case 34:
            if (!(temptype == "manage")) {
              _context4.next = 38;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | THIS IS NOT FINISHED YET PLEASE STAND BY").setColor(es.wrongcolor).setDescription("If you want to delete the USERS DM: `XG#2846`".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 38:
            if (!(temptype == "channel")) {
              _context4.next = 48;
              break;
            }

            _context4.next = 41;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!\n\nType: `no` if you don't wanna disable it!").setFooter(es.footertext, es.footericon)
            }));

          case 41:
            tempmsg = _context4.sent;
            _context4.next = 44;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message.content.toLowerCase() == "no") {
                client.social_log.set(message.guild.id, "", "twitch.channelID");
                return message.reply(new Discord.MessageEmbed().setTitle("Disabled the Twitch Logger System!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
              }

              var channel = message.mentions.channels.filter(function (ch) {
                return ch.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.social_log.set(message.guild.id, channel.id, "twitch.channelID");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now send all Twtich-logs into: `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 44:
            if (!timeouterror) {
              _context4.next = 46;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 46:
            _context4.next = 69;
            break;

          case 48:
            if (!(temptype == "roleID_GIVE")) {
              _context4.next = 58;
              break;
            }

            _context4.next = 51;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you want me to give to a Streamer when he is live?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!\n\nType: `no` if you don't wanna disable it!").setFooter(es.footertext, es.footericon)
            }));

          case 51:
            tempmsg = _context4.sent;
            _context4.next = 54;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message.content.toLowerCase() == "no") {
                client.social_log.set(message.guild.id, "", "twitch.roleID_GIVE");
                return message.reply(new Discord.MessageEmbed().setTitle("Disabled the Twitch Logger Role Granting!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
              }

              var channel = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.social_log.set(message.guild.id, channel.id, "twitch.roleID_GIVE");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now give to all Streaming Members the Role: `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 54:
            if (!timeouterror) {
              _context4.next = 56;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 56:
            _context4.next = 69;
            break;

          case 58:
            if (!(temptype == "roleID_PING")) {
              _context4.next = 68;
              break;
            }

            _context4.next = 61;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you want me to ping, when someone goes live?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!\n\nType: `no` if you don't wanna disable it!").setFooter(es.footertext, es.footericon)
            }));

          case 61:
            tempmsg = _context4.sent;
            _context4.next = 64;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message.content.toLowerCase() == "no") {
                client.social_log.set(message.guild.id, "", "twitch.roleID_PING");
                return message.reply(new Discord.MessageEmbed().setTitle("Disabled the Twitch Logger Role PINGING!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
              }

              var channel = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.social_log.set(message.guild.id, channel.id, "twitch.roleID_PING");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now ping the Role: `".concat(channel.name, "` when someone goes live")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 64:
            if (!timeouterror) {
              _context4.next = 66;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 66:
            _context4.next = 69;
            break;

          case 68:
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 69:
            _context4.next = 75;
            break;

          case 71:
            _context4.prev = 71;
            _context4.t1 = _context4["catch"](1);
            console.log(String(_context4.t1.stack).bgRed);
            return _context4.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context4.t1)).substr(0, 2000), "```"))));

          case 75:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 71], [9, 17]]);
  }
};