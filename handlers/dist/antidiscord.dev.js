"use strict";

//import the config.json file
var config = require(".config.json");

var ee = require("../base-system/embed.json");

var emoji = require("../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var countermap = new Map();

module.exports = function (client) {
  var _require2 = require("./functions"),
      databasing = _require2.databasing,
      check_voice_channels = _require2.check_voice_channels,
      create_join_to_create_Channel = _require2.create_join_to_create_Channel,
      isValidURL = _require2.isValidURL;

  var isInvite = function isInvite(guild, code) {
    return regeneratorRuntime.async(function isInvite$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              guild.fetchInvites().then(function (invites) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = invites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var invite = _step.value;

                    if (code === invite[0]) {
                      resolve(true);
                      return;
                    }
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                resolve(false);
              });
            }));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  client.on("message", function _callee(message) {
    var adminroles, antisettings, es, guild, content, code, isOurInvite, member, time, reason, allguildroles, mutedrole, i, highestrolepos;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!message.guild || !message.channel || message.author.bot)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            client.settings.ensure(message.guild.id, {
              adminroles: []
            });
            adminroles = client.settings.get(message.guild.id, "adminroles");

            if (!(adminroles && adminroles.length > 0 && message.member.roles.cache.array().length > 0 && message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) || Array(message.guild.owner.id, config.ownerid).includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return");

          case 7:
            client.settings.ensure(message.guild.id, {
              antidiscord: {
                enabled: false,
                whitelistedchannels: []
              }
            });
            antisettings = client.settings.get(message.guild.id, "antidiscord");

            if (antisettings.enabled) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return");

          case 11:
            if (!(client.setups.get("TICKETS", "tickets").includes(message.channel.id) || client.setups.get("TICKETS", "tickets2").includes(message.channel.id) || client.setups.get("TICKETS", "tickets3").includes(message.channel.id) || client.setups.get("TICKETS", "tickets4").includes(message.channel.id) || client.setups.get("TICKETS", "tickets5").includes(message.channel.id))) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return");

          case 13:
            //it is a ticket
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 14;
            guild = message.guild, content = message.content;

            if (!content.includes('discord.gg/')) {
              _context2.next = 60;
              break;
            }

            code = content.split('discord.gg/')[1];
            _context2.next = 20;
            return regeneratorRuntime.awrap(isInvite(guild, code));

          case 20:
            isOurInvite = _context2.sent;

            if (isOurInvite) {
              _context2.next = 58;
              break;
            }

            if (!antisettings.whitelistedchannels.includes(message.channel.id)) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return");

          case 24:
            message["delete"]()["catch"](function (e) {
              return console.log("PREVENTED A BUG");
            });
            if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1);
            setTimeout(function () {
              countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1);
              if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1);
            }, 5000);
            countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1);

            if (!(Number(countermap.get(message.author.id)) > 5)) {
              _context2.next = 55;
              break;
            }

            member = message.member;
            time = 10 * 60 * 1000;
            reason = "Sending too many Links in a Short Time";
            allguildroles = message.guild.roles.cache.array();
            mutedrole = false;
            i = 0;

          case 35:
            if (!(i < allguildroles.length)) {
              _context2.next = 42;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("muted")) {
              _context2.next = 39;
              break;
            }

            mutedrole = allguildroles[i];
            return _context2.abrupt("break", 42);

          case 39:
            i++;
            _context2.next = 35;
            break;

          case 42:
            if (mutedrole) {
              _context2.next = 47;
              break;
            }

            highestrolepos = message.guild.me.roles.highest.position;
            _context2.next = 46;
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

          case 46:
            mutedrole = _context2.sent;

          case 47:
            _context2.next = 49;
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

          case 49:
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
            _context2.next = 56;
            break;

          case 55:
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to send Discord related Links in this Channel")).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("PREVENT BUG");
              });
            }));

          case 56:
            _context2.next = 58;
            break;

          case 58:
            _context2.next = 60;
            break;

          case 60:
            _context2.next = 66;
            break;

          case 62:
            _context2.prev = 62;
            _context2.t0 = _context2["catch"](14);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```"))));

          case 66:
            _context2.next = 70;
            break;

          case 68:
            _context2.prev = 68;
            _context2.t1 = _context2["catch"](0);

          case 70:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 68], [14, 62]]);
  });
};