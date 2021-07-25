"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    GetUser = _require2.GetUser,
    GetGlobalUser = _require2.GetGlobalUser;

module.exports = {
  name: "enlarge",
  aliases: ["enlargeemoji"],
  category: "🔰 Info",
  description: "Make the Emoji, just larger",
  usage: "enlarge <EMOJI>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, hasEmoteRegex, emoteRegex, animatedEmoteRegex, url, attachment, url2, attachment2;
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
            if (emoji = emoteRegex.exec(message)) {
              url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1";
              attachment = new Discord.MessageAttachment(url, "emoji.png");
              message.channel.send(attachment);
            } else if (emoji = animatedEmoteRegex.exec(message)) {
              url2 = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1";
              attachment2 = new Discord.MessageAttachment(url2, "emoji.gif");
              message.channel.send(attachment2);
            } else {
              message.channel.send("Couldn't find an emoji to paste! if it's uniced(standard) and not a guild Emoji, it's not possible!");
            }

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 10]]);
  }
};