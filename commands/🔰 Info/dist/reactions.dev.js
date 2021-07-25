"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "reactions",
  category: "🔰 Info",
  aliases: ["reacts"],
  cooldown: 5,
  usage: "reactions",
  description: "Gives you Information, which reaction dues what",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("🩸 My Reactions when playing a Track does those Things").setFooter(es.footertext, es.footericon).addField("\u200B", "".concat(emoji.msg.rewind, " Rewind 20 seconds\n").concat(emoji.msg.forward, " Forward 20 seconds\n").concat(emoji.msg.pause_resume, " Pause/Resume\n").concat(emoji.msg.stop, " Stop Track\n").concat(emoji.msg.previous_track, " Play previous\n"), true).addField("\u200B", "".concat(emoji.msg.skip_track, " Skip / Next\n").concat(emoji.msg.replay_track, " Replay Track\n").concat(emoji.msg.reduce_volume, " Volume -10 %\n").concat(emoji.msg.raise_volume, " Volume +10 %\n").concat(emoji.msg.toggle_mute, " Toggle Volume Mute"), true).addField("\u200B", "".concat(emoji.msg.repeat_mode, " Change repeat mode\n").concat(emoji.msg.autoplay_mode, " Toggle Autoplay\n").concat(emoji.msg.shuffle, " Shuffle the queue\n").concat(emoji.msg.show_queue, " Show the Queue\n").concat(emoji.msg.show_current_track, " Shows Current Track"), true));
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 5]]);
  }
};