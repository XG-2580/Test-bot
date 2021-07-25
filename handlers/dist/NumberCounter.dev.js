"use strict";

//import the config.json file
var config = require(".config.json");

var ee = require("../base-system/embed.json");

var emoji = require("../base-system/emoji.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var _require2 = require("./functions"),
    databasing = _require2.databasing;

module.exports = function (client) {
  client.on("message", function _callee(message) {
    var counter, counterauthor, counternum;
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
              counter: "no",
              counternum: 0,
              counterauthor: ""
            });
            counter = client.settings.get(message.guild.id, "counter");
            counterauthor = client.settings.get(message.guild.id, "counterauthor");
            counternum = client.settings.get(message.guild.id, "counternum");

            if (!(!counter || counter == "no")) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            if (!(message.channel.id == counter)) {
              _context.next = 26;
              break;
            }

            if (!(!message.author.bot && message.author.id === counterauthor)) {
              _context.next = 14;
              break;
            }

            message["delete"]()["catch"](function (e) {
              return console.log("counter: " + e);
            });
            message.reply("Please wait for **your** turn").then(function (m) {
              return m["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("counter: " + e);
              });
            });
            return _context.abrupt("return");

          case 14:
            if (!(!message.author.bot && isNaN(message.content) || !message.author.bot && !message.content)) {
              _context.next = 18;
              break;
            }

            message["delete"]()["catch"](function (e) {
              return console.log("counter: " + e);
            });
            message.reply("Messages in this channel must be a **number**").then(function (m) {
              return m["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("counter: " + e);
              });
            });
            return _context.abrupt("return");

          case 18:
            if (!(!message.author.bot && parseInt(message.content) !== counternum + 1)) {
              _context.next = 22;
              break;
            }

            message["delete"]()["catch"](function (e) {
              return console.log("counter: " + e);
            });
            message.reply("Next number must be `".concat(counternum + 1, "`")).then(function (m) {
              return m["delete"]({
                timeout: 3000
              })["catch"](function (e) {
                return console.log("counter: " + e);
              });
            });
            return _context.abrupt("return");

          case 22:
            try {
              if ((counternum + 1) % 100 === 0) {
                message.channel.setTopic("Current number-Range: **".concat(counternum + 1, " - ").concat(counternum + 100, "**"))["catch"](function (e) {
                  return console.log("counter: " + e);
                });
              }
            } catch (e) {
              console.log("counter: " + e);
            }

            if ((counternum + 1) % 5 === 0) message.react("833101995723194437");
            client.settings.set(message.guild.id, counternum + 1, "counternum");
            client.settings.set(message.guild.id, message.author.id, "counterauthor");

          case 26:
            _context.next = 30;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 28]]);
  });
};