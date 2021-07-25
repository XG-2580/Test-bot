"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "loop",
  category: "\uD83C\uDFB6 Music",
  aliases: ["repeat", "l"],
  description: "Repeats the current song",
  usage: "loopsong",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, embed, _embed;

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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setFooter(es.footertext, es.footericon).setTitle("Please add your method!").setDescription("`loop song` / `loop queue`")));

          case 6:
            if (!(args[0].toLowerCase() === "song" || args[0].toLowerCase() === "track" || args[0].toLowerCase() === "s" || args[0].toLowerCase() === "t")) {
              _context.next = 13;
              break;
            }

            //Create the Embed
            embed = new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Changed Track loop to: ").concat(player.trackRepeat ? "".concat(emoji.msg.disabled, " disabled") : "".concat(emoji.msg.enabled, " active"))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon); //If Queue loop is enabled add embed info + disable it

            if (player.queueRepeat) {
              embed.setDescription("And **Queue** Repeat got **".concat(emoji.msg.disabled, " disabled**"));
              player.setQueueRepeat(false);
            } //toggle track repeat to the reverse old mode


            player.setTrackRepeat(!player.trackRepeat); //Send Success Message

            return _context.abrupt("return", message.channel.send(embed));

          case 13:
            if (!(args[0].toLowerCase() === "queue" || args[0].toLowerCase() === "qu" || args[0].toLowerCase() === "q")) {
              _context.next = 20;
              break;
            }

            //Create the Embed
            _embed = new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Changed Queue loop to: ").concat(player.queueRepeat ? "".concat(emoji.msg.disabled, " disabled") : "".concat(emoji.msg.enabled, " active"))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon); //If Track loop is enabled add embed info + disable it

            if (player.trackRepeat) {
              _embed.setDescription("And **Song** Repeat got **".concat(emoji.msg.disabled, " disabled**"));

              player.setTrackRepeat(false);
            } //toggle queue repeat to the reverse old mode


            player.setQueueRepeat(!player.queueRepeat); //Send Success Message

            return _context.abrupt("return", message.channel.send(_embed));

          case 20:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add your method!").setDescription("`loop song` / `loop queue`")));

          case 21:
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