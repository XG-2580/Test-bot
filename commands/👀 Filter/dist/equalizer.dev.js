"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "equalizer",
  category: "\uD83D\uDC40 Filter",
  aliases: ["eq", "eqs", "seteq", "setequalizer"],
  description: "Changes the Equalizer",
  usage: "bassboost <music/bassboost/earrape>",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var level;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ee = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            level = "none";

            if (!(!args.length || !client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != "none")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("Equalizer level must be one of the following").setDescription("Valid Equalizers:\n`music`, `pop`, `electronic`, `classical`, `rock`, `full`, `gaming`, `bassboost`, `earrape`\n\nUsage: `".concat(prefix, "equalizer <Level>`\n\nExample: `").concat(prefix, "equalizer music`"))));

          case 5:
            level = args[0].toLowerCase();
            _context.t0 = level;
            _context.next = _context.t0 === "music" ? 9 : _context.t0 === "pop" ? 11 : _context.t0 === "electronic" ? 13 : _context.t0 === "electro" ? 13 : _context.t0 === "techno" ? 13 : _context.t0 === "classical" ? 15 : _context.t0 === "classic" ? 15 : _context.t0 === "acustics" ? 15 : _context.t0 === "rock" ? 17 : _context.t0 === "metal" ? 17 : _context.t0 === "full" ? 19 : _context.t0 === "ful" ? 19 : _context.t0 === "gaming" ? 21 : _context.t0 === "game" ? 21 : _context.t0 === "gam" ? 21 : _context.t0 === "music" ? 23 : _context.t0 === "bassboost" ? 25 : _context.t0 === "earrape" ? 27 : 30;
            break;

          case 9:
            player.setEQ(client.eqs.music);
            return _context.abrupt("break", 30);

          case 11:
            player.setEQ(client.eqs.pop);
            return _context.abrupt("break", 30);

          case 13:
            player.setEQ(client.eqs.electronic);
            return _context.abrupt("break", 30);

          case 15:
            player.setEQ(client.eqs.classical);
            return _context.abrupt("break", 30);

          case 17:
            player.setEQ(client.eqs.rock);
            return _context.abrupt("break", 30);

          case 19:
            player.setEQ(client.eqs.full);
            return _context.abrupt("break", 30);

          case 21:
            player.setEQ(client.eqs.gaming);
            return _context.abrupt("break", 30);

          case 23:
            player.setEQ(client.eqs.music);
            return _context.abrupt("break", 30);

          case 25:
            player.setEQ(client.eqs.bassboost);
            return _context.abrupt("break", 30);

          case 27:
            player.setVolume(player.volume + 50);
            player.setEQ(client.eqs.earrape);
            return _context.abrupt("break", 30);

          case 30:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Set Equalizer to `".concat(level, "`")).setDescription("Note: *It might take up to 5 seconds until you hear the new Equalizer*")));

          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t1.message, "```"))));

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 33]]);
  }
};