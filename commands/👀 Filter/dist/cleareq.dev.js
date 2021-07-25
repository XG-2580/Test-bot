"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "cleareq",
  category: "\uD83D\uDC40 Filter",
  aliases: ["ceq", "reseteq", "clearequalizer", "resetequalizer", "restoreequalizer", "req"],
  description: "Clears the Equalizer",
  usage: "clearEQ",
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
            player.clearEQ();
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Resetted the Equalizer").addField("".concat(emoji.msg.equalizer, " FILTER: "), "".concat(emoji.msg.ERROR, " Nothing")).addField("".concat(emoji.msg.equalizer, " EQUALIZER: "), "".concat(emoji.msg.ERROR, " Nothing")).setDescription("Note: *It might take up to 5 seconds until you hear the new Equalizer*")));

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