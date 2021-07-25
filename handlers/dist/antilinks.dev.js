"use strict";

//import the config.json file
var config = require(".config.json");

var ee = require("../base-system/embed.json");

var emoji = require("../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var countermap = new Map();

module.exports = function (client) {
  var _require2 = require("../handlers/functions"),
      databasing = _require2.databasing,
      check_voice_channels = _require2.check_voice_channels,
      create_join_to_create_Channel = _require2.create_join_to_create_Channel,
      isValidURL = _require2.isValidURL;

  client.on("message", function _callee(message) {
    var adminroles, antisettings, es, member, time, reason, allguildroles, mutedrole, i, highestrolepos;
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
            _context.prev = 5;

            if (!(adminroles && adminroles.length > 0 && message.member.roles.cache.array().length > 0 && message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) || Array(message.guild.owner.id, config.ownerid).includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            client.settings.ensure(message.guild.id, {
              antilink: {
                enabled: false,
                whitelistedchannels: []
              }
            });
            antisettings = client.settings.get(message.guild.id, "antilink");

            if (antisettings.enabled) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return");

          case 12:
            if (!(client.setups.get("TICKETS", "tickets").includes(message.channel.id) || client.setups.get("TICKETS", "tickets2").includes(message.channel.id) || client.setups.get("TICKETS", "tickets3").includes(message.channel.id) || client.setups.get("TICKETS", "tickets4").includes(message.channel.id) || client.setups.get("TICKETS", "tickets5").includes(message.channel.id))) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            //it is a ticket
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 15;

            if (!(isValidURL(message.content) && !message.content.includes("```"))) {
              _context.next = 55;
              break;
            }

            if (!antisettings.whitelistedchannels.includes(message.channel.id)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return");

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(message["delete"]()["catch"](function (e) {
              return console.log("PREVENTED A BUG");
            }));

          case 21:
            if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1);
            setTimeout(function () {
              countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1);
              if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1);
            }, 5000);
            countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1);

            if (!(Number(countermap.get(message.author.id)) > 5)) {
              _context.next = 51;
              break;
            }

            member = message.member;
            time = 10 * 60 * 1000;
            reason = "Sending too many Links in a Short Time";
            allguildroles = message.guild.roles.cache.array();
            mutedrole = false;
            i = 0;

          case 31:
            if (!(i < allguildroles.length)) {
              _context.next = 38;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("muted")) {
              _context.next = 35;
              break;
            }

            mutedrole = allguildroles[i];
            return _context.abrupt("break", 38);

          case 35:
            i++;
            _context.next = 31;
            break;

          case 38:
            if (mutedrole) {
              _context.next = 43;
              break;
            }

            highestrolepos = message.guild.me.roles.highest.position;
            _context.next = 42;
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

          case 42:
            mutedrole = _context.sent;

          case 43:
            _context.next = 45;
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

          case 45:
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
            _context.next = 53;
            break;

          case 51:
            _context.next = 53;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to send Links in this Channel")).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("PREVENT BUG");
              });
            }));

          case 53:
            _context.next = 55;
            break;

          case 55:
            _context.next = 61;
            break;

          case 57:
            _context.prev = 57;
            _context.t0 = _context["catch"](15);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 61:
            _context.next = 66;
            break;

          case 63:
            _context.prev = 63;
            _context.t1 = _context["catch"](5);
            return _context.abrupt("return");

          case 66:
            _context.next = 70;
            break;

          case 68:
            _context.prev = 68;
            _context.t2 = _context["catch"](0);

          case 70:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 68], [5, 63], [15, 57]]);
  });
};