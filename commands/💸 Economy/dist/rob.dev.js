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
  name: "rob",
  category: "💸 Economy",
  description: "Rob Money from a Specific User, you can Ping him, add his ID / Username, it will be a random amount!",
  usage: "rob @USER",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, data2, timeout, time, amountarray, amount;
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

            if (!args[0]) {
              _context.next = 16;
              break;
            }

            _context.prev = 5;
            _context.next = 8;
            return regeneratorRuntime.awrap(GetUser(message, args));

          case 8:
            user = _context.sent;
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);

            if (_context.t0) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", message.reply("UNABLE TO FIND THE USER"));

          case 15:
            return _context.abrupt("return", message.reply(_context.t0));

          case 16:
            if (user) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't pinged to whom you want to rob").setDescription("Usage: `".concat(prefix, "rob <@USER>`\n Mind you can also use a Name / Id, which would be nicer!"))));

          case 18:
            if (!user.bot) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 20:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //ensure the economy data

            ensure_economy_user(client, message.guild.id, message.author.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id));
            data2 = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //get the delays

            timeout = 86400000;

            if (!(data.rob !== 0 && timeout - (Date.now() - data.rob) > 0)) {
              _context.next = 30;
              break;
            }

            time = duration(timeout - (Date.now() - data.rob));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already robbed Today!!").setDescription("Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 30:
            if (!(data2.balance < 500)) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.reply("He does not have enough balance!"));

          case 32:
            amountarray = [300, 350, 400, 340, 360, 350, 355, 345, 365, 350, 340, 360, 325, 375, 312.5, 387.5];
            amount = Math.floor(amountarray[Math.floor(Math.random() * amountarray.length)]);
            amount = amount * data.black_market.boost.multiplier; //add the Money to the User's Balance in this Guild

            client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance");
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", amount, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), Date.now(), "rob"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("You robbed `".concat(amount, " \uD83D\uDCB8` of `").concat(user.tag, "`")).setDescription("\uD83D\uDC5B You now have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

          case 40:
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 42], [5, 11]]);
  }
};