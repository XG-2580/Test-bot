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
  name: "setup-validcode",
  category: "💪 Setup",
  aliases: ["setupvalidcode", "validcode-setup", "validcodesetup"],
  cooldown: 5,
  usage: "setup-validcode  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, d2p, thesettings;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do? | REPORT LOG").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("> 1\uFE0F\u20E3 **== ".concat(client.settings.get(message.guild.id, "validcode") ? "`❌ Disable`" : "`✔️ Enable`", "** Valid Code System\n\n> \uD83D\uDCD1 **== `Show Settings`**\n\n**Note:**\n> *If someone sends a message with a valid code snippet in it, i will react with:* <a:Valid_Code_Developer:858405056238714930>\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;

            d2p = function d2p(bool) {
              return bool ? "`✔️ Enabled`" : "`❌ Disabled`";
            };

            _context.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("📑");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Missing Permission to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(_context.t0.message ? _context.t0.message : _context.t0).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "toggle";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            if (!(temptype == "toggle")) {
              _context.next = 27;
              break;
            }

            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "validcode"), "validcode");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Valid Code Setup is now ".concat(d2p(client.settings.get(message.guild.id, "validcode")), "!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 27:
            if (!(temptype == "thesettings")) {
              _context.next = 32;
              break;
            }

            thesettings = client.settings.get(message.guild.id, "aichat");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Valid Code Setup").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(d2p(client.settings.get(message.guild.id, "validcode"))).substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 32:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 33:
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(_context.t1.message ? _context.t1.message : _context.t1).substr(0, 2000), "```"))));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 35], [10, 15]]);
  }
};