"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require('discord-buttons'),
    MessageButton = _require2.MessageButton;

module.exports = {
  name: "getinvitechannel",
  category: "🔰 Info",
  usage: "getinvitechannel",
  description: "Gives you an Invite link for an Channel",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, Channel, msg;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            Channel = message.mentions.channels.first();

            if (Channel) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return regeneratorRuntime.awrap(client.channels.fetch(args[0]));

          case 6:
            Channel = _context.sent;

          case 7:
            if (Channel) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.reply("You didn't provided a Channel"));

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(client.getInvite(Channel.id));

          case 11:
            msg = _context.sent;
            message.channel.send(msg);
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 15]]);
  }
};