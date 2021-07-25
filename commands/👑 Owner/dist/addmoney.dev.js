"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    parseMilliseconds = _require2.parseMilliseconds,
    duration = _require2.duration,
    GetUser = _require2.GetUser;

module.exports = {
  name: "addmoney",
  category: "💸 Economy",
  aliases: ["ecoaddmoney"],
  description: "Adds Money to someone else!",
  usage: "addmoney <@USER> <Amount>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, topay, payamount, data2;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.some(function (r) {
              return r.includes(message.author.id);
            })) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
              return "<@".concat(id, ">");
            })))));

          case 3:
            if (client.settings.get(message.guild.id, "ECONOMY")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 5:
            _context.prev = 5;
            //command
            user = message.author;
            topay = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first();

            if (topay) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't pinged to whom you want to pay").setDescription("Usage: `".concat(prefix, "addmoney <@USER> <Amount>`\n\nExample: `").concat(prefix, "addmoney <@442355791412854784> 42069`"))));

          case 10:
            topay = topay.user;
            payamount = Number(args[1]);

            if (payamount) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You didn't add the payamount").setDescription("Usage: `".concat(prefix, "addmoney <@USER> <Amount>`\n\nExample: `").concat(prefix, "addmoney <@442355791412854784> 42069`"))));

          case 14:
            if (!(user.bot || topay.bot)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", message.reply("**A Discord Bot can not have Economy!**"));

          case 16:
            client.economy.ensure("".concat(message.guild.id, "-").concat(user.id), {
              user: user.id,
              work: 0,
              balance: 0,
              bank: 0,
              hourly: 0,
              daily: 0,
              weekly: 0,
              monthly: 0,
              items: {
                yacht: 0,
                lamborghini: 0,
                car: 0,
                motorbike: 0,
                bicycle: 0,
                nike: 0,
                tshirt: 0,
                mansion: 0,
                house: 0,
                dirthut: 0,
                pensil: 0,
                pen: 0,
                condom: 0,
                bottle: 0,
                fish: 0,
                hamster: 0,
                dog: 0,
                cat: 0
              }
            });
            client.economy.ensure("".concat(message.guild.id, "-").concat(topay.id), {
              user: user.id,
              work: 0,
              balance: 0,
              bank: 0,
              hourly: 0,
              daily: 0,
              weekly: 0,
              monthly: 0,
              items: {
                yacht: 0,
                lamborghini: 0,
                car: 0,
                motorbike: 0,
                bicycle: 0,
                nike: 0,
                tshirt: 0,
                mansion: 0,
                house: 0,
                dirthut: 0,
                pensil: 0,
                pen: 0,
                condom: 0,
                bottle: 0,
                fish: 0,
                hamster: 0,
                dog: 0,
                cat: 0
              }
            }); //get the economy data 

            data2 = client.economy.get("".concat(message.guild.id, "-").concat(topay.id));

            if (!(payamount <= 0)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("You can't add a negative Amount of Money or no Money, to ".concat(topay))));

          case 21:
            client.economy.math("".concat(message.guild.id, "-").concat(topay.id), "+", payamount, "balance");
            data2 = client.economy.get("".concat(message.guild.id, "-").concat(topay.id)); //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("**You added `".concat(payamount, " \uD83D\uDCB8` to `").concat(topay.tag, "`**")).setDescription("\uD83D\uDC5B **".concat(topay.username, "** now has `").concat(Math.floor(data2.balance), " \uD83D\uDCB8` in his/her Pocket"))));

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](5);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 26]]);
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