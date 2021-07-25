"use strict";

var fs = require("fs");

var ascii = require("ascii-table");

var table = new ascii("Events");
table.setHeading("Events", "Load status");
var allevents = [];

module.exports = function _callee(client) {
  var load_dir, i, stringlength, stringlength2;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          load_dir = function load_dir(dir) {
            var event_files = fs.readdirSync("./events/".concat(dir)).filter(function (file) {
              return file.endsWith(".js");
            });
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = event_files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var file = _step.value;

                var event = require("../events/".concat(dir, "/").concat(file));

                var eventName = file.split(".")[0];
                allevents.push(eventName);
                client.on(eventName, event.bind(null, client));
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
          };

          _context.next = 4;
          return regeneratorRuntime.awrap(["client", "guild"].forEach(function (e) {
            return load_dir(e);
          }));

        case 4:
          for (i = 0; i < allevents.length; i++) {
            try {
              table.addRow(allevents[i], "Ready");
            } catch (e) {
              console.log(String(e.stack).red);
            }
          } //console.log(table.toString().cyan);


          try {
            stringlength = 69;
            console.log("\n");
            console.log("     \u250F\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2513".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length) + "┃".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + "Welcome to SERVICE HANDLER!".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length - "Welcome to SERVICE HANDLER!".length) + "┃".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + "  /-/ By https://Limsathya /-/".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length - "  /-/ By https://Limsathya /-/".length) + "┃".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length) + "┃".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + "  /-/ Discord: XG#2846 /-/".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length - "  /-/ By Discord: XG#2846 /-/".length) + "   ┃".bold.brightGreen);
            console.log("     \u2503 ".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length) + "┃".bold.brightGreen);
            console.log("     \u2517\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u251B".bold.brightGreen);
          } catch (_unused) {
            /* */
          }

          try {
            stringlength2 = 69;
            console.log("\n");
            console.log("     \u250F\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2513".bold.yellow);
            console.log("     \u2503 ".bold.yellow + " ".repeat(-1 + stringlength2 - " \u2503 ".length) + "┃".bold.yellow);
            console.log("     \u2503 ".bold.yellow + "Logging into the BOT...".bold.yellow + " ".repeat(-1 + stringlength2 - " \u2503 ".length - "Logging into the BOT...".length) + "┃".bold.yellow);
            console.log("     \u2503 ".bold.yellow + " ".repeat(-1 + stringlength2 - " \u2503 ".length) + "┃".bold.yellow);
            console.log("     \u2517\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u251B".bold.yellow);
          } catch (_unused2) {
            /* */
          }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(String(_context.t0.stack).bgRed);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};