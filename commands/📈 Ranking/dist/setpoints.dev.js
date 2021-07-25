"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  //definition
  name: "setpoints",
  category: "📈 Ranking",
  aliases: [""],
  cooldown: 4,
  usage: "setpoints <@User> <Amount>",
  description: "Set a specific amount of Points to a User",
  run: function run(client, message, args, user, text, prefix) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};