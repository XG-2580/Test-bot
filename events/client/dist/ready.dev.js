"use strict";

//here the event starts
var config = require("../.config.json");

module.exports = function (client) {
  //SETTING ALL GUILD DATA FOR THE DJ ONLY COMMANDS for the DEFAULT
  //client.guilds.cache.forEach(guild=>client.settings.set(guild.id, ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"], "djonlycmds"))
  try {
    try {
      var stringlength = 69;
      console.log("\n");
      console.log("     \u250F\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2513".bold.brightGreen);
      console.log("     \u2503 ".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length) + "┃".bold.brightGreen);
      console.log("     \u2503 ".bold.brightGreen + "Discord Bot is online!".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length - "Discord Bot is online!".length) + "┃".bold.brightGreen);
      console.log("     \u2503 ".bold.brightGreen + " /--/ ".concat(client.user.tag, " /--/ ").bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length - " /--/ ".concat(client.user.tag, " /--/ ").length) + "┃".bold.brightGreen);
      console.log("     \u2503 ".bold.brightGreen + " ".repeat(-1 + stringlength - " \u2503 ".length) + "┃".bold.brightGreen);
      console.log("     \u2517\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u251B".bold.brightGreen);
    } catch (_unused) {
      /* */
    }

    change_status(client); //loop through the status per each 10 minutes

    setInterval(function () {
      change_status(client);
    }, 60 * 1000);
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
};

var state = false;

function change_status(client) {
  if (!state) {
    state = !state;
    client.user.setActivity("".concat(config.status.text).replace("{prefix}", config.prefix), {
      type: config.status.type,
      url: config.status.url
    });
  } else {
    client.user.setActivity("".concat(config.status.text).replace("{prefix}", config.prefix), {
      type: config.status.type,
      url: config.status.url
    });
  }

  if (client.adenabled) {
    setTimeout(function () {
      client.user.setActivity(client.statusad);
    }, 45 * 1000);
  }
}