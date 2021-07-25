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
  name: "setup-autoembed",
  category: "💪 Setup",
  aliases: ["setupautoembed", "autoembed-setup"],
  cooldown: 5,
  usage: "setup-autoembed  --> Follow the Steps",
  description: "Define a Channel where every message is replaced with an EMBED or disable this feature",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, a;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** a Channel for Auto Embeds\n\n2\uFE0F\u20E3 **== Remove** a Channel for Auto Embeds\n\n3\uFE0F\u20E3 **== Show** the Channels for Auto Embeds\n\n\uD83D\uDCD1 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("📑");
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "add";else if (reaction.emoji.name === "2️⃣") temptype = "remove";else if (reaction.emoji.name === "3️⃣") temptype = "show";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 21:
            if (!timeouterror) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            if (!(temptype == "add")) {
              _context.next = 33;
              break;
            }

            _context.next = 26;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 26:
            tempmsg = _context.sent;
            _context.next = 29;
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
                  var a = client.settings.get(message.guild.id, "autoembed");

                  if (!Array.isArray(a)) {
                    client.settings.set(message.guild.id, Array(a), "autoembed");
                    a = client.settings.get(message.guild.id, "autoembed");
                  }

                  if (a.includes(channel.id)) return message.reply(new Discord.MessageEmbed().setTitle("The Channel is already defined as an Auto Embed Channel").setDescription("You can retry the Command: `".concat(prefix, "setup-autoembed` to remove the Channel from the LIST!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                  client.settings.push(message.guild.id, channel.id, "autoembed");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now replace every message in `".concat(channel.name, "` too!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 29:
            if (!timeouterror) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 31:
            _context.next = 60;
            break;

          case 33:
            if (!(temptype == "remove")) {
              _context.next = 43;
              break;
            }

            _context.next = 36;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 36:
            tempmsg = _context.sent;
            _context.next = 39;
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
                  var a = client.settings.get(message.guild.id, "autoembed");

                  if (!Array.isArray(a)) {
                    client.settings.set(message.guild.id, Array(a), "autoembed");
                    a = client.settings.get(message.guild.id, "autoembed");
                  }

                  if (!a.includes(channel.id)) return message.reply(new Discord.MessageEmbed().setTitle("The Channel is not defined as an Auto Embed Channel yet").setDescription("You can retry the Command: `".concat(prefix, "setup-autoembed` to add the Channel to the LIST!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                  client.settings.remove(message.guild.id, channel.id, "autoembed");
                  return message.reply(new Discord.MessageEmbed().setTitle("I will now no longer replace the messages in `".concat(channel.name, "`!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 39:
            if (!timeouterror) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 41:
            _context.next = 60;
            break;

          case 43:
            if (!(temptype == "show")) {
              _context.next = 51;
              break;
            }

            a = client.settings.get(message.guild.id, "autoembed");

            if (!Array.isArray(a)) {
              client.settings.set(message.guild.id, Array(a), "autoembed");
              a = client.settings.get(message.guild.id, "autoembed");
            }

            _context.next = 48;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("I am replacing the messages in those Channels:").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(a.map(function (ch) {
                return "<#".concat(ch, ">");
              }).join(" | ")).substr(0, 2048)).setFooter(es.footertext, es.footericon)
            }));

          case 48:
            tempmsg = _context.sent;
            _context.next = 60;
            break;

          case 51:
            if (!(temptype == "thesettings")) {
              _context.next = 59;
              break;
            }

            a = client.settings.get(message.guild.id, "autoembed");

            if (!Array.isArray(a)) {
              client.settings.set(message.guild.id, Array(a), "autoembed");
              a = client.settings.get(message.guild.id, "autoembed");
            }

            _context.next = 56;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("📑 Settings of the Auto Embed-Message Replacement System").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Channels where Messages will be replaced:**\n".concat(a.map(function (ch) {
                return "<#".concat(ch, ">");
              }).join(" | ")).substr(0, 2048)).setFooter(es.footertext, es.footericon)
            }));

          case 56:
            tempmsg = _context.sent;
            _context.next = 60;
            break;

          case 59:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 60:
            _context.next = 66;
            break;

          case 62:
            _context.prev = 62;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 62], [9, 16]]);
  }
};