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
  name: "storeinfo",
  category: "💸 Economy",
  aliases: ["store", "shop"],
  description: "Shows the Store",
  usage: "storeinfo",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, items, itemsvalue, itemarray, prize, p2b;
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
            ensure_economy_user(client, message.guild.id, user.id);
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            items = 0;
            itemsvalue = 0;
            _context.t0 = regeneratorRuntime.keys(data.items);

          case 12:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 58;
              break;
            }

            itemarray = _context.t1.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context.t2 = itemarray.toLowerCase();
            _context.next = _context.t2 === "yacht" ? 19 : _context.t2 === "lamborghini" ? 21 : _context.t2 === "car" ? 23 : _context.t2 === "motorbike" ? 25 : _context.t2 === "bicycle" ? 27 : _context.t2 === "nike" ? 29 : _context.t2 === "tshirt" ? 31 : _context.t2 === "mansion" ? 33 : _context.t2 === "house" ? 35 : _context.t2 === "dirthut" ? 37 : _context.t2 === "pensil" ? 39 : _context.t2 === "pen" ? 41 : _context.t2 === "condom" ? 43 : _context.t2 === "bottle" ? 45 : _context.t2 === "fish" ? 47 : _context.t2 === "hamster" ? 49 : _context.t2 === "dog" ? 51 : _context.t2 === "cat" ? 53 : 55;
            break;

          case 19:
            prize = 75000;
            return _context.abrupt("break", 55);

          case 21:
            prize = 50000;
            return _context.abrupt("break", 55);

          case 23:
            prize = 6400;
            return _context.abrupt("break", 55);

          case 25:
            prize = 1500;
            return _context.abrupt("break", 55);

          case 27:
            prize = 500;
            return _context.abrupt("break", 55);

          case 29:
            prize = 300;
            return _context.abrupt("break", 55);

          case 31:
            prize = 60;
            return _context.abrupt("break", 55);

          case 33:
            prize = 45000;
            return _context.abrupt("break", 55);

          case 35:
            prize = 8000;
            return _context.abrupt("break", 55);

          case 37:
            prize = 150;
            return _context.abrupt("break", 55);

          case 39:
            prize = 20;
            return _context.abrupt("break", 55);

          case 41:
            prize = 10;
            return _context.abrupt("break", 55);

          case 43:
            prize = 30;
            return _context.abrupt("break", 55);

          case 45:
            prize = 50;
            return _context.abrupt("break", 55);

          case 47:
            prize = 1000;
            return _context.abrupt("break", 55);

          case 49:
            prize = 1500;
            return _context.abrupt("break", 55);

          case 51:
            prize = 2000;
            return _context.abrupt("break", 55);

          case 53:
            prize = 2000;
            return _context.abrupt("break", 55);

          case 55:
            itemsvalue += prize * data.items["".concat(itemarray)];
            _context.next = 12;
            break;

          case 58:
            p2b = function p2b(costs) {
              return Number(costs) > Number(data.balance) ? "<:no:833101993668771842>" : "<a:yes:833101995723194437>";
            }; //return some message!


            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({
              dynamic: true
            })).setTitle("**\uD83E\uDDF8 | Available Items to be bought**").setDescription("\uD83E\uDDF8 **You have `".concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8**\n\n**__How to buy an Item?__**\n> `").concat(prefix, "buy <ITEMNAME> <AMOUNT>`")).addField("✏️ Useables", ">>> " + "\u270F\uFE0F **`Pensil [10 \uD83D\uDCB8]`** | ".concat(p2b(10), "\n\uD83D\uDD8A\uFE0F **`Pen [20 \uD83D\uDCB8]`** | ").concat(p2b(20), "\n\uD83D\uDFEA **`Condom [30 \uD83D\uDCB8]`** | ").concat(p2b(30), "\n\uD83C\uDF7C **`Bottle [50 \uD83D\uDCB8]`** | ").concat(p2b(50))).addField("👕 Clothes", ">>> " + "\uD83D\uDC5F **`Nike Shoe [300 \uD83D\uDCB8]`** | ".concat(p2b(300), "\n\uD83D\uDC55 **`T-Shirt [60 \uD83D\uDCB8]`** | ").concat(p2b(60))).addField("🐕 Animals", ">>> " + "\uD83D\uDC1F`Fish [1000 \uD83D\uDCB8]`** | ".concat(p2b(1000), "\n\uD83D\uDC39 **`Hamster [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDC15 **`Dog [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000), "\n\uD83D\uDE3A **`Cat [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000))).addField("🚗 Means of Transport", ">>> " + "\uD83D\uDEE5\uFE0F`Yacht [75000 \uD83D\uDCB8]`** | ".concat(p2b(75000), "\n\uD83C\uDFCE\uFE0F **`Lamborghini [50000 \uD83D\uDCB8]`** | ").concat(p2b(50000), "\n\uD83D\uDE97 **`Car [6400 \uD83D\uDCB8]`** | ").concat(p2b(6400), "\n\uD83C\uDFCD\uFE0F **`Motorbike [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDEB2 **`Bicycle [500 \uD83D\uDCB8]`** | ").concat(p2b(500))).addField("🏠 Livingarea", ">>> " + "\uD83C\uDFD8\uFE0F **`Mansion [45000 \uD83D\uDCB8]`** | ".concat(p2b(45000), "\n\uD83C\uDFE0 **`House [8000 \uD83D\uDCB8]`** | ").concat(p2b(8000), "\n\uD83D\uDFEB **`Dirthut [150 \uD83D\uDCB8]`** | ").concat(p2b(150)))));

          case 62:
            _context.prev = 62;
            _context.t3 = _context["catch"](3);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 62]]);
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