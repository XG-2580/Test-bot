"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  name: "bed",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "bed @User @User2",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, tempmsg, user, tmp, alluser, user2, _tmp, _alluser, avatar1, avatar2;

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
            _context.next = 5;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(ee.color).setAuthor("Getting Image Data..", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")));

          case 5:
            tempmsg = _context.sent;
            //find the USER
            user = message.mentions.users.first();

            if (!(!user && args[0] && args[0].length == 18)) {
              _context.next = 16;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(client.users.fetch(args[0]));

          case 10:
            tmp = _context.sent;
            if (tmp) user = tmp;

            if (tmp) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 14:
            _context.next = 25;
            break;

          case 16:
            if (!(!user && args[0])) {
              _context.next = 24;
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
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 22:
            _context.next = 25;
            break;

          case 24:
            user = message.mentions.users.first() || message.author;

          case 25:
            //find the USER
            user2 = message.mentions.users.last();

            if (!(!user2 && args[1] && args[1].length == 18)) {
              _context.next = 34;
              break;
            }

            _context.next = 29;
            return regeneratorRuntime.awrap(client.users.fetch(args[1]));

          case 29:
            _tmp = _context.sent;
            if (_tmp) user2 = _tmp;
            if (!_tmp) user2 = message.author;
            _context.next = 35;
            break;

          case 34:
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

          case 35:
            avatar1 = user.displayAvatarURL({
              dynamic: false,
              format: "png"
            });
            avatar2 = user2.displayAvatarURL({
              dynamic: false,
              format: "png"
            });
            client.memer.bed(avatar1, avatar2).then(function (image) {
              //make an attachment
              var attachment = new MessageAttachment(image, "bed.png"); //delete old message

              tempmsg["delete"](); //send new Message

              message.channel.send(tempmsg.embeds[0].setAuthor("Meme for: ".concat(user1.tag, " | ").concat(user2.tag), avatar1).setImage("attachment://bed.png").attachFiles(attachment))["catch"](function (e) {
                return console.log("Couldn't delete msg, this is for preventing a bug".gray);
              });
            });

          case 38:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};