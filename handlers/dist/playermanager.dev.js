"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require(".config.json");

ee = require("../base-system/embed.json");

var _require2 = require("../handlers/functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove;

module.exports = function _callee(client, message, args, type) {
  var method, channel, permissions;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = type.includes(":") ? type.split(":") : Array(type);

          if (message.guild) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          //just visual for the console
          ee = client.settings.get(message.guild.id, "embed");
          channel = message.member.voice.channel;
          permissions = channel.permissionsFor(client.user);

          if (permissions.has("CONNECT")) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("I need permissions to join your channel")));

        case 8:
          if (permissions.has("SPEAK")) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("I need permissions to speak in your channel")));

        case 10:
          if (!(method[0] === "song")) {
            _context.next = 14;
            break;
          }

          require("./playermanagers/song")(client, message, args, type);

          _context.next = 39;
          break;

        case 14:
          if (!(method[0] === "request")) {
            _context.next = 18;
            break;
          }

          require("./playermanagers/request")(client, message, args, type);

          _context.next = 39;
          break;

        case 18:
          if (!(method[0] === "playlist")) {
            _context.next = 22;
            break;
          }

          require("./playermanagers/playlist")(client, message, args, type);

          _context.next = 39;
          break;

        case 22:
          if (!(method[0] === "similar")) {
            _context.next = 26;
            break;
          }

          require("./playermanagers/similar")(client, message, args, type);

          _context.next = 39;
          break;

        case 26:
          if (!(method[0] === "search")) {
            _context.next = 30;
            break;
          }

          require("./playermanagers/search")(client, message, args, type);

          _context.next = 39;
          break;

        case 30:
          if (!(method[0] === "skiptrack")) {
            _context.next = 34;
            break;
          }

          require("./playermanagers/skiptrack")(client, message, args, type);

          _context.next = 39;
          break;

        case 34:
          if (!(method[0] === "playtop")) {
            _context.next = 38;
            break;
          }

          require("./playermanagers/playtop")(client, message, args, type);

          _context.next = 39;
          break;

        case 38:
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("No valid search Term? ... Please Contact: `XG#2846`")));

        case 39:
        case "end":
          return _context.stop();
      }
    }
  });
};