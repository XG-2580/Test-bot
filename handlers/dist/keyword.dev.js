"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//import the config.json file
var config = require(".config.json");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../handlers/functions"),
    escapeRegex = _require2.escapeRegex;

var map = new Map();

module.exports = function (client) {
  client.on("message", function _callee(message) {
    var es, args, prefix, prefixRegex, cuc, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!message.guild || !message.channel || message.author.bot)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            es = client.settings.get(message.guild.id, "embed");
            args = message.content.split(" ");
            prefix = client.settings.get(message.guild.id, "prefix"); //if not in the database for some reason use the default prefix

            if (prefix === null) prefix = config.prefix; //the prefix can be a Mention of the Bot / The defined Prefix of the Bot

            prefixRegex = new RegExp("^(<@!?".concat(client.user.id, ">|").concat(escapeRegex(prefix), ")\\s*"));
            client.keyword.ensure(message.guild.id, {
              commands: []
            });
            cuc = client.keyword.get(message.guild.id, "commands");
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;

            _loop = function _loop() {
              var cmd = _step.value;
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var string = _step2.value;

                  if (string && (String(string).toLowerCase() == cmd.name.toLowerCase() || cmd.aliases.includes(String(string).toLowerCase())) && cmd.channels.includes(message.channel.id)) {
                    if (!map.has(cmd.name + message.guild.id)) {
                      map.set(cmd.name + message.guild.id, true);
                      setTimeout(function () {
                        map["delete"](cmd.name + message.guild.id);
                      }, 5000);

                      if (cmd.embed) {
                        //if its not that then return
                        if (prefixRegex.test(message.content) && !cmd.name.startsWith(prefix)) return {
                          v: void 0
                        };
                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setDescription(cmd.output.replace("{member}", "<@".concat(message.author.id, ">"))));
                        continue;
                      } else {
                        //if its not that then return
                        if (prefixRegex.test(message.content) && !cmd.name.startsWith(prefix)) return {
                          v: void 0
                        };
                        message.channel.send(cmd.output.replace("{member}", "<@".concat(message.author.id, ">")));
                        continue;
                      }
                    } else {}

                    continue;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            };

            _iterator = cuc[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 22;
              break;
            }

            _ret = _loop();

            if (!(_typeof(_ret) === "object")) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", _ret.v);

          case 19:
            _iteratorNormalCompletion = true;
            _context.next = 15;
            break;

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 28:
            _context.prev = 28;
            _context.prev = 29;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 31:
            _context.prev = 31;

            if (!_didIteratorError) {
              _context.next = 34;
              break;
            }

            throw _iteratorError;

          case 34:
            return _context.finish(31);

          case 35:
            return _context.finish(28);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[12, 24, 28, 36], [29,, 31, 35]]);
  });
};