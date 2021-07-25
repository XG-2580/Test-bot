"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    Collection = _require.Collection,
    MessageAttachment = _require.MessageAttachment;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var moment = require("moment");

var officegen = require('officegen');

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    delay = _require2.delay,
    create_transcript = _require2.create_transcript,
    GetUser = _require2.GetUser,
    GetRole = _require2.GetRole;

module.exports = {
  name: "ticket",
  category: "🚫 Administration",
  aliases: ["close"],
  cooldown: 2,
  usage: "ticket",
  description: "Manages the Ticket, closes, deletes, createlog, etc. etc.",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdroles2, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, ticket, cmdrole, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _r, originalowner, timeouterror, filter, temptype, tempmsg, data, tmmpmsg, docx, messageCollection, channelMessages, tomanymsgs, messagelimit, lastMessageId, msgs, out, buffer, attachment, sendembed, user, channel;

    return regeneratorRuntime.async(function run$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context13.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.ticket");
            cmdroles2 = client.settings.get(message.guild.id, "cmdadminroles.close");
            _context13.prev = 5;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context13.prev = 9;

            for (_iterator = cmdroles2[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;
              cmdrole.push(r);
            }

            _context13.next = 17;
            break;

          case 13:
            _context13.prev = 13;
            _context13.t0 = _context13["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context13.t0;

          case 17:
            _context13.prev = 17;
            _context13.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context13.prev = 20;

            if (!_didIteratorError) {
              _context13.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context13.finish(20);

          case 24:
            return _context13.finish(17);

          case 25:
            _context13.next = 29;
            break;

          case 27:
            _context13.prev = 27;
            _context13.t1 = _context13["catch"](5);

          case 29:
            ticket = client.setups.get(message.guild.id, "ticketsystem");

            if (ticket.enabled) {
              _context13.next = 32;
              break;
            }

            return _context13.abrupt("return", message.reply("Ticketsystem is not setup yet!"));

          case 32:
            if (!(!client.setups.get("TICKETS", "tickets").includes(message.channel.id) && !client.setups.get("TICKETS", "tickets2").includes(message.channel.id) && !client.setups.get("TICKETS", "tickets3").includes(message.channel.id) && !client.setups.get("TICKETS", "tickets4").includes(message.channel.id) && !client.setups.get("TICKETS", "tickets5").includes(message.channel.id))) {
              _context13.next = 34;
              break;
            }

            return _context13.abrupt("return", message.reply("This Channel is not a Ticket!"));

          case 34:
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context13.next = 55;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context13.prev = 39;

            for (_iterator2 = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _r = _step2.value;

              if (message.guild.roles.cache.get(_r)) {
                cmdrole.push(" | <@&".concat(_r, ">"));
              } else if (message.guild.members.cache.get(_r)) {
                cmdrole.push(" | <@".concat(_r, ">"));
              } else {
                console.log("F");
                console.log(_r);

                try {
                  client.settings.remove(message.guild.id, _r, "cmdadminroles.ticket");
                } catch (_unused2) {}

                try {
                  client.settings.remove(message.guild.id, _r, "cmdadminroles.close");
                } catch (_unused3) {}
              }
            }

            _context13.next = 47;
            break;

          case 43:
            _context13.prev = 43;
            _context13.t2 = _context13["catch"](39);
            _didIteratorError2 = true;
            _iteratorError2 = _context13.t2;

          case 47:
            _context13.prev = 47;
            _context13.prev = 48;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 50:
            _context13.prev = 50;

            if (!_didIteratorError2) {
              _context13.next = 53;
              break;
            }

            throw _iteratorError2;

          case 53:
            return _context13.finish(50);

          case 54:
            return _context13.finish(47);

          case 55:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(function (r) {
              return ticket.adminroles.includes(r.id);
            }))) {
              _context13.next = 57;
              break;
            }

            return _context13.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to close a Ticket").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin` You can also add Ticket only Roles with `").concat(prefix, "setup-ticket`")))));

          case 57:
            originalowner = message.author;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context13.next = 63;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\uD83D\uDD12 **== Close** the Ticket\n\n            \u26D4 **== Archive** the Ticket\n            \n            \uD83D\uDDD1 **== Delete** the Ticket\n            \n            \uD83D\uDCD1 **== Create a Log** of the Ticket\n            \n            \uD83D\uDC64 **==** Manage **User** Access (Add/Remove)\n\n            \uD83D\uDCCC **==** Manage **Role** Access (Add/Remove)\n            \n            \n            \n            *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 63:
            tempmsg = _context13.sent;
            _context13.prev = 64;
            tempmsg.react("🔒");
            tempmsg.react("⛔");
            tempmsg.react("🗑");
            tempmsg.react("📑");
            tempmsg.react("👤");
            tempmsg.react("📌");
            _context13.next = 76;
            break;

          case 73:
            _context13.prev = 73;
            _context13.t3 = _context13["catch"](64);
            return _context13.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context13.t3)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 76:
            _context13.next = 78;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "ticket");
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "🔒") temptype = "close";else if (reaction.emoji.name === "⛔") temptype = "archive";else if (reaction.emoji.name === "🗑") temptype = "delete";else if (reaction.emoji.name === "📑") temptype = "log";else if (reaction.emoji.name === "👤") temptype = "user";else if (reaction.emoji.name === "📌") temptype = "role";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 78:
            if (!timeouterror) {
              _context13.next = 80;
              break;
            }

            return _context13.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 80:
            if (!(temptype == "close")) {
              _context13.next = 84;
              break;
            }

            message.reply(new Discord.MessageEmbed().setTitle("Verify the step!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("React with the right Emoji (\u2705) to close the ticket!".substr(0, 2000)).setFooter(es.footertext, es.footericon)).then(function _callee2(msg) {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      msg.react("✅")["catch"](function (e) {
                        return console.log(e);
                      });
                      msg.awaitReactions(function (reaction, user) {
                        return user.id === originalowner.id;
                      }, {
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                      }).then(function _callee(collected) {
                        var data, channel;
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!(collected.first().emoji.name == "✅")) {
                                  _context.next = 21;
                                  break;
                                }

                                data = client.setups.get(message.channel.id, "ticketdata");

                                if (data.type == "ticket-setup-1") {
                                  client.setups.remove("TICKETS", data.user, "tickets");
                                } else if (data.type == "ticket-setup-2") {
                                  client.setups.remove("TICKETS", data.user, "tickets2");
                                } else if (data.type == "ticket-setup-3") {
                                  client.setups.remove("TICKETS", data.user, "tickets3");
                                } else if (data.type == "ticket-setup-4") {
                                  client.setups.remove("TICKETS", data.user, "tickets4");
                                } else {
                                  client.setups.remove("TICKETS", data.user, "tickets5");
                                }

                                client.setups.set(message.channel.id, "closed", "ticketdata.state");
                                data = client.setups.get(message.channel.id, "ticketdata");
                                _context.next = 7;
                                return regeneratorRuntime.awrap(message.channel.updateOverwrite(data.user, {
                                  SEND_MESSAGES: false,
                                  VIEW_CHANNEL: false
                                }));

                              case 7:
                                message.reply(new Discord.MessageEmbed().setTitle("✅ Success!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Closed the Ticket of <@".concat(data.user, "> and removed him from the Channel!").substr(0, 2000)).addField("User: ", "<@".concat(data.user, ">")).addField("Created at: ", "".concat(moment(data.date).format("DD/MM/YYYY | hh:mm:ss"))).addField("State: ", "".concat(data.state)).setFooter(es.footertext, es.footericon));

                                if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
                                  _context.next = 19;
                                  break;
                                }

                                _context.prev = 9;
                                channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

                                if (channel) {
                                  _context.next = 13;
                                  break;
                                }

                                return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

                              case 13:
                                channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> CLOSED | ".concat(message.author.tag), message.author.displayAvatarURL({
                                  dynamic: true
                                })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                _context.next = 19;
                                break;

                              case 16:
                                _context.prev = 16;
                                _context.t0 = _context["catch"](9);
                                console.log(_context.t0);

                              case 19:
                                _context.next = 22;
                                break;

                              case 21:
                                return _context.abrupt("return", message.reply("You've reacted with the wrong emoji"));

                              case 22:
                                if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
                                  _context.next = 33;
                                  break;
                                }

                                _context.prev = 23;
                                channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

                                if (channel) {
                                  _context.next = 27;
                                  break;
                                }

                                return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

                              case 27:
                                channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> CLOSE | ".concat(message.author.tag), message.author.displayAvatarURL({
                                  dynamic: true
                                })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                _context.next = 33;
                                break;

                              case 30:
                                _context.prev = 30;
                                _context.t1 = _context["catch"](23);
                                console.log(_context.t1);

                              case 33:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, null, null, [[9, 16], [23, 30]]);
                      })["catch"](function (e) {
                        console.log(e);
                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("\"Cancelled\"".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                      });

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            _context13.next = 186;
            break;

          case 84:
            if (!(temptype == "archive")) {
              _context13.next = 88;
              break;
            }

            message.reply(new Discord.MessageEmbed().setTitle("Verify the step!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("React with the right Emoji (\u2705) to archive the ticket!".substr(0, 2000)).setFooter(es.footertext, es.footericon)).then(function _callee4(msg) {
              return regeneratorRuntime.async(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      msg.react("✅")["catch"](function (e) {
                        return console.log(e);
                      });
                      msg.awaitReactions(function (reaction, user) {
                        return user.id === originalowner.id;
                      }, {
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                      }).then(function _callee3(collected) {
                        var data, channel;
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                if (!(collected.first().emoji.name == "✅")) {
                                  _context3.next = 18;
                                  break;
                                }

                                data = client.setups.get(message.channel.id, "ticketdata");
                                client.setups.set(message.channel.id, "archived", "ticketdata.state");
                                data = client.setups.get(message.channel.id, "ticketdata");
                                message.reply(new Discord.MessageEmbed().setTitle("✅ Success!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Archived the Ticket of <@".concat(data.user, "> and didn't remove him from the Channel!").substr(0, 2000)).addField("User: ", "<@".concat(data.user, ">")).addField("Created at: ", "".concat(moment(data.date).format("DD/MM/YYYY | hh:mm:ss"))).addField("State: ", "".concat(data.state)).setFooter(es.footertext, es.footericon));

                                if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
                                  _context3.next = 16;
                                  break;
                                }

                                _context3.prev = 6;
                                channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

                                if (channel) {
                                  _context3.next = 10;
                                  break;
                                }

                                return _context3.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

                              case 10:
                                channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> ARCHIVE | ".concat(message.author.tag), message.author.displayAvatarURL({
                                  dynamic: true
                                })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                _context3.next = 16;
                                break;

                              case 13:
                                _context3.prev = 13;
                                _context3.t0 = _context3["catch"](6);
                                console.log(_context3.t0);

                              case 16:
                                _context3.next = 19;
                                break;

                              case 18:
                                return _context3.abrupt("return", message.reply("You've reacted with the wrong emoji"));

                              case 19:
                                if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
                                  _context3.next = 30;
                                  break;
                                }

                                _context3.prev = 20;
                                channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

                                if (channel) {
                                  _context3.next = 24;
                                  break;
                                }

                                return _context3.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

                              case 24:
                                channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> ARCHIVE | ".concat(message.author.tag), message.author.displayAvatarURL({
                                  dynamic: true
                                })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                _context3.next = 30;
                                break;

                              case 27:
                                _context3.prev = 27;
                                _context3.t1 = _context3["catch"](20);
                                console.log(_context3.t1);

                              case 30:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, null, null, [[6, 13], [20, 27]]);
                      })["catch"](function (e) {
                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("\"Cancelled\"".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                      });

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            });
            _context13.next = 186;
            break;

          case 88:
            if (!(temptype == "delete")) {
              _context13.next = 92;
              break;
            }

            message.reply(new Discord.MessageEmbed().setTitle("Verify the step!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("React with the right Emoji (\u2705) to delete the ticket!".substr(0, 2000)).setFooter(es.footertext, es.footericon)).then(function _callee6(msg) {
              return regeneratorRuntime.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      msg.react("✅")["catch"](function (e) {
                        return console.log(e);
                      });
                      msg.awaitReactions(function (reaction, user) {
                        return user.id === originalowner.id;
                      }, {
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                      }).then(function _callee5(collected) {
                        var data, channel;
                        return regeneratorRuntime.async(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                if (!(collected.first().emoji.name == "✅")) {
                                  _context5.next = 8;
                                  break;
                                }

                                data = client.setups.get(message.channel.id, "ticketdata");

                                if (data.type == "ticket-setup-1") {
                                  client.setups.remove("TICKETS", data.user, "tickets");
                                  client.setups.remove("TICKETS", data.channel, "tickets");
                                } else if (data.type == "ticket-setup-2") {
                                  client.setups.remove("TICKETS", data.user, "tickets2");
                                  client.setups.remove("TICKETS", data.channel, "tickets2");
                                } else if (data.type == "ticket-setup-3") {
                                  client.setups.remove("TICKETS", data.user, "tickets3");
                                  client.setups.remove("TICKETS", data.channel, "tickets3");
                                } else if (data.type == "ticket-setup-4") {
                                  client.setups.remove("TICKETS", data.user, "tickets4");
                                  client.setups.remove("TICKETS", data.channel, "tickets4");
                                } else {
                                  client.setups.remove("TICKETS", data.user, "tickets5");
                                  client.setups.remove("TICKETS", data.channel, "tickets5");
                                }

                                try {
                                  client.setups["delete"](message.channel.id);
                                } catch (_unused4) {}

                                message.channel["delete"]({
                                  timeout: 2500
                                })["catch"](function (e) {
                                  console.log(e);
                                });
                                message.reply(new Discord.MessageEmbed().setTitle("✅ Success!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Deleting Ticket in less then **`3 Seconds`** ....\n\n*If not you can do it manually*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                _context5.next = 9;
                                break;

                              case 8:
                                return _context5.abrupt("return", message.reply("You've reacted with the wrong emoji"));

                              case 9:
                                if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
                                  _context5.next = 20;
                                  break;
                                }

                                _context5.prev = 10;
                                channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

                                if (channel) {
                                  _context5.next = 14;
                                  break;
                                }

                                return _context5.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

                              case 14:
                                channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> DELETE | ".concat(message.author.tag), message.author.displayAvatarURL({
                                  dynamic: true
                                })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                _context5.next = 20;
                                break;

                              case 17:
                                _context5.prev = 17;
                                _context5.t0 = _context5["catch"](10);
                                console.log(_context5.t0);

                              case 20:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, null, null, [[10, 17]]);
                      })["catch"](function (e) {
                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("\"Cancelled\"".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                      });

                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            });
            _context13.next = 186;
            break;

          case 92:
            if (!(temptype == "log")) {
              _context13.next = 177;
              break;
            }

            msglimit = 1000;
            data = client.setups.get(message.channel.id, "ticketdata"); //do transcripting - making a docx file with design. Here the Docs: https://github.com/Ziv-Barber/officegen/blob/4bfff80e0915f884199495c0ea64e5a0f0549cfe/manual/docx/README.md#prgapi

            _context13.next = 97;
            return regeneratorRuntime.awrap(message.reply(new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1")));

          case 97:
            tmmpmsg = _context13.sent;
            docx = officegen({
              type: 'docx',
              author: client.user.username,
              creator: client.user.username,
              description: "Transcript for the Channel #".concat(message.channel.name, " with the ID: ").concat(message.channel.id),
              pageMargins: {
                top: 1000,
                right: 1000,
                bottom: 1000,
                left: 1000
              },
              title: "Transcript!"
            }); //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!

            docx.on('finalize', function (written) {}); //if an error occurs then stop

            docx.on('error', function (err) {
              console.log(err);
              return message.reply(err.substr(0, 2000), {
                code: "js"
              });
            }); //The "TITLE" 

            pObj = docx.createP(); //Make a new paragraph

            pObj.options.align = 'left'; //align it to the left page

            pObj.options.indentLeft = -350; //overdrive it 350px to the left

            pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive

            pObj.addText('Transcript for:    #' + message.channel.name, {
              font_face: 'Arial',
              color: '3c5c63',
              bold: true,
              font_size: 22
            }); //add the TEXT CHANNEL NAME

            pObj.addLineBreak(); //make a new LINE

            pObj.addText("Channelid: " + message.channel.id, {
              font_face: 'Arial',
              color: '000000',
              bold: false,
              font_size: 10
            }); //Channel id

            pObj.addLineBreak(); //Make a new LINE

            pObj.addText("Oldest message at the BOTTOM ", {
              hyperlink: 'myBookmark',
              font_face: 'Arial',
              color: '5dbcd2',
              italic: true,
              font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)

            pObj.addText("  [CLICK HERE TO JUMP]", {
              hyperlink: 'myBookmark',
              font_face: 'Arial',
              color: '1979a9',
              italic: false,
              bold: true,
              font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)

            pObj.addLineBreak(); //Make a new Line
            //The text content collection

            messageCollection = new Collection(); //make a new collection

            _context13.next = 115;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              //fetch the last 100 messages
              limit: 100
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 115:
            channelMessages = _context13.sent;
            //catch any error
            messageCollection = messageCollection.concat(channelMessages); //add them to the Collection

            tomanymsgs = 1; //some calculation for the messagelimit

            if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100

            messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter

            if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1

          case 121:
            if (!(channelMessages.size === 100)) {
              _context13.next = 132;
              break;
            }

            if (!(tomanymsgs === messagelimit)) {
              _context13.next = 124;
              break;
            }

            return _context13.abrupt("break", 132);

          case 124:
            //if the counter equals to the limit stop the loop
            tomanymsgs += 1; //add 1 to the counter

            lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above

            _context13.next = 128;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              limit: 100,
              before: lastMessageId
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 128:
            channelMessages = _context13.sent;
            //Fetch again, 100 messages above the already fetched messages
            if (channelMessages) //if its true
              messageCollection = messageCollection.concat(channelMessages); //add them to the collection

            _context13.next = 121;
            break;

          case 132:
            msgs = messageCollection.array().reverse(); //reverse the array to have it listed like the discord chat
            //now for every message in the array make a new paragraph!

            _context13.next = 135;
            return regeneratorRuntime.awrap(msgs.forEach(function _callee7(msg) {
              var umsg;
              return regeneratorRuntime.async(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      // Create a new paragraph:
                      pObj = docx.createP();
                      pObj.options.align = 'left'; //Also 'right' or 'justify'.
                      //Username and Date

                      pObj.addText("".concat(msg.author.tag), {
                        font_face: 'Arial',
                        color: '3c5c63',
                        bold: true,
                        font_size: 14
                      });
                      pObj.addText("  |  ".concat(msg.createdAt.toDateString(), "  |  ").concat(msg.createdAt.toLocaleTimeString()), {
                        font_face: 'Arial',
                        color: '3c5c63',
                        bold: true,
                        font_size: 14
                      }); //
                      //LINEBREAK

                      pObj.addLineBreak(); //message of user     

                      if (msg.content.startsWith("```")) {
                        umsg = msg.content.replace(/```/g, "");
                      } else if (msg.attachments.size > 0) {
                        umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
                      } else {
                        umsg = msg.content;
                      }

                      pObj.addText(umsg, {
                        font_face: 'Arial',
                        color: '000000',
                        bold: false,
                        font_size: 10
                      }); //LINEBREAK

                      pObj.addLineBreak();
                      pObj.addText("______________________________________________________________________________________________________________________________________________________________________________________________________________", {
                        color: 'a6a6a6',
                        font_size: 4
                      });

                    case 9:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            }));

          case 135:
            // Start somewhere a bookmark:
            pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 

            pObj.endBookmark();
            out = fs.createWriteStream("".concat(message.channel.name, ".docx")); //write everything in the docx file
            //if a error happens tells it

            out.on('error', function (err) {
              console.log(err);
            }); //wenn the writing is finished

            out.on("finish", function _callee8(err, result) {
              return regeneratorRuntime.async(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return regeneratorRuntime.awrap(delay(3000));

                    case 2:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            }); // Async call to generate the output file:

            _context13.next = 142;
            return regeneratorRuntime.awrap(docx.generate(out));

          case 142:
            _context13.next = 144;
            return regeneratorRuntime.awrap(delay(2000));

          case 144:
            _context13.prev = 144;
            // try to send the file
            buffer = fs.readFileSync("./".concat(message.channel.name, ".docx")); //get a buffer file

            attachment = new MessageAttachment(buffer, "./".concat(message.channel.name, ".docx")); //send it as an attachment
            //send the Transcript Into the Channel and then Deleting it again from the FOLDER

            sendembed = new MessageEmbed().setTitle("Log for Ticket-Channel: `#".concat(message.channel.name, "`")).setColor(ee.color).setFooter(ee.footertext, ee.footericon);

            try {
              user = message.guild.members.cache.get(data.user);
              sendembed.setDescription("".concat(user.user, "\n**`").concat(user.user.username, "#").concat(user.user.discriminator, "`**\n**`(").concat(user.user.id, ")`**"));
              sendembed.setThumbnail(user.user.displayAvatarURL({
                dynamic: true
              }));
            } catch (_unused5) {
              sendembed.setDescription(message.channel.topic);
            }

            _context13.next = 151;
            return regeneratorRuntime.awrap(message.channel.send(sendembed));

          case 151:
            _context13.next = 153;
            return regeneratorRuntime.awrap(message.channel.send(attachment));

          case 153:
            _context13.next = 155;
            return regeneratorRuntime.awrap(tmmpmsg["delete"]()["catch"](function (e) {
              return console.log(e);
            }));

          case 155:
            _context13.next = 157;
            return regeneratorRuntime.awrap(fs.unlinkSync("./".concat(message.channel.name, ".docx")));

          case 157:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context13.next = 168;
              break;
            }

            _context13.prev = 158;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context13.next = 162;
              break;
            }

            return _context13.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 162:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> LOG | ".concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context13.next = 168;
            break;

          case 165:
            _context13.prev = 165;
            _context13.t4 = _context13["catch"](158);
            console.log(_context13.t4);

          case 168:
            _context13.next = 175;
            break;

          case 170:
            _context13.prev = 170;
            _context13.t5 = _context13["catch"](144);
            //if the file is to big to be sent, then catch it!
            console.log(_context13.t5);
            message.reply(new MessageEmbed().setAuthor("ERROR! Transcript is to big, to be sent into the Channel!", message.member.user.displayAvatarURL({
              dynamic: true
            })).setFooter("Smaller the maximum amount of Messages!"));
            fs.unlinkSync("./".concat(message.channel.name, ".docx")); //delete the docx

          case 175:
            _context13.next = 186;
            break;

          case 177:
            if (!(temptype == "user")) {
              _context13.next = 181;
              break;
            }

            message.reply(new Discord.MessageEmbed().setTitle("Please ping the User you want to add/remove").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Either with <@USERID> or with the USERNAME, or with the USERID".substr(0, 2000)).setFooter(es.footertext, es.footericon)).then(function _callee10(msg) {
              return regeneratorRuntime.async(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      msg.channel.awaitMessages(function (m) {
                        return m.author.id === originalowner.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee9(collected) {
                        var message, args, user, mapped, oldmapped, undermapped;
                        return regeneratorRuntime.async(function _callee9$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                message = collected.first();
                                args = message.content.split(" ");
                                _context9.prev = 2;
                                _context9.next = 5;
                                return regeneratorRuntime.awrap(GetUser(message, args));

                              case 5:
                                user = _context9.sent;
                                _context9.next = 13;
                                break;

                              case 8:
                                _context9.prev = 8;
                                _context9.t0 = _context9["catch"](2);

                                if (_context9.t0) {
                                  _context9.next = 12;
                                  break;
                                }

                                return _context9.abrupt("return", message.reply("UNABLE TO FIND THE USER"));

                              case 12:
                                return _context9.abrupt("return", message.reply(_context9.t0));

                              case 13:
                                if (!user || user == null || user.id == null || !user.id) message.reply("Could not find the USER");
                                mapped = msg.channel.permissionOverwrites.map(function (p) {
                                  if (p.type == "member") {
                                    var obj = {
                                      id: "",
                                      allow: []
                                    };
                                    obj.id = p.id;
                                    obj.allow = p.allow ? p.allow.toArray() : [];
                                    return obj;
                                  } else {
                                    return {
                                      id: "",
                                      allow: []
                                    };
                                  }
                                });
                                oldmapped = mapped;
                                undermapped = mapped.map(function (p) {
                                  return p.id;
                                });

                                if (undermapped.includes(user.id)) {
                                  oldmapped.forEach(function (element) {
                                    if (element.id == user.id) {
                                      console.log(element);

                                      if (!element.allow.includes("VIEW_CHANNEL")) {
                                        message.channel.updateOverwrite(user.id, {
                                          SEND_MESSAGES: true,
                                          VIEW_CHANNEL: true
                                        }).then(function (channel) {
                                          message.channel.send({
                                            content: "<@".concat(user.id, ">"),
                                            embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | Added `".concat(user.tag, "` to the TICKET"))
                                          });

                                          if (client.settings.get(message.guild.id, "adminlog") != "no") {
                                            try {
                                              var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));
                                              if (!channel) return client.settings.set(message.guild.id, "no", "adminlog");
                                              channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> USER | ".concat(message.author.tag), message.author.displayAvatarURL({
                                                dynamic: true
                                              })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          }
                                        })["catch"](function (e) {
                                          return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                        });
                                      } else {
                                        message.channel.updateOverwrite(user.id, {
                                          SEND_MESSAGES: false,
                                          VIEW_CHANNEL: false
                                        }).then(function (channel) {
                                          return message.channel.send({
                                            content: "<@".concat(user.id, ">"),
                                            embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | REMOVED `".concat(user.tag, "` from the TICKET"))
                                          });
                                        })["catch"](function (e) {
                                          return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                        });
                                      }
                                    }
                                  });
                                } else {
                                  message.channel.updateOverwrite(user.id, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true
                                  }).then(function (channel) {
                                    message.channel.send({
                                      content: "<@".concat(user.id, ">"),
                                      embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | Added `".concat(user.tag, "` to the TICKET"))
                                    });

                                    if (client.settings.get(message.guild.id, "adminlog") != "no") {
                                      try {
                                        var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));
                                        if (!channel) return client.settings.set(message.guild.id, "no", "adminlog");
                                        channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> USER | ".concat(message.author.tag), message.author.displayAvatarURL({
                                          dynamic: true
                                        })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                      } catch (e) {
                                        console.log(e);
                                      }
                                    }
                                  })["catch"](function (e) {
                                    return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                  });
                                }

                              case 18:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        }, null, null, [[2, 8]]);
                      })["catch"](function (e) {
                        console.log(e);
                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("\"Cancelled\"".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                      });

                    case 1:
                    case "end":
                      return _context10.stop();
                  }
                }
              });
            });
            _context13.next = 186;
            break;

          case 181:
            if (!(temptype == "role")) {
              _context13.next = 185;
              break;
            }

            message.reply(new Discord.MessageEmbed().setTitle("Please ping the ROLE you want to add/remove").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Either with <@&ROLEID> or with the ROLEID or with the ROLENAME".substr(0, 2000)).setFooter(es.footertext, es.footericon)).then(function _callee12(msg) {
              return regeneratorRuntime.async(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      msg.channel.awaitMessages(function (m) {
                        return m.author.id === originalowner.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee11(collected) {
                        var message, args, user, mapped, oldmapped, undermapped;
                        return regeneratorRuntime.async(function _callee11$(_context11) {
                          while (1) {
                            switch (_context11.prev = _context11.next) {
                              case 0:
                                message = collected.first();
                                args = message.content.split(" ");
                                _context11.prev = 2;
                                _context11.next = 5;
                                return regeneratorRuntime.awrap(GetRole(message, args));

                              case 5:
                                user = _context11.sent;
                                _context11.next = 13;
                                break;

                              case 8:
                                _context11.prev = 8;
                                _context11.t0 = _context11["catch"](2);

                                if (_context11.t0) {
                                  _context11.next = 12;
                                  break;
                                }

                                return _context11.abrupt("return", message.reply("UNABLE TO FIND THE ROLE"));

                              case 12:
                                return _context11.abrupt("return", message.reply("ERROR" + _context11.t0));

                              case 13:
                                if (!user || user == null || user.id == null || !user.id) message.reply("Could not find the ROLE");
                                mapped = msg.channel.permissionOverwrites.map(function (p) {
                                  if (p.type == "role") {
                                    var obj = {
                                      id: "",
                                      allow: []
                                    };
                                    obj.id = p.id;
                                    obj.allow = p.allow ? p.allow.toArray() : [];
                                    return obj;
                                  } else {
                                    return {
                                      id: "",
                                      allow: []
                                    };
                                  }
                                });
                                oldmapped = mapped;
                                undermapped = mapped.map(function (p) {
                                  return p.id;
                                });

                                if (undermapped.includes(user.id)) {
                                  oldmapped.forEach(function (element) {
                                    if (element.id == user.id) {
                                      console.log(element);

                                      if (!element.allow.includes("VIEW_CHANNEL")) {
                                        message.channel.updateOverwrite(user.id, {
                                          SEND_MESSAGES: true,
                                          VIEW_CHANNEL: true
                                        }).then(function (channel) {
                                          message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | Added `@".concat(user.name, "` to the TICKET")));

                                          if (client.settings.get(message.guild.id, "adminlog") != "no") {
                                            try {
                                              var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));
                                              if (!channel) return client.settings.set(message.guild.id, "no", "adminlog");
                                              channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> ROLE | ".concat(message.author.tag), message.author.displayAvatarURL({
                                                dynamic: true
                                              })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                            } catch (e) {
                                              console.log(e);
                                            }
                                          }
                                        })["catch"](function (e) {
                                          return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                        });
                                      } else {
                                        message.channel.updateOverwrite(user.id, {
                                          SEND_MESSAGES: false,
                                          VIEW_CHANNEL: false
                                        }).then(function (channel) {
                                          return message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | REMOVED `@".concat(user.name, "` from the TICKET")));
                                        })["catch"](function (e) {
                                          return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                        });
                                      }
                                    }
                                  });
                                } else {
                                  message.channel.updateOverwrite(user.id, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true
                                  }).then(function (channel) {
                                    message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS | Added `@".concat(user.name, "` to the TICKET")));

                                    if (client.settings.get(message.guild.id, "adminlog") != "no") {
                                      try {
                                        var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));
                                        if (!channel) return client.settings.set(message.guild.id, "no", "adminlog");
                                        channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("ticket --> USER | ".concat(message.author.tag), message.author.displayAvatarURL({
                                          dynamic: true
                                        })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                                      } catch (e) {
                                        console.log(e);
                                      }
                                    }
                                  })["catch"](function (e) {
                                    return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(e.stack, "```")));
                                  });
                                }

                              case 18:
                              case "end":
                                return _context11.stop();
                            }
                          }
                        }, null, null, [[2, 8]]);
                      })["catch"](function (e) {
                        console.log(e);
                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("\"Cancelled\"".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                      });

                    case 1:
                    case "end":
                      return _context12.stop();
                  }
                }
              });
            });
            _context13.next = 186;
            break;

          case 185:
            return _context13.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 186:
            _context13.next = 192;
            break;

          case 188:
            _context13.prev = 188;
            _context13.t6 = _context13["catch"](1);
            console.log(String(_context13.t6.stack).bgRed);
            return _context13.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context13.t6.stack, "```"))));

          case 192:
          case "end":
            return _context13.stop();
        }
      }
    }, null, null, [[1, 188], [5, 27], [9, 13, 17, 25], [18,, 20, 24], [39, 43, 47, 55], [48,, 50, 54], [64, 73], [144, 170], [158, 165]]);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */