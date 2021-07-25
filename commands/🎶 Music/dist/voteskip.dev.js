"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    autoplay = _require2.autoplay;

module.exports = {
  name: "voteskip",
  category: "\uD83C\uDFB6 Music",
  aliases: ["skip", "vs", "s"],
  description: "Skips the track, but if there is a DJ Setup u will have to vote first!",
  usage: "voteskip",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, channelmembersize, voteamount;
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

            if (!(client.settings.get(message.guild.id, "djroles").toString() !== "")) {
              _context.next = 23;
              break;
            }

            channelmembersize = channel.members.size;
            voteamount = 0;
            if (channelmembersize <= 3) voteamount = 1;
            voteamount = Math.ceil(channelmembersize / 3);

            if (player.get("vote-".concat(message.author.id))) {
              _context.next = 20;
              break;
            }

            player.set("vote-".concat(message.author.id), true);
            player.set("votes", String(Number(player.get("votes")) + 1));

            if (!(voteamount <= Number(player.get("votes")))) {
              _context.next = 17;
              break;
            }

            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes\n\n> Amount reached! Skipping \u23ED")));

            if (player.queue.size == 0) {
              player.destroy();
            } else {
              player.stop();
            }

            _context.next = 18;
            break;

          case 17:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

          case 18:
            _context.next = 21;
            break;

          case 20:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You have already Voted!!").setDescription("There are: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

          case 21:
            _context.next = 30;
            break;

          case 23:
            if (!(player.queue.size == 0)) {
              _context.next = 28;
              break;
            }

            if (!player.get("autoplay")) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", autoplay(client, player, "skip"));

          case 26:
            //stop playing
            player.destroy(); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.stop, " Stopped and left your Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 28:
            //skip the track
            player.stop(); //send success message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.skip_track, " Skipped to the next Song")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 32]]);
  }
};