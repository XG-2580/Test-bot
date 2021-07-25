"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "cmdreload",
  category: "\uD83D\uDC51 Owner",
  aliases: ["commandreload"],
  description: "Reloads a command",
  usage: "cmdreload <CMD>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, reload, thecmd, i, dir, pull;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.includes(message.author.id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd"))));

          case 3:
            _context.prev = 3;

            if (args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  ERROR | Please include an argument"))));

          case 6:
            reload = false;
            thecmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

            if (!thecmd) {
              _context.next = 12;
              break;
            }

            for (i = 0; i < client.categories.length; i += 1) {
              dir = client.categories[i];

              try {
                delete require.cache[require.resolve("../../commands/".concat(dir, "/").concat(thecmd.name, ".js"))]; // usage !reload <name>

                client.commands["delete"](thecmd.name);
                pull = require("../../commands/".concat(dir, "/").concat(thecmd.name, ".js"));
                client.commands.set(thecmd.name, pull);
                reload = true;
              } catch (_unused) {}
            }

            _context.next = 13;
            break;

          case 12:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not find: `".concat(args[0], "`"))));

          case 13:
            if (!reload) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setFooter(es.footertext, es.footericon).setTitle("Reloaded `".concat(args[0], "`"))));

          case 15:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not reload: `".concat(args[0], "`"))));

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  ERROR | An error occurred")).setDescription("```".concat(_context.t0.message, "```"))));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 18]]);
  }
};