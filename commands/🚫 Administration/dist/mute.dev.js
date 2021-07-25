"use strict";

var config = require("../.config.json");

var ms = require("ms");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "mute",
  category: "\uD83D\uDEAB Administration",
  aliases: [""],
  cooldown: 4,
  usage: "mute @User <Time+Format(e.g: 10m) / perma> [REASON]",
  description: "Mutes a User for a specific Time!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, member, time, reason, allguildroles, mutedrole, i, highestrolepos, mutetime, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (message.guild.me.hasPermission("MANAGE_ROLES")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE ROLES`!")));

          case 4:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.mute");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.mute");
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
            member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first();

            if (member) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a USER!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 32:
            args.shift();

            if (!(member.roles.highest.position >= message.member.roles.highest.position)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot mute this Member, because he is higher/Equal to your Rang Position!")));

          case 35:
            time = args[0];

            if (time) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 38:
            args.shift();
            reason = args.join(" ");
            allguildroles = message.guild.roles.cache.array();
            mutedrole = false;
            i = 0;

          case 43:
            if (!(i < allguildroles.length)) {
              _context.next = 50;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("muted")) {
              _context.next = 47;
              break;
            }

            mutedrole = allguildroles[i];
            return _context.abrupt("break", 50);

          case 47:
            i++;
            _context.next = 43;
            break;

          case 50:
            if (mutedrole) {
              _context.next = 55;
              break;
            }

            highestrolepos = message.guild.me.roles.highest.position;
            _context.next = 54;
            return regeneratorRuntime.awrap(message.guild.roles.create({
              data: {
                name: "muted",
                color: "#222222",
                hoist: true,
                position: Number(highestrolepos) - 1
              },
              reason: "This role got created, to mute Members!"
            })["catch"](function (e) {
              console.log(String(e.stack).red);
              message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I COULD NOT CREATE A ROLE, sorry"));
            }));

          case 54:
            mutedrole = _context.sent;

          case 55:
            if (!(mutedrole.position > message.guild.me.roles.highest.position)) {
              _context.next = 57;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot access the Role, because it's above me")));

          case 57:
            if (!(time.toLowerCase() === "perma")) {
              _context.next = 86;
              break;
            }

            _context.prev = 58;
            mutetime = ms(time);
            _context.next = 65;
            break;

          case 62:
            _context.prev = 62;
            _context.t1 = _context["catch"](58);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 65:
            if (!(!mutetime || mutetime === undefined)) {
              _context.next = 67;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 67:
            _context.next = 69;
            return regeneratorRuntime.awrap(message.guild.channels.cache.filter(function (c) {
              return !c.permissionOverwrites.has(mutedrole.id);
            }).forEach(function (ch) {
              try {
                ch.updateOverwrite(mutedrole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false,
                  SPEAK: false
                });
              } catch (e) {
                console.log(String(e.stack).red);
              }
            }));

          case 69:
            try {
              member.roles.add(mutedrole);
            } catch (e) {
              message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
            }

            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **MUTED** `for ever`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
            client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "mute");
            member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(message.author.tag, "` muted you `for ever`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 84;
              break;
            }

            _context.prev = 74;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 78;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 78:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 84;
            break;

          case 81:
            _context.prev = 81;
            _context.t2 = _context["catch"](74);
            console.log(_context.t2);

          case 84:
            _context.next = 113;
            break;

          case 86:
            _context.prev = 86;
            mutetime = ms(time);
            _context.next = 93;
            break;

          case 90:
            _context.prev = 90;
            _context.t3 = _context["catch"](86);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 93:
            if (!(!mutetime || mutetime === undefined)) {
              _context.next = 95;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m) / perma> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 95:
            _context.next = 97;
            return regeneratorRuntime.awrap(message.guild.channels.cache.filter(function (c) {
              return !c.permissionOverwrites.has(mutedrole.id);
            }).forEach(function (ch) {
              try {
                ch.updateOverwrite(mutedrole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false,
                  SPEAK: false
                });
              } catch (e) {
                console.log(String(e.stack).red);
              }
            }));

          case 97:
            try {
              member.roles.add(mutedrole);
            } catch (e) {
              message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
            }

            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **MUTED** for `").concat(ms(mutetime, {
              "long": true
            }), "`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
            client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "mute");
            member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(message.author.tag, "` muted you for `").concat(ms(mutetime, {
              "long": true
            }), "`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 112;
              break;
            }

            _context.prev = 102;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 106;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 106:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 112;
            break;

          case 109:
            _context.prev = 109;
            _context.t4 = _context["catch"](102);
            console.log(_context.t4);

          case 112:
            setTimeout(function () {
              try {
                message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **UNMUTED** after`").concat(ms(mutetime, {
                  "long": true
                }), "`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
                member.roles.remove(mutedrole);
              } catch (e) {
                return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
              }
            }, mutetime);

          case 113:
            _context.next = 119;
            break;

          case 115:
            _context.prev = 115;
            _context.t5 = _context["catch"](1);
            console.log(String(_context.t5.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t5)).substr(0, 2000), "```"))));

          case 119:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 115], [11, 15, 19, 27], [20,, 22, 26], [58, 62], [74, 81], [86, 90], [102, 109]]);
  }
};