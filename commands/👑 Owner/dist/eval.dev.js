"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    splitMessage = _require.splitMessage;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

var _require3 = require("util"),
    inspect = _require3.inspect;

module.exports = {
  name: "eval",
  category: "\uD83D\uDC51 Owner",
  aliases: ["evaluate"],
  description: "eval Command",
  usage: "eval <CODE>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, evaled, string, evalEmbed, splitDescription;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (!("442355791412854784" !== message.author.id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  Error | You are not allowed to run this command! Only the **`XG#2846`** is allowed to run this Cmd"))));

          case 3:
            if (args[0]) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  Error | You have to at least include one evaluation arguments"))));

          case 5:
            _context.prev = 5;

            if (!args.join(" ").includes("token")) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", console.log("ERROR NO TOKEN GRABBING ;)".red));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(eval(args.join(" ")));

          case 10:
            evaled = _context.sent;
            //make string out of the evaluation
            string = inspect(evaled); //if the token is included return error

            if (!string.includes(client.token)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", console.log("ERROR NO TOKEN GRABBING ;)".red));

          case 14:
            //define queueembed
            evalEmbed = new MessageEmbed().setTitle("Milrato Development | Evaluation").setColor(es.color); //split the description

            splitDescription = splitMessage(string, {
              maxLength: 2040,
              "char": "\n",
              prepend: "",
              append: ""
            }); //(over)write embed description

            evalEmbed.setDescription("```" + splitDescription[0] + "```"); //send embed

            message.channel.send(evalEmbed);
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](5);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.ERROR, "  ERROR | An error occurred")).setDescription("```".concat(_context.t0.message, "```"))));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 20]]);
  }
};