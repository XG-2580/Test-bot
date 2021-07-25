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
  name: "withdraw",
  category: "💸 Economy",
  aliases: ["tobank"],
  description: "Allows you to withdraw a specific amount or everything from your Bank",
  usage: "withdraw <AMOUNT/ALL>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, withdrawed, amount;
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

            if (!user.bot) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 7:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id);
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));

            if (args[0]) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't provide a valid Argument").setDescription("Usage: `".concat(prefix, "withdraw <All/Amount>`\n\nExample: `").concat(prefix, "withdraw 100`"))));

          case 11:
            if (!(args[0].toLowerCase() == "all")) {
              _context.next = 19;
              break;
            }

            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "+", data.bank, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(user.id), 0, "bank");
            withdrawed = data.balance;
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You withdrawed **`".concat(nFormatter(withdrawed), "\uD83D\uDCB8`** from your Bank")).setDescription("**\uD83C\uDFE6 You now have `".concat(nFormatter(Math.floor(data.bank)), " \uD83D\uDCB8` in your Bank**\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

          case 19:
            amount = Number(args[0]);

            if (!(amount <= 0)) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't withdraw a negative Amount of Money or no Money, from your Bank")));

          case 22:
            if (!(amount > data.bank)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't withdraw more Money than you have in your **\uD83C\uDFE6 Bank (`".concat(data.balance, " \uD83D\uDCB8`)**"))));

          case 24:
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "+", amount, "balance");
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", amount, "bank"); //get the data

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //show the message

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You withdrawed **`".concat(nFormatter(amount), "\uD83D\uDCB8`** from your Bank")).setDescription("**\uD83C\uDFE6 You now have `".concat(nFormatter(Math.floor(data.bank)), " \uD83D\uDCB8` in your Bank**\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

          case 28:
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 30]]);
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