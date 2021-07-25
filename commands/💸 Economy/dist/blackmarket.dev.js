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
  name: "blackmarket",
  category: "💸 Economy",
  description: "Shows the Black Market",
  usage: "blackmarket <Multiplier>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, timeout, time, prize, amount;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "ECONOMY")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: **`".concat(prefix, "setup-commands`"))));

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

            timeout = 86400000 * 5; //if the user is on delay return some error

            if (!(data.black_market.boost.time !== 0 && timeout - (Date.now() - data.black_market.boost.time) > 0)) {
              _context.next = 15;
              break;
            }

            time = duration(timeout - (Date.now() - data.black_market.boost.timee));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already bought a 2 Day Boost in the last 5 Days!").setDescription("\uD83D\uDD50 **Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "**\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 15:
            prize = 10000;
            amount = parseInt(args[0]);

            if (amount) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You did not add the Multiplier you want to buy for 2 Days!").setDescription("Usage: `".concat(prefix, "blackmarket <Multiplier>`\n\nExample: `").concat(prefix, "blackmarket 3`"))));

          case 19:
            if (!(amount == 0 || amount < 0)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot buy a 0 or less then 0 Multiplier, for 2 Days").setDescription("Usage: `".concat(prefix, "blackmarket <Multiplier>`\n\nExample: `").concat(prefix, "blackmarket 3`"))));

          case 21:
            if (!(amount == 1)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot buy a 1 Multiplier, for 2 Days").setDescription("Usage: `".concat(prefix, "blackmarket <Multiplier>`\n\nExample: `").concat(prefix, "blackmarket 3`"))));

          case 23:
            if (!(amount > 5)) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot buy a Multiplier bigger then 5, for 2 Days").setDescription("Usage: `".concat(prefix, "blackmarket <Multiplier>`\n\nExample: `").concat(prefix, "blackmarket 3`"))));

          case 25:
            if (!(prize * (amount - 1) > data.balance)) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't pay more Money (`".concat(amount - 1, "x ").concat(prize, "`) than you have in your **\uD83D\uDC5B Pocket (`").concat(data.balance, " \uD83D\uDCB8`)**"))));

          case 27:
            //add the Money to the User's Balance in this Guild
            client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "-", prize * (amount - 1), "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), Date.now(), "black_market.boost.time");
            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), amount, "black_market.boost.multiplier"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("You've bought a ".concat(amount, "x Boost for 2 Days, for `").concat(prize * (amount - 1), " \uD83D\uDCB8`, You can buy one again in 5 Days")).setDescription("\uD83D\uDC5B You now have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket\n\nEvery single INCOME will now be ").concat(amount, "x Worth for 3 DAYS"))));

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 34]]);
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