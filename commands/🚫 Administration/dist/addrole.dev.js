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
  name: "addrole",
  category: "\uD83D\uDEAB Administration",
  aliases: ["roleadd", "add-role", "role-add"],
  cooldown: 4,
  usage: "addrole @User @Role",
  description: "Adds a Role to a User",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, member, role, ge, channel;

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

            return _context.abrupt("return", message.channel.send({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE ROLES`!")
            }));

          case 4:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.addrole");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.addrole");
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

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
                return "<@&".concat(role, ">");
              }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))
            }));

          case 29:
            member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(args[0]);

            if (member) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a USER!").setDescription(" Usage: `".concat(prefix, "addrole @USER @ROLE`"))
            }));

          case 32:
            role = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first() || message.guild.roles.cache.get(args[1]);

            if (!(!role || role == null || role == undefined || role.name == null || role.name == undefined)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a ROLE!").setDescription(" Usage: `".concat(prefix, "addrole @USER @ROLE`"))
            }));

          case 35:
            if (!(member.roles.highest.position >= message.member.roles.highest.position)) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot give that Role to this Member, because he is higher/Equal to your Rang Position!")));

          case 37:
            if (!(message.member.roles.highest.position <= role.position)) {
              _context.next = 39;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot give that Role to this Member, because it's higher then your highest ROLE!")
            }));

          case 39:
            if (!member.roles.cache.some(function (r) {
              return r.id == role.id;
            })) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot give that Role to this Member, because he already has it!!")
            }));

          case 41:
            ge = false;
            member.roles.add(role.id)["catch"](function (e) {
              console.log(e);
              ge = e;
            });

            if (!ge) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went wrong").setDescription(ge.message)
            }));

          case 45:
            message.channel.send({
              embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("added `".concat(role.name, "` to `").concat(member.user.tag, "`"))
            });

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 57;
              break;
            }

            _context.prev = 47;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 51;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 51:
            channel.send({
              embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
                dynamic: true
              })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id)
            });
            _context.next = 57;
            break;

          case 54:
            _context.prev = 54;
            _context.t1 = _context["catch"](47);
            console.log(_context.t1);

          case 57:
            _context.next = 63;
            break;

          case 59:
            _context.prev = 59;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))
            }));

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 59], [11, 15, 19, 27], [20,, 22, 26], [47, 54]]);
  }
};