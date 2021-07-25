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
  name: "slots",
  category: "💸 Economy",
  description: "Earn your slots cash",
  usage: "slots",
  run: function run(client, message, args, cmduser, text, prefix) {
    var slotItems, es, user, data, amount, win, number;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            slotItems = ["🍅", "🥑", "🥒", "🍆", "🥝", "🍇", "🍉", "🍊", "🍏", "💣", "🍓", "🍎", "🍒", "🍈", "🍋", "🍌"];
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "ECONOMY")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 4:
            _context.prev = 4;
            //command
            user = message.author;

            if (!user.bot) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 8:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //get the delays

            amount = parseInt(args[0]);
            win = false;

            if (amount) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't add the slotsamount").setDescription("Usage: `".concat(prefix, "slots <Amount>`\n\nExample: `").concat(prefix, "slots 420`"))));

          case 14:
            if (!(amount > data.balance)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription("You can't gamble more Money than you have in your **\uD83D\uDC5B Pocket (`".concat(data.balance, " \uD83D\uDCB8`)**"))));

          case 16:
            number = [];

            for (i = 0; i < 3; i++) {
              number[i] = Math.floor(Math.random() * slotItems.length);
            }

            if (number[0] == number[1] && number[1] == number[2]) {
              amount *= 9;
              win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
              amount *= 2;
              win = true;
            }

            if (win) {
              //write the DB
              client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance"); //get the latest data

              data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //send the Information Message

              message.channel.send(new MessageEmbed().setTitle("You've won `".concat(amount, " \uD83D\uDCB8`")).setDescription("".concat(slotItems[number[0]], " | ").concat(slotItems[number[1]], " | ").concat(slotItems[number[2]], "\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
                dynamic: true
              })));
            } else {
              //write the DB
              client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "-", amount, "balance"); //get the latest data

              data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //send the Information Message

              message.channel.send(new MessageEmbed().setTitle("You've lost `".concat(amount, " \uD83D\uDCB8`")).setDescription("".concat(slotItems[number[0]], " | ").concat(slotItems[number[1]], " | ").concat(slotItems[number[2]], "\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket")).setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
                dynamic: true
              })));
            }

            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](4);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 22]]);
  }
};