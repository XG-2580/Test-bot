"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//import the config.json file
var config = require(".config.json");

var ee = require("../base-system/embed.json");

var emoji = require("../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../handlers/functions"),
    databasing = _require2.databasing;

var countermap = new Map();

module.exports = function (client) {
  client.on("message", function _callee3(message) {
    var adminroles, _ret;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(function _callee2() {
              var blacklistwords, es, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, blacklistword;

              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!(!message.guild || !message.channel || message.author.bot)) {
                        _context2.next = 2;
                        break;
                      }

                      return _context2.abrupt("return", {
                        v: void 0
                      });

                    case 2:
                      client.settings.ensure(message.guild.id, {
                        adminroles: []
                      });
                      adminroles = client.settings.get(message.guild.id, "adminroles");

                      if (!(adminroles && adminroles.length > 0 && message.member.roles.cache.array().length > 0 && message.member.roles.cache.some(function (r) {
                        return adminroles.includes(r.id);
                      }) || Array(message.guild.owner.id, config.ownerid).includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))) {
                        _context2.next = 6;
                        break;
                      }

                      return _context2.abrupt("return", {
                        v: void 0
                      });

                    case 6:
                      client.blacklist.ensure(message.guild.id, {
                        words: []
                      });
                      blacklistwords = client.blacklist.get(message.guild.id, "words");
                      es = client.settings.get(message.guild.id, "embed");
                      _context2.prev = 9;
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context2.prev = 13;
                      _iterator = blacklistwords[Symbol.iterator]();

                    case 15:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 34;
                        break;
                      }

                      blacklistword = _step.value;

                      if (!message.content.toLowerCase().includes(blacklistword)) {
                        _context2.next = 31;
                        break;
                      }

                      _context2.next = 20;
                      return regeneratorRuntime.awrap(message["delete"]()["catch"](function (e) {
                        return console.log("PREVENTED A BUG");
                      }));

                    case 20:
                      if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1);
                      setTimeout(function () {
                        countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1);
                        if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1);
                      }, 5000);
                      countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1);

                      if (!(Number(countermap.get(message.author.id)) > 5)) {
                        _context2.next = 28;
                        break;
                      }

                      _context2.next = 26;
                      return regeneratorRuntime.awrap(function _callee() {
                        var member, time, reason, allguildroles, mutedrole, i, highestrolepos;
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                member = message.member;
                                time = 10 * 60 * 1000;
                                reason = "Sending too many Links in a Short Time";
                                allguildroles = message.guild.roles.cache.array();
                                mutedrole = false;
                                i = 0;

                              case 6:
                                if (!(i < allguildroles.length)) {
                                  _context.next = 13;
                                  break;
                                }

                                if (!allguildroles[i].name.toLowerCase().includes("muted")) {
                                  _context.next = 10;
                                  break;
                                }

                                mutedrole = allguildroles[i];
                                return _context.abrupt("break", 13);

                              case 10:
                                i++;
                                _context.next = 6;
                                break;

                              case 13:
                                if (mutedrole) {
                                  _context.next = 18;
                                  break;
                                }

                                highestrolepos = message.guild.me.roles.highest.position;
                                _context.next = 17;
                                return regeneratorRuntime.awrap(message.guild.roles.create({
                                  data: {
                                    name: "muted",
                                    color: "#222222",
                                    hoist: true,
                                    position: Number(highestrolepos) - 1
                                  },
                                  reason: "This role got created, to mute Members!"
                                })["catch"](function (e) {
                                  return console.log(String(e.stack).red);
                                }));

                              case 17:
                                mutedrole = _context.sent;

                              case 18:
                                _context.next = 20;
                                return regeneratorRuntime.awrap(message.guild.channels.cache.forEach(function (ch) {
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

                              case 20:
                                try {
                                  member.roles.add(mutedrole);
                                } catch (e) {
                                  console.log(e);
                                }

                                message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **MUTED** for `10 Minutes`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
                                countermap.set(message.author.id, 1);
                                setTimeout(function () {
                                  try {
                                    message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("`".concat(member.user.tag, "` got **UNMUTED** after`").concat(ms(mutetime, {
                                      "long": true
                                    }), "`")).setDescription("Reason:\n> ".concat(reason ? "".concat(reason.substr(0, 1800)) : "NO REASON")));
                                    member.roles.remove(mutedrole);
                                  } catch (e) {
                                    console.log(e);
                                  }
                                }, time);

                              case 24:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      }());

                    case 26:
                      _context2.next = 29;
                      break;

                    case 28:
                      return _context2.abrupt("return", {
                        v: message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to send ".concat(blacklistword, " in this Server"))).then(function (msg) {
                          return msg["delete"]({
                            timeout: 3000
                          })["catch"](function (e) {
                            return console.log("PREVENT BUG");
                          });
                        })["catch"](function (e) {
                          return console.log("PREVENT BUG");
                        })
                      });

                    case 29:
                      _context2.next = 31;
                      break;

                    case 31:
                      _iteratorNormalCompletion = true;
                      _context2.next = 15;
                      break;

                    case 34:
                      _context2.next = 40;
                      break;

                    case 36:
                      _context2.prev = 36;
                      _context2.t0 = _context2["catch"](13);
                      _didIteratorError = true;
                      _iteratorError = _context2.t0;

                    case 40:
                      _context2.prev = 40;
                      _context2.prev = 41;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 43:
                      _context2.prev = 43;

                      if (!_didIteratorError) {
                        _context2.next = 46;
                        break;
                      }

                      throw _iteratorError;

                    case 46:
                      return _context2.finish(43);

                    case 47:
                      return _context2.finish(40);

                    case 48:
                      _context2.next = 54;
                      break;

                    case 50:
                      _context2.prev = 50;
                      _context2.t1 = _context2["catch"](9);
                      console.log(String(_context2.t1.stack).bgRed);
                      return _context2.abrupt("return", {
                        v: message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```")))
                      });

                    case 54:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[9, 50], [13, 36, 40, 48], [41,, 43, 47]]);
            }());

          case 3:
            _ret = _context3.sent;

            if (!(_typeof(_ret) === "object")) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", _ret.v);

          case 6:
            _context3.next = 10;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};