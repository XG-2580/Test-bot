"use strict";

var config = require("../.config.json");

var ms = require("ms");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "report",
  category: "\uD83D\uDEAB Administration",
  aliases: ["melden"],
  cooldown: 300,
  usage: "report @User <REASON>",
  description: "Reports a User for a specific Reason!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, channel, member, reason;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (!(client.settings.get(message.guild.id, "reportlog") == "no")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Report System is not setup yet!").setDescription("Set it up with: `".concat(prefix, "setup-reportlog`"))));

          case 4:
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "reportlog"));

            if (channel) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "reportlog"));

          case 7:
            member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first();

            if (member) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a USER!").setDescription(" Usage: `".concat(prefix, "report @User <REASON>`\n\nExample: `").concat(prefix, "report @User 10m He is doing bad stuff!`"))));

          case 10:
            args.shift();

            if (!(member.roles.highest.position > message.member.roles.highest.position)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot report this Member, because he is higher to your Rang Position!")));

          case 13:
            reason = args[0];

            if (reason) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a REASON!").setDescription(" Usage: `".concat(prefix, "report @User <REASON>`\n\nExample: `").concat(prefix, "report @User 10m He is doing bad stuff!`"))));

          case 16:
            reason = args.join(" ");
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **REPORTED** for:")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
            member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(message.author.tag, "` reported you for:")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));

            try {
              channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
                dynamic: true
              })).setDescription("**".concat(member.user.tag, "** (").concat(member.user, ")\n*got reported for...*\n```").concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON", "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + member.user.id, member.user.displayAvatarURL({
                dynamic: true
              })));
            } catch (e) {
              console.log(e);
            }

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 31;
              break;
            }

            _context.prev = 21;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 25:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](21);
            console.log(_context.t0);

          case 31:
            _context.next = 37;
            break;

          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 33], [21, 28]]);
  }
};