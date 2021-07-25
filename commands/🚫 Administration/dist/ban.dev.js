"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "ban",
  category: "\uD83D\uDEAB Administration",
  aliases: ["banhammer", "tempban"],
  description: "Bans a Member from a Guild",
  usage: "ban @User [0-7 Days, 0 == Infinite] [Reason]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, kickmember, days, reason, memberPosition, moderationPosition;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (message.guild.me.hasPermission("BAN_MEMBERS")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `BAN MEMBERS`!")));

          case 4:
            databasing(client, message.guild.id, message.author.id);
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.ban");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 28;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.ban");
              }
            }

            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError) {
              _context.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 30:
            kickmember = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(args[0] ? args[0] : "");

            if (kickmember) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Member you want to kick!").setDescription("Useage: `".concat(prefix, "ban @User [Reason]`"))));

          case 33:
            if (!isNaN(args[1])) days = Number(args[1]);else days = 0;
            if (Number(days) >= 7) days = 7;
            if (Number(days) <= 0) days = 0;
            reason = args.slice(2).join(" ");
            if (days == 0) reason = args.slice(1).join(" ");

            if (!reason) {
              reason = "NO REASON";
            }

            memberPosition = kickmember.roles.highest.rawPosition;
            moderationPosition = message.member.roles.highest.rawPosition;

            if (!(moderationPosition <= memberPosition)) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot ban someone, who is above/equal you")));

          case 43:
            if (kickmember.bannable) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The Member is not bannable, sorry!")));

          case 45:
            _context.prev = 45;
            kickmember.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("You got banned by `".concat(message.author.tag, "` from `").concat(message.guild.name, "` for ").concat(days === 0 ? "Infinite Days" : "".concat(days, " Days"))).setDescription("Reason:\n> ".concat(reason)));
            _context.next = 52;
            break;

          case 49:
            _context.prev = 49;
            _context.t1 = _context["catch"](45);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Could not DM the Reason to: `".concat(kickmember.user.tag, "`")).setDescription("".concat(kickmember.user))));

          case 52:
            _context.prev = 52;
            kickmember.ban({
              days: days,
              reason: reason
            }).then(function () {
              client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "ban");
              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Banned `".concat(kickmember.user.tag, "` for ").concat(days === 0 ? "Infinite Days" : "".concat(days, " Days"))).setDescription("Reason:\n> ".concat(reason)).setImage("https://i.imgur.com/O3DHIA5.gif"));

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
            _context.next = 60;
            break;

          case 56:
            _context.prev = 56;
            _context.t2 = _context["catch"](52);
            console.log(String(_context.t2.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 60:
            _context.next = 66;
            break;

          case 62:
            _context.prev = 62;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 62], [12, 16, 20, 28], [21,, 23, 27], [45, 49], [52, 56]]);
  }
};