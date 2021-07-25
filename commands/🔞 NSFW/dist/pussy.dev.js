"use strict";

var client = require('nekos.life');

var Discord = require('discord.js');

var neko = new client();

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

module.exports = {
  name: "pussy",
  category: "🔞 NSFW",
  usage: "pussy",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, superagent, lo;
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
            return _context.abrupt("return", message.reply("This Channel is not a NSFW Channel").then(function (msg) {
              msg["delete"]({
                timeout: 3000
              });
            }));

          case 6:
            superagent = require('superagent');

            if (message.channel.nsfw) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.channel.send('You must use this command in an nsfw lounge!'));

          case 9:
            lo = new Discord.MessageEmbed().setDescription("Please wait... <a:Loading:592829210054098944>").setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon);
            message.channel.send(lo).then(function (m) {
              superagent.get('https://nekobot.xyz/api/image').query({
                type: 'pussy'
              }).end(function (err, response) {
                var embed_nsfw = new Discord.MessageEmbed().setDescription(":underage:\n**[image not loading? click here](".concat(response.body.message, ")**")).setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setImage(response.body.message);
                m.edit(embed_nsfw);
              });
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};