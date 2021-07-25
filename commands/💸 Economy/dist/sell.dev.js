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
  name: "sell",
  category: "💸 Economy",
  aliases: ["ecosell"],
  description: "Allows you to sell an item with 10% Zins.",
  usage: "sell [Item]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, items, itemsvalue, theitems, itemarray, prize, _itemarray, amountofbuy, endprize;

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

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            items = 0;
            itemsvalue = 0;
            theitems = [];
            _context.t0 = regeneratorRuntime.keys(data.items);

          case 13:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 59;
              break;
            }

            itemarray = _context.t1.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context.t2 = itemarray.toLowerCase();
            _context.next = _context.t2 === "yacht" ? 20 : _context.t2 === "lamborghini" ? 22 : _context.t2 === "car" ? 24 : _context.t2 === "motorbike" ? 26 : _context.t2 === "bicycle" ? 28 : _context.t2 === "nike" ? 30 : _context.t2 === "tshirt" ? 32 : _context.t2 === "mansion" ? 34 : _context.t2 === "house" ? 36 : _context.t2 === "dirthut" ? 38 : _context.t2 === "pensil" ? 40 : _context.t2 === "pen" ? 42 : _context.t2 === "condom" ? 44 : _context.t2 === "bottle" ? 46 : _context.t2 === "fish" ? 48 : _context.t2 === "hamster" ? 50 : _context.t2 === "dog" ? 52 : _context.t2 === "cat" ? 54 : 56;
            break;

          case 20:
            prize = 75000;
            return _context.abrupt("break", 56);

          case 22:
            prize = 50000;
            return _context.abrupt("break", 56);

          case 24:
            prize = 6400;
            return _context.abrupt("break", 56);

          case 26:
            prize = 1500;
            return _context.abrupt("break", 56);

          case 28:
            prize = 500;
            return _context.abrupt("break", 56);

          case 30:
            prize = 300;
            return _context.abrupt("break", 56);

          case 32:
            prize = 60;
            return _context.abrupt("break", 56);

          case 34:
            prize = 45000;
            return _context.abrupt("break", 56);

          case 36:
            prize = 8000;
            return _context.abrupt("break", 56);

          case 38:
            prize = 150;
            return _context.abrupt("break", 56);

          case 40:
            prize = 20;
            return _context.abrupt("break", 56);

          case 42:
            prize = 10;
            return _context.abrupt("break", 56);

          case 44:
            prize = 30;
            return _context.abrupt("break", 56);

          case 46:
            prize = 50;
            return _context.abrupt("break", 56);

          case 48:
            prize = 1000;
            return _context.abrupt("break", 56);

          case 50:
            prize = 1500;
            return _context.abrupt("break", 56);

          case 52:
            prize = 2000;
            return _context.abrupt("break", 56);

          case 54:
            prize = 2000;
            return _context.abrupt("break", 56);

          case 56:
            itemsvalue += Number(prize) * Number(data.items["".concat(itemarray)]);
            _context.next = 13;
            break;

          case 59:
            _context.t3 = regeneratorRuntime.keys(data.items);

          case 60:
            if ((_context.t4 = _context.t3()).done) {
              _context.next = 105;
              break;
            }

            _itemarray = _context.t4.value;

            if (!(data.items["".concat(_itemarray)] == 0)) {
              _context.next = 64;
              break;
            }

            return _context.abrupt("continue", 60);

          case 64:
            _context.t5 = _itemarray.toLowerCase();
            _context.next = _context.t5 === "yacht" ? 67 : _context.t5 === "lamborghini" ? 69 : _context.t5 === "car" ? 71 : _context.t5 === "motorbike" ? 73 : _context.t5 === "bicycle" ? 75 : _context.t5 === "nike" ? 77 : _context.t5 === "tshirt" ? 79 : _context.t5 === "mansion" ? 81 : _context.t5 === "house" ? 83 : _context.t5 === "dirthut" ? 85 : _context.t5 === "pensil" ? 87 : _context.t5 === "pen" ? 89 : _context.t5 === "condom" ? 91 : _context.t5 === "bottle" ? 93 : _context.t5 === "fish" ? 95 : _context.t5 === "hamster" ? 97 : _context.t5 === "dog" ? 99 : _context.t5 === "cat" ? 101 : 103;
            break;

          case 67:
            theitems.push("\uD83D\uDEE5\uFE0F ".concat(data.items["".concat(_itemarray)], " Yacht").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(75000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 69:
            theitems.push("\uD83C\uDFCE\uFE0F ".concat(data.items["".concat(_itemarray)], " Lamborghini").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(50000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 71:
            theitems.push("\uD83D\uDE97 ".concat(data.items["".concat(_itemarray)], " Car").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(6400 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 73:
            theitems.push("\uD83C\uDFCD\uFE0F ".concat(data.items["".concat(_itemarray)], " Motorbike").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(1500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 75:
            theitems.push("\uD83D\uDEB2 ".concat(data.items["".concat(_itemarray)], " Bicycle").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 77:
            theitems.push("\uD83D\uDC5F ".concat(data.items["".concat(_itemarray)], " Nike").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(300 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 79:
            theitems.push("\uD83D\uDC55 ".concat(data.items["".concat(_itemarray)], " T-Shirt").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(60 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 81:
            theitems.push("\uD83C\uDFD8\uFE0F ".concat(data.items["".concat(_itemarray)], " Mansion").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(45000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 83:
            theitems.push("\uD83C\uDFE0 ".concat(data.items["".concat(_itemarray)], " House").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(8000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 85:
            theitems.push("\uD83D\uDFEB ".concat(data.items["".concat(_itemarray)], " Dirthut").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(150 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 87:
            theitems.push("\u270F\uFE0F ".concat(data.items["".concat(_itemarray)], " Pensil").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(20 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 89:
            theitems.push("\uD83D\uDD8A\uFE0F ".concat(data.items["".concat(_itemarray)], " Pen").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(10 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 91:
            theitems.push("\uD83D\uDFEA ".concat(data.items["".concat(_itemarray)], " Condom").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(30 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 93:
            theitems.push("\uD83C\uDF7C ".concat(data.items["".concat(_itemarray)], " Bottle").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(50 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 95:
            theitems.push("\uD83D\uDC1F ".concat(data.items["".concat(_itemarray)], " Fish").concat(data.items["".concat(_itemarray)] > 1 ? "es" : "", " | `").concat(nFormatter(1000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 97:
            theitems.push("\uD83D\uDC39 ".concat(data.items["".concat(_itemarray)], " Hamster").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(1500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 99:
            theitems.push("\uD83D\uDC15 ".concat(data.items["".concat(_itemarray)], " Dog").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(2000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 101:
            theitems.push("\uD83D\uDE3A ".concat(data.items["".concat(_itemarray)], " Cat").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(2000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 103);

          case 103:
            _context.next = 60;
            break;

          case 105:
            if (args[0]) {
              _context.next = 107;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("\uD83E\uDDF8 **".concat(user == message.author ? "You" : user.username, "** ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`, those can you sell:")).setDescription("".concat(theitems.length != 0 ? ">>> " + theitems.join("\n\n") : "".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in ").concat(user == message.author ? "You " : "He/She", " ").concat(user == message.author ? "have" : "has", " no Items yet!"))).addField("To sell items:", "`".concat(prefix, "sell Pen 2`"))));

          case 107:
            amountofbuy = Number(args[1]) || 1;

            if (!(amountofbuy == 0)) {
              _context.next = 110;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot sell 0 Items").setDescription("Usage: `".concat(prefix, "sell <Item> <Amount>`\n\nExample: `").concat(prefix, "sell Pen 2`"))));

          case 110:
            prize = 0;
            _context.t6 = args[0].toLowerCase();
            _context.next = _context.t6 === "yacht" ? 114 : _context.t6 === "lamborghini" ? 116 : _context.t6 === "car" ? 118 : _context.t6 === "motorbike" ? 120 : _context.t6 === "bicycle" ? 122 : _context.t6 === "nike" ? 124 : _context.t6 === "tshirt" ? 126 : _context.t6 === "mansion" ? 128 : _context.t6 === "house" ? 130 : _context.t6 === "dirthut" ? 132 : _context.t6 === "pensil" ? 134 : _context.t6 === "pen" ? 136 : _context.t6 === "condom" ? 138 : _context.t6 === "bottle" ? 140 : _context.t6 === "fish" ? 142 : _context.t6 === "hamster" ? 144 : _context.t6 === "dog" ? 146 : _context.t6 === "cat" ? 148 : 150;
            break;

          case 114:
            prize = 75000;
            return _context.abrupt("break", 152);

          case 116:
            prize = 50000;
            return _context.abrupt("break", 152);

          case 118:
            prize = 6400;
            return _context.abrupt("break", 152);

          case 120:
            prize = 1500;
            return _context.abrupt("break", 152);

          case 122:
            prize = 500;
            return _context.abrupt("break", 152);

          case 124:
            prize = 300;
            return _context.abrupt("break", 152);

          case 126:
            prize = 60;
            return _context.abrupt("break", 152);

          case 128:
            prize = 45000;
            return _context.abrupt("break", 152);

          case 130:
            prize = 8000;
            return _context.abrupt("break", 152);

          case 132:
            prize = 150;
            return _context.abrupt("break", 152);

          case 134:
            prize = 20;
            return _context.abrupt("break", 152);

          case 136:
            prize = 10;
            return _context.abrupt("break", 152);

          case 138:
            prize = 30;
            return _context.abrupt("break", 152);

          case 140:
            prize = 50;
            return _context.abrupt("break", 152);

          case 142:
            prize = 1000;
            return _context.abrupt("break", 152);

          case 144:
            prize = 1500;
            return _context.abrupt("break", 152);

          case 146:
            prize = 2000;
            return _context.abrupt("break", 152);

          case 148:
            prize = 2000;
            return _context.abrupt("break", 152);

          case 150:
            prize = false;
            return _context.abrupt("break", 152);

          case 152:
            if (prize) {
              _context.next = 154;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("\uD83E\uDDF8 **".concat(user == message.author ? "You" : user.username, "** ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`, those can you sell:")).setDescription("".concat(theitems.length != 0 ? ">>> " + theitems.join("\n\n") : "".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in ").concat(user == message.author ? "You " : "He/She", " ").concat(user == message.author ? "have" : "has", " no Items yet!"))).addField("To sell items:", "`".concat(prefix, "sell Pen 2`"))));

          case 154:
            if (!(data.items["".concat(args[0].toLowerCase())] == 0)) {
              _context.next = 156;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot sell an Item which you don't have").setDescription("Buy it with: `".concat(prefix, "buy <Item> <Amount>`\n\nExample: `").concat(prefix, "buy ").concat(args[0].toLowerCase(), " 1`"))));

          case 156:
            if (!(amountofbuy > data.items["".concat(args[0].toLowerCase())])) {
              _context.next = 158;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot sell More ".concat(args[0], " then you have (`").concat(data.items["".concat(args[0].toLowerCase())], "`)")).setDescription("Usage: `".concat(prefix, "sell <Item> <Amount>`\n\nExample: `").concat(prefix, "sell ").concat(args[0].toLowerCase(), " ").concat(data.items["".concat(args[0].toLowerCase())], "`"))));

          case 158:
            endprize = prize * amountofbuy * 0.9;
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", amountofbuy, "items.".concat(args[0].toLowerCase()));
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "+", endprize, "balance");
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("**Successfully sold ".concat(nFormatter(amountofbuy), " ").concat(args[0], " for `").concat(nFormatter(endprize), " \uD83D\uDCB8`**")).setDescription("\uD83D\uDC5B You have (`".concat(nFormatter(data.balance), " \uD83D\uDCB8`) in your Pocket \n\n\uD83E\uDDF8 **You have `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`**\n\n**To see your Items, type:**\n`").concat(prefix, "items`"))));

          case 165:
            _context.prev = 165;
            _context.t7 = _context["catch"](3);
            console.log(String(_context.t7.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t7)).substr(0, 2000), "```"))));

          case 169:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 165]]);
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