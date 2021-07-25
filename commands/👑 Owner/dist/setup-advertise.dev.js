"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "setup-advertise",
  category: "👑 advertise",
  aliases: ["setup-advert", "setupadvertise", "setupadvert"],
  cooldown: 5,
  usage: "setup-advertise  -->  Follow the Steps",
  description: "Changes if the Advertisement of BERO-HOST.de Should be there or NOT",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, timeouterror, filter, temptype, tempmsg, d2p, embed;
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

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
                return "<@".concat(id, ">");
              })))
            }));

          case 3:
            _context.prev = 3;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context.next = 9;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setDescription("1\uFE0F\u20E3 **== ".concat(client.adenabled ? "`❌ Disable`" : "`✔️ Enable`", " Advertisement**\n\n\uD83D\uDCD1 **== Show Settings**\n\n**NOTE:**\n> *You can't remove a Owner, which means you need to get in touch with: `XG#2846` to do so!*\n*On every Bot Restart, it will be enabled again*\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 9:
            tempmsg = _context.sent;
            _context.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("📑");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "toggle";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 22:
            d2p = function d2p(bool) {
              return bool ? "`✔️ Enabled`" : "`❌ Disabled`";
            };

            if (!(temptype == "toggle")) {
              _context.next = 28;
              break;
            }

            client.adenabled = !client.adenabled;
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Bero-Host Advertisement System is now ".concat(d2p(client.adenabled), "!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 28:
            if (!(temptype == "thesettings")) {
              _context.next = 33;
              break;
            }

            embed = new MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Bero-Host Advertisement System").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("It is on: ".concat(d2p(client.adenabled), "\n\n*On every Bot Restart, it will be enabled again*").substr(0, 2048)).setFooter(es.footertext, es.footericon);
            return _context.abrupt("return", message.reply({
              embed: embed
            }));

          case 33:
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))
            }));

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 36], [10, 15]]);
  }
};