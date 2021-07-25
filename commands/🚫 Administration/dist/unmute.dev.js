"use strict";

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var ms = require("ms");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "unmute",
  category: "\uD83D\uDEAB Administration",
  aliases: [""],
  cooldown: 4,
  usage: "unmute @User",
  description: "Unmutes a User!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, member, allguildroles, mutedrole, i, channel;

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
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.unmute");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.unmute");
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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a USER!").setDescription(" Usage: `".concat(prefix, "unmute @User`\n\nExample: `").concat(prefix, "unmute @User`"))));

          case 32:
            args.shift();

            if (!(member.roles.highest.position >= message.member.roles.highest.position)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot mute this Member, because he is higher/Equal to your Rang Position!")));

          case 35:
            allguildroles = message.guild.roles.cache.array();
            mutedrole = false;
            i = 0;

          case 38:
            if (!(i < allguildroles.length)) {
              _context.next = 45;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("muted")) {
              _context.next = 42;
              break;
            }

            mutedrole = allguildroles[i];
            return _context.abrupt("break", 45);

          case 42:
            i++;
            _context.next = 38;
            break;

          case 45:
            if (mutedrole) {
              _context.next = 47;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You never muted someone, there is no muted role yet!")));

          case 47:
            if (!(mutedrole.position > message.guild.me.roles.highest.position)) {
              _context.next = 49;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot access the Role, because it's above me!")));

          case 49:
            _context.prev = 49;
            member.roles.remove(mutedrole);
            _context.next = 56;
            break;

          case 53:
            _context.prev = 53;
            _context.t1 = _context["catch"](49);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please add a TIME!").setDescription(" Usage: `".concat(prefix, "mute @User <Time+Format(e.g: 10m)> [REASON]`\n\nExample: `").concat(prefix, "mute @User 10m He is doing bad stuff!`"))));

          case 56:
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **UNMUTED**")));
            member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(message.author.tag, "` unmited")));

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 69;
              break;
            }

            _context.prev = 59;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 63;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 63:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 69;
            break;

          case 66:
            _context.prev = 66;
            _context.t2 = _context["catch"](59);
            console.log(_context.t2);

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
    }, null, null, [[1, 71], [11, 15, 19, 27], [20,, 22, 26], [49, 53], [59, 66]]);
  }
};