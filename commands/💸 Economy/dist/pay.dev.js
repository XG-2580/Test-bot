"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    parseMilliseconds = _require2.parseMilliseconds,
    duration = _require2.duration,
    GetUser = _require2.GetUser,
    nFormatter = _require2.nFormatter,
    ensure_economy_user = _require2.ensure_economy_user;

module.exports = {
  name: "pay",
  category: "💸 Economy",
  aliases: ["givemoney"],
  description: "Pays Money to someone else!",
  usage: "pay <@USER> <Amount>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, topay, payamount, data, data2;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "ECONOMY")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            //command
            user = message.author;
            topay = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first();

            if (topay) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't pinged to whom you want to pay").setDescription("Usage: `".concat(prefix, "pay <@USER> <Amount>`\n\nExample: `").concat(prefix, "pay <@442355791412854784> 42069`"))));

          case 8:
            topay = topay.user;
            payamount = Number(args[1]);

            if (payamount) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't add the payamount").setDescription("Usage: `".concat(prefix, "pay <@USER> <Amount>`\n\nExample: `").concat(prefix, "pay <@442355791412854784> 42069`"))));

          case 12:
            if (!(user.bot || topay.bot)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 14:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //ensure the economy data

            ensure_economy_user(client, message.guild.id, topay.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            data2 = client.economy.get("".concat(message.guild.id, "-").concat(topay.id));

            if (!(payamount <= 0)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't pay a negative Amount of Money or no Money, to ".concat(topay))));

          case 20:
            if (!(payamount > data.balance)) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't pay more Money than you have in your **\uD83D\uDC5B Pocket (`".concat(data.balance, " \uD83D\uDCB8`)**"))));

          case 22:
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", payamount, "balance");
            client.economy.math("".concat(message.guild.id, "-").concat(topay.id), "+", payamount, "balance");
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            data2 = client.economy.get("".concat(message.guild.id, "-").concat(topay.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("**You payed `".concat(payamount, " \uD83D\uDCB8` to `").concat(topay.tag, "`**")).setDescription("\uD83D\uDC5B **You** now have `".concat(Math.floor(data.balance), " \uD83D\uDCB8` in your Pocket\n\n\uD83D\uDC5B **").concat(topay.username, "** now has `").concat(Math.floor(data2.balance), " \uD83D\uDCB8` in his/her Pocket"))));

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 29]]);
  }
};
/**
* @INFO
* Bot Coded by XG#2846 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
* @INFO
* Work for Milrato Development | https://Limsathya
* @INFO
* Please mention Him / Milrato Development, when using this Code!
* @INFO
*/