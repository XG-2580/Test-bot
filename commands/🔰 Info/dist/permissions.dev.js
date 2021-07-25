"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require('moment');

var _require2 = require("../../handlers/functions"),
    GetUser = _require2.GetUser,
    GetGlobalUser = _require2.GetGlobalUser;

module.exports = {
  name: "permissions",
  aliases: ["perms"],
  category: "🔰 Info",
  description: "Get permissions information about a user",
  usage: "permissions [@USER]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, member, embeduserinfo, _embeduserinfo;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (!args[0]) {
              _context.next = 16;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(GetUser(message, args));

          case 6:
            user = _context.sent;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            if (_context.t0) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.reply("UNABLE TO FIND THE USER"));

          case 13:
            return _context.abrupt("return", message.reply(_context.t0));

          case 14:
            _context.next = 17;
            break;

          case 16:
            user = message.author;

          case 17:
            if (!user || user == null || user.id == null || !user.id) message.reply("Could not find the USER");

            try {
              member = message.guild.members.cache.get(user.id); //create the EMBED

              embeduserinfo = new MessageEmbed();
              embeduserinfo.setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 512
              }));
              embeduserinfo.setAuthor("Permissions from:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({
                dynamic: true
              }), "https://clan.Limsathya");
              embeduserinfo.addField('** Permissions:**', "".concat(message.member.permissions.toArray().map(function (p) {
                return "`".concat(p, "`");
              }).join(", ")));
              embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
              embeduserinfo.setFooter(es.footertext, es.footericon); //send the EMBED

              message.channel.send(embeduserinfo);
            } catch (_unused) {
              //create the EMBED
              _embeduserinfo = new MessageEmbed();

              _embeduserinfo.setThumbnail(user.displayAvatarURL({
                dynamic: true,
                size: 512
              }));

              _embeduserinfo.setAuthor("Permissions from:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({
                dynamic: true
              }), "https://clan.Limsathya");

              _embeduserinfo.addField('** Permissions:**', "".concat(message.member.permissions.toArray().map(function (p) {
                return "`".concat(p, "`");
              }).join(", ")));

              _embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);

              _embeduserinfo.setFooter(es.footertext, es.footericon); //send the EMBED


              message.channel.send(_embeduserinfo);
            }

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
    }, null, null, [[1, 21], [3, 9]]);
  }
};