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
  name: "setup-reactionrole",
  category: "💪 Setup",
  aliases: ["setupreactionrole", "setup-react", "setupreact", "reactionrolesetup", "reactionrole-setup", "react-setup", "reactsetup"],
  cooldown: 5,
  usage: "setup-reactionrole --> Follow Steps",
  description: "Create Reaction Roles, or delete all active Reaction Roles.",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, errored, rembed;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            errored = false;
            rembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What do u want to do?").setDescription("\n**1\uFE0F\u20E3** `Create new Reaction Role` - *Creates A New Reaction Role*\n**2\uFE0F\u20E3** `Reset Settings` - *Resets settings for Reaction Role*\n").setFooter("Pick the INDEX NUMBER", es.footericon);
            message.reply(rembed).then(function _callee(msg) {
              var emojis, _i, _emojis, emoji;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      emojis = ["1️⃣", "2️⃣"];
                      _i = 0, _emojis = emojis;

                    case 2:
                      if (!(_i < _emojis.length)) {
                        _context.next = 9;
                        break;
                      }

                      emoji = _emojis[_i];
                      _context.next = 6;
                      return regeneratorRuntime.awrap(msg.react(emoji));

                    case 6:
                      _i++;
                      _context.next = 2;
                      break;

                    case 9:
                      msg.awaitReactions(function (reaction, user) {
                        return user.id === message.author.id && emojis.includes(reaction.emoji.name);
                      }, {
                        max: 1,
                        time: 120000,
                        erros: ["time"]
                      }).then(function (collected) {
                        switch (collected.first().emoji.name) {
                          case "1️⃣":
                            var rembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("THIS IS A INFORMATION EMBED!").setDescription("\n       **How to setup Clan Bots's Reaction Role!**\n       > 1. React to message __BELOW__ **this** message\n\n       > 2. Then, afterwards a new message appears! After that, you can PING the ROLE for the reacted EMOJI\n\n       > 3. Process 1... continues, enter `finish` to finish the process! (or just dont react)\n\n       > 4. Once it's finished:\n\n       > 4.1 I will ask you, which reaction role **type** you want!\n           | - **Multiple** = *you can have every possible reaction option!*\n           | - **Single** = *Only one Role at the same time!*\n       > 4.2 You will be asked for the TITLE of the Reaction Role, that's necessary!\n       > 4.3 After that, enter in which channel you want to have your Reaction Role listed at! Just ping it! `#chat`\n       > 4.4 After that the Reaction Role Embed, with the information for every Parameter: `EMOJI = ROLE`, will be sent in your wished channel and it'll work!\n\n       *You have 30 seconds for each input!*\n       ").setFooter(es.footertext, es.footericon);
                            message.channel.send(rembed);
                            var objet = {
                              MESSAGE_ID: "",
                              remove_others: false,
                              Parameters: []
                            };
                            var counters = 0;
                            ask_emoji();

                            var ask_emoji = function ask_emoji() {
                              counters++;
                              if (counters.length === 21) return finished();
                              var object2 = {
                                Emoji: "",
                                Emojimsg: "",
                                Role: ""
                              };
                              var rermbed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What's the next Emoji, which u want to use?").setDescription("Type `finish` when you're done\n\nReact with the **wished Emoji** to **this** Message");
                              var cancel = false;
                              message.channel.send(rermbed).then(function (msg) {
                                msg.awaitReactions(function (reaction, user) {
                                  return user.id == message.author.id;
                                }, {
                                  max: 1,
                                  time: 30000
                                }).then(function (collected) {
                                  if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                                    msg["delete"]();
                                    object2.Emoji = collected.first().emoji.id;
                                    if (collected.first().emoji.animated) object2.Emojimsg = "<" + "a:" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";else object2.Emojimsg = "<" + ":" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                                    return ask_role();
                                  } else if (collected.first().emoji.name) {
                                    msg["delete"]();
                                    object2.Emoji = collected.first().emoji.name;
                                    object2.Emojimsg = collected.first().emoji.name;
                                    return ask_role();
                                  } else {
                                    message.channel.send('Operation canceled. and finished!');
                                    return finished();
                                  }
                                })["catch"](function () {
                                  if (!cancel) {
                                    message.reply('No reaction after 30 seconds, operation canceled');
                                    return finished();
                                  }
                                });
                                msg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 30000
                                }).then(function (collected) {
                                  if (collected.first().content.toLowerCase() === "finish") {
                                    cancel = true;
                                    return finished();
                                  }
                                })["catch"](function () {
                                  if (!cancel) {
                                    message.reply('No reaction after 30 seconds, operation canceled');
                                    return finished();
                                  }
                                });
                              });

                              function ask_role() {
                                counters++;
                                var rermbed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What Role do you want for that emoji?");
                                message.channel.send(rermbed).then(function (msg) {
                                  msg.channel.awaitMessages(function (m) {
                                    return m.author.id == message.author.id;
                                  }, {
                                    max: 1,
                                    time: 30000
                                  }).then(function (collected) {
                                    var role = collected.first().mentions.roles.filter(function (role) {
                                      return role.guild.id == message.guild.id;
                                    }).first();
                                    if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role");

                                    if (role) {
                                      object2.Role = role.id;
                                      objet.Parameters.push(object2);

                                      try {
                                        msg["delete"]();
                                      } catch (_unused) {}

                                      try {
                                        msg.channel.bulkDelete(1);
                                      } catch (_unused2) {}

                                      return ask_emoji();
                                    } else {
                                      message.channel.send('Operation canceled. and finished!');
                                      return finished();
                                    }
                                  })["catch"](function (e) {
                                    console.log(e);
                                    message.reply('No reaction after 30 seconds, operation canceled');
                                    return finished();
                                  });
                                });
                              }
                            };

                            var finished = function finished() {
                              message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What type of Reaction Role do you want?").setDescription(":one: === Multiple reaction Options\n\n:two: === Single reaction Options")).then(function (msg) {
                                var emojis2 = ["1️⃣", "2️⃣"];

                                for (var _i2 = 0, _emojis2 = emojis2; _i2 < _emojis2.length; _i2++) {
                                  var emoji = _emojis2[_i2];
                                  msg.react(emoji);
                                }

                                msg.awaitReactions(function (reaction, user) {
                                  return user.id === message.author.id && emojis2.includes(reaction.emoji.name);
                                }, {
                                  max: 1,
                                  time: 120000,
                                  erros: ["time"]
                                }).then(function (collected) {
                                  switch (collected.first().emoji.name) {
                                    case "1️⃣":
                                      break;

                                    case "2️⃣":
                                      objet.remove_others = true;
                                      break;

                                    default:
                                      message.reply("NO CORRECT INPUT! So i will use `MULTIPLE REACTION OPTION`");
                                      break;
                                  }

                                  var thisembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should be the **`Title`** of your Reaction Role?").setDescription("This will  be listed **above** the list of Emojis\n\n*Wich Emoji gives which Role*\nEnter the Title **now** (max 256 Letters)");
                                  message.reply({
                                    content: "I will use **".concat(objet.remove_others ? "Single" : "Multiple", "** Reaction Option!\n"),
                                    embed: thisembed
                                  }).then(function (msg) {
                                    msg.channel.awaitMessages(function (m) {
                                      return m.author.id === message.author.id;
                                    }, {
                                      max: 1,
                                      time: 120000,
                                      errors: ["TIME"]
                                    }).then(function (collected) {
                                      var title = String(collected.first().content).substr(0, 256);
                                      message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("In which channel do you want your Reaction Role to Be?").setDescription("Ping the Channel **now** with #channel")).then(function (msg) {
                                        msg.channel.awaitMessages(function (m) {
                                          return m.author.id === message.author.id;
                                        }, {
                                          max: 1,
                                          time: 120000,
                                          errors: ["TIME"]
                                        }).then(function (collected) {
                                          if (collected.first().mentions.channels.filter(function (ch) {
                                            return ch.guild.id == message.guild.id;
                                          }).first()) {
                                            var channel = collected.first().mentions.channels.filter(function (ch) {
                                              return ch.guild.id == message.guild.id;
                                            }).first();
                                            var embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(title.substr(0, 256)).setFooter(message.guild.name, message.guild.iconURL({
                                              dynamic: true
                                            }));
                                            var buffer = "";

                                            for (var i = 0; i < objet.Parameters.length; i++) {
                                              try {
                                                buffer += objet.Parameters[i].Emojimsg + "  **==**  <@&" + objet.Parameters[i].Role + ">\n";
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            }

                                            channel.send(embed.setDescription(buffer)).then(function (msg) {
                                              for (var i = 0; i < objet.Parameters.length; i++) {
                                                try {
                                                  msg.react(objet.Parameters[i].Emoji)["catch"](function (e) {
                                                    return console.log(e);
                                                  });
                                                } catch (e) {
                                                  console.log(e);
                                                }
                                              }

                                              objet.MESSAGE_ID = msg.id;
                                              client.reactionrole.push(message.guild.id, objet, "reactionroles");
                                              message.reply("YOUR REACTION ROLE IS FINISHED AND READY TO USE! \nIn: <#" + msg.channel.id + ">");
                                            });
                                          } else {
                                            message.reply('You didn\'t Ping a CHANNEL, CANCELLED!');
                                            return;
                                          }
                                        })["catch"](function (e) {
                                          return console.log(e);
                                        });
                                      });
                                    })["catch"](function (e) {
                                      return console.log(e);
                                    });
                                  });
                                })["catch"](function (e) {
                                  return console.log(e);
                                });
                              });
                            };

                            break;

                          case "2️⃣":
                            client.reactionrole.set(message.guild.id, {
                              reactionroles: []
                            });
                            return message.reply("Successfully resetted, ReactionRole Setup!");
                            break;

                          default:
                            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0, 1999));
                            break;
                        }
                      })["catch"](function (e) {
                        return console.log(e);
                      });

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```"))));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 8]]);
  }
};