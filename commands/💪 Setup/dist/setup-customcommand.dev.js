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
  name: "setup-customcommand",
  category: "💪 Setup",
  aliases: ["setupcustomcommand", "setupcustomcommands", "customcommand-setup", "setup-customcommands"],
  cooldown: 5,
  usage: "setup-customcommand  --> Follow the Steps",
  description: "Define Custom Commands, Create Custom Commands and Remove Custom Commands --> \"Custom Command Names, that sends Custom Messages\"",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, originalowner, adminroles, timeouterror, filter, temptype, tempmsg, cuc, embed, emojis, emojisinverted, emojiarray, i, string, _i, _cuc, _i2, _cuc2, _i3;

    return regeneratorRuntime.async(function run$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context4.prev = 1;
            originalowner = message.author.id;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context4.next = 9;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** a Custom Command\n\n2\uFE0F\u20E3 **== Remove** a Custom Command\n\n3\uFE0F\u20E3 **== Show** the Custom Command\n\n\uD83D\uDCD1 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 9:
            tempmsg = _context4.sent;
            _context4.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("📑");
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](10);
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Missing Permission to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(_context4.t0.message ? _context4.t0.message : _context4.t0).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 20:
            _context4.next = 22;
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
                      _context.next = 19;
                      break;

                    case 6:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context.next = 10;
                        break;
                      }

                      temptype = "remove";
                      _context.next = 19;
                      break;

                    case 10:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context.next = 14;
                        break;
                      }

                      temptype = "show";
                      _context.next = 19;
                      break;

                    case 14:
                      if (!(reaction.emoji.name === "📑")) {
                        _context.next = 18;
                        break;
                      }

                      temptype = "thesettings";
                      _context.next = 19;
                      break;

                    case 18:
                      throw "You reacted with a wrong emoji";

                    case 19:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 22:
            if (!timeouterror) {
              _context4.next = 24;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 24:
            if (!(temptype == "add")) {
              _context4.next = 36;
              break;
            }

            if (!(client.customcommands.get(message.guild.id, "commands").length > 19)) {
              _context4.next = 27;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("You've reached the maximum Custom Commands Amount!").setColor(es.wrongcolor).setDescription("You cannot have more then **20** Custom Commands".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 27:
            _context4.next = 29;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What Custom Command do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please type the Command name **without** the Prefix:\nExample if you wanna get a `!socials` command send `socials`").setFooter(es.footertext, es.footericon)
            }));

          case 29:
            tempmsg = _context4.sent;
            _context4.next = 32;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 120000,
              errors: ["time"]
            }).then(function _callee3(collected) {
              var msg, thecustomcommand;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      msg = collected.first().content.split(" ")[0];

                      if (!msg) {
                        _context3.next = 12;
                        break;
                      }

                      thecustomcommand = {
                        name: msg,
                        output: "ye",
                        embed: false
                      };
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What Should the Custom Command send?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please just type the content in the Chat\nExample: `Discord Server: https://discord.gg/FQGXbypRf8`").setFooter(es.footertext, es.footericon)));

                    case 5:
                      tempmsg = _context3.sent;
                      _context3.next = 8;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 120000,
                        errors: ["time"]
                      }).then(function _callee2(collected) {
                        var msg, ttempmsg;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                msg = collected.first().content;

                                if (!msg) {
                                  _context2.next = 13;
                                  break;
                                }

                                thecustomcommand.output = msg;
                                _context2.next = 5;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Should I send it as an EMBED or as an MESSAGE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("React with \u2705 to send it as an Embed\n\nReact with \u274C to just send it as a normal Message").setFooter(es.footertext, es.footericon)));

                              case 5:
                                ttempmsg = _context2.sent;

                                try {
                                  ttempmsg.react("✅");
                                  ttempmsg.react("❌");
                                } catch (_unused) {}

                                _context2.next = 9;
                                return regeneratorRuntime.awrap(ttempmsg.awaitReactions(function (reaction, user) {
                                  return user == originalowner;
                                }, {
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();

                                  if (reaction) {
                                    console.log(reaction);

                                    if (reaction.emoji.name == "✅") {
                                      thecustomcommand.embed = true;
                                    } else {
                                      thecustomcommand.embed = false;
                                    }

                                    client.customcommands.push(message.guild.id, thecustomcommand, "commands");
                                    message.channel.send(new Discord.MessageEmbed().setTitle("Success ".concat(thecustomcommand.name, " has successfully been created!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("This is how it will look like:").setFooter(es.footertext, es.footericon));

                                    if (reaction.emoji.name == "✅") {
                                      message.channel.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(thecustomcommand.output).setFooter(es.footertext, es.footericon));
                                    } else {
                                      message.channel.send(thecustomcommand.output);
                                    }
                                  } else {
                                    throw "you didn't ping a valid Channel";
                                  }
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 9:
                                if (!timeouterror) {
                                  _context2.next = 11;
                                  break;
                                }

                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 11:
                                _context2.next = 14;
                                break;

                              case 13:
                                throw "you didn't ping a valid Channel";

                              case 14:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 8:
                      if (!timeouterror) {
                        _context3.next = 10;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 10:
                      _context3.next = 13;
                      break;

                    case 12:
                      throw "you didn't ping a valid Channel";

                    case 13:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 32:
            if (!timeouterror) {
              _context4.next = 34;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 34:
            _context4.next = 80;
            break;

          case 36:
            if (!(temptype == "remove")) {
              _context4.next = 61;
              break;
            }

            cuc = client.customcommands.get(message.guild.id, "commands");
            embed = new Discord.MessageEmbed().setTitle("Which Custom Command do you wanna remove?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("REACT with the EMOJI for the RIGHT Command, you wanna REMOVE", es.footericon);
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

            _context4.next = 45;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: embed
            }));

          case 45:
            tempmsg = _context4.sent;
            _i = 0;

          case 47:
            if (!(_i < cuc.length)) {
              _context4.next = 55;
              break;
            }

            if (!(_i < 3)) {
              _context4.next = 50;
              break;
            }

            return _context4.abrupt("continue", 52);

          case 50:
            _context4.next = 52;
            return regeneratorRuntime.awrap(tempmsg.react(emojiarray[_i]));

          case 52:
            _i++;
            _context4.next = 47;
            break;

          case 55:
            _context4.next = 57;
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
                  client.customcommands.remove(message.guild.id, thecmd, "commands");
                  return message.reply(new Discord.MessageEmbed().setTitle("I successfully deleted `".concat(thecmd.name, "`!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(e.message ? e.message : e).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 57:
            if (!timeouterror) {
              _context4.next = 59;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 59:
            _context4.next = 80;
            break;

          case 61:
            if (!(temptype == "show")) {
              _context4.next = 70;
              break;
            }

            _cuc = client.customcommands.get(message.guild.id, "commands");
            embed = new Discord.MessageEmbed().setTitle("Custom Commands").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(ee.footertext, es.footericon);

            for (_i2 = 0; _i2 < _cuc.length; _i2++) {
              try {
                string = "".concat(_cuc[_i2].output);
                if (string.length > 250) string = string.substr(0, 250) + " ...";
                embed.addField(" `".concat(_cuc[_i2].name, "` | ").concat(_cuc[_i2].embed ? "✅ Embed" : "❌ Embed"), ">>> " + string);
              } catch (e) {
                console.log(e);
              }
            }

            _context4.next = 67;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: embed
            }));

          case 67:
            tempmsg = _context4.sent;
            _context4.next = 80;
            break;

          case 70:
            if (!(temptype == "thesettings")) {
              _context4.next = 79;
              break;
            }

            _cuc2 = client.customcommands.get(message.guild.id, "commands");
            embed = new Discord.MessageEmbed().setTitle("📑 Settings of the Custom Commands").setDescription("**Amount: `".concat(client.customcommands.get(message.guild.id, "commands").length, "`**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(ee.footertext, es.footericon);

            for (_i3 = 0; _i3 < _cuc2.length; _i3++) {
              try {
                string = "".concat(_cuc2[_i3].output);
                if (string.length > 50) string = string.substr(0, 50) + " ...";
                embed.addField(" `".concat(_cuc2[_i3].name, "` | ").concat(_cuc2[_i3].embed ? "✅ Embed" : "❌ Embed"), ">>> " + string);
              } catch (e) {
                console.log(e);
              }
            }

            _context4.next = 76;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: embed
            }));

          case 76:
            tempmsg = _context4.sent;
            _context4.next = 80;
            break;

          case 79:
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 80:
            _context4.next = 86;
            break;

          case 82:
            _context4.prev = 82;
            _context4.t1 = _context4["catch"](1);
            console.log(String(_context4.t1.stack).bgRed);
            return _context4.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(_context4.t1.message ? _context4.t1.message : _context4.t1).substr(0, 2000), "```"))));

          case 86:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 82], [10, 17]]);
  }
};