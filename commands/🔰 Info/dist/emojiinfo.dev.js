"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var moment = require("moment");

var _require2 = require("../../handlers/functions"),
    GetUser = _require2.GetUser,
    GetGlobalUser = _require2.GetGlobalUser;

module.exports = {
  name: "emojiinfo",
  aliases: ["infoemoji"],
  category: "🔰 Info",
  description: "See Information about an emji",
  usage: "emojiinfo <EMOJI>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, hasEmoteRegex, emoteRegex, animatedEmoteRegex, url, emoji, authorFetch, checkOrCross, embed, url2, attachment2, _emoji, _authorFetch, _checkOrCross, _embed;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            hasEmoteRegex = /<a?:.+:\d+>/gm;
            emoteRegex = /<:.+:(\d+)>/gm;
            animatedEmoteRegex = /<a:.+:(\d+)>/gm;

            if (message.content.match(hasEmoteRegex)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.reply("Your message does not include a VALID Emoji, please retry by adding a guild specific emoji!"));

          case 7:
            if (!(emoji1 = emoteRegex.exec(message))) {
              _context.next = 20;
              break;
            }

            url = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".png?v=1";
            emoji = message.guild.emojis.cache.find(function (emj) {
              return emj.name === emoji1[1] || emj.id == emoji1[1];
            });

            if (emoji) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", message.channel.send("Please provide a custom Emoji from **THIS GUILD**"));

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(emoji.fetchAuthor());

          case 14:
            authorFetch = _context.sent;

            checkOrCross = function checkOrCross(bool) {
              return bool ? "✅" : "❌";
            };

            embed = new MessageEmbed().setTitle("**Emoji Information for: __`".concat(emoji.name.toLowerCase(), "`__**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setThumbnail(emoji.url).addField("**General:**", ["**ID:** `".concat(emoji.id, "`"), "**URL:** [`LINK`](".concat(emoji.url, ")"), "**AUTHOR:** ".concat(authorFetch, " (`").concat(authorFetch.id, "`)"), "**CREATED AT:** `".concat(moment(emoji.createdTimestamp).format("DD/MM/YYYY") + " | " + moment(emoji.createdTimestamp).format("hh:mm:ss"), "`")]).addField("**Others:**", ["**Requires Colons:** `".concat(checkOrCross(emoji.requireColons), "`"), "**Animated:** `".concat(checkOrCross(emoji.animated), "`"), "**Deleteable:** `".concat(checkOrCross(emoji.deleteable), "`"), "**Managed:** `".concat(checkOrCross(emoji.managed), "`")]).setFooter(es.footertext, es.footericon);
            message.channel.send(embed);
            _context.next = 35;
            break;

          case 20:
            if (!(emoji1 = animatedEmoteRegex.exec(message))) {
              _context.next = 34;
              break;
            }

            url2 = "https://cdn.discordapp.com/emojis/" + emoji1[1] + ".gif?v=1";
            attachment2 = new Discord.MessageAttachment(url2, "emoji.gif");
            _emoji = message.guild.emojis.cache.find(function (emj) {
              return emj.name === emoji1[1] || emj.id == emoji1[1];
            });

            if (_emoji) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", message.channel.send("Please provide a custom Emoji from **THIS GUILD**"));

          case 26:
            _context.next = 28;
            return regeneratorRuntime.awrap(_emoji.fetchAuthor());

          case 28:
            _authorFetch = _context.sent;

            _checkOrCross = function _checkOrCross(bool) {
              return bool ? "✅" : "❌";
            };

            _embed = new MessageEmbed().setTitle("**Emoji Information for: __`".concat(_emoji.name.toLowerCase(), "`__**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setThumbnail(_emoji.url).addField("**General:**", ["**ID:** `".concat(_emoji.id, "`"), "**URL:** [`LINK`](".concat(_emoji.url, ")"), "**AUTHOR:** ".concat(_authorFetch, " (`").concat(_authorFetch.id, "`)"), "**CREATED AT:** `".concat(moment(_emoji.createdTimestamp).format("DD/MM/YYYY") + " | " + moment(_emoji.createdTimestamp).format("hh:mm:ss"), "`")]).addField("**Others:**", ["**Requires Colons:** `".concat(_checkOrCross(_emoji.requireColons), "`"), "**Animated:** `".concat(_checkOrCross(_emoji.animated), "`"), "**Deleteable:** `".concat(_checkOrCross(_emoji.deleteable), "`"), "**Managed:** `".concat(_checkOrCross(_emoji.managed), "`")]).setFooter(es.footertext, es.footericon);
            message.channel.send(_embed);
            _context.next = 35;
            break;

          case 34:
            message.channel.send("Couldn't find an emoji to paste! if it's uniced(standard) and not a guild Emoji, it's not possible!");

          case 35:
            _context.next = 41;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 37]]);
  }
};