"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var fetch = require("node-fetch");

var _require = require("http"),
    STATUS_CODES = _require.STATUS_CODES;

var _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed;

module.exports = {
  name: "npmpkgsize",
  category: "⌨️ Programming",
  aliases: ["npmpackagesize", "nodepackagemanagersize"],
  cooldown: 5,
  usage: "npmpkgsize <package>",
  description: "Search the NPM Registry for a package Size Information",
  run: function run(client, message, args, user, text, prefix) {
    var es, getBytes, name, _ref, publishSize, installSize;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            getBytes = function getBytes(bytes) {
              var i = Math.floor(Math.log(bytes) / Math.log(1024));
              return !bytes && "0 Bytes" || "".concat((bytes / Math.pow(1024, i)).toFixed(2), " ").concat(suffixes[i]);
            };

            name = args[0];

            if (name) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a NPM-PACKAGE").setDescription("Usage: `".concat(prefix, "npm <package>`"))
            }));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(fetch("https://packagephobia.now.sh/api.json?p=".concat(encodeURIComponent(name))).then(function (res) {
              return res.json();
            }));

          case 8:
            _ref = _context.sent;
            publishSize = _ref.publishSize;
            installSize = _ref.installSize;

            if (!(!publishSize && !installSize)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.channel.send("That package doesn't exist."));

          case 13:
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setTitle("NPM Package Size - ".concat(name)).setColor(es.color).setFooter(es.footertext, es.footericon).setDescription("**Publish Size:** ".concat(getBytes(publishSize), "\n**Install Size:** ").concat(getBytes(installSize)))
            }));

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 16]]);
  }
};