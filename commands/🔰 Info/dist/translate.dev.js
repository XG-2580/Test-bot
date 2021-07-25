"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var translate = require("translatte");

module.exports = {
  name: "translate",
  category: "🔰 Info",
  aliases: ["trans", "tran", "tr"],
  cooldown: 5,
  usage: "translate <from> <to> <TEXT>",
  description: "Gives you an Invite link for this Bot",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (args[0]) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send("Error | Unknown Command Usage! `".concat(prefix, "translate <from> <to> <Text>`\nExample: `").concat(prefix, "translate en de Hello World`")));

          case 4:
            if (args[1]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send("Error | Unknown Command Usage! `".concat(prefix, "translate <from> <to> <Text>`\nExample: `").concat(prefix, "translate en de Hello World`")));

          case 6:
            if (args[2]) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send("Error | Unknown Command Usage! `".concat(prefix, "translate <from> <to> <Text>`\nExample: `").concat(prefix, "translate en de Hello World`")));

          case 8:
            translate(args.slice(2).join(" "), {
              from: args[0],
              to: args[1]
            }).then(function (res) {
              var embed = new MessageEmbed().setColor("#2f3136").setAuthor("Translated to: ".concat(args[1]), "https://imgur.com/0DQuCgg.png", "https://discord.gg/FQGXbypRf8").setFooter("Translated from: ".concat(args[0]), message.author.displayAvatarURL({
                dynamic: true
              })).setDescription("```" + res.text.substr(0, 2000) + "```");
              message.channel.send(embed);
            })["catch"](function (err) {
              var embed = new MessageEmbed().setColor("#2f3136").setTitle("Error | Something went wrong").setDescription(String("```" + err.stack + "```").substr(0, 2000));
              message.channel.send(embed);
              console.log(err);
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0.stack)).substr(0, 2000), "```"))));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 11]]);
  }
};