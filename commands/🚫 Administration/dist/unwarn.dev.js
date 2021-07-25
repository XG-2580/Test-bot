"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "unwarn",
  category: "\uD83D\uDEAB Administration",
  aliases: ["removewarn", "warnremove"],
  description: "Removes a Warn from a Member with the ID",
  usage: "unwarn @User <WARN_ID>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, warnmember, memberPosition, moderationPosition, warnIDs, dwarnData, warnData, warning, warned_by, warned_at, warned_in, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.unwarn");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 25;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.unwarn");
              }
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 27:
            warnmember = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(args[0] ? args[0] : "");

            if (warnmember) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to unwarn!").setDescription("Useage: `".concat(prefix, "unwarn @User <WARN_ID>`"))));

          case 30:
            if (args[1]) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add the Warning you want to remove from him").setDescription("Example: `".concat(prefix, "unwarn @User <WARN_ID>`\n\nSee his Warn-Ids: `").concat(prefix, "warns ").concat(warnmember.user, "`"))));

          case 32:
            memberPosition = warnmember.roles.highest.position;
            moderationPosition = message.member.roles.highest.position;

            if (!(moderationPosition <= memberPosition)) {
              _context.next = 36;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot warn someone, who is above/equal you")));

          case 36:
            _context.prev = 36;
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
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("User has no Warnings")));

          case 43:
            if (!(Number(args[1]) >= warnData.length || Number(args[1]) < 0)) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Value out of range").setDescription("Usage: `".concat(prefix, "unwarn @User <WARN_ID>` Highest ID: ").concat(warnIDs.length - 1))));

          case 45:
            warning = warnData[parseInt(args[1])];
            warned_by = message.guild.members.cache.get(warning.moderator) ? message.guild.members.cache.get(warning.moderator).user.tag : warning.moderator;
            warned_at = warning.when;
            warned_in = client.guilds.cache.get(warning.guild) ? client.guilds.cache.get(warning.guild).name : warning.guild;
            warnmember.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(message.author.tag, " removed a warn from you!")).addField("Warned by:", "`".concat(warned_by, "`"), true).addField("Warned at:", "`".concat(warned_at, "`"), true).addField("Warned in:", "`".concat(warned_in, "`"), true).addField("Warn Reason:", "`".concat(warning.reason.length > 900 ? warning.reason.substr(0, 900) + " ..." : warning.reason, "`"), true))["catch"](function (e) {
              return console.log(e.message);
            });
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed the Warn from ".concat(warnmember.user.tag)).addField("Warned by:", "`".concat(warned_by, "`"), true).addField("Warned at:", "`".concat(warned_at, "`"), true).addField("Warned in:", "`".concat(warned_in, "`"), true).addField("Warn Reason:", "`".concat(warning.reason.length > 900 ? warning.reason.substr(0, 900) + " ..." : warning.reason, "`"), true));
            client.userProfiles.remove(warnmember.user.id, warnIDs[parseInt(args[1])], 'warnings');

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 63;
              break;
            }

            _context.prev = 53;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 57;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 57:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 63;
            break;

          case 60:
            _context.prev = 60;
            _context.t1 = _context["catch"](53);
            console.log(_context.t1);

          case 63:
            _context.next = 69;
            break;

          case 65:
            _context.prev = 65;
            _context.t2 = _context["catch"](36);
            console.log(String(_context.t2.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 69:
            _context.next = 75;
            break;

          case 71:
            _context.prev = 71;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 75:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 71], [9, 13, 17, 25], [18,, 20, 24], [36, 65], [53, 60]]);
  }
};