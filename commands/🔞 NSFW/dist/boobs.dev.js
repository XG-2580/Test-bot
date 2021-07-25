"use strict";

var superagent = require("node-fetch");

var Discord = require('discord.js');

var rp = require('request-promise-native');

var config = require("../.config.json");

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

module.exports = {
  name: "boobs",
  category: "🔞 NSFW",
  description: "Sends boobs",
  usage: "boobs",
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
            return _context.abrupt("return", rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function (res) {
              return rp.get({
                url: 'http://media.oboobs.ru/' + res[0].preview,
                encoding: null
              });
            }).then(function (res) {
              var boobs = new Discord.MessageEmbed().setTitle("Boobs").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setImage("attachment://file.png").attachFiles([{
                attachment: res,
                name: "file.png"
              }]);
              message.channel.send(boobs);
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};