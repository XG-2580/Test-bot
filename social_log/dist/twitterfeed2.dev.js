"use strict";

var twitconfig = require("./twitter.json");

var Twit = require('twit');

var _require = require('../handlers/functions'),
    databasing = _require.databasing,
    delay = _require.delay;

module.exports = function (client) {};

function create_twit(client) {
  return regeneratorRuntime.async(function create_twit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", undefined);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.creat_twit = create_twit;