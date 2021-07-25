"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "prefix",
  aliases: ["changeprefix"],
  category: "\u2699\uFE0F Settings",
  description: "Let's you change the Prefix of the BOT",
  usage: "prefix <NEW PREFIX>",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (args[0]) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please provide a new prefix!").setDescription("Current prefix: `".concat(prefix, "`"))));

          case 4:
            if (!args[1]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The Prefix Can't have two spaces")));

          case 6:
            if (!(args[0].length > 5)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The Prefix Can't be Longer Then `5`")));

          case 8:
            client.settings.set(message.guild.id, args[0], "prefix");
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Set New Prefix To **`".concat(args[0], "`**"))));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }
};