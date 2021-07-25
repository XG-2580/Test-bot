"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "removevoteskip",
  category: "\uD83C\uDFB6 Music",
  aliases: ["rvs", "removeskip", "removevs", "votestop", "stopvote"],
  description: "Removes your Vote of the VoteSkip!",
  usage: "removevoteskip",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, channelmembersize, voteamount;
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

            if (!(client.settings.get(message.guild.id, "djroles").toString() !== "")) {
              _context.next = 18;
              break;
            }

            channelmembersize = channel.members.size;
            voteamount = 0;
            if (channelmembersize <= 3) voteamount = 1;
            voteamount = Math.ceil(channelmembersize / 3);

            if (!player.get("vote-".concat(message.author.id))) {
              _context.next = 15;
              break;
            }

            player.set("vote-".concat(message.author.id), false);
            player.set("votes", String(Number(player.get("votes")) - 1));
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

          case 15:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You havn't voted yet!!").setDescription("There are: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

          case 16:
            _context.next = 19;
            break;

          case 18:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Cannot remove your Vote!").setDescription("Because ther is no DJ-Role Setup created yet, create it by typing `".concat(prefix, "adddj @DJ-Setup`"))));

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 21]]);
  }
};