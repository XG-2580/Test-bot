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
  name: "setup-suggestion",
  category: "💪 Setup",
  aliases: ["setupsuggestion", "suggestionsetup", "suggestsetup", "suggestion-setup", "suggest-setup", "setup-suggest", "setupsuggest"],
  cooldown: 5,
  usage: "setup-suggestion  -->  Follow the Steps",
  description: "Manage the Suggestions System, messages, emojis and Enable/Disable",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== `\u2714\uFE0F Enable` / Set** a Channel\n\n2\uFE0F\u20E3 **== Define Approve** Text\n\n3\uFE0F\u20E3 **== Define Deny** Text\n\n4\uFE0F\u20E3 **== Define Maybe** Text\n\n5\uFE0F\u20E3  **== Define Status** Text\n\n6\uFE0F\u20E3 **== Define Footer** Text\n\n7\uFE0F\u20E3 **== Define Approve** Emoji\n\n8\uFE0F\u20E3 **== Define Decline** Emoji\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            tempmsg.react("6️⃣");
            tempmsg.react("7️⃣");
            tempmsg.react("8️⃣");
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "channel";else if (reaction.emoji.name === "2️⃣") temptype = "approvemsg";else if (reaction.emoji.name === "3️⃣") temptype = "denymsg";else if (reaction.emoji.name === "4️⃣") temptype = "maybemsg";else if (reaction.emoji.name === "5️⃣") temptype = "status";else if (reaction.emoji.name === "6️⃣") temptype = "footer";else if (reaction.emoji.name === "7️⃣") temptype = "approve";else if (reaction.emoji.name === "8️⃣") temptype = "decline";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 25:
            if (!timeouterror) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 27:
            if (!(temptype == "channel")) {
              _context.next = 37;
              break;
            }

            _context.next = 30;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use as the Suggestion Channel?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now! #channel").setFooter(es.footertext, es.footericon)
            }));

          case 30:
            tempmsg = _context.sent;
            _context.next = 33;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var channel = message.mentions.channels.filter(function (ch) {
                return ch.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.settings.set(message.guild.id, channel.id, "suggest.channel");
                  return message.reply(new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now registered as the Suggestion Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Start writing in there, to write a Suggestion, to accept/deny them use the: `".concat(prefix, "suggest <approve/deny/maybe> <MESSAGEID> [REASON]` command").substr(0, 2048)).setFooter(es.footertext, es.footericon));
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

          case 33:
            if (!timeouterror) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 35:
            _context.next = 109;
            break;

          case 37:
            if (!(temptype == "approvemsg")) {
              _context.next = 47;
              break;
            }

            _context.next = 40;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new Approve Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please write the Message now! Example: `Accepted Idea! Expect this soon.`").setFooter(es.footertext, es.footericon)
            }));

          case 40:
            tempmsg = _context.sent;
            _context.next = 43;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message) {
                try {
                  client.settings.remove(message.guild.id, message.content, "suggest.approvemsg");
                  return message.reply(new Discord.MessageEmbed().setTitle("I changed the Approve Message to...").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content).substr(0, 2048)).setFooter(es.footertext, es.footericon));
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

          case 43:
            if (!timeouterror) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 45:
            _context.next = 109;
            break;

          case 47:
            if (!(temptype == "denymsg")) {
              _context.next = 57;
              break;
            }

            _context.next = 50;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new Deny Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please write the Message now! Example: `Thank you for the feedback, but we are not interested in this idea at this time.`").setFooter(es.footertext, es.footericon)
            }));

          case 50:
            tempmsg = _context.sent;
            _context.next = 53;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message) {
                try {
                  client.settings.remove(message.guild.id, message.content, "suggest.denymsg");
                  return message.reply(new Discord.MessageEmbed().setTitle("I changed the Deny Message to...").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content).substr(0, 2048)).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 53:
            if (!timeouterror) {
              _context.next = 55;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 55:
            _context.next = 109;
            break;

          case 57:
            if (!(temptype == "maybemsg")) {
              _context.next = 67;
              break;
            }

            _context.next = 60;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new Maybe Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please write the Message now! Example: `\uD83D\uDCA1 We are thinking about this idea!`").setFooter(es.footertext, es.footericon)
            }));

          case 60:
            tempmsg = _context.sent;
            _context.next = 63;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message) {
                try {
                  client.settings.remove(message.guild.id, message.content, "suggest.maybemsg");
                  return message.reply(new Discord.MessageEmbed().setTitle("I changed the Maybe Message to...").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content).substr(0, 2048)).setFooter(es.footertext, es.footericon));
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

          case 63:
            if (!timeouterror) {
              _context.next = 65;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 65:
            _context.next = 109;
            break;

          case 67:
            if (!(temptype == "status")) {
              _context.next = 77;
              break;
            }

            _context.next = 70;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new Status Text?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please write the Message now! Example: `Waiting for Community Feedback, please vote!`").setFooter(es.footertext, es.footericon)
            }));

          case 70:
            tempmsg = _context.sent;
            _context.next = 73;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message) {
                try {
                  client.settings.remove(message.guild.id, message.content, "suggest.statustext");
                  return message.reply(new Discord.MessageEmbed().setTitle("I changed the Status Text to...").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content).substr(0, 2048)).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 73:
            if (!timeouterror) {
              _context.next = 75;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 75:
            _context.next = 109;
            break;

          case 77:
            if (!(temptype == "footer")) {
              _context.next = 87;
              break;
            }

            _context.next = 80;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new Footer Text?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please write the Message now! Example: `Want to suggest / Feedback something? Simply type in this channel!`").setFooter(es.footertext, es.footericon)
            }));

          case 80:
            tempmsg = _context.sent;
            _context.next = 83;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();

              if (message) {
                try {
                  client.settings.remove(message.guild.id, message.content, "suggest.footertext");
                  return message.reply(new Discord.MessageEmbed().setTitle("I changed the Footer Text to...").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content).substr(0, 2048)).setFooter(es.footertext, es.footericon));
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

          case 83:
            if (!timeouterror) {
              _context.next = 85;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 85:
            _context.next = 109;
            break;

          case 87:
            if (!(temptype == "approve")) {
              _context.next = 97;
              break;
            }

            _context.next = 90;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the reacted Approve Emoji?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Just react to **this** Message!").setFooter(es.footertext, es.footericon)
            }));

          case 90:
            tempmsg = _context.sent;
            _context.next = 93;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(function (reaction, user) {
              return user.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();

              if (reaction) {
                try {
                  if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                    client.settings.remove(message.guild.id, collected.first().emoji.id, "suggest.approveemoji");
                    return message.reply(new Discord.MessageEmbed().setTitle("Successfully changed the Approve emoji").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  } else if (collected.first().emoji.name) {
                    client.settings.remove(message.guild.id, collected.first().emoji.name, "suggest.approveemoji");
                    return message.reply(new Discord.MessageEmbed().setTitle("Successfully changed the Approve emoji").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  } else {
                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  }
                } catch (e) {
                  console.log(e);
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't reacted with a valid Emoji";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 93:
            if (!timeouterror) {
              _context.next = 95;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 95:
            _context.next = 109;
            break;

          case 97:
            if (!(temptype == "decline")) {
              _context.next = 107;
              break;
            }

            _context.next = 100;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the reacted Decline Emoji?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Just react to **this** Message!").setFooter(es.footertext, es.footericon)
            }));

          case 100:
            tempmsg = _context.sent;
            _context.next = 103;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(function (reaction, user) {
              return user.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();

              if (reaction) {
                try {
                  if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                    client.settings.remove(message.guild.id, collected.first().emoji.id, "suggest.denyemoji");
                    return message.reply(new Discord.MessageEmbed().setTitle("Successfully changed the Deny emoji").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  } else if (collected.first().emoji.name) {
                    client.settings.remove(message.guild.id, collected.first().emoji.name, "suggest.denyemoji");
                    return message.reply(new Discord.MessageEmbed().setTitle("Successfully changed the Deny emoji").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  } else {
                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  }
                } catch (e) {
                  console.log(e);
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't reacted with a valid Emoji";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 103:
            if (!timeouterror) {
              _context.next = 105;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 105:
            _context.next = 109;
            break;

          case 107:
            console.log("e");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 109:
            _context.next = 115;
            break;

          case 111:
            _context.prev = 111;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 115:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 111], [9, 20]]);
  }
};