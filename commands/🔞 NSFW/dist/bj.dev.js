"use strict";

var client = require('nekos.life');

var Discord = require('discord.js');

var neko = new client();

var config = require("../.config.json");

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

module.exports = {
  name: "bj",
  category: "🔞 NSFW",
  usage: "bj",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, superagent;
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
              _context.next = 6;
              break;
            }

            message.react('💢');
            return _context.abrupt("return", message.channel.send({
              embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
              }
            }));

          case 6:
            superagent = require('superagent');
            superagent.get('https://nekos.life/api/v2/img/blowjob').end(function (err, response) {
              var embed = new Discord.MessageEmbed().setTitle(":smirk: Blowjob").setImage(response.body.url).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setFooter("Tags: blowjob").setURL(response.body.url);
              message.channel.send(embed);
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};