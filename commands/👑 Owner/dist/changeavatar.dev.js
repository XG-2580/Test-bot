"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var fetch = require('node-fetch');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "changeavatar",
  category: "👑 Owner",
  aliases: ["changebotavatar", "botavatar", "botprofilepicture", "botpfp"],
  cooldown: 5,
  usage: "changeavatar <Imagelink/Image>",
  description: "Changes the Avatar of the BOT: I SUGGEST YOU TO DO IT LIKE THAT: Type the command in the Chat, attach an Image to the Command (not via link, just add it) press enter",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, attachIsImage, textIsImage, url, response, buffer, _response, _buffer;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.some(function (r) {
              return r.includes(message.author.id);
            })) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
              return "<@".concat(id, ">");
            })))));

          case 3:
            _context.prev = 3;

            attachIsImage = function attachIsImage(msgAttach) {
              url = msgAttach.url; //True if this url is a png image.

              return url.indexOf("png", url.length - "png".length
              /*or 3*/
              ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
              /*or 3*/
              ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
              /*or 3*/
              ) !== -1;
            };

            textIsImage = function textIsImage(url) {
              return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
            };

            if (!(message.attachments.size > 0)) {
              _context.next = 21;
              break;
            }

            if (!message.attachments.every(attachIsImage)) {
              _context.next = 18;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(fetch(url));

          case 10:
            response = _context.sent;
            _context.next = 13;
            return regeneratorRuntime.awrap(response.buffer());

          case 13:
            buffer = _context.sent;
            fs.writeFile("./image.jpg", buffer, function () {
              return console.log('finished downloading!');
            });
            client.user.setAvatar("./image.jpg").then(function (user) {
              return message.channel.send(new MessageEmbed().setTitle("Successfully, changed the Bot avatar!").setColor(es.color).setFooter(es.footertext, es.footericon));
            })["catch"](function (e) {
              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
            });
            _context.next = 19;
            break;

          case 18:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("ERROR | Could not use your Image as an Avatar, make sure it is a `png` / `jpg`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 19:
            _context.next = 35;
            break;

          case 21:
            if (!(message.content && textIsImage(message.content))) {
              _context.next = 34;
              break;
            }

            url = args.join(" ");
            _context.next = 25;
            return regeneratorRuntime.awrap(fetch(url));

          case 25:
            _response = _context.sent;
            _context.next = 28;
            return regeneratorRuntime.awrap(_response.buffer());

          case 28:
            _buffer = _context.sent;
            _context.next = 31;
            return regeneratorRuntime.awrap(fs.writeFile("./image.jpg", _buffer, function () {
              return console.log('finished downloading!');
            }));

          case 31:
            client.user.setAvatar("./image.jpg").then(function (user) {
              try {
                fs.unlinkSync();
              } catch (_unused) {}

              return message.channel.send(new MessageEmbed().setTitle("Successfully, changed the Bot avatar!").setColor(es.color).setFooter(es.footertext, es.footericon));
            })["catch"](function (e) {
              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
            });
            _context.next = 35;
            break;

          case 34:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("ERROR | Could not use your Image as an Avatar, make sure it is a `png` / `jpg` / `webp`").setDescription("Useage: `".concat(prefix, "changeavatar <AVATARLINK/IMAGE>`")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 35:
            _context.next = 41;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 37]]);
  }
};