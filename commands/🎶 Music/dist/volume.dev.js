"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "volume",
  category: "\uD83C\uDFB6 Music",
  aliases: ["vol"],
  description: "Changes the Volume",
  usage: "volume <0-150>",
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

            if (!(Number(args[0]) <= 0 || Number(args[0]) > 150)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You may set the volume `1` - `150`")));

          case 6:
            if (!isNaN(args[0])) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You may set the volume `1` - `150`")));

          case 8:
            //change the volume
            player.setVolume(Number(args[0])); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.raise_volume, " Volume set to: `").concat(player.volume, " %`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 12]]);
  }
};