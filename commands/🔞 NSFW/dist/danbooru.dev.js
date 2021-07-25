"use strict";

var randomPuppy = require('random-puppy');

var request = require('node-fetch');

var fs = require("fs");

var config = require("../.config.json");

var Discord = require('discord.js');

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var booru = require('booru');

module.exports = {
  name: "danbooru",
  category: "🔞 NSFW",
  usage: "danbooru",
  description: "Searches danbooru image board",
  run: function run(bot, message, args) {
    var es, query;
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
            if (!(message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE'))) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!'));

          case 7:
            query = message.content.split(/\s+/g).slice(1).join(" ");
            booru.search('db', [query], {
              random: true
            }).then(booru.commonfy).then(function (images) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var image = _step.value;
                  var embed = new Discord.MessageEmbed().setTitle("Danbooru:").setImage(image.common.file_url).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setFooter("Tags: danbooru ".concat(query)).setURL(image.common.file_url);
                  return message.channel.send({
                    embed: embed
                  });
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            })["catch"](function (err) {
              if (err.name === 'booruError') {
                return message.channel.send("No results found for **".concat(query, "**!"));
              } else {
                return message.channel.send("No results found for **".concat(query, "**!"));
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};