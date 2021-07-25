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

var fetch = require("node-fetch");

module.exports = function (client) {
  client.on("message", function _callee(message) {
    var chatbot, attachment;
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
              aichat: "no"
            });
            chatbot = client.settings.get(message.guild.id, "aichat");

            if (!(!chatbot || chatbot == "no")) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            if (!(message.channel.id == chatbot)) {
              _context.next = 12;
              break;
            }

            if (!(message.attachments.size > 0)) {
              _context.next = 11;
              break;
            }

            attachment = new MessageAttachment("https://cdn.discordapp.com/attachments/816645188461264896/826736269509525524/I_CANNOT_READ_FILES.png");
            return _context.abrupt("return", message.channel.send(attachment));

          case 11:
            fetch("http://api.brainshop.ai/get?bid=153861&key=0ZjvbPWKAxJvcJ96&uid=1&msg=".concat(encodeURIComponent(message))).then(function (res) {
              return res.json();
            }).then(function (data) {
              message.channel.send(data.cnt)["catch"](function (e) {
                return console.log("CHATBOT:".underline.red + " :: " + e.stack.toString().red);
              });
            });

          case 12:
            _context.next = 16;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  });
};