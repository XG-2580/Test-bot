"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    swap_pages = _require2.swap_pages;

module.exports = {
  name: "showblacklist",
  category: "🔰 Info",
  aliases: ["blacklist", "blacklistedwords", "bwords"],
  cooldown: 2,
  usage: "showblacklist",
  description: "Shows all blacklisted Words!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            return _context.abrupt("return", swap_pages(client, message, "".concat(client.blacklist.get(message.guild.id, "words").map(function (word) {
              return "`".concat(word, "`");
            }).join(", ").split("`").join("\`")), "".concat(message.guild.name, " | Blacklisted Words")));

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 5]]);
  }
};