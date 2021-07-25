"use strict";

//Here the command starts
var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  //definition
  name: "resetrankingall",
  //the name of the command 
  category: "📈 Ranking",
  //the category this will be listed at, for the help cmd
  aliases: [""],
  //every parameter can be an alias
  cooldown: 4,
  //this will set it to a 4 second cooldown
  usage: "resetrankingall",
  //this is for the help command for EACH cmd
  description: "Reset ranking of everyone in this Server",
  //the description of the command
  //running the command with the parameters: client, message, args, user, text, prefix
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
}; //-CODED-BY-XG#2846-//