"use strict";

var _require = require("fs"),
    readdirSync = _require.readdirSync;

var ascii = require("ascii-table");

var table = new ascii("");
table.setHeading("Command", "Load status");
console.log("Welcome to SERVICE HANDLER /--/ By https://Limsathya /--/ Discord: XG#2846".yellow);

module.exports = function (client) {
  try {
    readdirSync("./commands/").forEach(function (dir) {
      var commands = readdirSync("./commands/".concat(dir, "/")).filter(function (file) {
        return file.endsWith(".js");
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          var pull = require("../commands/".concat(dir, "/").concat(file));

          if (pull.name) {
            client.commands.set(pull.name, pull);
            table.addRow(file, "Ready");
          } else {
            table.addRow(file, "error -> missing a help.name,or help.name is not a string.");
            return "continue";
          }

          if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(function (alias) {
            return client.aliases.set(alias, pull.name);
          });
        };

        for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if (_ret === "continue") continue;
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
    }); //console.log(table.toString().cyan);
  } catch (e) {
    console.log(String(e.stack).bgRed);
  } // Requires Manager from discord-giveaways


  var _require2 = require('discord-giveaways'),
      GiveawaysManager = _require2.GiveawaysManager; // Starts updating currents giveaways


  var manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    "default": {
      botsCanWin: false,
      exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
      embedColor: require("../base-system/embed.json").color,
      reaction: '🎉',
      messages: {
        giveaway: '🎉 **GIVEAWAY** 🎉',
        giveawayEnded: '🎉 **GIVEAWAY ENDED** 🎉',
        timeRemaining: 'Time remaining: **{duration}**!',
        inviteToParticipate: 'React with 🎉 to participate!',
        winMessage: 'Congratulations, {winners}!\n\n> You won **{prize}**!\n\n{messageURL}',
        embedFooter: 'Giveaway',
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: 'Hosted by: {user}',
        winners: 'Winner(s)',
        endedAt: 'Ended at',
        units: {
          seconds: 'Seconds',
          minutes: 'Minutes',
          hours: 'Hours',
          days: 'Days',
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2

        }
      }
    }
  }); // We now have a giveawaysManager property to access the manager everywhere!

  client.giveawaysManager = manager;
};