"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    getRandomInt = _require2.getRandomInt;

module.exports = {
  name: "stats",
  category: "🔰 Info",
  aliases: ["musicstats"],
  cooldown: 10,
  usage: "stats",
  description: "Shows music Stats, like amount of Commands and played Songs etc.",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(function _callee() {
              var global, guild, premiums, guilds, users, _loop, i, _ret, _loop2, _i, _ret2, size;

              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      global = client.stats.get("global");
                      guild = client.stats.get(message.guild.id);
                      premiums = client.premium.get("premiumlist", "list");
                      guilds = [];
                      users = [];

                      _loop = function _loop(i) {
                        try {
                          if (Object.keys(premiums[i])[0] === "g") {
                            var _guild = client.guilds.cache.get(Object.values(premiums[i])[0]);

                            if (!_guild) {
                              client.premium.get("premiumlist", function (value) {
                                return value.g === Object.values(premiums[i])[0];
                              }, "list");
                              return "continue";
                            }

                            guilds.push(_guild.name);
                          }
                        } catch (_unused) {}
                      };

                      i = 0;

                    case 7:
                      if (!(i < premiums.length)) {
                        _context2.next = 14;
                        break;
                      }

                      _ret = _loop(i);

                      if (!(_ret === "continue")) {
                        _context2.next = 11;
                        break;
                      }

                      return _context2.abrupt("continue", 11);

                    case 11:
                      i++;
                      _context2.next = 7;
                      break;

                    case 14:
                      _loop2 = function _loop2(_i) {
                        var user;
                        return regeneratorRuntime.async(function _loop2$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;

                                if (!(Object.keys(premiums[_i])[0] === "u")) {
                                  _context.next = 9;
                                  break;
                                }

                                _context.next = 4;
                                return regeneratorRuntime.awrap(client.users.fetch(Object.values(premiums[_i])[0]));

                              case 4:
                                user = _context.sent;

                                if (user) {
                                  _context.next = 8;
                                  break;
                                }

                                client.premium.get("premiumlist", function (value) {
                                  return value.u === Object.values(premiums[_i])[0];
                                }, "list");
                                return _context.abrupt("return", "continue");

                              case 8:
                                users.push(user.tag);

                              case 9:
                                _context.next = 13;
                                break;

                              case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](0);

                              case 13:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, null, null, [[0, 11]]);
                      };

                      _i = 0;

                    case 16:
                      if (!(_i < premiums.length)) {
                        _context2.next = 25;
                        break;
                      }

                      _context2.next = 19;
                      return regeneratorRuntime.awrap(_loop2(_i));

                    case 19:
                      _ret2 = _context2.sent;

                      if (!(_ret2 === "continue")) {
                        _context2.next = 22;
                        break;
                      }

                      return _context2.abrupt("continue", 22);

                    case 22:
                      _i++;
                      _context2.next = 16;
                      break;

                    case 25:
                      size = client.setups.filter(function (s) {
                        return s.textchannel != "0";
                      }).size + client.guilds.cache.array().length / 3;
                      if (size > client.guilds.cache.array().length) size = client.guilds.cache.array().length;
                      message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).addField("⚙️ GLOBAL Commands used:", ">>> `".concat(Math.ceil(global.commands * client.guilds.cache.array().length / 10), " Commands` used\nin **all** Servers"), true).addField("🎵 GLOBAL Songs played:", ">>> `".concat(Math.ceil(global.songs * client.guilds.cache.array().length / 10), " Songs` played in\n**all** Servers"), true).addField("📰 GLOBAL Setups created:", ">>> `".concat(Math.ceil(size), " Setups` created in\n**all** Servers"), true).addField("\u200B", "\u200B").addField("⚙️ SERVER Commands used:", ">>> `".concat(guild.commands, " Commands` used in\n**this** Server"), true).addField("🎵 SERVER Songs played:", ">>> `".concat(guild.songs, " Songs` played in\n**this** Server"), true).addField("📰 GLOBAL Premium list:", ">>> `".concat(guilds.length, " Guilds`\n`").concat(users.length, " Users`\n having Premium"), true).setTitle("\uD83D\uDCBF The Stats of ".concat(client.user.username)));

                    case 28:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }());

          case 4:
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            console.log(String(_context3.t0.stack).bgRed);
            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```"))));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 6]]);
  }
};