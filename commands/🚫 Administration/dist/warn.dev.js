"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "warn",
  category: "\uD83D\uDEAB Administration",
  aliases: [""],
  cooldown: 0.5,
  description: "Warns a Member with a Reason",
  usage: "warn @User [Reason]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, warnmember, reason, memberPosition, moderationPosition, newActionId, warnIDs, warnData, warnings, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.warn");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.warn");
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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to warn!").setDescription("Useage: `".concat(prefix, "warn @User [Reason]`"))));

          case 30:
            reason = args.slice(1).join(" ");

            if (!reason) {
              reason = "NO REASON";
            }

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
            newActionId = client.modActions.autonum;
            client.modActions.set(newActionId, {
              user: warnmember.user.id,
              guild: message.guild.id,
              type: 'warning',
              moderator: message.author.id,
              reason: reason,
              when: new Date().toLocaleString("de"),
              oldhighesrole: warnmember.roles ? warnmember.roles.highest : "Had No Roles",
              oldthumburl: warnmember.user.displayAvatarURL({
                dynamic: true
              })
            }); // Push the action to the user's warnings

            client.userProfiles.push(warnmember.user.id, newActionId, 'warnings');
            client.userProfiles.inc(warnmember.user.id, 'totalActions');
            client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "warn");
            warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings');
            warnData = warnIDs.map(function (id) {
              return client.modActions.get(id);
            });
            warnings = warnData.filter(function (v) {
              return v.guild == message.guild.id;
            });
            warnmember.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("He has: ".concat(client.userProfiles.get(warnmember.user.id, 'warnings') ? client.userProfiles.get(warnmember.user.id, 'warnings').length : 0, " Global Warns"), "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png").setAuthor("You've got warned by: ".concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("**You now have: ".concat(warnings.length, " Warnings in ").concat(message.guild.name, "**\n\nReason:\n> ").concat(reason)))["catch"](function (e) {
              return console.log(e.message);
            });
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("He has: ".concat(client.userProfiles.get(warnmember.user.id, 'warnings') ? client.userProfiles.get(warnmember.user.id, 'warnings').length : 0, " Global Warns"), "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png").setTitle("Warned ".concat(warnmember.user.tag)).setThumbnail(warnmember.user.displayAvatarURL({
              dynamic: true
            })).setDescription("**He now has: ".concat(warnings.length, " Warnings in ").concat(message.guild.name, "**\n\nReason:\n> ").concat(reason).substr(0, 2048)));

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 59;
              break;
            }

            _context.prev = 49;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 53;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 53:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 59;
            break;

          case 56:
            _context.prev = 56;
            _context.t1 = _context["catch"](49);
            console.log(_context.t1);

          case 59:
            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t2 = _context["catch"](36);
            console.log(String(_context.t2.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 65:
            _context.next = 71;
            break;

          case 67:
            _context.prev = 67;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 71:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 67], [9, 13, 17, 25], [18,, 20, 24], [36, 61], [49, 56]]);
  }
};