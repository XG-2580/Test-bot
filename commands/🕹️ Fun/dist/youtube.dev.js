"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  name: "youtubememe",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "youtubememe @User <TEXT>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, tempmsg, user, avatar;
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

            text = args.join(" "); //If no text added, return error

            if (text) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", tempmsg.edit(tempmsg.embeds[0].setTitle("You did not enter a Valid Text!").setColor("RED").setDescription("Useage: `".concat(prefix, "youtube @User <TEXT>`")))["catch"](function (e) {
              return console.log("Couldn't delete msg, this is for preventing a bug".gray);
            }));

          case 12:
            //get the memer image
            client.memer.youtube(avatar, user.username, text).then(function (image) {
              //make an attachment
              var attachment = new MessageAttachment(image, "youtube.png"); //delete old message

              tempmsg["delete"](); //send new Message

              message.channel.send(tempmsg.embeds[0].setAuthor("Meme for: ".concat(user.tag), avatar).setImage("attachment://youtube.png").attachFiles(attachment))["catch"](function (e) {
                return console.log("Couldn't delete msg, this is for preventing a bug".gray);
              });
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};