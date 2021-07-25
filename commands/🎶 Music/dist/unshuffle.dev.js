"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "unshuffle",
  category: "\uD83C\uDFB6 Music",
  aliases: ["unmix", "oldshuffle", "undoshuffle", "oldqueue", "us"],
  description: "Unshuffles the Queue - Restores the old Queue",
  usage: "unshuffle",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track;

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

            if (player.get("beforeshuffle")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You haven't shuffled this Queue yet!").setDescription("To shuffle it type: `".concat(prefix, "shuffle`"))));

          case 6:
            //clear teh Queue
            player.queue.clear(); //now add every old song again

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;

            for (_iterator = player.get("beforeshuffle")[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              track = _step.value;
              player.queue.add(track);
            } //return success message


            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.shuffle, " **Re**shuffled the Queue")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 29], [10, 14, 18, 26], [19,, 21, 25]]);
  }
};