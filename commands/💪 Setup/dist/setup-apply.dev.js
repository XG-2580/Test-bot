"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emojis = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup-apply",
  category: "💪 Setup",
  aliases: ["setupapply", "apply-setup", "applysetup", "setup-application", "setupapplication"],
  cooldown: 5,
  usage: "setup-apply --> follow Steps",
  description: "Manage 5 different Application Systems",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, guildid, adminroles, errored, timeouterror, filter, temptype, tempmsg, apply_for_here;
    return regeneratorRuntime.async(function run$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            try {
              guildid = message.guild.id;
              client.apply.ensure(guildid, {
                "channel_id": "",
                "message_id": "",
                "f_channel_id": "",
                //changequestions --> which one (lists everyone with index) --> 4. --> Question
                "QUESTIONS": [{
                  "1": "DEFAULT"
                }],
                "TEMP_ROLE": "0",
                "accept": "You've got accepted!",
                "accept_role": "0",
                "deny": "You've got denied!",
                "ticket": "Hey {user}! We have some Questions!",
                "one": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 1",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "two": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 2",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "three": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 3",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "four": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 4",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "five": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 5",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                }
              });
              client.apply2.ensure(guildid, {
                "channel_id": "",
                "message_id": "",
                "f_channel_id": "",
                //changequestions --> which one (lists everyone with index) --> 4. --> Question
                "QUESTIONS": [{
                  "1": "DEFAULT"
                }],
                "TEMP_ROLE": "0",
                "accept": "You've got accepted!",
                "accept_role": "0",
                "deny": "You've got denied!",
                "ticket": "Hey {user}! We have some Questions!",
                "one": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 1",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "two": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 2",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "three": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 3",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "four": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 4",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "five": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 5",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                }
              });
              client.apply3.ensure(guildid, {
                "channel_id": "",
                "message_id": "",
                "f_channel_id": "",
                //changequestions --> which one (lists everyone with index) --> 4. --> Question
                "QUESTIONS": [{
                  "1": "DEFAULT"
                }],
                "TEMP_ROLE": "0",
                "accept": "You've got accepted!",
                "accept_role": "0",
                "deny": "You've got denied!",
                "ticket": "Hey {user}! We have some Questions!",
                "one": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 1",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "two": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 2",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "three": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 3",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "four": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 4",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "five": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 5",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                }
              });
              client.apply4.ensure(guildid, {
                "channel_id": "",
                "message_id": "",
                "f_channel_id": "",
                //changequestions --> which one (lists everyone with index) --> 4. --> Question
                "QUESTIONS": [{
                  "1": "DEFAULT"
                }],
                "TEMP_ROLE": "0",
                "accept": "You've got accepted!",
                "accept_role": "0",
                "deny": "You've got denied!",
                "ticket": "Hey {user}! We have some Questions!",
                "one": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 1",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "two": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 2",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "three": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 3",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "four": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 4",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "five": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 5",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                }
              });
              client.apply5.ensure(guildid, {
                "channel_id": "",
                "message_id": "",
                "f_channel_id": "",
                //changequestions --> which one (lists everyone with index) --> 4. --> Question
                "QUESTIONS": [{
                  "1": "DEFAULT"
                }],
                "TEMP_ROLE": "0",
                "accept": "You've got accepted!",
                "accept_role": "0",
                "deny": "You've got denied!",
                "ticket": "Hey {user}! We have some Questions!",
                "one": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 1",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "two": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 2",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "three": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 3",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "four": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 4",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                },
                "five": {
                  "role": "0",
                  "message": "Hey you've got accepted for Team 5",
                  "image": {
                    "enabled": false,
                    "url": ""
                  }
                }
              });
            } catch (_unused) {}

            _context7.prev = 2;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            errored = false;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            apply_for_here = client.apply;
            _context7.next = 11;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage the **first** Application System\n\n2\uFE0F\u20E3 **==** Manage the **second** Application System\n\n3\uFE0F\u20E3 **==** Manage the **third** Application System\n\n4\uFE0F\u20E3 **==** Manage the **fourth** Application System\n\n5\uFE0F\u20E3 **==** Manage the **fifth** Application System\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 11:
            tempmsg = _context7.sent;
            _context7.prev = 12;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context7.next = 23;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](12);
            return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context7.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            _context7.next = 25;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 180000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);

              if (reaction.emoji.name === "1️⃣") {
                apply_for_here = client.apply;
                temptype = "1";
              } else if (reaction.emoji.name === "2️⃣") {
                apply_for_here = client.apply2;
                temptype = "2";
              } else if (reaction.emoji.name === "3️⃣") {
                apply_for_here = client.apply3;
                temptype = "3";
              } else if (reaction.emoji.name === "4️⃣") {
                apply_for_here = client.apply4;
                temptype = "4";
              } else if (reaction.emoji.name === "5️⃣") {
                apply_for_here = client.apply5;
                temptype = "5";
              } else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 25:
            if (!timeouterror) {
              _context7.next = 27;
              break;
            }

            return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 27:
            _context7.next = 29;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Setup / Create** a new Application (Overwrite)\n\n2\uFE0F\u20E3 **== Edit** the Application Process Parameters\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 29:
            tempmsg = _context7.sent;
            _context7.next = 32;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 180000,
              errors: ["time"]
            }).then(function _callee4(collected) {
              var reaction, setup_with_channel_creation, setup_without_channel_creation, color, desc, userid, pickmsg;
              return regeneratorRuntime.async(function _callee4$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id);

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context6.next = 16;
                        break;
                      }

                      setup_with_channel_creation = function setup_with_channel_creation() {
                        var applychannel, f_applychannel;
                        return regeneratorRuntime.async(function setup_with_channel_creation$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon));
                                message.guild.channels.create("📋 | Applications", {
                                  type: "category"
                                }).then(function (ch) {
                                  ch.guild.channels.create("✔️|finished-applies", {
                                    type: "text",
                                    topic: "React to the Embed, to start the application process",
                                    parent: ch.id,
                                    permissionOverwrites: [{
                                      id: ch.guild.id,
                                      deny: ["VIEW_CHANNEL"]
                                    }]
                                  }).then(function (ch) {
                                    f_applychannel = ch.id;
                                    apply_for_here.set(ch.guild.id, ch.id, "f_channel_id");
                                  });
                                  ch.guild.channels.create("✅|apply-here", {
                                    type: "text",
                                    topic: "React to the Embed, to start the application process",
                                    parent: ch.id,
                                    permissionOverwrites: [{
                                      id: ch.guild.id,
                                      allow: ["VIEW_CHANNEL"],
                                      deny: ["SEND_MESSAGES"]
                                    }, {
                                      id: client.user.id,
                                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                    }]
                                  }).then(function (ch) {
                                    var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setFooter(es.footertext, es.footericon);
                                    message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)")).then(function (msg) {
                                      msg.channel.awaitMessages(function (m) {
                                        return m.author.id === userid;
                                      }, {
                                        max: 1,
                                        time: 180000,
                                        errors: ["TIME"]
                                      }).then(function (collected) {
                                        var content = collected.first().content;

                                        if (!content.startsWith("#") && content.length !== 7) {
                                          message.channel.send("WRONG COLOR! USING `GREEN`");
                                        } else {
                                          if (isValidColor(content)) {
                                            console.log(content);
                                            color = content;
                                          } else {
                                            message.channel.send("WRONG COLOR! USING `GREEN`");
                                          }
                                        }

                                        function isValidColor(str) {
                                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                                        }
                                      })["catch"](function (error) {
                                        return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                      }).then(function (something) {
                                        message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")).then(function (msg) {
                                          msg.channel.awaitMessages(function (m) {
                                            return m.author.id === userid;
                                          }, {
                                            max: 1,
                                            time: 180000,
                                            errors: ["TIME"]
                                          }).then(function (collected) {
                                            desc = collected.first().content;
                                            var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(color).setDescription(desc).setTitle("Apply for: `" + message.guild.name + "`").setFooter(es.footertext, es.footericon);
                                            ch.send(setupembed).then(function (msg) {
                                              msg.react("✅");
                                              apply_for_here.set(msg.guild.id, msg.id, "message_id");
                                              apply_for_here.set(msg.guild.id, msg.channel.id, "channel_id");
                                              applychannel = msg.channel.id;
                                            });
                                            var counter = 0;
                                            apply_for_here.set(msg.guild.id, [{
                                              "1": "DEFAULT"
                                            }], "QUESTIONS");
                                            ask_which_qu();

                                            function ask_which_qu() {
                                              counter++;

                                              if (counter === 25) {
                                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("You reached the maximum amount of Questions!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"));
                                                return ask_addrole();
                                              }

                                              message.channel.send(embed.setTitle("What should be the **".concat(counter, "** Question?")).setDescription("Enter `finish`, if you are finished with your Questions!")).then(function (msg) {
                                                msg.channel.awaitMessages(function (m) {
                                                  return m.author.id === userid;
                                                }, {
                                                  max: 1,
                                                  time: 180000,
                                                  errors: ["TIME"]
                                                }).then(function (collected) {
                                                  if (collected.first().content.toLowerCase() === "finish") {
                                                    return ask_addrole();
                                                  }

                                                  switch (counter) {
                                                    case 1:
                                                      {
                                                        apply_for_here.set(msg.guild.id, [], "QUESTIONS");
                                                        apply_for_here.push(msg.guild.id, {
                                                          "1": collected.first().content
                                                        }, "QUESTIONS");
                                                      }
                                                      break;

                                                    case 2:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "2": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 3:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "3": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 4:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "4": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 5:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "5": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 6:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "6": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 7:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "7": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 8:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "8": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 9:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "9": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 10:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "10": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 11:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "11": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 12:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "12": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 13:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "13": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 14:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "14": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 15:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "15": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 16:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "16": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 17:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "17": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 18:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "18": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 19:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "19": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 20:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "20": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 21:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "21": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 22:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "22": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 23:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "23": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;

                                                    case 24:
                                                      apply_for_here.push(msg.guild.id, {
                                                        "24": collected.first().content
                                                      }, "QUESTIONS");
                                                      break;
                                                  }

                                                  ask_which_qu();
                                                })["catch"](function (error) {
                                                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                                });
                                              });
                                            }

                                            function ask_addrole() {
                                              message.channel.send(embed.setTitle("Do you want to add a Role, when some1 applies?").setDescription("Enter `no`, if not\n\nJust ping the Role")).then(function (msg) {
                                                msg.channel.awaitMessages(function (m) {
                                                  return m.author.id === userid;
                                                }, {
                                                  max: 1,
                                                  time: 180000,
                                                  errors: ["TIME"]
                                                }).then(function _callee(collected) {
                                                  var role, guildrole, botrole;
                                                  return regeneratorRuntime.async(function _callee$(_context) {
                                                    while (1) {
                                                      switch (_context.prev = _context.next) {
                                                        case 0:
                                                          if (!(collected.first().content.toLowerCase() === "no")) {
                                                            _context.next = 4;
                                                            break;
                                                          }

                                                          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#in <#".concat(applychannel, ">>\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                        case 4:
                                                          role = collected.first().mentions.roles.map(function (role) {
                                                            return role.id;
                                                          }).join(" ");

                                                          if (role) {
                                                            _context.next = 7;
                                                            break;
                                                          }

                                                          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                        case 7:
                                                          guildrole = message.guild.roles.cache.get(role);

                                                          if (message.guild.me.roles) {
                                                            _context.next = 10;
                                                            break;
                                                          }

                                                          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                                            dynamic: true
                                                          }))));

                                                        case 10:
                                                          botrole = message.guild.me.roles.highest;
                                                          console.log(guildrole.rawPosition);
                                                          console.log(botrole.rawPosition);

                                                          if (!(guildrole.rawPosition >= botrole.rawPosition)) {
                                                            _context.next = 16;
                                                            break;
                                                          }

                                                          message.channel.send("I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n SO I AM USING **NO** ROLE, you can change it with: `".concat(prefix, "setup` -> ").concat(temptype, " Emoji -> :two:"));
                                                          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                        case 16:
                                                          apply_for_here.set(message.guild.id, role, "TEMP_ROLE");
                                                          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                        case 18:
                                                        case "end":
                                                          return _context.stop();
                                                      }
                                                    }
                                                  });
                                                })["catch"](function (error) {
                                                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                                });
                                              });
                                            }
                                          })["catch"](function (error) {
                                            return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                          });
                                        });
                                      });
                                    });
                                  });
                                });

                              case 2:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      };

                      setup_without_channel_creation = function setup_without_channel_creation() {
                        var applychannel, f_applychannel, embed, msg;
                        return regeneratorRuntime.async(function setup_without_channel_creation$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where someone should __start__ the Application?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon)));

                              case 2:
                                pickmsg = _context4.sent;
                                _context4.next = 5;
                                return regeneratorRuntime.awrap(pickmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  erros: ["time"]
                                }).then(function (collected) {
                                  var channel = collected.first().mentions.channels.filter(function (ch) {
                                    return ch.guild.id == message.guild.id;
                                  }).first();

                                  if (channel) {
                                    applychannel = channel.id;
                                  } else {
                                    message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | INVALID INPUT | cancelled").setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")).then(function (msg) {
                                      return msg["delete"]({
                                        timeout: 7500
                                      });
                                    });
                                    throw "ERROR";
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 5:
                                if (!errored) {
                                  _context4.next = 7;
                                  break;
                                }

                                return _context4.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 7:
                                _context4.next = 9;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where the __finished__ Application should be sent?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon)));

                              case 9:
                                pickmsg = _context4.sent;
                                _context4.next = 12;
                                return regeneratorRuntime.awrap(pickmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  erros: ["time"]
                                }).then(function (collected) {
                                  var channel = collected.first().mentions.channels.filter(function (ch) {
                                    return ch.guild.id == message.guild.id;
                                  }).first();

                                  if (channel) {
                                    f_applychannel = channel.id;
                                  } else {
                                    message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | INVALID INPUT | cancelled").setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")).then(function (msg) {
                                      return msg["delete"]({
                                        timeout: 7500
                                      });
                                    });
                                    throw "ERROR";
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 12:
                                if (!errored) {
                                  _context4.next = 14;
                                  break;
                                }

                                return _context4.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 14:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon));
                                embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setFooter(es.footertext, es.footericon);
                                _context4.next = 18;
                                return regeneratorRuntime.awrap(message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)")));

                              case 18:
                                msg = _context4.sent;
                                _context4.next = 21;
                                return regeneratorRuntime.awrap(msg.channel.awaitMessages(function (m) {
                                  return m.author.id === userid;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["TIME"]
                                }).then(function (collected) {
                                  var content = collected.first().content;

                                  if (!content.startsWith("#") && content.length !== 7) {
                                    message.channel.send("WRONG COLOR! USING `GREEN`");
                                  } else {
                                    if (isValidColor(content)) {
                                      color = content;
                                    } else {
                                      message.channel.send("WRONG COLOR! USING `GREEN`");
                                    }
                                  }

                                  function isValidColor(str) {
                                    return str.match(/^#[a-f0-9]{6}$/i) !== null;
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 21:
                                if (!errored) {
                                  _context4.next = 23;
                                  break;
                                }

                                return _context4.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 23:
                                _context4.next = 25;
                                return regeneratorRuntime.awrap(message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === userid;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    desc = collected.first().content;
                                    var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(color).setDescription(desc).setTitle("Apply for: `" + message.guild.name + "`").setFooter(es.footertext, es.footericon);
                                    message.guild.channels.cache.get(applychannel).send(setupembed).then(function (msg) {
                                      msg.react("✅");
                                      apply_for_here.set(msg.guild.id, msg.id, "message_id");
                                      apply_for_here.set(message.guild.id, f_applychannel, "f_channel_id");
                                      apply_for_here.set(msg.guild.id, applychannel, "channel_id");
                                    });
                                    var counter = 0;
                                    apply_for_here.set(msg.guild.id, [{
                                      "1": "DEFAULT"
                                    }], "QUESTIONS");
                                    ask_which_qu();

                                    function ask_which_qu() {
                                      counter++;

                                      if (counter === 25) {
                                        message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("You reached the maximum amount of Questions!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"));
                                        return ask_addrole();
                                      }

                                      message.channel.send(embed.setTitle("What should be the **".concat(counter, "** Question?")).setDescription("Enter `finish`, if you are finished with your Questions!")).then(function (msg) {
                                        msg.channel.awaitMessages(function (m) {
                                          return m.author.id === userid;
                                        }, {
                                          max: 1,
                                          time: 180000,
                                          errors: ["TIME"]
                                        }).then(function (collected) {
                                          if (collected.first().content.toLowerCase() === "finish") {
                                            return ask_addrole();
                                          }

                                          switch (counter) {
                                            case 1:
                                              {
                                                apply_for_here.set(msg.guild.id, [], "QUESTIONS");
                                                apply_for_here.push(msg.guild.id, {
                                                  "1": collected.first().content
                                                }, "QUESTIONS");
                                              }
                                              break;

                                            case 2:
                                              apply_for_here.push(msg.guild.id, {
                                                "2": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 3:
                                              apply_for_here.push(msg.guild.id, {
                                                "3": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 4:
                                              apply_for_here.push(msg.guild.id, {
                                                "4": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 5:
                                              apply_for_here.push(msg.guild.id, {
                                                "5": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 6:
                                              apply_for_here.push(msg.guild.id, {
                                                "6": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 7:
                                              apply_for_here.push(msg.guild.id, {
                                                "7": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 8:
                                              apply_for_here.push(msg.guild.id, {
                                                "8": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 9:
                                              apply_for_here.push(msg.guild.id, {
                                                "9": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 10:
                                              apply_for_here.push(msg.guild.id, {
                                                "10": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 11:
                                              apply_for_here.push(msg.guild.id, {
                                                "11": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 12:
                                              apply_for_here.push(msg.guild.id, {
                                                "12": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 13:
                                              apply_for_here.push(msg.guild.id, {
                                                "13": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 14:
                                              apply_for_here.push(msg.guild.id, {
                                                "14": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 15:
                                              apply_for_here.push(msg.guild.id, {
                                                "15": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 16:
                                              apply_for_here.push(msg.guild.id, {
                                                "16": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 17:
                                              apply_for_here.push(msg.guild.id, {
                                                "17": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 18:
                                              apply_for_here.push(msg.guild.id, {
                                                "18": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 19:
                                              apply_for_here.push(msg.guild.id, {
                                                "19": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 20:
                                              apply_for_here.push(msg.guild.id, {
                                                "20": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 21:
                                              apply_for_here.push(msg.guild.id, {
                                                "21": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 22:
                                              apply_for_here.push(msg.guild.id, {
                                                "22": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 23:
                                              apply_for_here.push(msg.guild.id, {
                                                "23": collected.first().content
                                              }, "QUESTIONS");
                                              break;

                                            case 24:
                                              apply_for_here.push(msg.guild.id, {
                                                "24": collected.first().content
                                              }, "QUESTIONS");
                                              break;
                                          }

                                          ask_which_qu();
                                        })["catch"](function (e) {
                                          errored === true;
                                        });
                                        if (errored) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                          return msg["delete"]({
                                            timeout: 7500
                                          });
                                        });
                                      });
                                    }

                                    function ask_addrole() {
                                      message.channel.send(embed.setTitle("Do you want to add a Role, when some1 applies?").setDescription("Enter `no`, if not\n\nJust ping the Role")).then(function (msg) {
                                        msg.channel.awaitMessages(function (m) {
                                          return m.author.id === userid;
                                        }, {
                                          max: 1,
                                          time: 180000,
                                          errors: ["TIME"]
                                        }).then(function _callee2(collected) {
                                          var role, guildrole, botrole;
                                          return regeneratorRuntime.async(function _callee2$(_context3) {
                                            while (1) {
                                              switch (_context3.prev = _context3.next) {
                                                case 0:
                                                  if (!(collected.first().content.toLowerCase() === "no")) {
                                                    _context3.next = 4;
                                                    break;
                                                  }

                                                  return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                case 4:
                                                  role = collected.first().mentions.roles.map(function (role) {
                                                    return role.id;
                                                  }).join(" ");

                                                  if (role) {
                                                    _context3.next = 7;
                                                    break;
                                                  }

                                                  return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                case 7:
                                                  guildrole = message.guild.roles.cache.get(role);

                                                  if (message.guild.me.roles) {
                                                    _context3.next = 10;
                                                    break;
                                                  }

                                                  return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                                    dynamic: true
                                                  }))));

                                                case 10:
                                                  botrole = message.guild.me.roles.highest;

                                                  if (!(guildrole.rawPosition >= botrole.rawPosition)) {
                                                    _context3.next = 14;
                                                    break;
                                                  }

                                                  message.channel.send("I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n SO I AM USING **NO** ROLE, you can change it with: `".concat(prefix, "setup` -> ").concat(temptype, " Emoji -> :two:"));
                                                  return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                case 14:
                                                  apply_for_here.set(message.guild.id, role, "TEMP_ROLE");
                                                  return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!"))));

                                                case 16:
                                                case "end":
                                                  return _context3.stop();
                                              }
                                            }
                                          });
                                        })["catch"](function (e) {
                                          errored === true;
                                        });
                                        if (errored) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                          return msg["delete"]({
                                            timeout: 7500
                                          });
                                        });
                                      });
                                    }
                                  })["catch"](function (e) {
                                    errored === true;
                                  });
                                  if (errored) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                    return msg["delete"]({
                                      timeout: 7500
                                    });
                                  });
                                }));

                              case 25:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        });
                      };

                      color = "GREEN";
                      userid = message.author.id;
                      _context6.next = 9;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What do you want me to do?").setDescription("1️⃣ === I will create a Channel for you\n2️⃣ === You can pick your own Channels!").setFooter(es.footertext, es.footericon)
                      }));

                    case 9:
                      pickmsg = _context6.sent;
                      _context6.next = 12;
                      return regeneratorRuntime.awrap(pickmsg.awaitReactions(function (reaction, user) {
                        return user.id === message.author.id;
                      }, {
                        max: 1,
                        time: 180000,
                        erros: ["time"]
                      }).then(function (collected) {
                        if (collected.first().emoji.name == "1️⃣") setup_with_channel_creation();
                        if (collected.first().emoji.name == "2️⃣") setup_without_channel_creation();
                      })["catch"](function (e) {
                        errored === true;
                      }));

                    case 12:
                      if (!errored) {
                        _context6.next = 14;
                        break;
                      }

                      return _context6.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                        return msg["delete"]({
                          timeout: 7500
                        });
                      }));

                    case 14:
                      _context6.next = 44;
                      break;

                    case 16:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context6.next = 43;
                        break;
                      }

                      _context6.next = 19;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setTitle("What do you want me to do?").setDescription("\n    1\uFE0F\u20E3 **==** Edit the **ACCEPT Message**\n    2\uFE0F\u20E3 **==** Edit the **DENY Message**\n    3\uFE0F\u20E3 **==** Edit the **TICKET Message**\n    \n    4\uFE0F\u20E3 **==** Define the **ACCEPT Role**\n    5\uFE0F\u20E3 **==** Define the **TEMP Role**\n    \n    \n    6\uFE0F\u20E3 **==** Manage the **:one: EMOJI** (Role/Message) \n    7\uFE0F\u20E3 **==** Manage the **:two: EMOJI** (Role/Message) \n    8\uFE0F\u20E3 **==** Manage the **:three: EMOJI** (Role/Message) \n    9\uFE0F\u20E3 **==** Manage the **:four: EMOJI** (Role/Message) \n    \uD83D\uDD1F **==** Manage the **:five: EMOJI** (Role/Message) \n    \n    \uD83D\uDD34 **==** **Edit** a **Question**\n    \uD83D\uDFE3 **==** **Add** a **Question**\n    \uD83D\uDFE1 **==** **Remove** a **Question**\n    \n    \n    \uD83D\uDFE2 **==** **Set** a new **Application Channel**\n    \uD83D\uDD35 **==** **Set** a new __finished__ **Applications Channel**\n\n    \u270B **== ".concat(apply_for_here.get(message.guild.id, "last_verify") ? "Enabled Last Verification" : "Disabled Last Verification", "**\n    ")).setFooter(es.footertext, es.footericon)
                      }));

                    case 19:
                      pickmsg = _context6.sent;
                      _context6.prev = 20;
                      tempmsg.react("6️⃣");
                      tempmsg.react("7️⃣");
                      tempmsg.react("8️⃣");
                      tempmsg.react("9️⃣");
                      tempmsg.react("🔟");
                      tempmsg.react("🔴");
                      tempmsg.react("🟣");
                      tempmsg.react("🟡");
                      tempmsg.react("🟢");
                      tempmsg.react("🔵");
                      tempmsg.react("✋");
                      _context6.next = 37;
                      break;

                    case 34:
                      _context6.prev = 34;
                      _context6.t0 = _context6["catch"](20);
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context6.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 37:
                      _context6.next = 39;
                      return regeneratorRuntime.awrap(pickmsg.awaitReactions(function (reaction, user) {
                        return user.id === message.author.id;
                      }, {
                        max: 1,
                        time: 180000,
                        erros: ["time"]
                      }).then(function _callee3(collected) {
                        var args, type, tempmsg2, url, Questions, embed, i, applychannel, f_applychannel, userid, msg;
                        return regeneratorRuntime.async(function _callee3$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                if (collected.first().emoji.name == "1️⃣") args = "acceptmsg";
                                if (collected.first().emoji.name == "2️⃣") args = "denymsg";
                                if (collected.first().emoji.name == "3️⃣") args = "ticketmsg";
                                if (collected.first().emoji.name == "4️⃣") args = "acceptrole";
                                if (collected.first().emoji.name == "5️⃣") args = "temprole";
                                if (collected.first().emoji.name == "6️⃣") args = "emojione";
                                if (collected.first().emoji.name == "7️⃣") args = "emojitwo";
                                if (collected.first().emoji.name == "8️⃣") args = "emojithree";
                                if (collected.first().emoji.name == "9️⃣") args = "emojifour";
                                if (collected.first().emoji.name == "🔟") args = "emojifive";
                                if (collected.first().emoji.name == "🔴") args = "editquestion";
                                if (collected.first().emoji.name == "🟣") args = "addquestion";
                                if (collected.first().emoji.name == "🟡") args = "removequestion";
                                if (collected.first().emoji.name == "🟢") args = "applychannel";
                                if (collected.first().emoji.name == "🔵") args = "finishedapplychannel";
                                if (collected.first().emoji.name == "✋") args = "last_verify";
                                _context5.t0 = args;
                                _context5.next = _context5.t0 === "acceptmsg" ? 19 : _context5.t0 === "acceptrole" ? 21 : _context5.t0 === "denymsg" ? 23 : _context5.t0 === "ticketmsg" ? 25 : _context5.t0 === "emojione" ? 27 : _context5.t0 === "emojitwo" ? 69 : _context5.t0 === "emojithree" ? 113 : _context5.t0 === "emojifour" ? 157 : _context5.t0 === "emojifive" ? 201 : _context5.t0 === "editquestion" ? 245 : _context5.t0 === "temprole" ? 251 : _context5.t0 === "addquestion" ? 253 : _context5.t0 === "removequestion" ? 255 : _context5.t0 === "applychannel" ? 261 : _context5.t0 === "finishedapplychannel" ? 292 : _context5.t0 === "last_verify" ? 310 : 314;
                                break;

                              case 19:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "accept");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 21:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send("COULD NOT FIND THE ROLE!");
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "accept_role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 23:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new deny message?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "deny");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the DENY MESSAGE!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 25:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new Ticket message? | {user} pings the User", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "ticket");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the TICKET MESSAGE!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 27:
                                type = "";
                                _context5.next = 30;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Set the **message** which should be sent to the Applicant\n\n2\uFE0F\u20E3 **==** **Set** the **Role** which I should give to the Applicant\n\n3\uFE0F\u20E3 **==** **Delete** the **Role** which I should give to the Applicant\n\n4\uFE0F\u20E3 **==** **Delete** the **Image** which should be sent to the Applicant\n\n5\uFE0F\u20E3 **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

                              case 30:
                                tempmsg2 = _context5.sent;
                                _context5.prev = 31;
                                tempmsg2.react("1️⃣");
                                tempmsg2.react("2️⃣");
                                tempmsg2.react("3️⃣");
                                tempmsg2.react("4️⃣");
                                tempmsg2.react("5️⃣");
                                _context5.next = 42;
                                break;

                              case 39:
                                _context5.prev = 39;
                                _context5.t1 = _context5["catch"](31);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t1)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 42:
                                _context5.next = 44;
                                return regeneratorRuntime.awrap(tempmsg2.awaitReactions(filter, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();
                                  reaction.users.remove(message.author.id);
                                  if (reaction.emoji.name === "1️⃣") type = "message";else if (reaction.emoji.name === "2️⃣") type = "setrole";else if (reaction.emoji.name === "3️⃣") type = "delrole";else if (reaction.emoji.name === "4️⃣") type = "delimage";else if (reaction.emoji.name === "5️⃣") type = "setimage";else throw "You reacted with a wrong emoji";
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 44:
                                if (!timeouterror) {
                                  _context5.next = 46;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 46:
                                _context5.t2 = type;
                                _context5.next = _context5.t2 === "message" ? 49 : _context5.t2 === "setrole" ? 51 : _context5.t2 === "delrole" ? 53 : _context5.t2 === "delimage" ? 56 : _context5.t2 === "setimage" ? 59 : 68;
                                break;

                              case 49:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji one?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "one.message");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji one!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 68);

                              case 51:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji one?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send("COULD NOT FIND THE ROLE!");
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "one.role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji one!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 68);

                              case 53:
                                apply_for_here.set(message.guild.id, "", "one.role");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji one!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 56:
                                apply_for_here.set(message.guild.id, false, "one.image.enabled");
                                apply_for_here.set(message.guild.id, "", "one.image.url");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **one**!")));

                              case 59:
                                _context5.prev = 59;
                                _context5.next = 62;
                                return regeneratorRuntime.awrap(tempmsg2.edit({
                                  embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL())
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().attachments.size > 0) {
                                      if (collected.first().attachments.every(attachIsImage)) {
                                        apply_for_here.set(message.guild.id, true, "one.image.enabled");
                                        apply_for_here.set(message.guild.id, url, "one.image.url");
                                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully set the ACCEPT IMAGE for emoji **one**!"));
                                      } else {
                                        return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                      }
                                    } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                      apply_for_here.set(message.guild.id, true, "one.image.enabled");
                                      apply_for_here.set(message.guild.id, collected.first().content, "one.image.url");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully set the ACCEPT IMAGE for emoji **one**!"));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                    }

                                    function attachIsImage(msgAttach) {
                                      url = msgAttach.url; //True if this url is a png image.

                                      return url.indexOf("png", url.length - "png".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("gif", url.length - "gif".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("webp", url.length - "webp".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                      /*or 3*/
                                      ) !== -1;
                                    }
                                  });
                                }));

                              case 62:
                                tempmsg2 = _context5.sent;
                                _context5.next = 68;
                                break;

                              case 65:
                                _context5.prev = 65;
                                _context5.t3 = _context5["catch"](59);
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t3)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 68:
                                return _context5.abrupt("break", 314);

                              case 69:
                                type = "";
                                _context5.next = 72;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Set the **message** which should be sent to the Applicant\n\n2\uFE0F\u20E3 **==** **Set** the **Role** which I should give to the Applicant\n\n3\uFE0F\u20E3 **==** **Delete** the **Role** which I should give to the Applicant\n\n4\uFE0F\u20E3 **==** **Delete** the **Image** which should be sent to the Applicant\n\n5\uFE0F\u20E3 **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

                              case 72:
                                tempmsg2 = _context5.sent;
                                _context5.prev = 73;
                                tempmsg2.react("1️⃣");
                                tempmsg2.react("2️⃣");
                                tempmsg2.react("3️⃣");
                                tempmsg2.react("4️⃣");
                                tempmsg2.react("5️⃣");
                                _context5.next = 84;
                                break;

                              case 81:
                                _context5.prev = 81;
                                _context5.t4 = _context5["catch"](73);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t4)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 84:
                                _context5.next = 86;
                                return regeneratorRuntime.awrap(tempmsg2.awaitReactions(filter, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();
                                  reaction.users.remove(message.author.id);
                                  if (reaction.emoji.name === "1️⃣") type = "message";else if (reaction.emoji.name === "2️⃣") type = "setrole";else if (reaction.emoji.name === "3️⃣") type = "delrole";else if (reaction.emoji.name === "4️⃣") type = "delimage";else if (reaction.emoji.name === "5️⃣") type = "setimage";else throw "You reacted with a wrong emoji";
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 86:
                                if (!timeouterror) {
                                  _context5.next = 88;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 88:
                                _context5.t5 = type;
                                _context5.next = _context5.t5 === "message" ? 91 : _context5.t5 === "setrole" ? 93 : _context5.t5 === "delrole" ? 95 : _context5.t5 === "delimage" ? 98 : _context5.t5 === "setimage" ? 102 : 112;
                                break;

                              case 91:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji two?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "two.message");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji two!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 112);

                              case 93:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji two?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!")));
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "two.role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji two!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 112);

                              case 95:
                                apply_for_here.set(message.guild.id, "", "two.role");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji two!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 98:
                                apply_for_here.set(message.guild.id, false, "two.image.enabled");
                                apply_for_here.set(message.guild.id, "", "two.image.url");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **two**!")));

                              case 102:
                                _context5.prev = 102;
                                _context5.next = 105;
                                return regeneratorRuntime.awrap(tempmsg2.edit({
                                  embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL())
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().attachments.size > 0) {
                                      if (collected.first().attachments.every(attachIsImage)) {
                                        apply_for_here.set(message.guild.id, true, "two.image.enabled");
                                        apply_for_here.set(message.guild.id, url, "two.image.url");
                                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **two**!"));
                                      } else {
                                        return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                      }
                                    } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                      apply_for_here.set(message.guild.id, true, "two.image.enabled");
                                      apply_for_here.set(message.guild.id, collected.first().content, "two.image.url");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **two**!"));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                    }

                                    function attachIsImage(msgAttach) {
                                      url = msgAttach.url; //True if this url is a png image.

                                      return url.indexOf("png", url.length - "png".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("gif", url.length - "gif".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("webp", url.length - "webp".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                      /*or 3*/
                                      ) !== -1;
                                    }
                                  });
                                }));

                              case 105:
                                tempmsg2 = _context5.sent;
                                _context5.next = 111;
                                break;

                              case 108:
                                _context5.prev = 108;
                                _context5.t6 = _context5["catch"](102);
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t6)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 111:
                                return _context5.abrupt("break", 112);

                              case 112:
                                return _context5.abrupt("break", 314);

                              case 113:
                                type = "";
                                _context5.next = 116;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Set the **message** which should be sent to the Applicant\n\n2\uFE0F\u20E3 **==** **Set** the **Role** which I should give to the Applicant\n\n3\uFE0F\u20E3 **==** **Delete** the **Role** which I should give to the Applicant\n\n4\uFE0F\u20E3 **==** **Delete** the **Image** which should be sent to the Applicant\n\n5\uFE0F\u20E3 **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

                              case 116:
                                tempmsg2 = _context5.sent;
                                _context5.prev = 117;
                                tempmsg2.react("1️⃣");
                                tempmsg2.react("2️⃣");
                                tempmsg2.react("3️⃣");
                                tempmsg2.react("4️⃣");
                                tempmsg2.react("5️⃣");
                                _context5.next = 128;
                                break;

                              case 125:
                                _context5.prev = 125;
                                _context5.t7 = _context5["catch"](117);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t7)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 128:
                                _context5.next = 130;
                                return regeneratorRuntime.awrap(tempmsg2.awaitReactions(filter, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();
                                  reaction.users.remove(message.author.id);
                                  if (reaction.emoji.name === "1️⃣") type = "message";else if (reaction.emoji.name === "2️⃣") type = "setrole";else if (reaction.emoji.name === "3️⃣") type = "delrole";else if (reaction.emoji.name === "4️⃣") type = "delimage";else if (reaction.emoji.name === "5️⃣") type = "setimage";else throw "You reacted with a wrong emoji";
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 130:
                                if (!timeouterror) {
                                  _context5.next = 132;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 132:
                                _context5.t8 = type;
                                _context5.next = _context5.t8 === "message" ? 135 : _context5.t8 === "setrole" ? 137 : _context5.t8 === "delrole" ? 139 : _context5.t8 === "delimage" ? 142 : _context5.t8 === "setimage" ? 145 : 154;
                                break;

                              case 135:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji three?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "three.message");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji three!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 156);

                              case 137:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji three?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!")));
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "three.role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji three!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 156);

                              case 139:
                                apply_for_here.set(message.guild.id, "", "three.role");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji three!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 142:
                                apply_for_here.set(message.guild.id, false, "three.image.enabled");
                                apply_for_here.set(message.guild.id, "", "three.image.url");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **three**!")));

                              case 145:
                                _context5.prev = 145;
                                _context5.next = 148;
                                return regeneratorRuntime.awrap(tempmsg2.edit({
                                  embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL())
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().attachments.size > 0) {
                                      if (collected.first().attachments.every(attachIsImage)) {
                                        apply_for_here.set(message.guild.id, true, "three.image.enabled");
                                        apply_for_here.set(message.guild.id, url, "three.image.url");
                                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **three**!"));
                                      } else {
                                        return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                      }
                                    } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                      apply_for_here.set(message.guild.id, true, "three.image.enabled");
                                      apply_for_here.set(message.guild.id, collected.first().content, "three.image.url");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **three**!"));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                    }

                                    function attachIsImage(msgAttach) {
                                      url = msgAttach.url; //True if this url is a png image.

                                      return url.indexOf("png", url.length - "png".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("gif", url.length - "gif".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("webp", url.length - "webp".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                      /*or 3*/
                                      ) !== -1;
                                    }
                                  });
                                }));

                              case 148:
                                tempmsg2 = _context5.sent;
                                _context5.next = 154;
                                break;

                              case 151:
                                _context5.prev = 151;
                                _context5.t9 = _context5["catch"](145);
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t9)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 154:
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("ERROR please enter a valid Option").setDescription("Valid Options are: `message`, `setimage`, `delimage`, `setrole`, `delrole`\n\n\nExample usage: `".concat(prefix, "editsetup emojithree message` --> follow steps / `").concat(prefix, "editsetup emojithree setrole` --> follow steps"))));

                              case 156:
                                return _context5.abrupt("break", 314);

                              case 157:
                                type = "";
                                _context5.next = 160;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Set the **message** which should be sent to the Applicant\n\n2\uFE0F\u20E3 **==** **Set** the **Role** which I should give to the Applicant\n\n3\uFE0F\u20E3 **==** **Delete** the **Role** which I should give to the Applicant\n\n4\uFE0F\u20E3 **==** **Delete** the **Image** which should be sent to the Applicant\n\n5\uFE0F\u20E3 **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

                              case 160:
                                tempmsg2 = _context5.sent;
                                _context5.prev = 161;
                                tempmsg2.react("1️⃣");
                                tempmsg2.react("2️⃣");
                                tempmsg2.react("3️⃣");
                                tempmsg2.react("4️⃣");
                                tempmsg2.react("5️⃣");
                                _context5.next = 172;
                                break;

                              case 169:
                                _context5.prev = 169;
                                _context5.t10 = _context5["catch"](161);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t10)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 172:
                                _context5.next = 174;
                                return regeneratorRuntime.awrap(tempmsg2.awaitReactions(filter, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();
                                  reaction.users.remove(message.author.id);
                                  if (reaction.emoji.name === "1️⃣") type = "message";else if (reaction.emoji.name === "2️⃣") type = "setrole";else if (reaction.emoji.name === "3️⃣") type = "delrole";else if (reaction.emoji.name === "4️⃣") type = "delimage";else if (reaction.emoji.name === "5️⃣") type = "setimage";else throw "You reacted with a wrong emoji";
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 174:
                                if (!timeouterror) {
                                  _context5.next = 176;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 176:
                                _context5.t11 = type;
                                _context5.next = _context5.t11 === "message" ? 179 : _context5.t11 === "setrole" ? 181 : _context5.t11 === "delrole" ? 183 : _context5.t11 === "delimage" ? 186 : _context5.t11 === "setimage" ? 189 : 198;
                                break;

                              case 179:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji four?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "four.message");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji four!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 200);

                              case 181:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji four?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!")));
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "four.role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji four!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 200);

                              case 183:
                                apply_for_here.set(message.guild.id, "", "four.role");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji four!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 186:
                                apply_for_here.set(message.guild.id, false, "four.image.enabled");
                                apply_for_here.set(message.guild.id, "", "four.image.url");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **four**!")));

                              case 189:
                                _context5.prev = 189;
                                _context5.next = 192;
                                return regeneratorRuntime.awrap(tempmsg2.edit({
                                  embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL())
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().attachments.size > 0) {
                                      if (collected.first().attachments.every(attachIsImage)) {
                                        apply_for_here.set(message.guild.id, true, "four.image.enabled");
                                        apply_for_here.set(message.guild.id, url, "four.image.url");
                                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **four**!"));
                                      } else {
                                        return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                      }
                                    } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                      apply_for_here.set(message.guild.id, true, "four.image.enabled");
                                      apply_for_here.set(message.guild.id, collected.first().content, "four.image.url");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **four**!"));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                    }

                                    function attachIsImage(msgAttach) {
                                      url = msgAttach.url; //True if this url is a png image.

                                      return url.indexOf("png", url.length - "png".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("gif", url.length - "gif".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("webp", url.length - "webp".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                      /*or 3*/
                                      ) !== -1;
                                    }
                                  });
                                }));

                              case 192:
                                tempmsg2 = _context5.sent;
                                _context5.next = 198;
                                break;

                              case 195:
                                _context5.prev = 195;
                                _context5.t12 = _context5["catch"](189);
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t12)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 198:
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("ERROR please enter a valid Option").setDescription("Valid Options are: `message`, `setimage`, `delimage`, `setrole`, `delrole`\n\n\nExample usage: `".concat(prefix, "editsetup emojifour message` --> follow steps / `").concat(prefix, "editsetup emojifour setrole` --> follow steps"))));

                              case 200:
                                return _context5.abrupt("break", 314);

                              case 201:
                                type = "";
                                _context5.next = 204;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Set the **message** which should be sent to the Applicant\n\n2\uFE0F\u20E3 **==** **Set** the **Role** which I should give to the Applicant\n\n3\uFE0F\u20E3 **==** **Delete** the **Role** which I should give to the Applicant\n\n4\uFE0F\u20E3 **==** **Delete** the **Image** which should be sent to the Applicant\n\n5\uFE0F\u20E3 **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

                              case 204:
                                tempmsg2 = _context5.sent;
                                _context5.prev = 205;
                                tempmsg2.react("1️⃣");
                                tempmsg2.react("2️⃣");
                                tempmsg2.react("3️⃣");
                                tempmsg2.react("4️⃣");
                                tempmsg2.react("5️⃣");
                                _context5.next = 216;
                                break;

                              case 213:
                                _context5.prev = 213;
                                _context5.t13 = _context5["catch"](205);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t13)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 216:
                                _context5.next = 218;
                                return regeneratorRuntime.awrap(tempmsg2.awaitReactions(filter, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  var reaction = collected.first();
                                  reaction.users.remove(message.author.id);
                                  if (reaction.emoji.name === "1️⃣") type = "message";else if (reaction.emoji.name === "2️⃣") type = "setrole";else if (reaction.emoji.name === "3️⃣") type = "delrole";else if (reaction.emoji.name === "4️⃣") type = "delimage";else if (reaction.emoji.name === "5️⃣") type = "setimage";else throw "You reacted with a wrong emoji";
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 218:
                                if (!timeouterror) {
                                  _context5.next = 220;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 220:
                                _context5.t14 = type;
                                _context5.next = _context5.t14 === "message" ? 223 : _context5.t14 === "setrole" ? 225 : _context5.t14 === "delrole" ? 227 : _context5.t14 === "delimage" ? 230 : _context5.t14 === "setimage" ? 233 : 242;
                                break;

                              case 223:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji five?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    apply_for_here.set(message.guild.id, collected.first().content, "five.message");
                                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji five!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 244);

                              case 225:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji five?", message.author.displayAvatarURL({
                                  dynamic: true
                                }))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!")));
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "five.role");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji five!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 244);

                              case 227:
                                apply_for_here.set(message.guild.id, "", "five.role");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji five!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 230:
                                apply_for_here.set(message.guild.id, false, "five.image.enabled");
                                apply_for_here.set(message.guild.id, "", "five.image.url");
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT IMAGE for emoji five!", message.author.displayAvatarURL({
                                  dynamic: true
                                }))));

                              case 233:
                                _context5.prev = 233;
                                _context5.next = 236;
                                return regeneratorRuntime.awrap(tempmsg2.edit({
                                  embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL())
                                }).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ['time']
                                  }).then(function (collected) {
                                    if (collected.first().attachments.size > 0) {
                                      if (collected.first().attachments.every(attachIsImage)) {
                                        apply_for_here.set(message.guild.id, true, "five.image.enabled");
                                        apply_for_here.set(message.guild.id, url, "five.image.url");
                                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **five**!"));
                                      } else {
                                        return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                      }
                                    } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                                      apply_for_here.set(message.guild.id, true, "five.image.enabled");
                                      apply_for_here.set(message.guild.id, collected.first().content, "five.image.url");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **five**!"));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor("RED").setFooter(es.footertext, es.footericon));
                                    }

                                    function attachIsImage(msgAttach) {
                                      url = msgAttach.url; //True if this url is a png image.

                                      return url.indexOf("png", url.length - "png".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("gif", url.length - "gif".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("webp", url.length - "webp".length
                                      /*or 3*/
                                      ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                      /*or 3*/
                                      ) !== -1;
                                    }
                                  });
                                }));

                              case 236:
                                tempmsg2 = _context5.sent;
                                _context5.next = 242;
                                break;

                              case 239:
                                _context5.prev = 239;
                                _context5.t15 = _context5["catch"](233);
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor("RED").setDescription("```".concat(String(JSON.stringify(_context5.t15)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 242:
                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("ERROR please enter a valid Option").setDescription("Valid Options are: `message`, `setimage`, `delimage`, `setrole`, `delrole`\n\n\nExample usage: `".concat(prefix, "editsetup emojifive message` --> follow steps / `").concat(prefix, "editsetup emojifive setrole` --> follow steps"))));

                              case 244:
                                return _context5.abrupt("break", 314);

                              case 245:
                                Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Current Questions") //XG#2846
                                .setFooter("ADD THE INDEX TO EDIT THE MSG", message.guild.iconURL({
                                  dynamic: true
                                })).setTimestamp();

                                for (i = 0; i < Questions.length; i++) {
                                  try {
                                    embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]));
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }

                                message.channel.send(embed);
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What Question do you wanna __Edit__?").setDescription("Just send the **INDEX** Number of the **Question** | `1` - `".concat(Questions.length, "`"))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var arr = apply_for_here.get(message.guild.id, "QUESTIONS");
                                    var quindex = collected.first().content;

                                    if (arr.length >= Number(quindex)) {
                                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new Question?", message.author.displayAvatarURL({
                                        dynamic: true
                                      }))).then(function (msg) {
                                        msg.channel.awaitMessages(function (m) {
                                          return m.author.id === message.author.id;
                                        }, {
                                          max: 1,
                                          time: 180000,
                                          errors: ["TIME"]
                                        }).then(function (collected) {
                                          var index = Number(quindex);
                                          var obj;

                                          switch (Number(index)) {
                                            case 1:
                                              obj = {
                                                "1": collected.first().content
                                              };
                                              break;

                                            case 2:
                                              obj = {
                                                "2": collected.first().content
                                              };
                                              break;

                                            case 3:
                                              obj = {
                                                "3": collected.first().content
                                              };
                                              break;

                                            case 4:
                                              obj = {
                                                "4": collected.first().content
                                              };
                                              break;

                                            case 5:
                                              obj = {
                                                "5": collected.first().content
                                              };
                                              break;

                                            case 6:
                                              obj = {
                                                "6": collected.first().content
                                              };
                                              break;

                                            case 7:
                                              obj = {
                                                "7": collected.first().content
                                              };
                                              break;

                                            case 8:
                                              obj = {
                                                "8": collected.first().content
                                              };
                                              break;

                                            case 9:
                                              obj = {
                                                "9": collected.first().content
                                              };
                                              break;

                                            case 10:
                                              obj = {
                                                "10": collected.first().content
                                              };
                                              break;

                                            case 11:
                                              obj = {
                                                "11": collected.first().content
                                              };
                                              break;

                                            case 12:
                                              obj = {
                                                "12": collected.first().content
                                              };
                                              break;

                                            case 13:
                                              obj = {
                                                "13": collected.first().content
                                              };
                                              break;

                                            case 14:
                                              obj = {
                                                "14": collected.first().content
                                              };
                                              break;

                                            case 15:
                                              obj = {
                                                "15": collected.first().content
                                              };
                                              break;

                                            case 16:
                                              obj = {
                                                "16": collected.first().content
                                              };
                                              break;

                                            case 17:
                                              obj = {
                                                "17": collected.first().content
                                              };
                                              break;

                                            case 18:
                                              obj = {
                                                "18": collected.first().content
                                              };
                                              break;

                                            case 19:
                                              obj = {
                                                "19": collected.first().content
                                              };
                                              break;

                                            case 20:
                                              obj = {
                                                "20": collected.first().content
                                              };
                                              break;

                                            case 21:
                                              obj = {
                                                "21": collected.first().content
                                              };
                                              break;

                                            case 22:
                                              obj = {
                                                "22": collected.first().content
                                              };
                                              break;

                                            case 23:
                                              obj = {
                                                "23": collected.first().content
                                              };
                                              break;

                                            case 24:
                                              obj = {
                                                "24": collected.first().content
                                              };
                                              break;
                                          }

                                          arr[index - 1] = obj;
                                          apply_for_here.set(message.guild.id, arr, "QUESTIONS");
                                          Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                          var new_embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("NEW Questions") //XG#2846
                                          .setFooter(message.guild.name, message.guild.iconURL({
                                            dynamic: true
                                          })).setTimestamp();

                                          for (var i = 0; i < Questions.length; i++) {
                                            try {
                                              new_embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]));
                                            } catch (_unused2) {}
                                          }

                                          message.channel.send(new_embed);
                                        })["catch"](function (error) {
                                          return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                        });
                                      });
                                    } else {
                                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("It seems, that this Question does not exist! Please retry! Here are all Questions:", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                      return message.channel.send(embed);
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 251:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the new temp Role, which will be granted once the user applied?").setDescription("Just send the **ROLE** into the Channel. Simply **Ping** it!")).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.map(function (role) {
                                      return role.id;
                                    }).join(" ");
                                    if (!role) return message.channel.send("COULD NOT FIND THE ROLE!");
                                    var guildrole = message.guild.roles.cache.get(role);
                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    var botrole = message.guild.me.roles.highest;

                                    if (guildrole.rawPosition <= botrole.rawPosition) {
                                      apply_for_here.set(message.guild.id, role, "TEMP_ROLE");
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the TEMP ROLE!", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    } else {
                                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 253:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Question you wanna add?").setDescription("Simply send the Question into the Text")).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                    var obj;

                                    switch (Questions.length + 1) {
                                      case 1:
                                        obj = {
                                          "1": collected.first().content
                                        };
                                        break;

                                      case 2:
                                        obj = {
                                          "2": collected.first().content
                                        };
                                        break;

                                      case 3:
                                        obj = {
                                          "3": collected.first().content
                                        };
                                        break;

                                      case 4:
                                        obj = {
                                          "4": collected.first().content
                                        };
                                        break;

                                      case 5:
                                        obj = {
                                          "5": collected.first().content
                                        };
                                        break;

                                      case 6:
                                        obj = {
                                          "6": collected.first().content
                                        };
                                        break;

                                      case 7:
                                        obj = {
                                          "7": collected.first().content
                                        };
                                        break;

                                      case 8:
                                        obj = {
                                          "8": collected.first().content
                                        };
                                        break;

                                      case 9:
                                        obj = {
                                          "9": collected.first().content
                                        };
                                        break;

                                      case 10:
                                        obj = {
                                          "10": collected.first().content
                                        };
                                        break;

                                      case 11:
                                        obj = {
                                          "11": collected.first().content
                                        };
                                        break;

                                      case 12:
                                        obj = {
                                          "12": collected.first().content
                                        };
                                        break;

                                      case 13:
                                        obj = {
                                          "13": collected.first().content
                                        };
                                        break;

                                      case 14:
                                        obj = {
                                          "14": collected.first().content
                                        };
                                        break;

                                      case 15:
                                        obj = {
                                          "15": collected.first().content
                                        };
                                        break;

                                      case 16:
                                        obj = {
                                          "16": collected.first().content
                                        };
                                        break;

                                      case 17:
                                        obj = {
                                          "17": collected.first().content
                                        };
                                        break;

                                      case 18:
                                        obj = {
                                          "18": collected.first().content
                                        };
                                        break;

                                      case 19:
                                        obj = {
                                          "19": collected.first().content
                                        };
                                        break;

                                      case 20:
                                        obj = {
                                          "20": collected.first().content
                                        };
                                        break;

                                      case 21:
                                        obj = {
                                          "21": collected.first().content
                                        };
                                        break;

                                      case 22:
                                        obj = {
                                          "22": collected.first().content
                                        };
                                        break;

                                      case 23:
                                        obj = {
                                          "23": collected.first().content
                                        };
                                        break;

                                      case 24:
                                        obj = {
                                          "24": collected.first().content
                                        };
                                        break;
                                    }

                                    apply_for_here.push(message.guild.id, obj, "QUESTIONS");
                                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully added your Question!", message.author.displayAvatarURL({
                                      dynamic: true
                                    })));
                                    Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                    var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("NEW Questions") //XG#2846
                                    .setFooter(message.guild.name, message.guild.iconURL({
                                      dynamic: true
                                    })).setTimestamp();

                                    for (var i = 0; i < Questions.length; i++) {
                                      try {
                                        embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]));
                                      } catch (e) {
                                        console.log(e);
                                      }
                                    }

                                    message.channel.send(embed);
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 255:
                                Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Current Questions") //XG#2846
                                .setFooter("ADD THE INDEX TO EDIT THE MSG", message.guild.iconURL({
                                  dynamic: true
                                })).setTimestamp();

                                for (i = 0; i < Questions.length; i++) {
                                  try {
                                    embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]));
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }

                                message.channel.send(embed);
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What Question do you wanna Remove?").setDescription("Just send the **INDEX** Number of the **Question** | `1` - `".concat(Questions.length, "`"))).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id === message.author.id;
                                  }, {
                                    max: 1,
                                    time: 180000,
                                    errors: ["TIME"]
                                  }).then(function (collected) {
                                    var arr = apply_for_here.get(message.guild.id, "QUESTIONS");
                                    var quindex = collected.first().content;

                                    if (arr.length >= Number(quindex)) {
                                      var index = Number(quindex);
                                      var counter = 0;
                                      var _iteratorNormalCompletion = true;
                                      var _didIteratorError = false;
                                      var _iteratorError = undefined;

                                      try {
                                        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                          var item = _step.value;

                                          // console.log(Object.keys(item))
                                          if (Object.keys(item) == index) {
                                            arr.splice(counter, 1);
                                          }

                                          counter++;
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

                                      counter = 0;
                                      var _iteratorNormalCompletion2 = true;
                                      var _didIteratorError2 = false;
                                      var _iteratorError2 = undefined;

                                      try {
                                        for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                          var item = _step2.value;

                                          if (Object.keys(item) != counter + 1) {
                                            var key = String(Object.keys(item));
                                            item[key - 1] = item[key]; //replace the item

                                            delete item[key]; //delete the old one

                                            arr[counter] === item; //update it
                                          }

                                          counter++;
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

                                      apply_for_here.set(message.guild.id, arr, "QUESTIONS");
                                      Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                                      var new_embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("NEW Questions") //XG#2846
                                      .setFooter(message.guild.name, message.guild.iconURL({
                                        dynamic: true
                                      })).setTimestamp();

                                      for (var i = 0; i < Questions.length; i++) {
                                        try {
                                          new_embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]));
                                        } catch (_unused3) {}
                                      }

                                      message.channel.send(new_embed);
                                    } else {
                                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("It seems, that this Question does not exist! Please retry! Here are all Questions:", message.author.displayAvatarURL({
                                        dynamic: true
                                      })));
                                      return message.channel.send(embed);
                                    }
                                  })["catch"](function (error) {
                                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                                  });
                                });
                                return _context5.abrupt("break", 314);

                              case 261:
                                _context5.prev = 261;
                                userid = message.author.id;
                                _context5.next = 265;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where someone should __start__ the Application?").setDescription("Please ping the Channel #channel")));

                              case 265:
                                pickmsg = _context5.sent;
                                _context5.next = 268;
                                return regeneratorRuntime.awrap(pickmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  erros: ["time"]
                                }).then(function (collected) {
                                  var channel = collected.first().mentions.channels.filter(function (ch) {
                                    return ch.guild.id == message.guild.id;
                                  }).first();

                                  if (channel) {
                                    applychannel = channel.id;
                                  } else {
                                    message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | INVALID INPUT | cancelled").setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")).then(function (msg) {
                                      return msg["delete"]({
                                        timeout: 7500
                                      });
                                    });
                                    throw "ERROR";
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 268:
                                if (!errored) {
                                  _context5.next = 270;
                                  break;
                                }

                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 270:
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon));
                                embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setFooter(es.footertext, es.footericon);
                                _context5.next = 274;
                                return regeneratorRuntime.awrap(message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)")));

                              case 274:
                                msg = _context5.sent;
                                _context5.next = 277;
                                return regeneratorRuntime.awrap(msg.channel.awaitMessages(function (m) {
                                  return m.author.id === userid;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["TIME"]
                                }).then(function (collected) {
                                  var content = collected.first().content;

                                  if (!content.startsWith("#") && content.length !== 7) {
                                    message.channel.send("WRONG COLOR! USING `GREEN`");
                                  } else {
                                    if (isValidColor(content)) {
                                      color = content;
                                      if (color.toLowerCase() === "#ffffff") color = "#fffff9";
                                    } else {
                                      message.channel.send("WRONG COLOR! USING `GREEN`");
                                    }
                                  }

                                  function isValidColor(str) {
                                    return str.match(/^#[a-f0-9]{6}$/i) !== null;
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 277:
                                if (!errored) {
                                  _context5.next = 279;
                                  break;
                                }

                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 279:
                                _context5.next = 281;
                                return regeneratorRuntime.awrap(message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")));

                              case 281:
                                _context5.next = 283;
                                return regeneratorRuntime.awrap(msg.channel.awaitMessages(function (m) {
                                  return m.author.id === userid;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["TIME"]
                                }).then(function (collected) {
                                  desc = collected.first().content;
                                  var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(color).setDescription(desc).setTitle("Apply for: `" + message.guild.name + "`").setFooter(es.footertext, es.footericon);
                                  console.log("F");
                                  message.guild.channels.cache.get(applychannel).send(setupembed).then(function (msg) {
                                    msg.react("✅");
                                    apply_for_here.set(msg.guild.id, msg.id, "message_id");
                                    apply_for_here.set(msg.guild.id, msg.channel.id, "channel_id");
                                  })["catch"](function (e) {
                                    return console.log(e);
                                  });
                                  console.log("F");
                                  return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("ORANGE").setTitle("Setup for ".concat(temptype, ". Application System Completed!")).setDescription("You can apply start the Application Process in in <#".concat(applychannel, ">\n\nIf you wanna edit the Paramters of the Application ran `").concat(prefix, "setup` again and pick the ").concat(temptype, " Emoji!")));
                                  console.log("F");
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 283:
                                if (!errored) {
                                  _context5.next = 285;
                                  break;
                                }

                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 285:
                                _context5.next = 291;
                                break;

                              case 287:
                                _context5.prev = 287;
                                _context5.t16 = _context5["catch"](261);
                                console.log(_context5.t16);
                                message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | ERROR").setDescription("```" + _context5.t16.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                });

                              case 291:
                                return _context5.abrupt("break", 314);

                              case 292:
                                _context5.prev = 292;
                                userid = message.author.id;
                                _context5.next = 296;
                                return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where the __finished__ Applications will be sent?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon)));

                              case 296:
                                pickmsg = _context5.sent;
                                _context5.next = 299;
                                return regeneratorRuntime.awrap(pickmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 180000,
                                  erros: ["time"]
                                }).then(function (collected) {
                                  var channel = collected.first().mentions.channels.filter(function (ch) {
                                    return ch.guild.id == message.guild.id;
                                  }).first();

                                  if (channel) {
                                    f_applychannel = channel.id;
                                  } else {
                                    message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | INVALID INPUT | cancelled").setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")).then(function (msg) {
                                      return msg["delete"]({
                                        timeout: 7500
                                      });
                                    });
                                    throw "ERROR";
                                  }
                                })["catch"](function (e) {
                                  errored === true;
                                }));

                              case 299:
                                if (!errored) {
                                  _context5.next = 301;
                                  break;
                                }

                                return _context5.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                }));

                              case 301:
                                apply_for_here.set(message.guild.id, f_applychannel, "f_channel_id");
                                return _context5.abrupt("return", message.channel.send("I will now send the finished applications to: ".concat(f_applychannel)));

                              case 305:
                                _context5.prev = 305;
                                _context5.t17 = _context5["catch"](292);
                                console.log(_context5.t17);
                                message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | ERROR").setDescription("```" + _context5.t17.message + "```")).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 7500
                                  });
                                });

                              case 309:
                                return _context5.abrupt("break", 314);

                              case 310:
                                apply_for_here.set(message.guild.id, !apply_for_here.get(message.guild.id, "last_verify"), "last_verify");
                                embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("".concat(apply_for_here.get(message.guild.id, "last_verify") ? "Enabled Last Verification" : "Disabled Last Verification")) //XG#2846
                                .setDescription("".concat(apply_for_here.get(message.guild.id, "last_verify") ? "I will now ask the User a last Time if he really wanna apply for the Server" : "I will not ask the User")) //XG#2846
                                .setTimestamp();
                                message.channel.send(embed);
                                return _context5.abrupt("break", 314);

                              case 314:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, null, null, [[31, 39], [59, 65], [73, 81], [102, 108], [117, 125], [145, 151], [161, 169], [189, 195], [205, 213], [233, 239], [261, 287], [292, 305]]);
                      })["catch"](function (e) {
                        errored === true;
                      }));

                    case 39:
                      if (!errored) {
                        _context6.next = 41;
                        break;
                      }

                      return _context6.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(function (msg) {
                        return msg["delete"]({
                          timeout: 7500
                        });
                      }));

                    case 41:
                      _context6.next = 44;
                      break;

                    case 43:
                      throw "You reacted with a wrong emoji";

                    case 44:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, null, [[20, 34]]);
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 32:
            if (!timeouterror) {
              _context7.next = 34;
              break;
            }

            return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 34:
            _context7.next = 40;
            break;

          case 36:
            _context7.prev = 36;
            _context7.t1 = _context7["catch"](2);
            console.log(String(_context7.t1.stack).bgRed);
            return _context7.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context7.t1.stack, "```"))));

          case 40:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[2, 36], [12, 20]]);
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