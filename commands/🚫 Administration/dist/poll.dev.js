"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    DiscordAPIError = _require.DiscordAPIError,
    Message = _require.Message;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "poll",
  category: "🚫 Administration",
  aliases: ["abstimmung", "umfrage", "poll"],
  cooldown: 2,
  usage: "poll --> Follow Steps / poll <TEXT> ... to create it instantly",
  description: "Creates a Poll",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.poll");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 25;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.poll");
              }
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 27:
            if (!args[0]) {
              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Where should the Poll start?").setDescription("Ping the Channel now! #channel")).then(function (msg) {
                msg.channel.awaitMessages(function (m) {
                  return m.author.id === message.author.id;
                }, {
                  max: 1,
                  time: 30000,
                  errors: ["time"]
                }).then(function (collected) {
                  var channel = collected.first().mentions.channels.filter(function (ch) {
                    return ch.guild.id == message.guild.id;
                  }).first();
                  if (!channel) return message.reply(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not ping a valid Channel | CANCELLED"));
                  message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What Style do you want?").setDescription(":one: **==** Yes/No Poll\n\n:two: **==** Upvote / Downvote\n\n:three: **==** Selections Poll")).then(function (msg) {
                    msg.react("1️⃣");
                    msg.react("2️⃣");
                    msg.react("3️⃣");
                    msg.awaitReactions(function (reaction, user) {
                      return user.id === message.author.id;
                    }, {
                      max: 1,
                      time: 30000,
                      errors: ["time"]
                    }).then(function (collected) {
                      var reaction = collected.first();

                      if (reaction.emoji.name == "1️⃣") {
                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should the Poll contain?").setDescription("Send the Poll now!")).then(function (msg) {
                          msg.channel.awaitMessages(function (m) {
                            return m.author.id === message.author.id;
                          }, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                          }).then(function (collected) {
                            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("".concat(message.guild.name, " | POLL"), "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V").setFooter("by: ".concat(message.author.username), message.author.displayAvatarURL({
                              dynamic: true
                            })).setDescription(collected.first().content)).then(function (msg) {
                              msg.react("✅");
                              msg.react("❌");
                            });
                          });
                        });
                      } else if (reaction.emoji.name == "2️⃣") {
                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should the Poll contain?").setDescription("Send the Poll now!")).then(function (msg) {
                          msg.channel.awaitMessages(function (m) {
                            return m.author.id === message.author.id;
                          }, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                          }).then(function (collected) {
                            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("".concat(message.guild.name, " | POLL"), "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V").setFooter("by: ".concat(message.author.username), message.author.displayAvatarURL({
                              dynamic: true
                            })).setDescription(collected.first().content)).then(function (msg) {
                              msg.react("👍");
                              msg.react("👎");
                            });
                          });
                        });
                      } else if (reaction.emoji.name == "3️⃣") {
                        var ask_emoji = function ask_emoji() {
                          if (emojicounter == 11) send_poll();
                          message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should ".concat(emojis[emojicounter], " mean?")).setDescription("Send the Poll-Question-Text for that Emoji now!\n\nType `finish` if you wanna send the POLL")).then(function (msg) {
                            msg.channel.awaitMessages(function (m) {
                              return m.author.id === message.author.id;
                            }, {
                              max: 1,
                              time: 30000,
                              errors: ["time"]
                            }).then(function (collected) {
                              if (String(collected.first().content).toLowerCase() == "finish") send_poll();else {
                                emojicounter++;
                                emojicontent.push(String(collected.first().content).substr(0, 1024));
                                ask_emoji();
                              }
                            });
                          })["catch"](function (e) {
                            send_poll();
                          });
                        };

                        var send_poll = function send_poll() {
                          message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should the Poll Description?").setDescription("Send the Poll-Description now!\nEnter `no` for no Description")).then(function (msg) {
                            msg.channel.awaitMessages(function (m) {
                              return m.author.id === message.author.id;
                            }, {
                              max: 1,
                              time: 30000,
                              errors: ["time"]
                            }).then(function (collected) {
                              var embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("".concat(message.guild.name, " | POLL"), "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V").setFooter("by: ".concat(message.author.username), message.author.displayAvatarURL({
                                dynamic: true
                              }));
                              if (collected.first().content.toLowerCase() != "no") embed.setDescription(collected.first().content);

                              for (var i = 0; i < emojicontent.length; i++) {
                                embed.addField(emojis[i] + " :", emojicontent[i]);
                              }

                              channel.send(embed).then(function (msg) {
                                for (var _i = 0; _i < emojicounter; _i++) {
                                  msg.react(emojis[_i]);
                                }
                              });
                            });
                          })["catch"](function (e) {
                            var embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("".concat(message.guild.name, " | POLL"), "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V").setFooter("by: ".concat(message.author.username), message.author.displayAvatarURL({
                              dynamic: true
                            }));

                            for (var i = 0; i < emojicontent.length; i++) {
                              embed.addField(emojis[i] + " :", emojicontent[i]);
                            }

                            channel.send(embed).then(function (msg) {
                              for (var _i2 = 0; _i2 < emojicounter; _i2++) {
                                msg.react(emojis[_i2]);
                              }
                            });
                          });
                        };

                        var emojicounter = 0;
                        var emojicontent = [];
                        var emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
                        ask_emoji();
                      } else {
                        return message.reply(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not react with an valid Emoji | CANCELLED"));
                      }
                    });
                  });
                });
              });
            } else {
              message["delete"]()["catch"](function (e) {
                return console.log("Couldn't delete msg, this is a catch to prevent crash");
              });
              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("".concat(message.guild.name, " | POLL"), "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V").setFooter("by: ".concat(message.author.username), message.author.displayAvatarURL({
                dynamic: true
              })).setDescription(args.join(" "))).then(function (msg) {
                msg.react("👍");
                msg.react("👎");
              });
            }

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 39;
              break;
            }

            _context.prev = 29;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 33:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](29);
            console.log(_context.t1);

          case 39:
            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t2.stack, "```"))));

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 41], [9, 13, 17, 25], [18,, 20, 24], [29, 36]]);
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