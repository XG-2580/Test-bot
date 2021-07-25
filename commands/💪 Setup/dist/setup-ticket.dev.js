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
  name: "setup-ticket",
  category: "💪 Setup",
  aliases: ["setupticket", "ticket-setup", "ticketsetup", "ticketsystem"],
  cooldown: 5,
  usage: "setup-ticket --> Follow Steps",
  description: "Manage 3 different Ticket Systems, Ticket-Roles, messages, create/disable",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, errored, timeouterror, filter, temptype, tempmsg, ticket, rembed;
    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context3.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            errored = false;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context3.next = 9;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage the **first** Ticket System\n\n2\uFE0F\u20E3 **==** Manage the **second** Ticket System\n\n3\uFE0F\u20E3 **==** Manage the **third** Ticket System\n\n4\uFE0F\u20E3 **==** Manage the **fourth** Ticket System\n\n5\uFE0F\u20E3 **==** Manage the **fifth** Ticket System\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 9:
            tempmsg = _context3.sent;
            _context3.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](10);
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 21:
            _context3.next = 23;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "";else if (reaction.emoji.name === "2️⃣") temptype = "2";else if (reaction.emoji.name === "3️⃣") temptype = "3";else if (reaction.emoji.name === "4️⃣") temptype = "4";else if (reaction.emoji.name === "5️⃣") temptype = "5";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 23:
            if (!timeouterror) {
              _context3.next = 25;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 25:
            ticket = client.setups.get(message.guild.id, "ticketsystem".concat(temptype));
            rembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What do u want to do?").setDescription("\n1\uFE0F\u20E3 **==** Create Ticket-System - *Create ONE Ticket System for your Server*\n\n2\uFE0F\u20E3 **==** Edit Messages - *Edit the Message at the ticket open*\n\n3\uFE0F\u20E3 **==** **Add** Ticket-**Role** - *Adds a Role for Ticket Permissions*\n\n4\uFE0F\u20E3 **==** **Remove** Ticket-**Role** - *Removes a Role for Ticket Permissions*\n\n5\uFE0F\u20E3 **==** Define Open Ticket **Category**\n\n6\uFE0F\u20E3 Delete & Reset - *deletes current setup, which allows you to resetup*\n\n").setFooter("Pick the INDEX NUMBER", es.footericon);
            tempmsg.edit({
              embed: rembed
            }).then(function _callee2(msg) {
              var originalauthor;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      msg.react("6️⃣");
                      originalauthor = message.author.id;
                      msg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee(collected) {
                        var emoji, emoji2react, rermbed, cancel, _msg, msg6, channel, parent, rembed, rrembed, rrrembed;

                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.t0 = collected.first().emoji.name;
                                _context.next = _context.t0 === "1️⃣" ? 3 : _context.t0 === "6️⃣" ? 17 : _context.t0 === "2️⃣" ? 22 : _context.t0 === "3️⃣" ? 25 : _context.t0 === "4️⃣" ? 28 : _context.t0 === "5️⃣" ? 31 : 34;
                                break;

                              case 3:
                                rermbed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What's the Emoji, which u want to be reacted at the Ticket?").setDescription("React with the **wished Emoji** to **this** Message");
                                cancel = false;
                                _context.next = 7;
                                return regeneratorRuntime.awrap(message.channel.send(rermbed));

                              case 7:
                                _msg = _context.sent;
                                _context.next = 10;
                                return regeneratorRuntime.awrap(_msg.awaitReactions(function (reaction, user) {
                                  return user.id == originalauthor;
                                }, {
                                  max: 1,
                                  time: 30000
                                }).then(function (collected) {
                                  if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                                    emoji2react = collected.first().emoji.id;
                                    if (collected.first().emoji.animated) emoji = "<" + "a:" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";else emoji = "<" + ":" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                                  } else if (collected.first().emoji.name) {
                                    emoji = collected.first().emoji.name;
                                    emoji2react = collected.first().emoji.name;
                                  } else {
                                    message.channel.send('Operation canceled. and finished!');
                                    cancel = true;
                                  }
                                })["catch"](function () {
                                  if (!cancel) {
                                    message.reply('No reaction after 30 seconds, operation canceled');
                                    return;
                                  }
                                }));

                              case 10:
                                if (!cancel) {
                                  _context.next = 12;
                                  break;
                                }

                                return _context.abrupt("return");

                              case 12:
                                msg6 = new MessageEmbed().setTitle("**Hey ".concat(message.author.username, "!**")).setDescription("Please input the message of the ticket setup (React with ".concat(emoji, " to open a ticket | is always provided)")).setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
                                _context.next = 15;
                                return regeneratorRuntime.awrap(_msg.channel.send({
                                  embed: msg6
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id == originalauthor;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    ticketmsg = collected.first().content;
                                    message.guild.channels.create("Support - Tickets", {
                                      type: 'category',
                                      permissionOverwrites: [{
                                        id: message.guild.id,
                                        allow: ['READ_MESSAGE_HISTORY'],
                                        deny: ['SEND_MESSAGES']
                                      }]
                                    }).then(function (channel) {
                                      //PARENT ID IN DB
                                      client.setups.set(message.guild.id, channel.id, "ticketsystem".concat(temptype, ".parentid")); //PARENT ID IN DB

                                      var lol = message.guild.channels.create("Create a ticket", {
                                        type: 'text',
                                        topic: "React with ".concat(emoji, " to open a Ticket"),
                                        parent: channel.id,
                                        permissionOverwrites: [{
                                          id: message.guild.id,
                                          allow: ['READ_MESSAGE_HISTORY'],
                                          deny: ['SEND_MESSAGES']
                                        }]
                                      }).then(function (channel) {
                                        //channel id in db
                                        client.setups.set(message.guild.id, channel.id, "ticketsystem".concat(temptype, ".channelid")); //channel id in db

                                        channel.send(new MessageEmbed().setTitle("**Create a Ticket**").setDescription("".concat(ticketmsg, "\n\nReact with ").concat(emoji, " to open a ticket")).setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)).then(function (msg) {
                                          //message id in db
                                          client.setups.set(message.guild.id, msg.id, "ticketsystem".concat(temptype, ".messageid"));
                                          client.setups.set(message.guild.id, true, "ticketsystem".concat(temptype, ".enabled"));
                                          msg.react(emoji2react);
                                          var themebd = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Your Ticket Setup is created, you can edit everything by running `".concat(prefix, "setup` again")).setDescription("<#".concat(channel.id, ">")).setFooter(es.footertext, es.footericon);
                                          message.reply(themebd);
                                        });
                                      });
                                    });
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                }));

                              case 15:
                                tempmsg = _context.sent;
                                return _context.abrupt("break", 36);

                              case 17:
                                try {
                                  channel = message.guild.channels.cache.get(ticket.channelid);
                                  channel["delete"]();
                                } catch (_unused) {}

                                try {
                                  parent = message.guild.channels.cache.get(ticket.parentid);
                                  parent["delete"]();
                                } catch (_unused2) {}

                                message.reply("Successfully resetted the current Ticket Setup!");
                                client.setups.set(message.guild.id, {
                                  enabled: true,
                                  guildid: message.guild.id,
                                  messageid: "",
                                  channelid: "",
                                  parentid: "",
                                  message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
                                  adminroles: []
                                }, "ticketsystem".concat(temptype));
                                return _context.abrupt("break", 36);

                              case 22:
                                rembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Enter the message now!").setDescription("{user} == the user who opens the ticket");
                                tempmsg.edit({
                                  embed: rembed
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    message.reply("Successfully changed the Message");
                                    client.setups.set(message.guild.id, collected.first().content, "ticketsystem".concat(temptype, ".message"));
                                    console.log(client.setups.get(message.guild.id, "ticketsystem".concat(temptype)));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context.abrupt("break", 36);

                              case 25:
                                rrembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("Pick the INDEX NUMBER", es.footericon).setTitle("Ping a Role now!").setDescription("Just Ping the Role");
                                tempmsg.edit({
                                  embed: rrembed
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.filter(function (role) {
                                      return role.guild.id == message.guild.id;
                                    }).first();
                                    if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role");
                                    message.reply("Successfully **added**: `" + role.name + "` to the Admin-Roles");
                                    client.setups.push(message.guild.id, role.id, "ticketsystem".concat(temptype, ".adminroles"));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context.abrupt("break", 36);

                              case 28:
                                rrrembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("Pick the INDEX NUMBER", es.footericon).setTitle("Ping a Role now!").setDescription("Just Ping the Role");
                                tempmsg.edit({
                                  embed: rrrembed
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.filter(function (role) {
                                      return role.guild.id == message.guild.id;
                                    }).first();
                                    if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role");

                                    try {
                                      client.setups.remove(message.guild.id, role.id, "ticketsystem".concat(temptype, ".adminroles"));
                                      message.reply("Successfully **removed**: `" + role.name + "` from the Admin-Roles");
                                    } catch (_unused3) {
                                      message.reply("ERROR -> Resetted all Admin roles");
                                      client.setups.set(message.guild.id, [], "ticketsystem".concat(temptype, ".adminroles"));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context.abrupt("break", 36);

                              case 31:
                                rembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Enter the open Ticket Category now!").setDescription("Just send the CATEGORY ID IN HERE, this is an example: `833614604604276736`");
                                tempmsg.edit({
                                  embed: rembed
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().content.length == 18) {
                                      try {
                                        var cat = message.guild.channels.cache.get(collected.first().content);
                                        message.reply("Successfully changed the Category");
                                        client.setups.set(message.guild.id, cat.id, "ticketsystem".concat(temptype, ".parentid"));
                                      } catch (_unused4) {
                                        message.reply("INVALID ID");
                                      }
                                    } else {
                                      message.reply("INVALID ID");
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context.abrupt("break", 36);

                              case 34:
                                message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0, 1999));
                                return _context.abrupt("break", 36);

                              case 36:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        errored === true;
                      });

                      if (!errored) {
                        _context2.next = 5;
                        break;
                      }

                      return _context2.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                        return msg["delete"]({
                          timeout: 7500
                        });
                      }));

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            _context3.next = 34;
            break;

          case 30:
            _context3.prev = 30;
            _context3.t1 = _context3["catch"](1);
            console.log(String(_context3.t1.stack).bgRed);
            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context3.t1)).substr(0, 2000), "```"))));

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 30], [10, 18]]);
  }
};