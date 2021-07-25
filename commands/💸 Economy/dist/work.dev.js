"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    parseMilliseconds = _require2.parseMilliseconds,
    duration = _require2.duration,
    GetUser = _require2.GetUser,
    nFormatter = _require2.nFormatter,
    ensure_economy_user = _require2.ensure_economy_user;

module.exports = {
  name: "work",
  category: "💸 Economy",
  description: "Lets you work a job",
  usage: "work",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, timeout, time, replies, result, amount;
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
            user = message.author; //ensure the economy data

            ensure_economy_user(client, message.guild.id, user.id);

            if (!user.bot) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 8:
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //time delay for the Work

            timeout = 25 * 60 * 1000; //if user is on cooldown error

            if (!(data.work !== 0 && timeout - (Date.now() - data.work) > 0)) {
              _context.next = 15;
              break;
            }

            time = duration(timeout - (Date.now() - data.work));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already worked recently!").setDescription("\uD83D\uDD50 **Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "**\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 15:
            replies = ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic', "Prostitute", "Stripper", "Dancer", "Drawer", "Lawer", "Agent", "Superman", "Moderator", "Gamer"]; //get a random work job

            result = Math.floor(Math.random() * replies.length); //get a random money amount

            amount = Math.floor(Math.random() * 200) + 50;
            if (amount > 200) amount = amount - Math.floor(Math.random() * 50) + 1;
            amount = amount * data.black_market.boost.multiplier; //add the Money to the User's Balance in this Guild

            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "+", amount, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(user.id), Date.now(), "work"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You worked as a **".concat(replies[result], "** and earned `").concat(nFormatter(amount), " \uD83D\uDCB8`")).setDescription("\uD83D\uDC5B You now have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 26]]);
  }
};