"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    format = _require2.format,
    delay = _require2.delay,
    edit_request_message_track_info = _require2.edit_request_message_track_info,
    arrayMove = _require2.arrayMove;

module.exports = {
  name: "stop",
  category: "\uD83C\uDFB6 Music",
  aliases: ["leave", "dis", "disconnect"],
  description: "Stops current track and leaves the channel",
  usage: "stop",
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

            if (player) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("No song is currently playing in this guild.")));

          case 6:
            if (!(player.queue && !player.queue.current)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("No song is currently playing in this guild.")));

          case 8:
            //stop playing
            player.destroy(); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.stop, " Stopped and left your Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

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