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
  name: "dice",
  category: "💸 Economy",
  description: "Earn your dice cash",
  usage: "dice <roll-result> <Gamble-Amount>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, roll, amount, valid_Numbers, result, win;
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
            ensure_economy_user(client, message.guild.id, user.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //get the delays

            roll = args[0]; //Should be a number between 1 and 6

            amount = args[1]; //Coins to gamble

            if (!(!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll)))) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Specify the `roll-result`, it should be a number between `1`-`6`").setDescription("Usage: `".concat(prefix, "dice <roll-result> <Gamble-Amount>`\n\nExample: `").concat(prefix, "dice 3 100`"))));

          case 13:
            if (amount) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Specify the **amount of `Coins \uD83D\uDCB8`** you want to gamble!").setDescription("Usage: `".concat(prefix, "dice <roll-result> <Gamble-Amount>`\n\nExample: `").concat(prefix, "dice 3 100`"))));

          case 15:
            if (!(data.balance < amount)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You can't gamble more Money than you have in your **\uD83D\uDC5B Pocket (`".concat(data.balance, " \uD83D\uDCB8`)**"))));

          case 17:
            valid_Numbers = [1, 2, 3, 4, 5, 6];
            result = valid_Numbers[Math.floor(Math.random() * valid_Numbers.length)];
            win = false;
            if (parseInt(roll) == result) win = true;

            if (win) {
              //double the amount
              amount *= 4; //write the DB

              client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance"); //get the latest data

              data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //send the Information Message

              message.channel.send(new MessageEmbed().setTitle("You've won `".concat(amount, " \uD83D\uDCB8`")).setDescription("**The Dice rolled: `".concat(result, "`**\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
                dynamic: true
              })));
            } else {
              //write the DB
              client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "-", amount, "balance"); //get the latest data

              data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //send the Information Message

              message.channel.send(new MessageEmbed().setTitle("You've lost `".concat(amount, " \uD83D\uDCB8`")).setDescription("**The Dice rolled: `".concat(result, "`**\n\n\uD83D\uDC5B You now have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket")).setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
                dynamic: true
              })));
            }

            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 24]]);
  }
};