"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "removetrack",
  category: "\uD83C\uDFB6 Music",
  aliases: ["rt", "remove"],
  description: "Removes a track from the Queue",
  usage: "removetrack <Trackindex>",
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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Please add the Track you want to remove!").setDescription("Example: `removetrack ".concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, "`"))));

          case 6:
            if (!isNaN(args[0])) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("It has to be a valid Queue Number!").setDescription("Example: `removetrack ".concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, "`"))));

          case 8:
            if (!(Number(args[0]) > player.queue.size)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Your Song must be in the Queue!").setDescription("Example: `removetrack ".concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, "`"))));

          case 10:
            //remove the Song from the QUEUE
            player.queue.remove(Number(args[0]) - 1); //Send Success Message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.cleared, " I removed the track at position: `").concat(Number(args[0]), "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 14]]);
  }
};