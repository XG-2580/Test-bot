"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var playermanager = require("../../handlers/playermanager");

var _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar;

module.exports = {
  name: "queuestatus",
  category: "\uD83C\uDFB6 Music",
  aliases: ["qs", "status", "queuestats", "qus"],
  description: "Shows the current Queuestatus",
  usage: "queuestatus",
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
            //toggle autoplay
            embed = new MessageEmbed();

            try {
              embed.setTitle("Connected to:  `\uD83D\uDD08".concat(client.channels.cache.get(player.voiceChannel).name, "`"));
            } catch (_unused) {}

            try {
              embed.setDescription("And bound to: `#".concat(client.channels.cache.get(player.textChannel).name, "`   **\u25AC**   Queue length: `").concat(player.queue.length, " Songs`"));
            } catch (_unused2) {}

            try {
              embed.addField("".concat(emoji.msg.raise_volume, " Volume"), "".concat(player.volume, "%"), true);
            } catch (_unused3) {}

            try {
              embed.addField("".concat(emoji.msg.equalizer, " Equalizer: "), "".concat(emoji.msg.playing, " Music"), true);
            } catch (_unused4) {}

            try {
              embed.addField("".concat(player.queueRepeat ? "".concat(emoji.msg.autoplay_mode, " Queue Loop: ") : "".concat(emoji.msg.autoplay_mode, " Song Loop: ")), "".concat(player.queueRepeat ? "".concat(emoji.msg.SUCCESS, " Enabled") : player.trackRepeat ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused5) {}

            try {
              embed.addField("".concat(emoji.msg.leave_on_empty, " Leave on Empty Channel: "), "".concat(config.settings.leaveOnEmpty_Channel.enabled ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused6) {}

            try {
              embed.addField("".concat(emoji.msg.repeat_mode, " Leave on Empty Queue: "), "".concat(config.settings.LeaveOnEmpty_Queue.enabled ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused7) {}

            try {
              embed.addField("".concat(emoji.msg.autoplay_mode, " Autoplay"), "".concat(player.get("autoplay") ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused8) {}

            try {
              embed.addField("".concat(emoji.msg.premium, " Premium GUILD"), "".concat(client.premium.get(player.guild).enabled ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused9) {}

            try {
              embed.addField("".concat(emoji.msg.premium, " Premium USER"), "".concat(client.premium.get(player.get("playerauthor")).enabled ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused10) {}

            try {
              embed.addField("".concat(emoji.msg.premium, " 24/7 AFK Setup"), "PLAYER: ".concat(player.get("afk-".concat(player.get("playerauthor"))) ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled"), "\nGUILD: ").concat(player.get("afk-".concat(player.guild)) ? "".concat(emoji.msg.SUCCESS, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled")), true);
            } catch (_unused11) {}

            try {
              embed.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
            } catch (_unused12) {}

            try {
              embed.setFooter(es.footertext, es.footericon);
            } catch (_unused13) {}

            try {
              embed.addField("".concat(emoji.msg.disk, " Current Track: "), "".concat(player.playing ? "".concat(emoji.msg.resume) : "".concat(emoji.msg.pause), " [**").concat(player.queue.current.title, "**](").concat(player.queue.current.uri, ")"));
            } catch (_unused14) {}

            try {
              embed.addField("".concat(emoji.msg.time, " Progress: "), createBar(player));
            } catch (_unused15) {}

            message.channel.send(embed);
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 23]]);
  }
};