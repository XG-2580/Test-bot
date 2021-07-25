"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "chipmunk",
  category: "\uD83D\uDC40 Filter",
  aliases: [""],
  description: "Applies a Chipmunk Filter",
  usage: "chipmunk",
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
                "speed": 1.05,
                "pitch": 1.35,
                "rate": 1.25
              }
            });
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Applying the `CHIPMUNK` Filter").setDescription("Note: *It might take up to 5 seconds until you hear the Filter*")));

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t0.message, "```"))));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 6]]);
  }
};