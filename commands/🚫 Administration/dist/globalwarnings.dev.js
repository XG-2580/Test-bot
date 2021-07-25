"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "globalwarnings",
  category: "\uD83D\uDEAB Administration",
  aliases: ["globalwarns", "globalwarnlist", "global-warn-list"],
  description: "Shows the warnings of a User, globally",
  usage: "globalwarnings @User",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, warnmember, tmp, alluser, warnIDs, warnData, warnings, warnembed, string, i, k, _i, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            //find the USER
            warnmember = message.mentions.users.first();

            if (!(!warnmember && args[0] && args[0].length == 18)) {
              _context.next = 12;
              break;
            }

            _context.next = 6;
            return regeneratorRuntime.awrap(client.users.fetch(args[0]));

          case 6:
            tmp = _context.sent;
            if (tmp) warnmember = tmp;

            if (tmp) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 10:
            _context.next = 22;
            break;

          case 12:
            if (!(!warnmember && args[0])) {
              _context.next = 21;
              break;
            }

            alluser = message.guild.members.cache.map(function (member) {
              return String(member.user.username).toLowerCase();
            });
            warnmember = alluser.find(function (user) {
              return user.includes(args[0].toLowerCase());
            });
            warnmember = message.guild.members.cache.find(function (me) {
              return me.user.username.toLowerCase() == warnmember;
            });

            if (!(!warnmember || warnmember == null || !warnmember.id)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", message.reply("I failed finding that User..."));

          case 18:
            warnmember = warnmember.user;
            _context.next = 22;
            break;

          case 21:
            warnmember = message.mentions.users.first() || message.author;

          case 22:
            if (warnmember) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to see the warnings of!").setDescription("Useage: `".concat(prefix, "warn @User [Reason]`"))));

          case 24:
            _context.prev = 24;
            client.userProfiles.ensure(warnmember.id, {
              id: message.author.id,
              guild: message.guild.id,
              totalActions: 0,
              warnings: [],
              kicks: []
            });
            warnIDs = client.userProfiles.get(warnmember.id, 'warnings');
            warnData = warnIDs.map(function (id) {
              return client.modActions.get(id);
            });

            if (!(!warnIDs || !warnData || !warnIDs.length)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter("He/She has: ".concat(client.userProfiles.get(warnmember.id, 'warnings') ? client.userProfiles.get(warnmember.id, 'warnings').filter(function (v) {
              return v.guild == message.guild.id;
            }).length : 0, " in ").concat(message.guild.name), "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png").setTitle("`".concat(warnmember.username, "` has no Global-Warnings"))));

          case 30:
            warnings = warnData;
            warnembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("He/She has: ".concat(client.userProfiles.get(warnmember.id, 'warnings') ? client.userProfiles.get(warnmember.id, 'warnings').filter(function (v) {
              return v.guild == message.guild.id;
            }).length : 0, " in ").concat(message.guild.name), "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png").setTitle("[".concat(warnIDs.length, "] Global-Warnings of: ").concat(warnmember.tag));
            string = "";

            for (i = 0; i < warnings.length; i++) {
              string += "================================\n**Warn Id:** `".concat(i, "`\n**Warned at:** `").concat(warnings[i].when, "`\n**Warned in:** `").concat(client.guilds.cache.get(warnings[i].guild) ? client.guilds.cache.get(warnings[i].guild).name : warnings[i].guild, "`\n**Reason:** `").concat(warnings[i].reason.length > 50 ? warnings[i].reason.substr(0, 50) + " ..." : warnings[i].reason, "`\n");
            }

            warnembed.setDescription(string);
            k = warnembed.description;
            _i = 0;

          case 37:
            if (!(_i < k.length)) {
              _context.next = 43;
              break;
            }

            _context.next = 40;
            return regeneratorRuntime.awrap(message.channel.send(warnembed.setDescription(k.substr(_i, _i + 2048))));

          case 40:
            _i += 2048;
            _context.next = 37;
            break;

          case 43:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 54;
              break;
            }

            _context.prev = 44;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 48;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 48:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 54;
            break;

          case 51:
            _context.prev = 51;
            _context.t0 = _context["catch"](44);
            console.log(_context.t0);

          case 54:
            _context.next = 60;
            break;

          case 56:
            _context.prev = 56;
            _context.t1 = _context["catch"](24);
            console.log(String(_context.t1.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 60:
            _context.next = 66;
            break;

          case 62:
            _context.prev = 62;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 62], [24, 56], [44, 51]]);
  }
};