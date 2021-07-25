"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "kick",
  category: "\uD83D\uDEAB Administration",
  aliases: [""],
  description: "Kicks a Member from a Guild",
  usage: "kick @User [Reason]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, kickmember, reason, memberPosition, moderationPosition;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (message.guild.me.hasPermission("KICK_MEMBERS")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `KICK MEMBERS`!")));

          case 4:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.kick");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 27;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.kick");
              }
            }

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 19:
            _context.prev = 19;
            _context.prev = 20;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 22:
            _context.prev = 22;

            if (!_didIteratorError) {
              _context.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context.finish(22);

          case 26:
            return _context.finish(19);

          case 27:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 29:
            kickmember = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(args[0] ? args[0] : "");

            if (kickmember) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to kick!").setDescription("Useage: `".concat(prefix, "kick @User [Reason]`"))));

          case 32:
            reason = args.slice(1).join(" ");

            if (!reason) {
              reason = "NO REASON";
            }

            memberPosition = kickmember.roles.highest.position;
            moderationPosition = message.member.roles.highest.position;

            if (!(moderationPosition <= memberPosition)) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot kick someone, who is above/equal you")));

          case 38:
            if (kickmember.kickable) {
              _context.next = 40;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The Member is not kickable, sorry!")));

          case 40:
            _context.prev = 40;
            kickmember.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("You got kicked by `".concat(message.author.tag, "` from `").concat(message.guild.name, "` for ").concat(days === 0 ? "Infinite Days" : "".concat(days, " Days"))).setDescription("Reason:\n> ".concat(reason)));
            _context.next = 47;
            break;

          case 44:
            _context.prev = 44;
            _context.t1 = _context["catch"](40);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not DM the Reason to: `".concat(kickmember.user.tag, "`")).setDescription("".concat(kickmember.user))));

          case 47:
            _context.prev = 47;
            kickmember.kick({
              reason: reason
            }).then(function () {
              client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "kick");
              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Kicked ".concat(kickmember.user.tag)).setDescription("Reason:\n> ".concat(reason)));

              if (client.settings.get(message.guild.id, "adminlog") != "no") {
                try {
                  var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));
                  if (!channel) return client.settings.set(message.guild.id, "no", "adminlog");
                  channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
                    dynamic: true
                  })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
                } catch (e) {
                  console.log(e);
                }
              }
            });
            _context.next = 55;
            break;

          case 51:
            _context.prev = 51;
            _context.t2 = _context["catch"](47);
            console.log(String(_context.t2.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 55:
            _context.next = 61;
            break;

          case 57:
            _context.prev = 57;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 57], [11, 15, 19, 27], [20,, 22, 26], [40, 44], [47, 51]]);
  }
};