"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "bassboost",
  category: "\uD83D\uDC40 Filter",
  aliases: ["bb"],
  description: "Changes the Bass gain",
  usage: "bassboost <none/low/medium/high>",
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

            if (!(!args.length || !client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != "none")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("Bass boost level must be one of the following: `none`, `low`, `medium`, `high`, `earrape`").setDescription("Usage: `".concat(prefix, "bassboost <Level>`\n\nExample: `").concat(prefix, "bassboost low`"))));

          case 5:
            level = args[0].toLowerCase();
            _context.t0 = level;
            _context.next = _context.t0 === "none" ? 9 : _context.t0 === "low" ? 12 : _context.t0 === "medium" ? 15 : _context.t0 === "high" ? 18 : _context.t0 === "earrape" ? 20 : 23;
            break;

          case 9:
            player.setEQ(client.bassboost.none);
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
                "speed": 1.0,
                "pitch": 1.0,
                "rate": 1.0
              }
            });
            return _context.abrupt("break", 23);

          case 12:
            player.setEQ(client.bassboost.low);
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
              })
            });
            return _context.abrupt("break", 23);

          case 15:
            player.setEQ(client.bassboost.medium);
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
              })
            });
            return _context.abrupt("break", 23);

          case 18:
            player.setEQ(client.bassboost.high);
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
              })
            });

          case 20:
            player.setEQ(client.bassboost.high);
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
              })
            });
            return _context.abrupt("break", 23);

          case 23:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Bassboost set the to `".concat(level, "`")).setDescription("Note: *It might take up to 5 seconds until you hear the new Equalizer*")));

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t1.message, "```"))));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 26]]);
  }
};