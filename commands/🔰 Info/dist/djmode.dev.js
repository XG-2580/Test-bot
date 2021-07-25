"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "djmode",
  category: "🔰 Info",
  aliases: ["djonlymode"],
  cooldown: 5,
  usage: "djmode",
  description: "Shows if there is a DJ-Only Mode / not and all Dj Settings..",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, isdj, leftb, i;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            //create the string of all djs and if he is a dj then set it to true
            isdj = false;
            leftb = "";

            if (!(client.settings.get(message.guild.id, "djroles").join("") === "")) {
              _context.next = 8;
              break;
            }

            leftb = "no Dj Roles, aka all Users are Djs  ";
            _context.next = 17;
            break;

          case 8:
            i = 0;

          case 9:
            if (!(i < client.settings.get(message.guild.id, "djroles").length)) {
              _context.next = 17;
              break;
            }

            if (message.member.roles.cache.has(client.settings.get(message.guild.id, "djroles")[i])) isdj = true;

            if (message.guild.roles.cache.get(client.settings.get(message.guild.id, "djroles")[i])) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("continue", 14);

          case 13:
            leftb += "<@&" + client.settings.get(message.guild.id, "djroles")[i] + ">\n";

          case 14:
            i++;
            _context.next = 9;
            break;

          case 17:
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("🎧 Dj Mode").setDescription("If a Command is listed here, and at least one role exists, then it means that you have to have this Role, in order to be able to use these listed ").addField(" Dj Only Commands active for:", "`".concat(client.settings.get(message.guild.id, "djonlycmds").sort(function (a, b) {
              if (a < b) {
                return -1;
              }

              if (a > b) {
                return 1;
              }

              return 0;
            }).join("`, `"), "`").substr(0, 1024)).addField(" Dj Roles", "".concat(leftb.substr(0, leftb.length - 2)), true).setFooter(es.footertext, es.footericon));
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 20]]);
  }
};