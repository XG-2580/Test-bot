"use strict";

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
  client.on("message", function _callee(message) {
    var adminroles, anticaps, es, uppercaselength, wholelength, percent, member, time, reason, allguildroles, mutedrole, i, highestrolepos;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(!message.guild || !message.channel || message.author.bot)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            client.settings.ensure(message.guild.id, {
              adminroles: []
            });
            adminroles = client.settings.get(message.guild.id, "adminroles");

            if (!(adminroles && adminroles.length > 0 && message.member.roles.cache.array().length > 0 && message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) || Array(message.guild.owner.id, config.ownerid).includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            client.settings.ensure(message.guild.id, {
              anticaps: {
                enabled: true,
                percent: 75
              }
            });
            anticaps = client.settings.get(message.guild.id, "anticaps");

            if (anticaps.enabled) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            es = client.settings.get(message.guild.id, "embed");

            if (message.content) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            if (!(message.content.split(" ").join("").length < 8)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return");

          case 16:
            _context.prev = 16;
            uppercaselength = message.content.replace(/[^A-Z]/g, "").length;
            wholelength = message.content.length;
            percent = Math.ceil(uppercaselength / wholelength * 100);

            if (!(percent >= anticaps.percent)) {
              _context.next = 56;
              break;
            }

            _context.next = 23;
            return regeneratorRuntime.awrap(message["delete"]()["catch"](function (e) {
              return console.log("PREVENTED A BUG");
            }));

          case 23:
            if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1);
            setTimeout(function () {
              countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1);
              if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1);
            }, 5000);
            countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1);

            if (!(Number(countermap.get(message.author.id)) > 5)) {
              _context.next = 53;
              break;
            }

            member = message.member;
            time = 10 * 60 * 1000;
            reason = "Sending too many Links in a Short Time";
            allguildroles = message.guild.roles.cache.array();
            mutedrole = false;
            i = 0;

          case 33:
            if (!(i < allguildroles.length)) {
              _context.next = 40;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("muted")) {
              _context.next = 37;
              break;
            }

            mutedrole = allguildroles[i];
            return _context.abrupt("break", 40);

          case 37:
            i++;
            _context.next = 33;
            break;

          case 40:
            if (mutedrole) {
              _context.next = 45;
              break;
            }

            highestrolepos = message.guild.me.roles.highest.position;
            _context.next = 44;
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

          case 44:
            mutedrole = _context.sent;

          case 45:
            _context.next = 47;
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

          case 47:
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
            _context.next = 54;
            break;

          case 53:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Dont send that many CAPS").setDescription("`".concat(percent, "%` of your Message were in caps and `").concat(anticaps.percent, "%` is the maximum"))).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("PREVENT BUG");
              });
            }));

          case 54:
            _context.next = 56;
            break;

          case 56:
            _context.next = 62;
            break;

          case 58:
            _context.prev = 58;
            _context.t0 = _context["catch"](16);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 62:
            _context.next = 66;
            break;

          case 64:
            _context.prev = 64;
            _context.t1 = _context["catch"](0);

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 64], [16, 58]]);
  });
};