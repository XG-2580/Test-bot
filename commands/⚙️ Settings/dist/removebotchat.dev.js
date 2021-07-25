"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "removebotchat",
  aliases: ["removebotchat"],
  category: "\u2699\uFE0F Settings",
  description: "Let's you delete the channel for the bot commands",
  usage: "removebotchat",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, channel, leftb, i;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            channel = message.mentions.channels.filter(function (ch) {
              return ch.guild.id == message.guild.id;
            }).first();

            if (channel) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Channel via ping, for example: #channel!")));

          case 5:
            _context.prev = 5;
            message.guild.channels.cache.get(channel.id);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("It seems that the Channel does not exist in this Server!")));

          case 12:
            if (client.settings.get(message.guild.id, "botchannel").includes(channel.id)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("This Channel is not in the Bot Channel Settings!")));

          case 14:
            client.settings.remove(message.guild.id, channel.id, "botchannel");
            leftb = "";
            if (client.settings.get(message.guild.id, "botchannel").join("") === "") leftb = "no Channels, aka all Channels are Bot Channels";else for (i = 0; i < client.settings.get(message.guild.id, "botchannel").length; i++) {
              leftb += "<#" + client.settings.get(message.guild.id, "botchannel")[i] + "> | ";
            }
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed the Bot-Chat `".concat(channel.name, "`")).setDescription("All left Bot Chats:\n> ".concat(leftb.substr(0, leftb.length - 3)))));

          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 20], [5, 9]]);
  }
};