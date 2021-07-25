"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "toggledm",
  aliases: ["toggledmmessage", "toggledmmsg"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you dm messages",
  usage: "toggledm",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            client.settings.set(message.author.id, !client.settings.get(message.author.id, "dm"), "dm");
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(client.settings.get(message.author.id, "dm") ? "Enabled" : "Disabled", " Dm messages")).setDescription("".concat(client.settings.get(message.author.id, "dm") ? "I will now send you DMS after the COMMANDS, if needed" : "I will not send you DMS after the COMMANDS").substr(0, 2048))));

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 6]]);
  }
};