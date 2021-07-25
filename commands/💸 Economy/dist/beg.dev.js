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
  name: "beg",
  category: "💸 Economy",
  description: "earn your beg cash",
  usage: "beg",
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

            return _context.abrupt("return", message.reply("**A Discord Bot Can Not Have Economy!**"));

          case 7:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            console.log(data.black_market.boost.multiplier); //get the delays

            timeout = 180000;

            if (!(data.beg !== 0 && timeout - (Date.now() - data.beg) > 0)) {
              _context.next = 16;
              break;
            }

            time = duration(timeout - (Date.now() - data.beg));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already collected your beg reward!").setDescription("\uD83D\uDD50 **Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "**\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 16:
            amountarray = [10, 50, 100, 30, 60, 50, 55, 45, 65, 50, 40, 60, 25, 75, 12.5, 87.5];
            amount = Math.floor(amountarray[Math.floor(Math.random() * amountarray.length)]);
            amount = amount * data.black_market.boost.multiplier; //add the Money to the User's Balance in this Guild

            client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), Date.now(), "beg"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("You've Collected Your Beg Reward Of `".concat(amount, " \uD83D\uDCB8`")).setDescription("\uD83D\uDC5B You Now Have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` In Your Pocket"))));

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 25]]);
  }
};