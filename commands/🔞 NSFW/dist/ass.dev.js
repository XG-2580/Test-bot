"use strict";

var superagent = require("node-fetch");

var Discord = require('discord.js');

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var rp = require('request-promise-native');

var config = require("../.config.json");

module.exports = {
  name: "ass",
  category: "🔞 NSFW",
  description: "Sends ass",
  usage: "ass",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
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
            return _context.abrupt("return", rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function (res) {
              return rp.get({
                url: 'http://media.obutts.ru/' + res[0].preview,
                encoding: null
              });
            }).then(function (res) {
              var ass = new Discord.MessageEmbed().setTitle("Ass").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setImage("attachment://file.png").attachFiles([{
                attachment: res,
                name: "file.png"
              }]);
              message.channel.send(ass);
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};