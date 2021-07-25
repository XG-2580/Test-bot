"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "detailwarn",
  category: "\uD83D\uDEAB Administration",
  aliases: ["warninfo", "snipe", "infowarn", "infowarning", "detailwarning", "warninginfo"],
  description: "Shows details about one warn Command of a Member",
  usage: "detailwarn @User [Reason]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, warnmember, warnIDs, dwarnData, warnData, warning, warned_by, warned_in;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            //find the USER
            warnmember = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(args[0]) || message.member;

            if (warnmember) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to detailwarn!").setDescription("Useage: `".concat(prefix, "detailwarn @User <WARN_ID>`"))));

          case 5:
            if (args[1]) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add the Warning you want to remove from him").setDescription("See his warns: `".concat(prefix, "detailwarn @User <WARN_ID>`"))));

          case 7:
            _context.prev = 7;
            client.userProfiles.ensure(warnmember.user.id, {
              id: message.author.id,
              guild: message.guild.id,
              totalActions: 0,
              warnings: [],
              kicks: []
            });
            warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings');
            dwarnData = warnIDs.map(function (id) {
              return client.modActions.get(id);
            });
            warnData = dwarnData.filter(function (v) {
              return v.guild == message.guild.id;
            });

            if (!(!warnIDs || !dwarnData || !dwarnData.length || !warnData || !warnData.length)) {
              _context.next = 15;
              break;
            }

            if (warnIDs) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("User has no Warnings")));

          case 15:
            if (!(Number(args[1]) >= warnIDs.length || Number(args[1]) < 0)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Value out of range").setDescription("Usage: `".concat(prefix, "detailwarn @User <WARN_ID>` Highest ID: ").concat(warnIDs.length - 1))));

          case 17:
            warning = warnData[parseInt(args[1])];
            warned_by = message.guild.members.cache.get(warning.moderator) ? "".concat(message.guild.members.cache.get(warning.moderator).user.tag, " (").concat(warning.moderator, ")") : warning.moderator;
            warned_in = client.guilds.cache.get(warning.guild) ? "".concat(client.guilds.cache.get(warning.guild).name, " (").concat(warning.guild, ")") : warning.guild;
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Warn from ".concat(warnmember.user.tag), warnmember.user.displayAvatarURL({
              dynamic: true
            })).setDescription("**Reason:**\n```".concat(warning.reason.length > 2030 ? warning.reason.substr(0, 2030) + " ..." : warning.reason, "```")).addField("Warn:", "`".concat(parseInt(args[1]) + 1, "` out of **").concat(warnIDs.length, " Warns**"), true).addField("Warned by:", "`".concat(warned_by, "`"), true).addField("Warned at:", "`".concat(warning.when, "`"), true).addField("Warned in:", "`".concat(warned_in, "`"), true).addField("Old Thumbnail URL", "[`Click here`](".concat(warning.oldthumburl, ")"), true).addField("Old Highest Role:", "".concat(message.guild.roles.cache.get(warning.oldhighesrole.id) ? "<@&" + message.guild.roles.cache.get(warning.oldhighesrole.id) + ">" : "`".concat(warning.oldhighesrole.name, " (").concat(warning.oldhighesrole.id, ")`")), true));
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](7);
            console.log(String(_context.t0.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 29], [7, 23]]);
  }
};