"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    swap_pages = _require2.swap_pages,
    swap_pages2 = _require2.swap_pages2;

module.exports = {
  name: "setup-blacklist",
  category: "💪 Setup",
  aliases: ["setupblacklist", "blacklist-setup", "blacklistsetup"],
  cooldown: 5,
  usage: "setup-blacklist  -->  Follow the Steps",
  description: "Blacklist specific Words in your Server",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context.next = 7;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** Word to the Blacklist\n\n2\uFE0F\u20E3 **== Remove** Word from the Blacklist\n\n3\uFE0F\u20E3 **== Show** all Blacklisted Words\n\n4\uFE0F\u20E3 **== Reset** the Blacklisted Words\n\n*Note that ADMINISTRATORS, (general) are not checked if their messages are a part of the Blacklist*\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 7:
            tempmsg = _context.sent;
            _context.prev = 8;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "add";else if (reaction.emoji.name === "2️⃣") temptype = "remove";else if (reaction.emoji.name === "3️⃣") temptype = "show";else if (reaction.emoji.name === "4️⃣") temptype = "reset";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            if (!(temptype == "add")) {
              _context.next = 32;
              break;
            }

            _context.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Word do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please send the Word(s) in here now! Note if you wanna add multiple words do it like this:\n`word1,word2,word 3,word4`").setFooter(es.footertext, es.footericon)
            }));

          case 25:
            tempmsg = _context.sent;
            _context.next = 28;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message.content) {
                try {
                  var blacklistedwords = message.content.split(",").filter(Boolean).map(function (item) {
                    return item.trim().toLowerCase();
                  });
                  var notadded = [];
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = blacklistedwords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var blacklistword = _step.value;

                      if (client.blacklist.get(message.guild.id, "words").includes(blacklistword)) {
                        notadded.push(blacklistword);
                      } else {
                        client.blacklist.push(message.guild.id, blacklistword, "words");
                      }
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  return message.reply(new Discord.MessageEmbed().setTitle("Added `".concat(blacklistedwords.length - notadded.length, "` / `").concat(blacklistedwords.length, "`")).setDescription("Not added Words:\n".concat(notadded.length > 0 ? notadded.map(function (i) {
                    return "`".concat(i, "`");
                  }).join(", ") + "\n Because it is already in the Blacklist" : "Added every given word").substr(0, 2048)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  console.log(e);
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 28:
            if (!timeouterror) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 30:
            _context.next = 52;
            break;

          case 32:
            if (!(temptype == "remove")) {
              _context.next = 42;
              break;
            }

            _context.next = 35;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Word do you wanna remove?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please send the Word(s) in here now! Note if you wanna remove multiple words do it like this:\n`word1,word2,word 3,word4`").setFooter(es.footertext, es.footericon)
            }));

          case 35:
            tempmsg = _context.sent;
            _context.next = 38;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message.content) {
                try {
                  var blacklistedwords = message.content.split(",").filter(Boolean).map(function (item) {
                    return item.trim().toLowerCase();
                  });
                  var notremoved = [];
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = blacklistedwords[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var blacklistword = _step2.value;

                      if (!client.blacklist.get(message.guild.id, "words").includes(blacklistword)) {
                        notremoved.push(blacklistword);
                      } else {
                        client.blacklist.remove(message.guild.id, blacklistword, "words");
                      }
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  return message.reply(new Discord.MessageEmbed().setTitle("Removed `".concat(blacklistedwords.length - notremoved.length, "` / `").concat(blacklistedwords.length, "`")).setDescription("Not removed Words:\n".concat(notremoved.length > 0 ? notremoved.map(function (i) {
                    return "`".concat(i, "`");
                  }).join(", ") + " \nBecause it is not in the blacklist yet" : "Removed every given word").substr(0, 2048)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  console.log(e);
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 38:
            if (!timeouterror) {
              _context.next = 40;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 40:
            _context.next = 52;
            break;

          case 42:
            if (!(temptype == "show")) {
              _context.next = 46;
              break;
            }

            return _context.abrupt("return", swap_pages(client, message, "".concat(client.blacklist.get(message.guild.id, "words").map(function (word) {
              return "`".concat(word, "`");
            }).join(", ").split("`").join("\`")), "".concat(message.guild.name, " | Blacklisted Words")));

          case 46:
            if (!(temptype == "reset")) {
              _context.next = 51;
              break;
            }

            client.blacklist.set(message.guild.id, [], "words");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Resetted the Blacklist").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 51:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 52:
            _context.next = 58;
            break;

          case 54:
            _context.prev = 54;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 54], [8, 15]]);
  }
};