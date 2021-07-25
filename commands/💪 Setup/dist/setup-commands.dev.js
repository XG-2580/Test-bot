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
  name: "setup-commands",
  category: "💪 Setup",
  aliases: ["setupcommands", "setup-command", "setupcommand"],
  cooldown: 5,
  usage: "setup-commands  -->  Follow the Steps",
  description: "Enable/Disable specific Commands",
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** ".concat(client.settings.get(message.guild.id, "MUSIC") ? "Disable Music Commands" : "Enable Music Commands", "\n        \n        2\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "FUN") ? "Disable Fun Commands" : "Enable Fun Commands", "\n\n        3\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "ECONOMY") ? "Disable Economy Commands" : "Enable Economy Commands", "\n\n        4\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "NSFW") ? "Disable NSFW Commands" : "Enable NSFW Commands", "\n\n        5\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "SCHOOL") ? "Disable SCHOOL Commands" : "Enable SCHOOL Commands", "\n\n        6\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "MINIGAMES") ? "Disable MINIGAMES Commands" : "Enable MINIGAMES Commands", "\n\n        7\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "VOICE") ? "Disable Voice Commands" : "Enable Voice Commands", " (Join to Create)\n        \n        8\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "SOUNDBOARD") ? "Disable SOUNDBOARD Commands" : "Enable SOUNDBOARD Commands", "\n\n        *React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

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
              if (reaction.emoji.name === "1️⃣") temptype = "MUSIC";else if (reaction.emoji.name === "2️⃣") temptype = "FUN";else if (reaction.emoji.name === "3️⃣") temptype = "ECONOMY";else if (reaction.emoji.name === "4️⃣") temptype = "NSFW";else if (reaction.emoji.name === "5️⃣") temptype = "SCHOOL";else if (reaction.emoji.name === "6️⃣") temptype = "MINIGAMES";else if (reaction.emoji.name === "7️⃣") temptype = "VOICE";else if (reaction.emoji.name === "8️⃣") temptype = "SOUNDBOARD";else throw "You reacted with a wrong emoji";
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
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, temptype), temptype);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, temptype) ? "Enabled" : "Disabled", " ").concat(temptype, " Commands")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 31], [9, 20]]);
  }
};