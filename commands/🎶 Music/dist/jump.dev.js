"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "jump",
  category: "\uD83C\uDFB6 Music",
  aliases: ["skipto"],
  description: "Skips to a specific Track",
  usage: "skipto <Trackindex>",
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

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;

            if (args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Please include to which track you want to jump").setDescription("Example: `jump ".concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, "`"))));

          case 6:
            if (!isNaN(args[0])) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("It has to be a queue **Number**")));

          case 8:
            if (!(Number(args[0]) > player.queue.size)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("That song is not in the queue, sorry!")));

          case 10:
            //remove all tracks to the jumped song
            player.queue.remove(0, Number(args[0]) - 1); //stop the player

            player.stop(); //Send Success Message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("Jumped to the: `".concat(args[0], "` Song")).setDescription("".concat(emoji.msg.skip_track, " Skipped `").concat(Number(args[0]), "` Songs")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 15]]);
  }
};