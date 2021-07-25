"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar,
    format = _require2.format;

module.exports = {
  name: "forward",
  category: "\uD83C\uDFB6 Music",
  aliases: ["seekforwards", "fwd"],
  description: "Seeks a specific amount of Seconds forwards",
  usage: "forward <Duration in Seconds>",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, seektime;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;

            if (args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You may forward for `1` - `".concat(player.queue.current.duration, "`"))));

          case 6:
            //get the seektime variable of the user input
            seektime = Number(player.position) + Number(args[0]) * 1000; //if the userinput is smaller then 0, then set the seektime to just the player.position

            if (Number(args[0]) <= 0) seektime = Number(player.position); //if the seektime is too big, then set it 1 sec earlier

            if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000; //seek to the new Seek position

            player.seek(Number(seektime)); //Send Success Message

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.forward, " Forwarded the Song ")).setDescription("Forwarded for `".concat(args[0], " Seconds` to: ").concat(format(Number(player.position)))).addField("".concat(emoji.msg.time, " Progress: "), createBar(player)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 13]]);
  }
};