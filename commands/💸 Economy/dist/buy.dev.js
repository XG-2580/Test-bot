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
  name: "buy",
  category: "💸 Economy",
  aliases: ["buyitem"],
  description: "Shows the Store",
  usage: "buy [Item]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, data, items, itemsvalue, itemarray, prize, p2b, amountofbuy, endprize;
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
            user = message.author; //if the user is a bot, then return

            if (!user.bot) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 7:
            //ensure the economy data
            ensure_economy_user(client, message.guild.id, user.id); //get the latest data

            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id)); //set some variables

            items = 0, itemsvalue = 0; //Loop through all items

            _context.t0 = regeneratorRuntime.keys(data.items);

          case 11:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 57;
              break;
            }

            itemarray = _context.t1.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context.t2 = itemarray.toLowerCase();
            _context.next = _context.t2 === "yacht" ? 18 : _context.t2 === "lamborghini" ? 20 : _context.t2 === "car" ? 22 : _context.t2 === "motorbike" ? 24 : _context.t2 === "bicycle" ? 26 : _context.t2 === "nike" ? 28 : _context.t2 === "tshirt" ? 30 : _context.t2 === "mansion" ? 32 : _context.t2 === "house" ? 34 : _context.t2 === "dirthut" ? 36 : _context.t2 === "pensil" ? 38 : _context.t2 === "pen" ? 40 : _context.t2 === "condom" ? 42 : _context.t2 === "bottle" ? 44 : _context.t2 === "fish" ? 46 : _context.t2 === "hamster" ? 48 : _context.t2 === "dog" ? 50 : _context.t2 === "cat" ? 52 : 54;
            break;

          case 18:
            prize = 75000;
            return _context.abrupt("break", 54);

          case 20:
            prize = 50000;
            return _context.abrupt("break", 54);

          case 22:
            prize = 6400;
            return _context.abrupt("break", 54);

          case 24:
            prize = 1500;
            return _context.abrupt("break", 54);

          case 26:
            prize = 500;
            return _context.abrupt("break", 54);

          case 28:
            prize = 300;
            return _context.abrupt("break", 54);

          case 30:
            prize = 60;
            return _context.abrupt("break", 54);

          case 32:
            prize = 45000;
            return _context.abrupt("break", 54);

          case 34:
            prize = 8000;
            return _context.abrupt("break", 54);

          case 36:
            prize = 150;
            return _context.abrupt("break", 54);

          case 38:
            prize = 20;
            return _context.abrupt("break", 54);

          case 40:
            prize = 10;
            return _context.abrupt("break", 54);

          case 42:
            prize = 30;
            return _context.abrupt("break", 54);

          case 44:
            prize = 50;
            return _context.abrupt("break", 54);

          case 46:
            prize = 1000;
            return _context.abrupt("break", 54);

          case 48:
            prize = 1500;
            return _context.abrupt("break", 54);

          case 50:
            prize = 2000;
            return _context.abrupt("break", 54);

          case 52:
            prize = 2000;
            return _context.abrupt("break", 54);

          case 54:
            itemsvalue += prize * data.items["".concat(itemarray)];
            _context.next = 11;
            break;

          case 57:
            //function for yes or no, if its buyable!
            p2b = function p2b(costs) {
              return Number(costs) > Number(data.balance) ? "<:no:833101993668771842>" : "<a:yes:833101995723194437>";
            }; //return some message!


            if (args[0]) {
              _context.next = 60;
              break;
            }

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({
              dynamic: true
            })).setTitle("**\uD83E\uDDF8 | Available Items to be bought**").setDescription("\uD83D\uDC5B You have (`".concat(data.balance, " \uD83D\uDCB8`) in your Pocket \n\n\uD83E\uDDF8 **You have `").concat(items, " Items` with a value of: `").concat(itemsvalue, " \uD83D\uDCB8`**\n\n**__How to buy an Item?__**\n> `").concat(prefix, "buy <ITEMNAME> <AMOUNT>`")).addField("✏️ Useables", ">>> " + "\u270F\uFE0F **`Pensil [10 \uD83D\uDCB8]`** | ".concat(p2b(10), "\n\uD83D\uDD8A\uFE0F **`Pen [20 \uD83D\uDCB8]`** | ").concat(p2b(20), "\n\uD83D\uDFEA **`Condom [30 \uD83D\uDCB8]`** | ").concat(p2b(30), "\n\uD83C\uDF7C **`Bottle [50 \uD83D\uDCB8]`** | ").concat(p2b(50))).addField("👕 Clothes", ">>> " + "\uD83D\uDC5F **`Nike Shoe [300 \uD83D\uDCB8]`** | ".concat(p2b(300), "\n\uD83D\uDC55 **`T-Shirt [60 \uD83D\uDCB8]`** | ").concat(p2b(60))).addField("🐕 Animals", ">>> " + "\uD83D\uDC1F`Fish [1000 \uD83D\uDCB8]`** | ".concat(p2b(1000), "\n\uD83D\uDC39 **`Hamster [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDC15 **`Dog [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000), "\n\uD83D\uDE3A **`Cat [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000))).addField("🚗 Means of Transport", ">>> " + "\uD83D\uDEE5\uFE0F`Yacht [75000 \uD83D\uDCB8]`** | ".concat(p2b(75000), "\n\uD83C\uDFCE\uFE0F **`Lamborghini [50000 \uD83D\uDCB8]`** | ").concat(p2b(50000), "\n\uD83D\uDE97 **`Car [6400 \uD83D\uDCB8]`** | ").concat(p2b(6400), "\n\uD83C\uDFCD\uFE0F **`Motorbike [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDEB2 **`Bicycle [500 \uD83D\uDCB8]`** | ").concat(p2b(500))).addField("🏠 Livingarea", ">>> " + "\uD83C\uDFD8\uFE0F **`Mansion [45000 \uD83D\uDCB8]`** | ".concat(p2b(45000), "\n\uD83C\uDFE0 **`House [8000 \uD83D\uDCB8]`** | ").concat(p2b(8000), "\n\uD83D\uDFEB **`Dirthut [150 \uD83D\uDCB8]`** | ").concat(p2b(150)))));

          case 60:
            amountofbuy = Number(args[1]) || 1;

            if (!(amountofbuy == 0)) {
              _context.next = 63;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You cannot buy 0 Items").setDescription("Usage: `".concat(prefix, "buy <Item> <Amount>`\n\nExample: `").concat(prefix, "pay Car 2`"))));

          case 63:
            prize = 0;
            _context.t3 = args[0].toLowerCase();
            _context.next = _context.t3 === "yacht" ? 67 : _context.t3 === "lamborghini" ? 69 : _context.t3 === "car" ? 71 : _context.t3 === "motorbike" ? 73 : _context.t3 === "bicycle" ? 75 : _context.t3 === "nike" ? 77 : _context.t3 === "tshirt" ? 79 : _context.t3 === "mansion" ? 81 : _context.t3 === "house" ? 83 : _context.t3 === "dirthut" ? 85 : _context.t3 === "pensil" ? 87 : _context.t3 === "pen" ? 89 : _context.t3 === "condom" ? 91 : _context.t3 === "bottle" ? 93 : _context.t3 === "fish" ? 95 : _context.t3 === "hamster" ? 97 : _context.t3 === "dog" ? 99 : _context.t3 === "cat" ? 101 : 103;
            break;

          case 67:
            prize = 75000;
            return _context.abrupt("break", 105);

          case 69:
            prize = 50000;
            return _context.abrupt("break", 105);

          case 71:
            prize = 6400;
            return _context.abrupt("break", 105);

          case 73:
            prize = 1500;
            return _context.abrupt("break", 105);

          case 75:
            prize = 500;
            return _context.abrupt("break", 105);

          case 77:
            prize = 300;
            return _context.abrupt("break", 105);

          case 79:
            prize = 60;
            return _context.abrupt("break", 105);

          case 81:
            prize = 45000;
            return _context.abrupt("break", 105);

          case 83:
            prize = 8000;
            return _context.abrupt("break", 105);

          case 85:
            prize = 150;
            return _context.abrupt("break", 105);

          case 87:
            prize = 20;
            return _context.abrupt("break", 105);

          case 89:
            prize = 10;
            return _context.abrupt("break", 105);

          case 91:
            prize = 30;
            return _context.abrupt("break", 105);

          case 93:
            prize = 50;
            return _context.abrupt("break", 105);

          case 95:
            prize = 1000;
            return _context.abrupt("break", 105);

          case 97:
            prize = 1500;
            return _context.abrupt("break", 105);

          case 99:
            prize = 2000;
            return _context.abrupt("break", 105);

          case 101:
            prize = 2000;
            return _context.abrupt("break", 105);

          case 103:
            prize = false;
            return _context.abrupt("break", 105);

          case 105:
            if (prize) {
              _context.next = 107;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({
              dynamic: true
            })).setTitle("This Item seems to not exist! Those Items are available:").setDescription("\uD83D\uDC5B You have (`".concat(data.balance, " \uD83D\uDCB8`) in your Pocket \n\n\uD83E\uDDF8 **You have `").concat(items, " Items` with a value of: `").concat(itemsvalue, " \uD83D\uDCB8`**\n\n**__How to buy an Item?__**\n> `").concat(prefix, "buy <ITEMNAME> <AMOUNT>`")).addField("✏️ Useables", ">>> " + "\u270F\uFE0F **`Pensil [10 \uD83D\uDCB8]`** | ".concat(p2b(10), "\n\uD83D\uDD8A\uFE0F **`Pen [20 \uD83D\uDCB8]`** | ").concat(p2b(20), "\n\uD83D\uDFEA **`Condom [30 \uD83D\uDCB8]`** | ").concat(p2b(30), "\n\uD83C\uDF7C **`Bottle [50 \uD83D\uDCB8]`** | ").concat(p2b(50))).addField("👕 Clothes", ">>> " + "\uD83D\uDC5F **`Nike Shoe [300 \uD83D\uDCB8]`** | ".concat(p2b(300), "\n\uD83D\uDC55 **`T-Shirt [60 \uD83D\uDCB8]`** | ").concat(p2b(60))).addField("🐕 Animals", ">>> " + "\uD83D\uDC1F`Fish [1000 \uD83D\uDCB8]`** | ".concat(p2b(1000), "\n\uD83D\uDC39 **`Hamster [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDC15 **`Dog [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000), "\n\uD83D\uDE3A **`Cat [2000 \uD83D\uDCB8]`** | ").concat(p2b(2000))).addField("🚗 Means of Transport", ">>> " + "\uD83D\uDEE5\uFE0F`Yacht [75000 \uD83D\uDCB8]`** | ".concat(p2b(75000), "\n\uD83C\uDFCE\uFE0F **`Lamborghini [50000 \uD83D\uDCB8]`** | ").concat(p2b(50000), "\n\uD83D\uDE97 **`Car [6400 \uD83D\uDCB8]`** | ").concat(p2b(6400), "\n\uD83C\uDFCD\uFE0F **`Motorbike [1500 \uD83D\uDCB8]`** | ").concat(p2b(1500), "\n\uD83D\uDEB2 **`Bicycle [500 \uD83D\uDCB8]`** | ").concat(p2b(500))).addField("🏠 Livingarea", ">>> " + "\uD83C\uDFD8\uFE0F **`Mansion [45000 \uD83D\uDCB8]`** | ".concat(p2b(45000), "\n\uD83C\uDFE0 **`House [8000 \uD83D\uDCB8]`** | ").concat(p2b(8000), "\n\uD83D\uDFEB **`Dirthut [150 \uD83D\uDCB8]`** | ").concat(p2b(150)))));

          case 107:
            endprize = prize * amountofbuy;

            if (!(endprize > data.balance)) {
              _context.next = 110;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't buy **".concat(nFormatter(amountofbuy), " ").concat(args[0], "** because it costs more Money (`").concat(nFormatter(endprize), " \uD83D\uDCB8`) then you have in your **\uD83D\uDC5B Pocket (`").concat(nFormatter(data.balance), " \uD83D\uDCB8`)**")).setDescription("\uD83D\uDC5B You have (`".concat(data.balance, " \uD83D\uDCB8`) in your Pocket \n\nTry to reduce the Amount or Get some Money by working, begging, or from your Bank!"))));

          case 110:
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "+", amountofbuy, "items.".concat(args[0].toLowerCase()));
            client.economy.math("".concat(message.guild.id, "-").concat(user.id), "-", endprize, "balance");
            data = client.economy.get("".concat(message.guild.id, "-").concat(user.id));
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("**Successfully bought ".concat(nFormatter(amountofbuy), " ").concat(args[0], " for `").concat(nFormatter(endprize), " \uD83D\uDCB8`**")).setDescription("\uD83D\uDC5B You have (`".concat(nFormatter(data.balance), " \uD83D\uDCB8`) in your Pocket \n\n\uD83E\uDDF8 **You have `").concat(nFormatter(items), " Items` with a value of: `").concat(nFormatter(itemsvalue), " \uD83D\uDCB8`**\n\n**To see your Items, type:**\n`").concat(prefix, "items`"))));

          case 116:
            _context.prev = 116;
            _context.t4 = _context["catch"](3);
            console.log(String(_context.t4.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t4)).substr(0, 2000), "```"))));

          case 120:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 116]]);
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