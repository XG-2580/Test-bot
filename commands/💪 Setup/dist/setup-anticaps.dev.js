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
  name: "setup-anticaps",
  category: "💪 Setup",
  aliases: ["setupanticaps", "setup-caps", "setupcaps", "anticaps-setup", "anticapssetup"],
  cooldown: 5,
  usage: "setup-anticaps  -->  Follow the Steps",
  description: "Enable + Change the maximum Percent of UPPERCASE (caps) inside of a Message",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thesettings;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==  `\u2714\uFE0F Enable` + Set** the maximum amount of CAPS in a message\n\n2\uFE0F\u20E3 **== `\u274C Disable`** the Anti Caps System\n\n\uD83D\uDCD1 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("📑");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "set";else if (reaction.emoji.name === "2️⃣") temptype = "disable";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 22:
            if (!(temptype == "set")) {
              _context.next = 32;
              break;
            }

            _context.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("To activate the Anticaps System, enter the percent amount of how much caps in a message is allowed").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Send the amount now! (recommendet: `60%`)").setFooter(es.footertext, es.footericon)
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
                var userpercent = Number(message.content.trim().replace("%", "").split(" ")[0]);
                if (userpercent > 100 || userpercent < 0) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | Percent out of Range!").setColor(es.wrongcolor).setDescription("It must be between `0%` and `100%`").setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.set(message.guild.id, userpercent, "anticaps.percent");
                  client.settings.set(message.guild.id, true, "anticaps.enabled");
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The Anticaps system is now enabled!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If a non Admin User types a message with more then ".concat(userpercent, "% amount of CAPS his message will be deleted + he will be \"warned\" (no warn system warn but yeah)").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  console.log(e);
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
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

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 30:
            _context.next = 50;
            break;

          case 32:
            if (!(temptype == "disable")) {
              _context.next = 44;
              break;
            }

            _context.prev = 33;
            client.settings.set(message.guild.id, false, "anticaps.enabled");
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("The AntiCaps System is now **disabled**").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To enabled it type `".concat(prefix, "setup-anticaps`").substr(0, 2048)).setFooter(es.footertext, es.footericon)
            }));

          case 38:
            _context.prev = 38;
            _context.t1 = _context["catch"](33);
            console.log(_context.t1);
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
            }));

          case 42:
            _context.next = 50;
            break;

          case 44:
            if (!(temptype == "thesettings")) {
              _context.next = 49;
              break;
            }

            thesettings = client.settings.get(message.guild.id, "anticaps");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Anti Caps System").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Enabled:** ".concat(thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>", "\n          \n**Percentage, of Message allowed to be in caps:** `").concat(thesettings.percent, " %`").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 49:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 50:
            _context.next = 56;
            break;

          case 52:
            _context.prev = 52;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))
            }));

          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 52], [9, 15], [33, 38]]);
  }
};