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
  name: "weekly",
  category: "💸 Economy",
  description: "Earn your weekly cash",
  usage: "weekly",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, timeout, time, amountarray, amount;
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

            timeout = 86400000 * 7;

            if (!(data.weekly !== 0 && timeout - (Date.now() - data.weekly) > 0)) {
              _context.next = 15;
              break;
            }

            time = duration(timeout - (Date.now() - data.weekly));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already collected your weekly reward!").setDescription("\uD83D\uDD50 **Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "**\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 15:
            amountarray = [300 * 5, 350 * 5, 400 * 5, 340 * 5, 360 * 5, 350 * 5, 355 * 5, 345 * 5, 365 * 5, 350 * 5, 340 * 5, 360 * 5, 325 * 5, 375 * 5, 312.5 * 5, 387.5 * 5];
            amount = Math.floor(amountarray[Math.floor(Math.random() * amountarray.length)]);
            amount = amount * data.black_market.boost.multiplier; //add the Money to the User's Balance in this Guild

            client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), Date.now(), "weekly"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("You've collected your weekly reward of `".concat(nFormatter(amount), " \uD83D\uDCB8`")).setDescription("\uD83D\uDC5B You now have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

          case 22:
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