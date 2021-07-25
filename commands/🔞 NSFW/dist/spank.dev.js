"use strict";

var client = require('nekos.life');

var Discord = require('discord.js');

var neko = new client();

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

module.exports = {
  name: "spank",
  category: "🔞 NSFW",
  description: "spanks a mentioned user",
  usage: "[command] + [user]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, work;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            work = function _ref() {
              var owo, cuddleembed;
              return regeneratorRuntime.async(function work$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(neko.nsfw.spank());

                    case 2:
                      owo = _context.sent;
                      cuddleembed = new Discord.MessageEmbed().setTitle(user.username + " You have been spanked! ").setDescription(user.toString() + " has been spanked by " + message.author.toString() + "!").setImage(owo.url).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setURL(owo.url);
                      message.channel.send(cuddleembed);

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
            user = message.mentions.users.first();

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", message.reply('Mention someone to hug'));

          case 10:
            work();

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};