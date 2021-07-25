"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "removedupes",
  category: "\uD83C\uDFB6 Music",
  aliases: ["removedupe", "removedupetrack", "rdt", "removeduplicated", "removeduplicateds"],
  description: "Removes all duplicated tracks in the Queue",
  usage: "removedupes",
  cooldown: 10,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, tracks, newtracks, i, exists, _i, _newtracks, track;

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
            //make a new array of each single song which is not a dupe
            tracks = player.queue;
            newtracks = [];
            i = 0;

          case 7:
            if (!(i < tracks.length)) {
              _context.next = 21;
              break;
            }

            exists = false;
            j = 0;

          case 10:
            if (!(j < newtracks.length)) {
              _context.next = 17;
              break;
            }

            if (!(tracks[i].uri === newtracks[j].uri)) {
              _context.next = 14;
              break;
            }

            exists = true;
            return _context.abrupt("break", 17);

          case 14:
            j++;
            _context.next = 10;
            break;

          case 17:
            if (!exists) {
              newtracks.push(tracks[i]);
            }

          case 18:
            i++;
            _context.next = 7;
            break;

          case 21:
            //clear the Queue
            player.queue.clear(); //now add every not dupe song again

            for (_i = 0, _newtracks = newtracks; _i < _newtracks.length; _i++) {
              track = _newtracks[_i];
              player.queue.add(track);
            } //Send Success Message


            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.cleared, " I removed the track at position: `").concat(Number(args[0]), "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 26]]);
  }
};