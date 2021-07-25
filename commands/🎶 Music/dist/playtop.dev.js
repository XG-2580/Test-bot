"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var playermanager = require("../../handlers/playermanager");

module.exports = {
  name: "playtop",
  category: "\uD83C\uDFB6 Music",
  aliases: ["ptop", "pt"],
  description: "Adds a song with the given name/url on the top of the queue",
  usage: "playtop <link/query>",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (args[0]) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to give me a URL or a Search term.")));

          case 3:
            return _context.abrupt("return", playermanager(client, message, args, "playtop:youtube"));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};