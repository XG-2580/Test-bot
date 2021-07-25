"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    format = _require2.format,
    arrayMove = _require2.arrayMove;

module.exports = {
  name: "move",
  category: "\uD83C\uDFB6 Music",
  aliases: ["mv"],
  description: "Shows the Queue",
  usage: "move <from> <to>",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, song, QueueArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track;

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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, " | Wrong Command Usage!")).setDescription("Usage: `".concat(prefix, "move <from> <to>`\nExample: `").concat(prefix, "move ").concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, " 1`"))));

          case 6:
            if (args[1]) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, " | Wrong Command Usage!")).setDescription("Usage: `".concat(prefix, "move <from> <to>`\nExample: `").concat(prefix, "move ").concat(player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2, " 1`"))));

          case 8:
            if (!(isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, " | Error Your Input must be a Number greater then `1` and smaller then `").concat(player.queue.length, "`"))));

          case 10:
            //get the new Song
            song = player.queue[player.queue.length - 1]; //move the Song to the first position using my selfmade Function and save it on an array

            QueueArray = arrayMove(player.queue, player.queue.length - 1, 0); //clear teh Queue

            player.queue.clear(); //now add every old song again

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 16;

            for (_iterator = QueueArray[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              track = _step.value;
              player.queue.add(track);
            }

            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Mmoved the Song in the Queue from Position `".concat(args[0], "` to Position: `").concat(args[1], "`")).setThumbnail(song.displayThumbnail()).setDescription("[".concat(song.title, "](").concat(song.uri, ") - `").concat(format(song.duration), "` - requested by **").concat(song.requester.tag, "**"))));

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 35], [16, 20, 24, 32], [25,, 27, 31]]);
  }
};