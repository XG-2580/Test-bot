"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar,
    format = _require2.format;

module.exports = {
  name: "grab",
  category: "\uD83C\uDFB6 Music",
  aliases: ["save", "yoink"],
  description: "Saves the current playing song to your Direct Messages",
  usage: "grab",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es;
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
            message.author.send(new MessageEmbed().setAuthor("Saved Song:", message.author.displayAvatarURL({
              dynamic: true
            })).setThumbnail("https://img.youtube.com/vi/".concat(player.queue.current.identifier, "/mqdefault.jpg")).setURL(player.queue.current.uri).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(player.playing ? "".concat(emoji.msg.resume) : "".concat(emoji.msg.pause), " **").concat(player.queue.current.title, "**")).addField("".concat(emoji.msg.time, " Duration: "), "`".concat(format(player.queue.current.duration), "`"), true).addField("".concat(emoji.msg.song_by, " Song By: "), "`".concat(player.queue.current.author, "`"), true).addField("".concat(emoji.msg.repeat_mode, " Queue length: "), "`".concat(player.queue.length, " Songs`"), true).addField("".concat(emoji.msg.playing, " Play it:"), "`".concat(prefix, "play ").concat(player.queue.current.uri, "`")).addField("".concat(emoji.msg.search, " Saved in:"), "<#".concat(message.channel.id, ">")).setFooter("Requested by: ".concat(player.queue.current.requester.tag, " | in: ").concat(message.guild.name), player.queue.current.requester.displayAvatarURL({
              dynamic: true
            })))["catch"](function (e) {
              return message.channel.send("**Your Dm's are disabled**");
            });
            message.react(emoji.react.SUCCESS)["catch"](function (e) {
              return console.log("Could not react");
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};