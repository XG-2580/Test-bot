"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar,
    format = _require2.format;

module.exports = {
  name: "rewind",
  category: "\uD83C\uDFB6 Music",
  aliases: ["seekbackwards", "rew"],
  description: "Seeks a specific amount of Seconds backwards",
  usage: "rewind <Duration in Seconds>",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, seektime;
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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setTitle("You may rewind for `1` - `".concat(player.queue.current.duration, "`"))));

          case 6:
            seektime = player.position - Number(args[0]) * 1000;

            if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
              seektime = 0;
            } //seek to the right time


            player.seek(Number(seektime)); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.rewind, " Rewinded the song for `").concat(args[0], " Seconds` to: ").concat(format(Number(player.position)))).addField("".concat(emoji.msg.time, " Progress: "), createBar(player)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

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