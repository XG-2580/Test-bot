"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    GetUser = _require2.GetUser,
    GetGlobalUser = _require2.GetGlobalUser;

module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "🔰 Info",
  description: "Get the Avatar of an user",
  usage: "avatar [@USER] [global/guild]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            _context.prev = 2;

            if (!(args[1] && args[1].toLowerCase() == "global")) {
              _context.next = 10;
              break;
            }

            args.pop();
            _context.next = 7;
            return regeneratorRuntime.awrap(GetGlobalUser(message, args));

          case 7:
            user = _context.sent;
            _context.next = 13;
            break;

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(GetUser(message, args));

          case 12:
            user = _context.sent;

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", message.reply(_context.t0));

          case 18:
            message.channel.send(new Discord.MessageEmbed().setAuthor("Avatar from: ".concat(user.tag), user.displayAvatarURL({
              dynamic: true
            }), "https://discord.gg/FQGXbypRf8").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField(" PNG", "[`LINK`](".concat(user.displayAvatarURL({
              format: "png"
            }), ")"), true).addField(" JPEG", "[`LINK`](".concat(user.displayAvatarURL({
              format: "jpg"
            }), ")"), true).addField(" WEBP", "[`LINK`](".concat(user.displayAvatarURL({
              format: "webp"
            }), ")"), true).setURL(user.displayAvatarURL({
              dynamic: true
            })).setFooter(es.footertext, es.footericon).setImage(user.displayAvatarURL({
              dynamic: true,
              size: 512
            })));
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 21], [2, 15]]);
  }
};