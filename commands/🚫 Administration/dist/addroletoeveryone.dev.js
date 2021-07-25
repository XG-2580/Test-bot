"use strict";

var config = require("../.config.json");

var ms = require("ms");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var map = new Map();

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    delay = _require2.delay;

module.exports = {
  name: "addroletoeveryone",
  category: "\uD83D\uDEAB Administration",
  aliases: ["roleaddtoeveryone", "add-role-to-everyone", "role-add-to-everyone", "addrole2everyone", "addroleeveryone"],
  cooldown: 4,
  useage: "addroletoeveryone @Role",
  description: "Adds a Role to every User in this Guild",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, addroletomember, send_finished, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, role, members, seconds, channel, success, failed, counter;

    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context3.prev = 1;

            addroletomember = function addroletomember(member) {
              return regeneratorRuntime.async(function addroletomember$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!(counter == members.length)) {
                        _context2.next = 2;
                        break;
                      }

                      return _context2.abrupt("return", send_finished());

                    case 2:
                      counter++;
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(member.roles.add(role.id).then(function _callee(s) {
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                success++;
                                _context.next = 3;
                                return regeneratorRuntime.awrap(delay(1500));

                              case 3:
                                addroletomember(members[counter]);

                              case 4:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      })["catch"](function (e) {
                        failed++;
                        addroletomember(members[counter]);
                      }));

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            };

            send_finished = function send_finished() {
              map.set(message.guild.id, false);
              message.channel.send({
                content: "<@".concat(message.author.id, ">"),
                embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " SUCCESS")).setDescription("Successfully added ".concat(role, " to `").concat(success, " Members` of `").concat(counter, " Members`").concat(failed != 0 ? "\n".concat(failed, " Members, did not get the ROLE, redo it with: `").concat(prefix, "addroletoeveryone ").concat(role.id, "`") : ""))
              });
            };

            if (message.guild.me.hasPermission("MANAGE_ROLES")) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE ROLES`!")));

          case 6:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.addroletoeveryone");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context3.next = 29;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 13;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.addroletoeveryone");
              }
            }

            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 21:
            _context3.prev = 21;
            _context3.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context3.prev = 24;

            if (!_didIteratorError) {
              _context3.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context3.finish(24);

          case 28:
            return _context3.finish(21);

          case 29:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context3.next = 31;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 31:
            if (!map.get(message.guild.id)) {
              _context3.next = 33;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is an active `addroletoeveryone` Command already executing in this Server!")));

          case 33:
            role = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first() || message.guild.roles.cache.get(args[0]);

            if (!(!role || role == null || role == undefined || role.name == null || role.name == undefined)) {
              _context3.next = 36;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("please ping a ROLE!").setDescription(" Usage: `".concat(prefix, "addroletoeveryone @ROLE`"))));

          case 36:
            if (!(message.member.roles.highest.position <= role.position)) {
              _context3.next = 38;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I cannot give that Role to all Members, because it's higher then your highest ROLE!")));

          case 38:
            _context3.next = 40;
            return regeneratorRuntime.awrap(message.guild.members.fetch());

          case 40:
            members = message.guild.members.cache.filter(function (member) {
              return !member.roles.cache.has(role.id);
            }).array();

            if (!(!members || members.length == 0)) {
              _context3.next = 43;
              break;
            }

            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Found no Members!").setDescription("Most of the Times this means, **everyone** already has this ROLE! But you can retry..")));

          case 43:
            seconds = Number(members.length) * 1500;
            console.log(members);
            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Changing roles for ".concat(members.length, " Members..."), "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4").setDescription("This will take ".concat(ms(seconds, {
              "long": true
            }), " in ideal conditions. Please be patient.")));

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context3.next = 57;
              break;
            }

            _context3.prev = 47;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context3.next = 51;
              break;
            }

            return _context3.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 51:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context3.next = 57;
            break;

          case 54:
            _context3.prev = 54;
            _context3.t1 = _context3["catch"](47);
            console.log(_context3.t1);

          case 57:
            success = 0;
            failed = 0;
            counter = 0;
            addroletomember(members[counter]);
            map.set(message.guild.id, true);
            _context3.next = 69;
            break;

          case 64:
            _context3.prev = 64;
            _context3.t2 = _context3["catch"](1);
            map.set(message.guild.id, false);
            console.log(String(_context3.t2.stack).bgRed);
            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context3.t2)).substr(0, 2000), "```"))));

          case 69:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 64], [13, 17, 21, 29], [22,, 24, 28], [47, 54]]);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */