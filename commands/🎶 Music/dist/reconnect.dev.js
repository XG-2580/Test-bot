"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var radios = require("../../base-system/radiostations.json");

var playermanager = require("../../handlers/playermanager");

var _require2 = require("../../handlers/functions"),
    stations = _require2.stations;

module.exports = {
  name: "reconnect",
  category: "\uD83C\uDFB6 Music",
  aliases: ["rejoin"],
  description: "Rejoins the Setupped Channel",
  usage: "reconnect",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, channel, player;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            _context.prev = 2;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "channel"));

            if (channel) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.reply("No setup done yet? Try it with `".concat(prefix, "setup`")));

          case 6:
            //get the player instance
            player = client.manager.players.get(message.guild.id); //if there is a player and they are not in the same channel, return Error

            if (!(player && player.state === "CONNECTED")) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(player.destroy());

          case 10:
            playermanager(client, message, Array(client.settings.get(message.guild.id, "song")), "song:radioraw", channel, message.guild);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", message.reply("No setup done yet? Try it with `".concat(prefix, "setup`")));

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 18], [2, 13]]);
  }
};