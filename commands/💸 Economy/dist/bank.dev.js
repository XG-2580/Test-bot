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
  name: "bank",
  category: "💸 Economy",
  description: "Lets you check how much money you have",
  usage: "bank [@USER]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, items, itemsvalue, itemarray, prize;
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
              _context.next = 18;
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
            _context.next = 19;
            break;

          case 18:
            user = message.author;

          case 19:
            if (!user || user == null || user.id == null || !user.id) user = message.author;

            if (!user.bot) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 22:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //get the economy data 

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            items = 0;
            itemsvalue = 0;
            _context.t1 = regeneratorRuntime.keys(data.items);

          case 27:
            if ((_context.t2 = _context.t1()).done) {
              _context.next = 73;
              break;
            }

            itemarray = _context.t2.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context.t3 = itemarray.toLowerCase();
            _context.next = _context.t3 === "yacht" ? 34 : _context.t3 === "lamborghini" ? 36 : _context.t3 === "car" ? 38 : _context.t3 === "motorbike" ? 40 : _context.t3 === "bicycle" ? 42 : _context.t3 === "nike" ? 44 : _context.t3 === "tshirt" ? 46 : _context.t3 === "mansion" ? 48 : _context.t3 === "house" ? 50 : _context.t3 === "dirthut" ? 52 : _context.t3 === "pensil" ? 54 : _context.t3 === "pen" ? 56 : _context.t3 === "condom" ? 58 : _context.t3 === "bottle" ? 60 : _context.t3 === "fish" ? 62 : _context.t3 === "hamster" ? 64 : _context.t3 === "dog" ? 66 : _context.t3 === "cat" ? 68 : 70;
            break;

          case 34:
            prize = 75000;
            return _context.abrupt("break", 70);

          case 36:
            prize = 50000;
            return _context.abrupt("break", 70);

          case 38:
            prize = 6400;
            return _context.abrupt("break", 70);

          case 40:
            prize = 1500;
            return _context.abrupt("break", 70);

          case 42:
            prize = 500;
            return _context.abrupt("break", 70);

          case 44:
            prize = 300;
            return _context.abrupt("break", 70);

          case 46:
            prize = 60;
            return _context.abrupt("break", 70);

          case 48:
            prize = 45000;
            return _context.abrupt("break", 70);

          case 50:
            prize = 8000;
            return _context.abrupt("break", 70);

          case 52:
            prize = 150;
            return _context.abrupt("break", 70);

          case 54:
            prize = 20;
            return _context.abrupt("break", 70);

          case 56:
            prize = 10;
            return _context.abrupt("break", 70);

          case 58:
            prize = 30;
            return _context.abrupt("break", 70);

          case 60:
            prize = 50;
            return _context.abrupt("break", 70);

          case 62:
            prize = 1000;
            return _context.abrupt("break", 70);

          case 64:
            prize = 1500;
            return _context.abrupt("break", 70);

          case 66:
            prize = 2000;
            return _context.abrupt("break", 70);

          case 68:
            prize = 2000;
            return _context.abrupt("break", 70);

          case 70:
            itemsvalue += prize * data.items["".concat(itemarray)];
            _context.next = 27;
            break;

          case 73:
            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("\uD83D\uDC5B **".concat(user == message.author ? "You" : user.username, "** ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in ").concat(user == message.author ? "your " : "his/her", " Pocket")).setDescription("**\uD83C\uDFE6 ".concat(user == message.author ? "You" : user.username, " ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(data.bank), " \uD83D\uDCB8` in ").concat(user == message.author ? "your " : "his/her", " Bank Account**\n\n\uD83E\uDDF8 **").concat(user == message.author ? "You" : user.username, " ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`**").concat(items > 0 ? "\n\n**To see ".concat(user == message.author ? "your " : "his/her", " Items, type:**\n`").concat(prefix, "items").concat(user == message.author ? "" : " " + user, "`") : ""))));

          case 76:
            _context.prev = 76;
            _context.t4 = _context["catch"](3);
            console.log(String(_context.t4.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t4)).substr(0, 2000), "```"))));

          case 80:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 76], [5, 11]]);
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