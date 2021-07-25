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
  name: "profile",
  category: "💸 Economy",
  aliases: ["ecoprofile"],
  description: "Shows the Profile of a User",
  usage: "profile [@USER]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, items, itemsvalue, theitems, itemarray, prize, _itemarray;

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
            theitems = [];
            _context.t1 = regeneratorRuntime.keys(data.items);

          case 28:
            if ((_context.t2 = _context.t1()).done) {
              _context.next = 74;
              break;
            }

            itemarray = _context.t2.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context.t3 = itemarray.toLowerCase();
            _context.next = _context.t3 === "yacht" ? 35 : _context.t3 === "lamborghini" ? 37 : _context.t3 === "car" ? 39 : _context.t3 === "motorbike" ? 41 : _context.t3 === "bicycle" ? 43 : _context.t3 === "nike" ? 45 : _context.t3 === "tshirt" ? 47 : _context.t3 === "mansion" ? 49 : _context.t3 === "house" ? 51 : _context.t3 === "dirthut" ? 53 : _context.t3 === "pensil" ? 55 : _context.t3 === "pen" ? 57 : _context.t3 === "condom" ? 59 : _context.t3 === "bottle" ? 61 : _context.t3 === "fish" ? 63 : _context.t3 === "hamster" ? 65 : _context.t3 === "dog" ? 67 : _context.t3 === "cat" ? 69 : 71;
            break;

          case 35:
            prize = 75000;
            return _context.abrupt("break", 71);

          case 37:
            prize = 50000;
            return _context.abrupt("break", 71);

          case 39:
            prize = 6400;
            return _context.abrupt("break", 71);

          case 41:
            prize = 1500;
            return _context.abrupt("break", 71);

          case 43:
            prize = 500;
            return _context.abrupt("break", 71);

          case 45:
            prize = 300;
            return _context.abrupt("break", 71);

          case 47:
            prize = 60;
            return _context.abrupt("break", 71);

          case 49:
            prize = 45000;
            return _context.abrupt("break", 71);

          case 51:
            prize = 8000;
            return _context.abrupt("break", 71);

          case 53:
            prize = 150;
            return _context.abrupt("break", 71);

          case 55:
            prize = 20;
            return _context.abrupt("break", 71);

          case 57:
            prize = 10;
            return _context.abrupt("break", 71);

          case 59:
            prize = 30;
            return _context.abrupt("break", 71);

          case 61:
            prize = 50;
            return _context.abrupt("break", 71);

          case 63:
            prize = 1000;
            return _context.abrupt("break", 71);

          case 65:
            prize = 1500;
            return _context.abrupt("break", 71);

          case 67:
            prize = 2000;
            return _context.abrupt("break", 71);

          case 69:
            prize = 2000;
            return _context.abrupt("break", 71);

          case 71:
            itemsvalue += Number(prize) * Number(data.items["".concat(itemarray)]);
            _context.next = 28;
            break;

          case 74:
            _context.t4 = regeneratorRuntime.keys(data.items);

          case 75:
            if ((_context.t5 = _context.t4()).done) {
              _context.next = 120;
              break;
            }

            _itemarray = _context.t5.value;

            if (!(data.items["".concat(_itemarray)] == 0)) {
              _context.next = 79;
              break;
            }

            return _context.abrupt("continue", 75);

          case 79:
            _context.t6 = _itemarray.toLowerCase();
            _context.next = _context.t6 === "yacht" ? 82 : _context.t6 === "lamborghini" ? 84 : _context.t6 === "car" ? 86 : _context.t6 === "motorbike" ? 88 : _context.t6 === "bicycle" ? 90 : _context.t6 === "nike" ? 92 : _context.t6 === "tshirt" ? 94 : _context.t6 === "mansion" ? 96 : _context.t6 === "house" ? 98 : _context.t6 === "dirthut" ? 100 : _context.t6 === "pensil" ? 102 : _context.t6 === "pen" ? 104 : _context.t6 === "condom" ? 106 : _context.t6 === "bottle" ? 108 : _context.t6 === "fish" ? 110 : _context.t6 === "hamster" ? 112 : _context.t6 === "dog" ? 114 : _context.t6 === "cat" ? 116 : 118;
            break;

          case 82:
            theitems.push("\uD83D\uDEE5\uFE0F ".concat(data.items["".concat(_itemarray)], " Yacht").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(75000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 84:
            theitems.push("\uD83C\uDFCE\uFE0F ".concat(data.items["".concat(_itemarray)], " Lamborghini").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(50000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 86:
            theitems.push("\uD83D\uDE97 ".concat(data.items["".concat(_itemarray)], " Car").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(6400 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 88:
            theitems.push("\uD83C\uDFCD\uFE0F ".concat(data.items["".concat(_itemarray)], " Motorbike").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(1500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 90:
            theitems.push("\uD83D\uDEB2 ".concat(data.items["".concat(_itemarray)], " Bicycle").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 92:
            theitems.push("\uD83D\uDC5F ".concat(data.items["".concat(_itemarray)], " Nike").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(300 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 94:
            theitems.push("\uD83D\uDC55 ".concat(data.items["".concat(_itemarray)], " T-Shirt").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(60 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 96:
            theitems.push("\uD83C\uDFD8\uFE0F ".concat(data.items["".concat(_itemarray)], " Mansion").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(45000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 98:
            theitems.push("\uD83C\uDFE0 ".concat(data.items["".concat(_itemarray)], " House").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(8000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 100:
            theitems.push("\uD83D\uDFEB ".concat(data.items["".concat(_itemarray)], " Dirthut").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(150 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 102:
            theitems.push("\u270F\uFE0F ".concat(data.items["".concat(_itemarray)], " Pensil").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(20 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 104:
            theitems.push("\uD83D\uDD8A\uFE0F ".concat(data.items["".concat(_itemarray)], " Pen").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(10 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 106:
            theitems.push("\uD83D\uDFEA ".concat(data.items["".concat(_itemarray)], " Condom").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(30 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 108:
            theitems.push("\uD83C\uDF7C ".concat(data.items["".concat(_itemarray)], " Bottle").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(50 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 110:
            theitems.push("\uD83D\uDC1F ".concat(data.items["".concat(_itemarray)], " Fish").concat(data.items["".concat(_itemarray)] > 1 ? "es" : "", " | `").concat(nFormatter(1000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 112:
            theitems.push("\uD83D\uDC39 ".concat(data.items["".concat(_itemarray)], " Hamster").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(1500 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 114:
            theitems.push("\uD83D\uDC15 ".concat(data.items["".concat(_itemarray)], " Dog").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(2000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 116:
            theitems.push("\uD83D\uDE3A ".concat(data.items["".concat(_itemarray)], " Cat").concat(data.items["".concat(_itemarray)] > 1 ? "s" : "", " | `").concat(nFormatter(2000 * data.items["".concat(_itemarray)]), " \uD83D\uDCB8`"));
            return _context.abrupt("break", 118);

          case 118:
            _context.next = 75;
            break;

          case 120:
            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("\uD83E\uDDF8 **".concat(user == message.author ? "You" : user.username, "** ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`")).setDescription("\uD83D\uDC5B **".concat(user == message.author ? "You" : user.username, "** ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in ").concat(user == message.author ? "your " : "his/her", " Pocket\n**\uD83C\uDFE6 ").concat(user == message.author ? "You" : user.username, " ").concat(user == message.author ? "have" : "has", " `").concat(nFormatter(data.bank), " \uD83D\uDCB8` in ").concat(user == message.author ? "your " : "his/her", " Bank Account**\n``` ```**ITEMS:**\n").concat(theitems.length != 0 ? ">>> " + theitems.join("\n\n") : "".concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8` in ").concat(user == message.author ? "You " : "He/She", " ").concat(user == message.author ? "have" : "has", " no Items yet!")))));

          case 123:
            _context.prev = 123;
            _context.t7 = _context["catch"](3);
            console.log(String(_context.t7.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t7)).substr(0, 2000), "```"))));

          case 127:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 123], [5, 11]]);
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