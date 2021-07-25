"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var canvacord = require("canvacord");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "facepalm",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "facepalm",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, tempmsg, user, tmp, alluser, avatar, image, attachment;
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
            _context.next = 6;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")));

          case 6:
            tempmsg = _context.sent;
            //find the USER
            user = message.mentions.users.first();

            if (!(!user && args[0] && args[0].length == 18)) {
              _context.next = 17;
              break;
            }

            _context.next = 11;
            return regeneratorRuntime.awrap(client.users.fetch(args[0]));

          case 11:
            tmp = _context.sent;
            if (tmp) user = tmp;

            if (tmp) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 15:
            _context.next = 26;
            break;

          case 17:
            if (!(!user && args[0])) {
              _context.next = 25;
              break;
            }

            alluser = message.guild.members.cache.map(function (member) {
              return String(member.user.username).toLowerCase();
            });
            user = alluser.find(function (user) {
              return user.includes(args[0].toLowerCase());
            });
            user = message.guild.members.cache.find(function (me) {
              return me.user.username.toLowerCase() == user;
            }).user;

            if (!(!user || user == null || !user.id)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 23:
            _context.next = 26;
            break;

          case 25:
            user = message.mentions.users.first() || message.author;

          case 26:
            avatar = user.displayAvatarURL({
              dynamic: false,
              format: "png"
            });
            _context.next = 29;
            return regeneratorRuntime.awrap(canvacord.Canvas.facepalm(avatar));

          case 29:
            image = _context.sent;
            _context.next = 32;
            return regeneratorRuntime.awrap(new MessageAttachment(image, "facepalm.png"));

          case 32:
            attachment = _context.sent;
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setImage("attachment://facepalm.png").attachFiles(attachment))["catch"](function (e) {
              return console.log(String(e.stack).red);
            }).then(function (msg) {
              return tempmsg["delete"]()["catch"](function (e) {
                return console.log("Couldn't delete msg, this is for preventing a bug".gray);
              });
            });
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 36]]);
  }
};