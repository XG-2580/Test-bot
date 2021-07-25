"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar,
    format = _require2.format;

module.exports = {
  name: "nowplaying",
  category: "\uD83C\uDFB6 Music",
  aliases: ["np", "current"],
  description: "Shows information about the current Song",
  usage: "nowplaying",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, data, Nowplaying, card, image, attachment;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (player.queue.current) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is nothing playing")));

          case 4:
            data = {
              author: player.queue.current.author,
              title: player.playing ? "".concat(emoji.msg.resume, " ").concat(player.queue.current.title) : "".concat(emoji.msg.pause, " ").concat(player.queue.current.title),
              start: Date.now() - player.position,
              end: Date.now() + player.queue.current.duration - player.position,
              image: "https://img.youtube.com/vi/".concat(player.queue.current.identifier, "/mqdefault.jpg")
            };
            Nowplaying = require("../../handlers/canvas-nowplaying");
            card = new Nowplaying().setStartTimestamp(data.start).setEndTimestamp(data.end).setAuthor(data.author).setImage(data.image).setTitle(data.title).setFormat(true).setProgressBar("BAR", "#2E90FF");
            _context.next = 9;
            return regeneratorRuntime.awrap(card.build());

          case 9:
            image = _context.sent;
            attachment = new MessageAttachment(image, "nowplaying.png"); //Send Now playing Message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setAuthor("Current song playing:", "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1").setImage("attachment://nowplaying.png").attachFiles(attachment).setThumbnail("https://img.youtube.com/vi/".concat(player.queue.current.identifier, "/mqdefault.jpg")).setURL(player.queue.current.uri).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(player.playing ? "".concat(emoji.msg.resume) : "".concat(emoji.msg.pause), " **").concat(player.queue.current.title, "**")).addField("".concat(emoji.msg.time, " Duration: "), "`".concat(format(player.queue.current.duration).split(" | ")[0], "` | `").concat(format(player.queue.current.duration).split(" | ")[1], "`"), true).addField("".concat(emoji.msg.song_by, " Song By: "), "`".concat(player.queue.current.author, "`"), true).addField("".concat(emoji.msg.repeat_mode, " Queue length: "), "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(player.queue.current.requester.tag), player.queue.current.requester.displayAvatarURL({
              dynamic: true
            }))));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 14]]);
  }
};