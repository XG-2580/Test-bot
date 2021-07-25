"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var emoji = require("../../base-system/emoji.json");

var ee = require("../../base-system/embed.json");

var playermanager = require("../../handlers/playermanager");

module.exports = {
  name: "addprevious",
  category: "\uD83C\uDFB6 Music",
  aliases: ["addp", "addpre", "addprevius", "addprevios"],
  description: "Adds the previous song to the Queue again!",
  usage: "addprevious",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": true
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, type;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            //define the type
            type = "song:youtube"; //if the previous was from soundcloud, then use type soundcloud

            if (player.queue.previous.uri.includes("soundcloud")) type = "song:soundcloud"; //adds/plays it

            playermanager(client, message, Array(player.queue.previous.uri), type);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 9]]);
  }
};