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
  name: "ecohelp",
  category: "💸 Economy",
  aliases: ["economyhelp"],
  description: "Shows Help for the Economy",
  usage: "ecohelp [@USER]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, economycmds, gamblingcmds, extracmds;
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
            user = message.author;
            economycmds = ["work", "beg", "rob", "crime", "pay", "balance", "profile", "withdraw", "deposit", "hourly", "daily", "weekly", "monthly", "store", "buy", "sell"];
            gamblingcmds = ["slots", "coinflip", "dice"];
            extracmds = ["storeinfo", "buy <item> [Amount]"]; //return some message!

            return _context.abrupt("return", message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({
              dynamic: true
            })).setTitle("**\uD83D\uDCB8 Economy help | Prefix: `".concat(prefix, "`**")).addField("\uD83D\uDCB8 **__Economy Commands__**", "**" + economycmds.map(function (i) {
              return "`".concat(i, "`");
            }).join("・") + "**").addField("\uD83C\uDFB0 **__Gambling Commands__**", "**" + gamblingcmds.map(function (i) {
              return "`".concat(i, "`");
            }).join("・") + "**").addField("\u2728 **__Extra Commands__**", "**" + extracmds.map(function (i) {
              return "`".concat(i, "`");
            }).join("・") + "**")));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 11]]);
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