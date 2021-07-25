"use strict";

var fetch = require("node-fetch");

var _require = require("discord.js"),
    Client = _require.Client,
    Collection = _require.Collection,
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var subreddits = ["memes", "DeepFriedMemes", "bonehurtingjuice", "surrealmemes", "dankmemes", "meirl", "me_irl", "funny"];

var path = require("path");

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  useage: "".concat(path.parse(__filename).name, " [@User]"),
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, data, selected;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "FUN")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fetch("https://imgur.com/r/".concat(subreddits[Math.floor(Math.random() * subreddits.length)], "/hot.json")).then(function (response) {
              return response.json();
            }).then(function (body) {
              return body.data;
            }));

          case 6:
            data = _context.sent;
            selected = data[Math.floor(Math.random() * data.length)];
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setImage("https://imgur.com/".concat(selected.hash).concat(selected.ext.replace(/\?.*/, ''))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTimestamp()));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }
};