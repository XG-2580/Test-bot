"use strict";

var client = require('nekos.life');

var Discord = require('discord.js');

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var neko = new client();

var config = require("../.config.json");

module.exports = {
  name: "keta",
  category: "🔞 NSFW",
  usage: "keta",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, work;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            work = function _ref() {
              var owo, keta;
              return regeneratorRuntime.async(function work$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(neko.nsfw.keta());

                    case 2:
                      owo = _context.sent;
                      keta = new Discord.MessageEmbed().setTitle("Keta").setImage(owo.url).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setURL(owo.url);
                      message.channel.send(keta);

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "NSFW")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 4:
            if (message.channel.nsfw) {
              _context2.next = 7;
              break;
            }

            message.react('💢');
            return _context2.abrupt("return", message.reply("This Channel is not a NSFW Channel").then(function (msg) {
              msg["delete"]({
                timeout: 3000
              });
            }));

          case 7:
            work();

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};