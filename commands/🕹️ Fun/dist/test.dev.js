"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  name: "test",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "test",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, tempmsg, user, avatar, canvacord, duration, position, now, data, card, image, attachment;
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
            //get pinged user, if not then use cmd user
            user = message.mentions.users.first(); //if user pinged, shift the args, 

            if (user) args.shift(); //else not and define the user to be message.author
            else user = message.author; //get avatar of the user

            avatar = user.displayAvatarURL({
              format: "png"
            }); //get the additional text

            text = args.join(" ");
            canvacord = require("canvacord");
            duration = 2.6 * 60 * 1000;
            position = (Math.random() * 2.4 * 60 + 0.2) * 1000;
            now = Date.now();
            data = {
              author: user.username,
              title: text ? text : "UNKNOWN SONG",
              start: now - position,
              end: now + duration,
              image: avatar
            };
            card = new canvacord.Spotify().setAuthor(data.author).setStartTimestamp(data.start).setEndTimestamp(data.end).setImage(data.image).setTitle(data.title);
            _context.next = 18;
            return regeneratorRuntime.awrap(card.build());

          case 18:
            image = _context.sent;
            attachment = new MessageAttachment(image, "spotify.png"); //delete old message

            tempmsg["delete"](); //send new Message

            message.channel.send(tempmsg.embeds[0].setAuthor("Command for: ".concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setImage("attachment://spotify.png").attachFiles(attachment))["catch"](function (e) {
              return console.log("Couldn't delete msg, this is for preventing a bug".gray);
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */