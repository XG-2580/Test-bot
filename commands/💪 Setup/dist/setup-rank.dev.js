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
  name: "setup-rank",
  category: "💪 Setup",
  aliases: ["setuprank", "rank-setup"],
  cooldown: 5,
  usage: "setup-rank --> Follow Steps",
  description: "Manage the Ranking System with stuff like channel, background, etc",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, url;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Set Channel** to send Level Up Messages\n\n2\uFE0F\u20E3 **== Reply** with Level Up Messages\n\n3\uFE0F\u20E3 **== Disable** Level Up Messages\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "channel";else if (reaction.emoji.name === "2️⃣") temptype = "reply";else if (reaction.emoji.name === "3️⃣") temptype = "disable";else throw "You reacted with a wrong emoji";
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
            if (!(temptype == "channel")) {
              _context.next = 32;
              break;
            }

            _context.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
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
              var channel = message.mentions.channels.filter(function (ch) {
                return ch.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  client.points.set(message.guild.id, channel.id, "channel");
                  client.points.set(message.guild.id, false, "disabled");
                  return message.channel.send(new Discord.MessageEmbed().setTitle("I will now send the Levelup Messages in `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
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
            _context.next = 81;
            break;

          case 32:
            if (!(temptype == "reply")) {
              _context.next = 44;
              break;
            }

            _context.prev = 33;
            client.points.set(message.guild.id, false, "channel");
            client.points.set(message.guild.id, false, "disabled");
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("I will now reply with the Levelup Messages").setDescription("To disable them, type: `".concat(prefix, "setup-rank disable`To send them into a channel, type: `").concat(prefix, "setup-rank channel #channel`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 39:
            _context.prev = 39;
            _context.t1 = _context["catch"](33);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 42:
            _context.next = 81;
            break;

          case 44:
            if (!(temptype == "disable")) {
              _context.next = 57;
              break;
            }

            _context.prev = 45;

            if (!client.points.get(message.guild.id, "disabled")) {
              _context.next = 48;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Level Up Messages are Already Disabled").setColor(es.wrongcolor).setDescription("To enable them again type: `".concat(prefix, "setup-rank reply`")).setFooter(es.footertext, es.footericon)));

          case 48:
            client.points.set(message.guild.id, true, "disabled");
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("Disabled Levelup Messages").setDescription("To enable them again type: `".concat(prefix, "setup-rank reply`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 52:
            _context.prev = 52;
            _context.t2 = _context["catch"](45);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 55:
            _context.next = 81;
            break;

          case 57:
            if (!(temptype == "setbg")) {
              _context.next = 69;
              break;
            }

            _context.prev = 58;
            _context.next = 61;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setColor(ee.color).setTitle("Which Image should i Use?").setDescription("*Just Send the Url*").setFooter("Pick the INDEX NUMBER / send the IMAGE URl", ee.footericon).setThumbnail(ee.footericon)
            }).then(function (msg) {
              msg.channel.awaitMessages(function (m) {
                return m.author.id === message.author.id;
              }, {
                max: 1,
                time: 30000,
                errors: ['time']
              }).then(function (collected) {
                if (collected.first().attachments.size > 0) {
                  if (collected.first().attachments.every(attachIsImage)) {
                    client.setups.set(message.guild.id, url, "ranking.backgroundimage");
                    return message.channel.send(new Discord.MessageEmbed().setTitle("Successfully, set your Background Image!").setDescription("Please make sure to **not** delete your Image from the Channel!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                  } else {
                    return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
                  }
                } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                  client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage");
                  return message.channel.send(new Discord.MessageEmbed().setTitle("Successfully, set your Background Image!").setDescription("Please make sure to **not** delete your Image from the Channel!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } else {
                  return message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Could not your message as a backgroundimage").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
                }

                function attachIsImage(msgAttach) {
                  url = msgAttach.url; //True if this url is a png image.

                  return url.indexOf("png", url.length - "png".length
                  /*or 3*/
                  ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                  /*or 3*/
                  ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                  /*or 3*/
                  ) !== -1;
                }
              });
            }));

          case 61:
            tempmsg = _context.sent;
            _context.next = 67;
            break;

          case 64:
            _context.prev = 64;
            _context.t3 = _context["catch"](58);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 67:
            _context.next = 81;
            break;

          case 69:
            if (!(temptype == "resetbg")) {
              _context.next = 80;
              break;
            }

            _context.prev = 70;
            client.setups.set(message.guild.id, "null", "ranking.backgroundimage");
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("Resetted Levelup Message Image Background").setDescription("I will now use the Default Levelup Image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 75:
            _context.prev = 75;
            _context.t4 = _context["catch"](70);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t4)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 78:
            _context.next = 81;
            break;

          case 80:
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 81:
            _context.next = 87;
            break;

          case 83:
            _context.prev = 83;
            _context.t5 = _context["catch"](1);
            console.log(String(_context.t5.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t5)).substr(0, 2000), "```"))));

          case 87:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 83], [9, 15], [33, 39], [45, 52], [58, 64], [70, 75]]);
  }
};