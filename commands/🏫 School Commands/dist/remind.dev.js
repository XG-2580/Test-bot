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
  name: "remind",
  aliases: ["remindme"],
  category: "🏫 School Commands",
  description: "Reminds you at a specific day for something",
  usage: "remind TIME ++ TEXT",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, newargs, time, timeargs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, t, content, returntime, now, string_of_time, olddate;

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
            if (args[0]) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "remind <Time+Format(e.g: 10m)> ++ TEXT`\n\nExample: `").concat(prefix, "remind 10m 32s ++ Remind me!!`"))));

          case 5:
            newargs = args.join(" ").split("++");
            time = 0;
            _context.prev = 7;
            timeargs = newargs[0].trim().split(" ");
            console.log(timeargs);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;

            for (_iterator = timeargs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              t = _step.value;
              time += ms(t);
            }

            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
            console.log(time);
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](7);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a valid TIME!").setDescription(" Usage: `".concat(prefix, "remind <Time+Format(e.g: 10m)> ++ TEXT`\n\nExample: `").concat(prefix, "remind 10m 32s ++ Remind me!!`"))));

          case 35:
            content = newargs.slice(1).join(" ");

            if (content) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", message.reply("No content added"));

          case 38:
            // Based off the delimiter, sets the time
            returntime = time;

            if (!(returntime > 2073600000)) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The time limit is 24 Days!").setDescription(" Usage: `".concat(prefix, "remind <Time+Format(e.g: 10m)> ++ TEXT`\n\nExample: `").concat(prefix, "remind 10m 32s ++ Remind me!!`"))));

          case 41:
            if (!(returntime == 0)) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "remind <Time+Format(e.g: 10m)> ++ TEXT`\n\nExample: `").concat(prefix, "remind 10m 32s ++ Remind me!!`"))));

          case 43:
            now = new Date();
            string_of_time = "";
            if (returntime >= 1000 * 60 * 60 * 24) string_of_time = "`".concat(moment(returntime).format("DD"), " Days`, `").concat(moment(returntime).format("HH"), " Hours`, `").concat(moment(returntime).format("mm"), " Minutes`, `").concat(moment(returntime).format("ss"), " Seconds`");else string_of_time = "`".concat(moment(returntime).format("HH"), " Hours`, `").concat(moment(returntime).format("mm"), " Minutes`, `").concat(moment(returntime).format("ss"), " Seconds` ");
            message.reply(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " I will remind you in:\n").concat(string_of_time)).setDescription("Message will come to your DMS!"));
            olddate = Date();
            client.setTimeout(function () {
              message.author.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " I reminded you after:\n").concat(string_of_time)).addField("Created in **(".concat(message.guild.name, ")**"), "<#".concat(message.channel.id, "> ")).addField("Created at:", "`".concat(olddate, "`")).setDescription(content));
            }, returntime);

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[7, 32], [13, 17, 21, 29], [22,, 24, 28]]);
  }
};