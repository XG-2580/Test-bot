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
  name: "moveme",
  category: "\uD83C\uDFB6 Music",
  aliases: ["mm", "mvm", "my", "mvy", "moveyou"],
  description: "Moves you to the BOT, if playing something",
  usage: "move",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false,
    "notsamechannel": true
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, botchannel;
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
            botchannel = message.guild.me.voice.channel;

            if (botchannel) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am connected nowhere")));

          case 7:
            if (!(botchannel.userLimit >= botchannel.members.length)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The Channel is full, I cant move you")));

          case 9:
            message.member.voice.setChannel(botchannel);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("moved you to: `".concat(botchannel.name, "`"))));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 13]]);
  }
};