"use strict";

var client = require('nekos.life');

var Discord = require('discord.js');

var neko = new client();

var config = require("../.config.json");

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

module.exports = {
  name: "2dtits",
  category: "🔞 NSFW",
  usage: "2dtits",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, owo, tits;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "NSFW")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            if (message.channel.nsfw) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.reply("This Channel is not a NSFW Channel").then(function (msg) {
              message.react('💢');
              msg["delete"]({
                timeout: 3000
              });
            }));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(neko.nsfw.tits());

          case 7:
            owo = _context.sent;
            tits = new Discord.MessageEmbed().setTitle("2D Tits").setImage(owo.url).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setURL(owo.url);
            message.channel.send(tits);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};