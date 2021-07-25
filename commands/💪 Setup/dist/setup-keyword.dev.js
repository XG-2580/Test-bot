"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    edit_msg = _require2.edit_msg,
    send_roster = _require2.send_roster;

module.exports = {
  name: "setup-keyword",
  category: "💪 Setup",
  aliases: ["setupkeyword", "keyword-setup", "setup-keyword"],
  cooldown: 5,
  usage: "setup-keyword  --> Follow the Steps",
  description: "Define Key Word messages, so that if someone sends a Message containing that Keyword, the Bot will responde with your defined MESSAGE",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, originalowner, adminroles, timeouterror, filter, temptype, tempmsg, cuc, embed, emojis, emojisinverted, emojiarray, i, string, _i, _cuc, _i2, aliases, channels;

    return regeneratorRuntime.async(function run$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context6.prev = 1;
            originalowner = message.author.id;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context6.next = 9;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** a Key Word Message\n\n2\uFE0F\u20E3 **== Remove** a Key Word Message\n\n3\uFE0F\u20E3 **== Show** the Key Word Messages\n\n\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 9:
            tempmsg = _context6.sent;
            _context6.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](10);
            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 19:
            _context6.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 120000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var reaction;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id);

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context.next = 6;
                        break;
                      }

                      temptype = "add";
                      _context.next = 15;
                      break;

                    case 6:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context.next = 10;
                        break;
                      }

                      temptype = "remove";
                      _context.next = 15;
                      break;

                    case 10:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context.next = 14;
                        break;
                      }

                      temptype = "show";
                      _context.next = 15;
                      break;

                    case 14:
                      throw "You reacted with a wrong emoji";

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              });
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
            if (!(temptype == "add")) {
              _context6.next = 35;
              break;
            }

            if (!(client.keyword.get(message.guild.id, "commands").length > 19)) {
              _context6.next = 26;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | You've reached the maximum Key Words Amount!").setColor(es.wrongcolor).setDescription("You cannot have more then **20** Key Words".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 26:
            _context6.next = 28;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What Key Words do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please type the Keyword **without** the Prefix:\nExample if you wanna get a `Hello` Key Word send `hello`").setFooter(es.footertext, es.footericon)
            }));

          case 28:
            tempmsg = _context6.sent;
            _context6.next = 31;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 120000,
              errors: ["time"]
            }).then(function _callee5(collected) {
              var msg, thekeyword;
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      msg = collected.first().content.split(" ")[0];

                      if (!msg) {
                        _context5.next = 12;
                        break;
                      }

                      thekeyword = {
                        name: msg,
                        output: "ye",
                        embed: false,
                        channels: [],
                        aliases: []
                      };
                      _context5.next = 5;
                      return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What Should the Key Word send?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please just type the content in the Chat\nExample: `Hello {member} Welcome to this Server \uD83D\uDC4B`").setFooter(es.footertext, es.footericon)));

                    case 5:
                      tempmsg = _context5.sent;
                      _context5.next = 8;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 120000,
                        errors: ["time"]
                      }).then(function _callee4(collected) {
                        var msg;
                        return regeneratorRuntime.async(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                msg = collected.first().content;

                                if (!msg) {
                                  _context4.next = 12;
                                  break;
                                }

                                thekeyword.output = msg;
                                _context4.next = 5;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("In which Channels should the Keyword work?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please make sure to ping **__all__** Channels, like that: `#channel1 #channel2 #channel3`").setFooter(es.footertext, es.footericon)));

                              case 5:
                                tempmsg = _context4.sent;
                                _context4.next = 8;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 120000,
                                  errors: ["time"]
                                }).then(function _callee3(collected) {
                                  var channel, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ch;

                                  return regeneratorRuntime.async(function _callee3$(_context3) {
                                    while (1) {
                                      switch (_context3.prev = _context3.next) {
                                        case 0:
                                          channel = collected.first().mentions.channels.filter(function (ch) {
                                            return ch.guild.id == message.guild.id;
                                          }).first();

                                          if (!channel) {
                                            _context3.next = 30;
                                            break;
                                          }

                                          _iteratorNormalCompletion = true;
                                          _didIteratorError = false;
                                          _iteratorError = undefined;
                                          _context3.prev = 5;

                                          for (_iterator = collected.first().mentions.channels.array()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            ch = _step.value;
                                            console.log(ch.id);
                                            thekeyword.channels.push(ch.id);
                                          }

                                          _context3.next = 13;
                                          break;

                                        case 9:
                                          _context3.prev = 9;
                                          _context3.t0 = _context3["catch"](5);
                                          _didIteratorError = true;
                                          _iteratorError = _context3.t0;

                                        case 13:
                                          _context3.prev = 13;
                                          _context3.prev = 14;

                                          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                            _iterator["return"]();
                                          }

                                        case 16:
                                          _context3.prev = 16;

                                          if (!_didIteratorError) {
                                            _context3.next = 19;
                                            break;
                                          }

                                          throw _iteratorError;

                                        case 19:
                                          return _context3.finish(16);

                                        case 20:
                                          return _context3.finish(13);

                                        case 21:
                                          _context3.next = 23;
                                          return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Do you want aliases?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("For example, if you picked the keyword: `hello`, then you could want aliases like them: `hi hey hallo welcome`\nSimple send Each Alias in the Channel with a ` ` SPACE inbetween\nIf you don't want any aliases type: `noalias`").setFooter(es.footertext, es.footericon)));

                                        case 23:
                                          tempmsg = _context3.sent;
                                          _context3.next = 26;
                                          return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                            return m.author.id === message.author.id;
                                          }, {
                                            max: 1,
                                            time: 120000,
                                            errors: ["time"]
                                          }).then(function _callee2(collected) {
                                            var args, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, m, ttempmsg;

                                            return regeneratorRuntime.async(function _callee2$(_context2) {
                                              while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                  case 0:
                                                    if (!(collected.first().content.toLowerCase() == "noalias")) {
                                                      _context2.next = 3;
                                                      break;
                                                    }

                                                    _context2.next = 27;
                                                    break;

                                                  case 3:
                                                    args = collected.first().content.split(" ");

                                                    if (!args) {
                                                      _context2.next = 26;
                                                      break;
                                                    }

                                                    _iteratorNormalCompletion2 = true;
                                                    _didIteratorError2 = false;
                                                    _iteratorError2 = undefined;
                                                    _context2.prev = 8;

                                                    for (_iterator2 = args[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                      m = _step2.value;
                                                      console.log(m);
                                                      thekeyword.aliases.push(m.toLowerCase());
                                                    }

                                                    _context2.next = 16;
                                                    break;

                                                  case 12:
                                                    _context2.prev = 12;
                                                    _context2.t0 = _context2["catch"](8);
                                                    _didIteratorError2 = true;
                                                    _iteratorError2 = _context2.t0;

                                                  case 16:
                                                    _context2.prev = 16;
                                                    _context2.prev = 17;

                                                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                                      _iterator2["return"]();
                                                    }

                                                  case 19:
                                                    _context2.prev = 19;

                                                    if (!_didIteratorError2) {
                                                      _context2.next = 22;
                                                      break;
                                                    }

                                                    throw _iteratorError2;

                                                  case 22:
                                                    return _context2.finish(19);

                                                  case 23:
                                                    return _context2.finish(16);

                                                  case 24:
                                                    _context2.next = 27;
                                                    break;

                                                  case 26:
                                                    timeouterror = {
                                                      message: "YOU DID NOT SEND ANY ALIAS"
                                                    };

                                                  case 27:
                                                    _context2.next = 29;
                                                    return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Should I send it as an EMBED or as an MESSAGE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("React with \u2705 to send it as an Embed\n\nReact with \u274C to just send it as a normal Message").setFooter(es.footertext, es.footericon)));

                                                  case 29:
                                                    ttempmsg = _context2.sent;

                                                    try {
                                                      ttempmsg.react("✅");
                                                      ttempmsg.react("❌");
                                                    } catch (_unused) {}

                                                    _context2.next = 33;
                                                    return regeneratorRuntime.awrap(ttempmsg.awaitReactions(function (reaction, user) {
                                                      return user == originalowner;
                                                    }, {
                                                      max: 1,
                                                      time: 90000,
                                                      errors: ["time"]
                                                    }).then(function (collected) {
                                                      var reaction = collected.first();

                                                      if (reaction) {
                                                        if (reaction.emoji.name == "✅") {
                                                          thekeyword.embed = true;
                                                        } else {
                                                          thekeyword.embed = false;
                                                        }

                                                        client.keyword.push(message.guild.id, thekeyword, "commands");
                                                        message.channel.send(new Discord.MessageEmbed().setTitle("Success ".concat(thekeyword.name, " has successfully been created!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("This is how it will look like:").setFooter(es.footertext, es.footericon));

                                                        if (reaction.emoji.name == "✅") {
                                                          message.channel.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(thekeyword.output.replace("{member}", "<@".concat(message.author.id, ">"))).setFooter(es.footertext, es.footericon));
                                                        } else {
                                                          message.channel.send(thekeyword.output.replace("{member}", "<@".concat(message.author.id, ">")));
                                                        }
                                                      } else {
                                                        throw "you didn't ping a valid Channel";
                                                      }
                                                    })["catch"](function (e) {
                                                      timeouterror = e;
                                                    }));

                                                  case 33:
                                                    if (!timeouterror) {
                                                      _context2.next = 35;
                                                      break;
                                                    }

                                                    return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                                                  case 35:
                                                  case "end":
                                                    return _context2.stop();
                                                }
                                              }
                                            }, null, null, [[8, 12, 16, 24], [17,, 19, 23]]);
                                          })["catch"](function (e) {
                                            timeouterror = e;
                                          }));

                                        case 26:
                                          if (!timeouterror) {
                                            _context3.next = 28;
                                            break;
                                          }

                                          return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                                        case 28:
                                          _context3.next = 31;
                                          break;

                                        case 30:
                                          timeouterror = {
                                            message: "YOU DID NOT PING ANY CHANNELS"
                                          };

                                        case 31:
                                        case "end":
                                          return _context3.stop();
                                      }
                                    }
                                  }, null, null, [[5, 9, 13, 21], [14,, 16, 20]]);
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 8:
                                if (!timeouterror) {
                                  _context4.next = 10;
                                  break;
                                }

                                return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 10:
                                _context4.next = 13;
                                break;

                              case 12:
                                throw "you didn't ping a valid Channel";

                              case 13:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 8:
                      if (!timeouterror) {
                        _context5.next = 10;
                        break;
                      }

                      return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 10:
                      _context5.next = 13;
                      break;

                    case 12:
                      throw "you didn't ping a valid Channel";

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 31:
            if (!timeouterror) {
              _context6.next = 33;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 33:
            _context6.next = 70;
            break;

          case 35:
            if (!(temptype == "remove")) {
              _context6.next = 60;
              break;
            }

            cuc = client.keyword.get(message.guild.id, "commands");
            embed = new Discord.MessageEmbed().setTitle("Which Key Word do you wanna remove?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("REACT with the EMOJI for the RIGHT Command, you wanna REMOVE", es.footericon);
            emojis = {
              "0": "1️⃣",
              "1": "2️⃣",
              "2": "3️⃣",
              "3": "4️⃣",
              "4": "5️⃣",
              "5": "6️⃣",
              "6": "7️⃣",
              "7": "8️⃣",
              "8": "9️⃣",
              "9": "🔟"
            };
            emojisinverted = {
              "1️⃣": "0",
              "2️⃣": "1",
              "3️⃣": "2",
              "4️⃣": "3",
              "5️⃣": "4",
              "6️⃣": "5",
              "7️⃣": "6",
              "8️⃣": "7",
              "9️⃣": "8",
              "🔟": "9"
            };
            emojiarray = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

            for (i = 0; i < cuc.length; i++) {
              try {
                string = "".concat(cuc[i].output);
                if (string.length > 250) string = string.substr(0, 250) + " ...";
                embed.addField("**".concat(emojis[String(i)], ".** `").concat(cuc[i].name, "` | ").concat(cuc[i].embed ? "✅ Embed" : "❌ Embed"), ">>> " + string);
              } catch (e) {
                console.log(e);
              }
            }

            _context6.next = 44;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: embed
            }));

          case 44:
            tempmsg = _context6.sent;
            _i = 0;

          case 46:
            if (!(_i < cuc.length)) {
              _context6.next = 54;
              break;
            }

            if (!(_i < 3)) {
              _context6.next = 49;
              break;
            }

            return _context6.abrupt("continue", 51);

          case 49:
            _context6.next = 51;
            return regeneratorRuntime.awrap(tempmsg.react(emojiarray[_i]));

          case 51:
            _i++;
            _context6.next = 46;
            break;

          case 54:
            _context6.next = 56;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(function (reaction, user) {
              return user.id == originalowner;
            }, {
              max: 1,
              time: 120000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();

              if (reaction) {
                var thecmd = cuc[emojisinverted[reaction.emoji.name]];

                try {
                  client.keyword.remove(message.guild.id, thecmd, "commands");
                  return message.reply(new Discord.MessageEmbed().setTitle("I successfully deleted `".concat(thecmd.name, "`!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 56:
            if (!timeouterror) {
              _context6.next = 58;
              break;
            }

            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 58:
            _context6.next = 70;
            break;

          case 60:
            if (!(temptype == "show")) {
              _context6.next = 69;
              break;
            }

            _cuc = client.keyword.get(message.guild.id, "commands");
            embed = new Discord.MessageEmbed().setTitle("Key Word Messages (5 Seconds SERVER Delay)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(ee.footertext, es.footericon);

            for (_i2 = 0; _i2 < _cuc.length; _i2++) {
              try {
                string = "".concat(_cuc[_i2].output);
                aliases = "".concat(_cuc[_i2].aliases.map(function (a) {
                  return "`".concat(a, "`");
                }).join(", "));
                if (aliases.length > 100) aliases = aliases.substr(0, 100) + " ...";
                channels = _cuc[_i2].channels.map(function (ch) {
                  return "<#".concat(ch, ">");
                });
                if (channels.length > 10) channels = channels.join(" ") + " ...";else channels = channels.join(" ");
                if (string.length > 100) string = string.substr(0, 100) + " ...";
                embed.addField(" `".concat(_cuc[_i2].name, "` | ").concat(_cuc[_i2].embed ? "✅ Embed" : "❌ Embed"), ">>>  **__OUTPUT__**\n" + string + "\n **__ALIASES__**\n" + aliases + "\n **__CHANNELS__**\n" + channels);
              } catch (e) {
                console.log(e);
              }
            }

            _context6.next = 66;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: embed
            }));

          case 66:
            tempmsg = _context6.sent;
            _context6.next = 70;
            break;

          case 69:
            return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 70:
            _context6.next = 76;
            break;

          case 72:
            _context6.prev = 72;
            _context6.t1 = _context6["catch"](1);
            console.log(String(_context6.t1.stack).bgRed);
            return _context6.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context6.t1)).substr(0, 2000), "```"))));

          case 76:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 72], [10, 16]]);
  }
};