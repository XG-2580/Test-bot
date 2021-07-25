"use strict";

var math = require('math-expression-evaluator');

var ms = require("ms");

var moment = require("moment");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "🏫 School Commands",
  description: "Calculates a math equation",
  usage: "calc <INPUT>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, answer;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "SCHOOL")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            if (!(args.length < 1)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You must provide a equation to be solved on the calculator").setDescription(" Usage: `".concat(prefix, "calc <Input>`\n\nExample: `").concat(prefix, "calc 10 + 4*5`\n\nHey try out: `").concat(prefix, "calculator`"))));

          case 5:
            try {
              answer = math.eval(args.join(" "));
            } catch (err) {
              message.channel.send("Invalid math equation: ".concat(err));
            }

            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Try out: `".concat(prefix, "calculator`")).setFooter(es.footertext, es.footericon).addField("**Equation:**", "```fix\n".concat(args.join(" "), "```")).addField("**Result:**", "```fix\n".concat(answer, "```")));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};