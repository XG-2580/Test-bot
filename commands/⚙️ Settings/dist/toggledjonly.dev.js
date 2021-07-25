"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "toggledjonly",
  aliases: ["adddjonly", "djonly", "setdjonly", ""],
  category: "⚙️ Settings",
  description: "Set's a Command to the DJ ONLY State, by typing it again, it gets to not DJ ONLY aka its a toggle",
  usage: "adddj @role",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, cmd, musiccmds, commands, i;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            cmd = args[0];

            if (cmd) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a cmd!").setDescription("Example: `toggledjonly skip`")));

          case 5:
            musiccmds = [];

            commands = function commands(category) {
              return client.commands.filter(function (cmd) {
                return cmd.category.toLowerCase().includes("music");
              }).map(function (cmd) {
                return "".concat(cmd.name);
              });
            };

            for (i = 0; i < client.categories.length; i += 1) {
              if (client.categories[i].toLowerCase().includes("music")) {
                musiccmds = commands(client.categories[i]);
              }
            }

            if (!musiccmds.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase())) {
              _context.next = 32;
              break;
            }

            if (!client.settings.get(message.guild.id, "djonlycmds").join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase())) {
              _context.next = 21;
              break;
            }

            _context.prev = 10;
            client.settings.remove(message.guild.id, args[0], "djonlycmds");
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Set Cmd `".concat(args[0], "` to NOT DJ ONLY")).setDescription("All Dj-ONLY-CMDS:\n> `".concat(client.settings.get(message.guild.id, "djonlycmds").sort(function (a, b) {
              if (a < b) {
                return -1;
              }

              if (a > b) {
                return 1;
              }

              return 0;
            }).join("`, `"), "`"))));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](10);
            console.log(String(_context.t0.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went wrong!").setDescription("```" + _context.t0.stack + "```")));

          case 19:
            _context.next = 30;
            break;

          case 21:
            _context.prev = 21;
            client.settings.push(message.guild.id, args[0], "djonlycmds");
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Set Cmd `".concat(args[0], "` to DJ ONLY")).setDescription("All Dj-ONLY-CMDS:\n> `".concat(client.settings.get(message.guild.id, "djonlycmds").sort(function (a, b) {
              if (a < b) {
                return -1;
              }

              if (a > b) {
                return 1;
              }

              return 0;
            }).join("`, `"), "`"))));

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](21);
            console.log(String(_context.t1.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went wrong!").setDescription("```" + _context.t1.stack + "```")));

          case 30:
            _context.next = 33;
            break;

          case 32:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not find Music Command `".concat(args[0], "`"))));

          case 33:
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 35], [10, 15], [21, 26]]);
  }
};