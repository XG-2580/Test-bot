"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    autoplay = _require2.autoplay;

module.exports = {
  name: "forceskip",
  category: "🎶 Music",
  aliases: ["fs"],
  description: "Forces to skip the current song",
  usage: "forceskip",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, channel, player;
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
            //get the channel instance from the Member
            channel = message.member.voice.channel; //if the member is not in a channel, return

            if (channel) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to join a voice channel.")));

          case 7:
            //get the player instance
            player = client.manager.players.get(message.guild.id); //if no player available return error | aka not playing anything

            if (player) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is nothing playing")));

          case 10:
            if (!(channel.id !== player.voiceChannel)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You need to be in my voice channel to use this command!").setDescription("Channelname: `".concat(message.guild.channels.cache.get(player.voiceChannel).name, "`"))));

          case 12:
            if (!(player.queue.size == 0)) {
              _context.next = 17;
              break;
            }

            if (!player.get("autoplay")) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", autoplay(client, player, "skip"));

          case 15:
            //stop playing
            player.destroy(); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your Channel").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 17:
            //skip the track
            player.stop(); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("⏭ Skipped to the next Song").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 21]]);
  }
};