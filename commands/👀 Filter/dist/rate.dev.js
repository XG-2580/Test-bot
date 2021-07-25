"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "speed",
  category: "\uD83D\uDC40 Filter",
  aliases: [""],
  description: "Allows you to change the SPEED of the TRACK",
  usage: "speed <Multiplicator>   |   Multiplicator could be: 0  -  3",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ee = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (args.length) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("Please include the Multiplicator").setDescription("Usage: `".concat(prefix, "speed <Multiplicator>`\n\nExample: `").concat(prefix, "speed 1.5`"))));

          case 4:
            if (!isNaN(args[0])) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("The Multiplicator must be a Number").setDescription("Usage: `".concat(prefix, "speed <Multiplicator>`\n\nExample: `").concat(prefix, "speed 1.5`"))));

          case 6:
            if (!(Number(args[0]) >= 3 || Number(args[0]) <= 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("Multiplicator out of range | Must be between 0 and 3").setDescription("Usage: `".concat(prefix, "speed <Multiplicator>`\n\nExample: `").concat(prefix, "speed 1.5`"))));

          case 8:
            player.node.send({
              op: "filters",
              guildId: message.guild.id,
              equalizer: player.bands.map(function (gain, index) {
                var Obj = {
                  "band": 0,
                  "gain": 0
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain);
                return Obj;
              }),
              timescale: {
                "speed": Number(args[0]),
                "pitch": 1.0,
                "rate": 1.0
              }
            });
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Speed set to `".concat(args[0], "`")).setDescription("Note: *It might take up to 5 seconds until you hear the Filter*")));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t0.message, "```"))));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }
};