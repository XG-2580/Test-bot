"use strict";

var _require = require("discord-uno"),
    DiscordUNO = _require.DiscordUNO;

var discordUNO = new DiscordUNO("#2f3136");

var _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed,
    MessageAttachment = _require2.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fetch = require("node-fetch");

module.exports = {
  name: "uno",
  aliases: ["cardgame"],
  category: "🎮 MiniGames",
  description: "Allows you to play a Game of UNO",
  usage: "uno --> Play the Game",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MINIGAMES")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            if (args[0]) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Error | Please enter a valid type").setDescription("**Valid Types:**\n`join`, `creategame`, `leave`, `startgame`, `endgame`, `play`, `UNO`,\n`draw`, `cards`, `table`, `viewwinners`, `settings`, `viewsettings`")));

          case 5:
            _context.t0 = args[0];
            _context.next = _context.t0 === "join" ? 8 : _context.t0 === "creategame" ? 11 : _context.t0 === "leave" ? 14 : _context.t0 === "startgame" ? 17 : _context.t0 === "endgame" ? 20 : _context.t0 === "play" ? 23 : _context.t0 === "draw" ? 26 : _context.t0 === "cards" ? 29 : _context.t0 === "table" ? 32 : _context.t0 === "viewwinners" ? 35 : _context.t0 === "settings" ? 38 : _context.t0 === "viewsettings" ? 41 : 44;
            break;

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(discordUNO.addUser(message));

          case 10:
            return _context.abrupt("break", 46);

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(discordUNO.createGame(message));

          case 13:
            return _context.abrupt("break", 46);

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(discordUNO.removeUser(message));

          case 16:
            return _context.abrupt("break", 46);

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(discordUNO.startGame(message));

          case 19:
            return _context.abrupt("break", 46);

          case 20:
            _context.next = 22;
            return regeneratorRuntime.awrap(discordUNO.endGame(message));

          case 22:
            return _context.abrupt("break", 46);

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(discordUNO.playCard(message));

          case 25:
            return _context.abrupt("break", 46);

          case 26:
            _context.next = 28;
            return regeneratorRuntime.awrap(discordUNO.draw(message));

          case 28:
            return _context.abrupt("break", 46);

          case 29:
            _context.next = 31;
            return regeneratorRuntime.awrap(discordUNO.viewCards(message));

          case 31:
            return _context.abrupt("break", 46);

          case 32:
            _context.next = 34;
            return regeneratorRuntime.awrap(discordUNO.viewTable(message));

          case 34:
            return _context.abrupt("break", 46);

          case 35:
            _context.next = 37;
            return regeneratorRuntime.awrap(discordUNO.viewWinners(message));

          case 37:
            return _context.abrupt("break", 46);

          case 38:
            _context.next = 40;
            return regeneratorRuntime.awrap(discordUNO.updateSettings(message));

          case 40:
            return _context.abrupt("break", 46);

          case 41:
            _context.next = 43;
            return regeneratorRuntime.awrap(discordUNO.viewSettings(message));

          case 43:
            return _context.abrupt("break", 46);

          case 44:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Error | Please enter a valid type").setDescription("**Valid Types:**\n`join`, `creategame`, `leave`, `startgame`, `endgame`, `play`, `UNO`, `draw`, `cards`, `table`, `viewwinners`, `settings`, `viewsettings`")));

          case 46:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};