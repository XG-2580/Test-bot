"use strict";

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var request = require("request");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "8ball",
  category: "🕹️ Fun",
  description: "Answers your Question",
  usage: "8ball <Questions>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, question;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "FUN")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            question = args.slice(0).join(" ");

            if (question) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please Add a Question")));

          case 7:
            request("https://8ball.delegator.com/magic/JSON/".concat(question), function (e, response, body) {
              if (e) {
                console.log(String(e.stack).red);
                message.channel.send("Can't get 8ball replies, try again later.");
              }

              body = JSON.parse(body);
              var embedColor = "RANDOM";
              if (body.magic.type === "Affirmative") embedColor = "#0dba35";
              if (body.magic.type === "Contrary") embedColor = "#ba0d0d";
              if (body.magic.type === "Neutral") embedColor = "#6f7275";
              message.channel.send(new Discord.MessageEmbed().setTitle("8ball").setColor(embedColor).setThumbnail(message.author.displayAvatarURL({
                dynamic: true
              })).addField("Question: ", question, false).addField("Asked by: ", message.author.tag, false).addField("Reply: ", body.magic.answer, false).setFooter("API provided by Delegator 8ball"));
            });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }
};