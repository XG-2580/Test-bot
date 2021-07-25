"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require("moment");

module.exports = {
  name: "serveravatar",
  aliases: ["savatar"],
  category: "🔰 Info",
  description: "Shows the ServerAvatar",
  usage: "serveravatar",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            message.channel.send(new Discord.MessageEmbed().setAuthor("Avatar from: ".concat(message.guild.name), message.guild.iconURL({
              dynamic: true
            }), "https://discord.gg/FQGXbypRf8").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField(" PNG", "[`LINK`](".concat(message.guild.iconURL({
              format: "png"
            }), ")"), true).addField(" JPEG", "[`LINK`](".concat(message.guild.iconURL({
              format: "jpg"
            }), ")"), true).addField(" WEBP", "[`LINK`](".concat(message.guild.iconURL({
              format: "webp"
            }), ")"), true).setURL(message.guild.iconURL({
              dynamic: true
            })).setFooter(es.footertext, es.footericon).setImage(message.guild.iconURL({
              dynamic: true,
              size: 256
            })));
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 5]]);
  }
};