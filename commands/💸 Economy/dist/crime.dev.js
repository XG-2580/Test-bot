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
  name: "crime",
  category: "💸 Economy",
  description: "Earn your crime cash",
  usage: "crime @USER",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, timeout, time, amountarray, amount, crimemsgarray, thecrimemsg;
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
            user = message.author; //ensure the economy data

            ensure_economy_user(client, message.guild.id, user.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //get the delays

            timeout = 86400000; //if the user is on COOLDOWN, return

            if (!(data.crime !== 0 && timeout - (Date.now() - data.crime) > 0)) {
              _context.next = 13;
              break;
            }

            time = duration(timeout - (Date.now() - data.crime));
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
              })).setTitle("You've already atempted a crime Today!!").setDescription("**Try again in ".concat(time.map(function (i) {
                return "`".concat(i, "`");
              }).join(", "), "**\n\n\uD83D\uDC5B You still have `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))
            }));

          case 13:
            amountarray = [300 * 2, 350 * 2, 400 * 2, 340 * 2, 360 * 2, 350 * 2, 355 * 2, 345 * 2, 365 * 2, 350 * 2, 340 * 2, 360 * 2, 325 * 2, 375 * 2, 312.5 * 2, 387.5 * 2];
            amount = Math.floor(amountarray[Math.floor(Math.random() * amountarray.length)]);
            amount = amount * data.black_market.boost.multiplier; //get a random Crime Message

            crimemsgarray = ["You robbed the Local Bank", "You destroyed the neigbour's mailbox", "You stolen a 24k Clock from the Shop", "You robbed Döner from your Abi", "You kidnapped the sister of your stepmom", "You were driving to fast and escaped the police", "You cracked Discord Nitro", "You stole Discord Nitros", "You hacked the local Network", "You hacked the electricity of your town", "You crashed TikTok", "You stole Corona Tests", "You stole Masks"];
            thecrimemsg = crimemsgarray[Math.floor(Math.random() * crimemsgarray.length)]; //add the Money to the User's Balance in this Guild

            client.economy.math("".concat(message.guild.id, "-").concat(message.author.id), "+", amount, "balance");
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", amount, "balance"); //set the current time to the db

            client.economy.set("".concat(message.guild.id, "-").concat(message.author.id), Date.now(), "rob"); //get the new data

            data = client.economy.get("".concat(message.guild.id, "-").concat(message.author.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            })).setTitle("".concat(thecrimemsg, " and earned `").concat(amount, " \uD83D\uDCB8`")).setDescription("\uD83D\uDC5B You now have `".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in your Pocket"))));

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