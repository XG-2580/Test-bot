"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var got = require("got");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "amazeme",
  aliases: ["amazeme"],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "amazeme",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
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
            got("https://www.reddit.com/r/interestingasfuck/random.json").then(function (response) {
              var content = JSON.parse(response.body);
              var title = content[0].data.children[0].data.title;
              var amazeme = content[0].data.children[0].data.url;
              var jokeembed = new MessageEmbed().setDescription("[`Click here`](".concat(amazeme, ")")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle(title).setTimestamp();
              if (amazeme.toLowerCase().endsWith("png") || amazeme.toLowerCase().endsWith("jpg") || amazeme.toLowerCase().endsWith("jpeg") || amazeme.toLowerCase().endsWith("gif")) jokeembed.setImage(amazeme);
              return message.channel.send(jokeembed);
            })["catch"](function (e) {
              return console.log(String(e.stack).red);
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 7]]);
  }
};