"use strict";

var Discord = require("discord.js");

var fs = require("fs");

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var radios = require("../base-system/radiostations.json");

module.exports = function (client) {
  try {
    /**
     * @INFO
     * This will be all of our CLIENT VARIABLES for the commands as well as a cooldown system for each cmd!
     */
    client.invites = {};
    client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands

    client.aliases = new Discord.Collection(); //an collection for all your command-aliases

    client.categories = fs.readdirSync("./commands/"); //categories

    client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

    client.getInvite = function _callee(id) {
      var ch, inv;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!id || id.length != 18)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", "INVALID CHANNELID");

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(client.channels.fetch("802914917874663454"));

            case 4:
              ch = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(ch.createInvite());

            case 7:
              inv = _context.sent;

              if (inv) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", "COULD NOT CREATE INVITE FOR: <#802914917874663454> in **".concat(ch.guild.name, "**"));

            case 10:
              return _context.abrupt("return", "<#802914917874663454> | discord.gg/".concat(inv.code));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    };
    /**
     * @INFO
     * The Euqalizer Settings
     */


    client.defaultEQ = [{
      band: 0,
      gain: 0.25
    }, {
      band: 1,
      gain: 0.025
    }, {
      band: 2,
      gain: 0.0125
    }, {
      band: 3,
      gain: 0
    }, {
      band: 4,
      gain: 0
    }, {
      band: 5,
      gain: -0.0125
    }, {
      band: 6,
      gain: -0.025
    }, {
      band: 7,
      gain: -0.0175
    }, {
      band: 8,
      gain: 0
    }, {
      band: 9,
      gain: 0
    }, {
      band: 10,
      gain: 0.0125
    }, {
      band: 11,
      gain: 0.025
    }, {
      band: 12,
      gain: 0.25
    }, {
      band: 13,
      gain: 0.125
    }, {
      band: 14,
      gain: 0.125
    }];
    client.bassboost = {
      none: client.defaultEQ,
      low: [{
        band: 0,
        gain: 0.0625
      }, {
        band: 1,
        gain: 0.125
      }, {
        band: 2,
        gain: -0.125
      }, {
        band: 3,
        gain: -0.0625
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: -0.0125
      }, {
        band: 6,
        gain: -0.025
      }, {
        band: 7,
        gain: -0.0175
      }, {
        band: 8,
        gain: 0
      }, {
        band: 9,
        gain: 0
      }, {
        band: 10,
        gain: 0.0125
      }, {
        band: 11,
        gain: 0.025
      }, {
        band: 12,
        gain: 0.375
      }, {
        band: 13,
        gain: 0.125
      }, {
        band: 14,
        gain: 0.125
      }],
      medium: [{
        band: 0,
        gain: 0.125
      }, {
        band: 1,
        gain: 0.25
      }, {
        band: 2,
        gain: -0.25
      }, {
        band: 3,
        gain: -0.125
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: -0.0125
      }, {
        band: 6,
        gain: -0.025
      }, {
        band: 7,
        gain: -0.0175
      }, {
        band: 8,
        gain: 0
      }, {
        band: 9,
        gain: 0
      }, {
        band: 10,
        gain: 0.0125
      }, {
        band: 11,
        gain: 0.025
      }, {
        band: 12,
        gain: 0.375
      }, {
        band: 13,
        gain: 0.125
      }, {
        band: 14,
        gain: 0.125
      }],
      high: [{
        band: 0,
        gain: 0.1875
      }, {
        band: 1,
        gain: 0.375
      }, {
        band: 2,
        gain: -0.375
      }, {
        band: 3,
        gain: -0.1875
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: -0.0125
      }, {
        band: 6,
        gain: -0.025
      }, {
        band: 7,
        gain: -0.0175
      }, {
        band: 8,
        gain: 0
      }, {
        band: 9,
        gain: 0
      }, {
        band: 10,
        gain: 0.0125
      }, {
        band: 11,
        gain: 0.025
      }, {
        band: 12,
        gain: 0.375
      }, {
        band: 13,
        gain: 0.125
      }, {
        band: 14,
        gain: 0.125
      }],
      earrape: [{
        band: 0,
        gain: 0.25
      }, {
        band: 1,
        gain: 0.5
      }, {
        band: 2,
        gain: -0.5
      }, {
        band: 3,
        gain: -0.25
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: -0.0125
      }, {
        band: 6,
        gain: -0.025
      }, {
        band: 7,
        gain: -0.0175
      }, {
        band: 8,
        gain: 0
      }, {
        band: 9,
        gain: 0
      }, {
        band: 10,
        gain: 0.0125
      }, {
        band: 11,
        gain: 0.025
      }, {
        band: 12,
        gain: 0.375
      }, {
        band: 13,
        gain: 0.125
      }, {
        band: 14,
        gain: 0.125
      }]
    };
    client.eqs = {
      music: client.defaultEQ,
      pop: [{
        band: 0,
        gain: -0.200
      }, {
        band: 1,
        gain: -0.100
      }, {
        band: 2,
        gain: 0
      }, {
        band: 3,
        gain: 0.100
      }, {
        band: 4,
        gain: 0.150
      }, {
        band: 5,
        gain: 0.250
      }, {
        band: 6,
        gain: 0.300
      }, {
        band: 7,
        gain: 0.350
      }, {
        band: 8,
        gain: 0.300
      }, {
        band: 9,
        gain: 0.250
      }, {
        band: 10,
        gain: 0.150
      }, {
        band: 11,
        gain: 0.100
      }, {
        band: 12,
        gain: 0
      }, {
        band: 13,
        gain: -0.100
      }, {
        band: 14,
        gain: -0.200
      }],
      electronic: [{
        band: 0,
        gain: 0.375
      }, {
        band: 1,
        gain: 0.350
      }, {
        band: 2,
        gain: 0.125
      }, {
        band: 3,
        gain: 0
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: -0.125
      }, {
        band: 6,
        gain: -0.125
      }, {
        band: 7,
        gain: 0
      }, {
        band: 8,
        gain: 0.25
      }, {
        band: 9,
        gain: 0.125
      }, {
        band: 10,
        gain: 0.15
      }, {
        band: 11,
        gain: 0.2
      }, {
        band: 12,
        gain: 0.250
      }, {
        band: 13,
        gain: 0.350
      }, {
        band: 14,
        gain: 0.400
      }],
      classical: [{
        band: 0,
        gain: 0.375
      }, {
        band: 1,
        gain: 0.350
      }, {
        band: 2,
        gain: 0.125
      }, {
        band: 3,
        gain: 0
      }, {
        band: 4,
        gain: 0
      }, {
        band: 5,
        gain: 0.125
      }, {
        band: 6,
        gain: 0.550
      }, {
        band: 7,
        gain: 0.050
      }, {
        band: 8,
        gain: 0.125
      }, {
        band: 9,
        gain: 0.250
      }, {
        band: 10,
        gain: 0.200
      }, {
        band: 11,
        gain: 0.250
      }, {
        band: 12,
        gain: 0.300
      }, {
        band: 13,
        gain: 0.250
      }, {
        band: 14,
        gain: 0.300
      }],
      rock: [{
        band: 0,
        gain: 0.300
      }, {
        band: 1,
        gain: 0.250
      }, {
        band: 2,
        gain: 0.200
      }, {
        band: 3,
        gain: 0.100
      }, {
        band: 4,
        gain: 0.050
      }, {
        band: 5,
        gain: -0.050
      }, {
        band: 6,
        gain: -0.150
      }, {
        band: 7,
        gain: -0.200
      }, {
        band: 8,
        gain: -0.100
      }, {
        band: 9,
        gain: -0.050
      }, {
        band: 10,
        gain: 0.050
      }, {
        band: 11,
        gain: 0.100
      }, {
        band: 12,
        gain: 0.200
      }, {
        band: 13,
        gain: 0.250
      }, {
        band: 14,
        gain: 0.300
      }],
      full: [{
        band: 0,
        gain: 0.25 + 0.375
      }, {
        band: 1,
        gain: 0.25 + 0.025
      }, {
        band: 2,
        gain: 0.25 + 0.0125
      }, {
        band: 3,
        gain: 0.25 + 0
      }, {
        band: 4,
        gain: 0.25 + 0
      }, {
        band: 5,
        gain: 0.25 + -0.0125
      }, {
        band: 6,
        gain: 0.25 + -0.025
      }, {
        band: 7,
        gain: 0.25 + -0.0175
      }, {
        band: 8,
        gain: 0.25 + 0
      }, {
        band: 9,
        gain: 0.25 + 0
      }, {
        band: 10,
        gain: 0.25 + 0.0125
      }, {
        band: 11,
        gain: 0.25 + 0.025
      }, {
        band: 12,
        gain: 0.25 + 0.375
      }, {
        band: 13,
        gain: 0.25 + 0.125
      }, {
        band: 14,
        gain: 0.25 + 0.125
      }],
      gaming: [{
        band: 0,
        gain: 0.350
      }, {
        band: 1,
        gain: 0.300
      }, {
        band: 2,
        gain: 0.250
      }, {
        band: 3,
        gain: 0.200
      }, {
        band: 4,
        gain: 0.150
      }, {
        band: 5,
        gain: 0.100
      }, {
        band: 6,
        gain: 0.050
      }, {
        band: 7,
        gain: -0.0
      }, {
        band: 8,
        gain: -0.050
      }, {
        band: 9,
        gain: -0.100
      }, {
        band: 10,
        gain: -0.150
      }, {
        band: 11,
        gain: -0.200
      }, {
        band: 12,
        gain: -0.250
      }, {
        band: 13,
        gain: -0.300
      }, {
        band: 14,
        gain: -0.350
      }],
      bassboost: client.bassboost.medium,
      earrape: client.bassboost.earrape
    };
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
};