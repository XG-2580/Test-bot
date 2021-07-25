"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "loopsong",
  category: "\uD83C\uDFB6 Music",
  aliases: ["repeatsong", "ls", "rs", "repeattrack", "looptrack", "lt", "rt"],
  description: "Repeats the current song",
  usage: "loopsong",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, embed;
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
            //define the Embed
            embed = new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Changed Track loop to: ").concat(player.trackRepeat ? "".concat(emoji.msg.disabled, " disabled") : "".concat(emoji.msg.enabled, " active"))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon); //if there is active queue loop, disable it + add embed information

            if (player.queueRepeat) {
              embed.setDescription("And **Queue** Repeat got **".concat(emoji.msg.disabled, " disabled**"));
              player.setQueueRepeat(false);
            } //set track repeat to revers of old track repeat


            player.setTrackRepeat(!player.trackRepeat);
            return _context.abrupt("return", message.channel.send(embed));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }
};