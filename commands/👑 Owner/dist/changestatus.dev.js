"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "changestatus",
  category: "👑 Owner",
  aliases: ["botstatus", "status"],
  cooldown: 5,
  usage: "changestatus  -->  Follow the Steps",
  description: "Changes the Status of the BOT",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, status;
    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.some(function (r) {
              return r.includes(message.author.id);
            })) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
                return "<@".concat(id, ">");
              })))
            }));

          case 3:
            _context3.prev = 3;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context3.next = 10;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setDescription("1\uFE0F\u20E3 **== Change** Status **TEXT**\n\n2\uFE0F\u20E3 **== Change** Status **TYPE**\n\n3\uFE0F\u20E3 **== Change** Status **URL**\n\n\uD83D\uDFE2 **==** Change the Online/Idle/DnD state\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 10:
            tempmsg = _context3.sent;
            _context3.prev = 11;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("🟢");
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](11);
            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 21:
            _context3.next = 23;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "text";else if (reaction.emoji.name === "2️⃣") temptype = "type";else if (reaction.emoji.name === "3️⃣") temptype = "url";else if (reaction.emoji.name === "🟢") temptype = "state";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 23:
            if (!timeouterror) {
              _context3.next = 25;
              break;
            }

            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 25:
            if (!(temptype == "text")) {
              _context3.next = 35;
              break;
            }

            _context3.next = 28;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setTitle("Which Text should I display in the Status?").setColor(es.color).setDescription("\n        Example: `".concat(prefix, "help | ").concat(client.user.username.split(" ")[0], " | by: Limsathya`\n\n        *Enter the text now!*")).setFooter(es.footertext, es.footericon)
            }));

          case 28:
            tempmsg = _context3.sent;
            _context3.next = 31;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var msg, status;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      msg = collected.first().content;
                      status = config;
                      status.status.text = msg;
                      client.user.setActivity(msg.substr(0, 50), {
                        type: config.status.type,
                        url: config.status.url
                      });
                      fs.writeFile('config.json', JSON.stringify(status, null, 3), function (e) {
                        if (e) {
                          console.log(String(e.stack).red);
                          return message.channel.send({
                            embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("".concat(emoji.msg.ERROR, "  ERROR Writing the File")).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```"))
                          });
                        }

                        return message.channel.send({
                          embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
                        });
                      });

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 31:
            if (!timeouterror) {
              _context3.next = 33;
              break;
            }

            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 33:
            _context3.next = 72;
            break;

          case 35:
            if (!(temptype == "type")) {
              _context3.next = 50;
              break;
            }

            _context3.next = 38;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setTitle("What Type do you wanna use?").setColor(es.color).setDescription("\n        1\uFE0F\u20E3 **==** PLAYING\n        \n        2\uFE0F\u20E3 **==** WATCHING\n        \n        3\uFE0F\u20E3 **==** STREAMING\n\n        4\uFE0F\u20E3 **==** LISTENING\n      \n        5\uFE0F\u20E3 **==** COMPETING\n      \n        *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 38:
            tempmsg = _context3.sent;

            try {
              tempmsg.react("4️⃣");
              tempmsg.react("5️⃣");
            } catch (_unused) {}

            _context3.next = 42;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "PLAYING";else if (reaction.emoji.name === "2️⃣") temptype = "WATCHING";else if (reaction.emoji.name === "3️⃣") temptype = "STREAMING";else if (reaction.emoji.name === "4️⃣") temptype = "LISTENING";else if (reaction.emoji.name === "5️⃣") temptype = "COMPETING";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 42:
            if (!timeouterror) {
              _context3.next = 44;
              break;
            }

            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 44:
            status = config;
            status.status.type = temptype;
            client.user.setActivity(config.status.text, {
              type: temptype,
              url: config.status.url
            });
            fs.writeFile('config.json', JSON.stringify(status, null, 3), function (e) {
              if (e) {
                console.log(String(e.stack).red);
                return message.channel.send({
                  embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("".concat(emoji.msg.ERROR, "  ERROR Writing the File")).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```"))
                });
              }

              return message.channel.send({
                embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
              });
            });
            _context3.next = 72;
            break;

          case 50:
            if (!(temptype == "state")) {
              _context3.next = 61;
              break;
            }

            _context3.next = 53;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setTitle("What Type do you wanna use?").setColor(es.color).setDescription("\n        \uD83D\uDFE2 **==** ONLINE\n        \n        \uD83D\uDFE1 **==** IDLE\n        \n        \uD83D\uDD34 **==** DO NOT DISTRUB (DND)\n      \n      \n        *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 53:
            tempmsg = _context3.sent;

            try {
              tempmsg.react("🔴");
              tempmsg.react("🟡");
            } catch (_unused2) {}

            _context3.next = 57;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "🟢") client.user.setStatus('online').then(function (t) {
                return message.channel.send({
                  embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
                });
              })["catch"](function (e) {
                return timeouterror = e;
              });else if (reaction.emoji.name === "🟡") client.user.setStatus('idle').then(function (t) {
                return message.channel.send({
                  embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
                });
              })["catch"](function (e) {
                return timeouterror = e;
              });else if (reaction.emoji.name === "🔴") client.user.setStatus('dnd').then(function (t) {
                return message.channel.send({
                  embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
                });
              })["catch"](function (e) {
                return timeouterror = e;
              });else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 57:
            if (!timeouterror) {
              _context3.next = 59;
              break;
            }

            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 59:
            _context3.next = 72;
            break;

          case 61:
            if (!(temptype == "url")) {
              _context3.next = 71;
              break;
            }

            _context3.next = 64;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setTitle("Which URL should I display in the Status, if I am streaming?").setColor(es.color).setDescription("\n        Example: `https://twitch.tv/#` --> must be a twitch link\n\n        *Enter the text now!*").setFooter(es.footertext, es.footericon)
            }));

          case 64:
            tempmsg = _context3.sent;
            _context3.next = 67;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee2(collected) {
              var msg, status;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      msg = collected.first().content;

                      if (isValidURL(msg)) {
                        _context2.next = 3;
                        break;
                      }

                      return _context2.abrupt("return", message.channel.send({
                        embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("NOT A VALID URL")
                      }));

                    case 3:
                      if (msg.includes("twitch")) {
                        _context2.next = 5;
                        break;
                      }

                      return _context2.abrupt("return", message.channel.send({
                        embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("NOT A VALID TWITCH URL")
                      }));

                    case 5:
                      status = config;
                      status.status.url = msg;
                      client.user.setActivity(msg.substr(0, 50), {
                        type: config.status.type,
                        url: msg
                      });
                      fs.writeFile('config.json', JSON.stringify(status, null, 3), function (e) {
                        if (e) {
                          console.log(String(e.stack).red);
                          return message.channel.send({
                            embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("".concat(emoji.msg.ERROR, "  ERROR Writing the File")).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```"))
                          });
                        }

                        return message.channel.send({
                          embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, "  Successfully set the new Status"))
                        });
                      });

                    case 9:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 67:
            if (!timeouterror) {
              _context3.next = 69;
              break;
            }

            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 69:
            _context3.next = 72;
            break;

          case 71:
            return _context3.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 72:
            _context3.next = 78;
            break;

          case 74:
            _context3.prev = 74;
            _context3.t1 = _context3["catch"](3);
            console.log(String(_context3.t1.stack).bgRed);
            return _context3.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context3.t1)).substr(0, 2000), "```"))
            }));

          case 78:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[3, 74], [11, 18]]);
  }
};