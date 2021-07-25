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
  name: "deleterole",
  category: "\uD83D\uDEAB Administration",
  aliases: ["roledelete", "delete-role", "role-delete"],
  cooldown: 4,
  usage: "deleterole  @Role",
  description: "Delets a Role from this Server",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, role;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (message.guild.me.hasPermission("MANAGE_ROLES")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE ROLES`!")));

          case 2:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 3;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.deleterole");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.deleterole");
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
            role = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first() || message.guild.roles.cache.get(args[0]);

            if (!(!role || role == null || role == undefined || role.name == null || role.name == undefined)) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a ROLE!").setDescription(" Usage: `".concat(prefix, "deleterole @ROLE`"))));

          case 32:
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Do you really wanna delete the ".concat(role.name, " from this Server?")).setDescription("*This step cannot be undone!*\n\nReply with **__yes__** if you wanna delete it!")).then(function (msg) {
              msg.channel.awaitMessages(function (m) {
                return m.author.id == message.author.id;
              }, {
                max: 1,
                time: 30000,
                errors: ["time"]
              }).then(function (collected) {
                if (collected.first().content.toLowerCase().includes("yes")) {
                  var membersize = role.members.array().length;
                  role["delete"]("".concat(message.author.tag, " Requested a Role delete")).then(function (r) {
                    message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Deleted `".concat(r.name, "` and removed it from `").concat(membersize, " Members`")));

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
                  })["catch"](console.error);
                } else {
                  return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not add **__yes__**").setDescription(ge.message));
                }
              })["catch"](function (e) {
                return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went wrong").setDescription(e.message));
              });
            });
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 35], [11, 15, 19, 27], [20,, 22, 26]]);
  }
};