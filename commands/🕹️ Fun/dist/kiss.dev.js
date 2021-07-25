"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var Discord = require("discord.js");

var canvacord = require("canvacord");

var path = require("path");

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  useage: "".concat(path.parse(__filename).name, "[@User]"),
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, tempmsg, user, tmp, alluser, user2, _tmp, _alluser, avatar, avatar2, image, attachment, fastembed2;

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
            //find the USER
            user2 = message.mentions.users.last();

            if (!(!user2 && args[1] && args[1].length == 18)) {
              _context.next = 35;
              break;
            }

            _context.next = 30;
            return regeneratorRuntime.awrap(client.users.fetch(args[1]));

          case 30:
            _tmp = _context.sent;
            if (_tmp) user2 = _tmp;
            if (!_tmp) user2 = message.author;
            _context.next = 36;
            break;

          case 35:
            if (!user2 && args[1]) {
              _alluser = message.guild.members.cache.map(function (member) {
                return String(member.user.username).toLowerCase();
              });
              user2 = _alluser.find(function (user) {
                return user.includes(args[1].toLowerCase());
              });
              user2 = message.guild.members.cache.find(function (me) {
                return me.user.username.toLowerCase() == user2;
              }).user;
              if (!user2 || user2 == null || !user2.id) user2 = message.author;
            } else {
              user2 = message.mentions.users.last() || message.author;
            }

          case 36:
            avatar = user.displayAvatarURL({
              dynamic: false,
              format: "png"
            });
            avatar2 = user2.displayAvatarURL({
              dynamic: false,
              format: "png"
            });
            _context.next = 40;
            return regeneratorRuntime.awrap(canvacord.Canvas.kiss(avatar, avatar2));

          case 40:
            image = _context.sent;
            _context.next = 43;
            return regeneratorRuntime.awrap(new Discord.MessageAttachment(image, "kiss.png"));

          case 43:
            attachment = _context.sent;
            fastembed2 = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setImage("attachment://kiss.png").attachFiles(attachment);
            _context.next = 47;
            return regeneratorRuntime.awrap(message.channel.send(fastembed2));

          case 47:
            _context.next = 49;
            return regeneratorRuntime.awrap(tempmsg["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is for preventing a bug".gray);
            }));

          case 49:
            _context.next = 55;
            break;

          case 51:
            _context.prev = 51;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 55:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 51]]);
  }
};