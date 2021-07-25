"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "togglepruning",
  aliases: ["toggleprunning", "pruning", "prunning", "toggeldebug", "debug"],
  category: "⚙️ Settings",
  description: "Toggles pruning. If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
  usage: "togglepruning",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "pruning"), "pruning");
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(client.settings.get(message.guild.id, "pruning") ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.ERROR, " Disabled"), " Pruning")).setDescription("I will now ".concat(client.settings.get(message.guild.id, "pruning") ? "" : "not", " send a message with Track Information, if I am on \"AFK\""))));

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("".concat(_context.t0.message))));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 6]]);
  }
};