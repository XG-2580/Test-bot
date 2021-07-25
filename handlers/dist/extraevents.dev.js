"use strict";

var config = require(".config.json");

module.exports = function (client) {
  process.on('unhandledRejection', function (reason, p) {//console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase());
    //console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    //console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase());
  });
  process.on("uncaughtException", function (err, origin) {//console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase());
    //console.log('Exception: ', err.stack ? err.stack : err)
    //console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase());
  });
  process.on('uncaughtExceptionMonitor', function (err, origin) {//console.log('=== uncaught Exception Monitor ==='.toUpperCase());
  });
  process.on('beforeExit', function (code) {//console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase());
    //console.log('Code: ', code);
    //console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase());
  });
  process.on('exit', function (code) {//console.log('\n\n\n\n\n=== exit ==='.toUpperCase());
    //console.log('Code: ', code);
    //console.log('=== exit ===\n\n\n\n\n'.toUpperCase());
  });
  process.on('multipleResolves', function (type, promise, reason) {//console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase());
    //console.log(type, promise, reason);
    //console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase());
  });
  client.on("message", function (message) {
    if (message.guild && message.author.id == client.user.id) {
      if (message.channel.type == "news") {
        setTimeout(function () {
          message.crosspost().then(function (msg) {
            return console.log("Message got Crossposted".green);
          })["catch"](function (e) {
            return console.log(e);
          });
        }, client.ws.ping);
      }
    }
  }); //ALWAYS SERVER DEAF THE BOT WHEN JOING

  client.on("voiceStateUpdate", function (oldState, newState) {
    try {
      //skip if not the bot
      if (client.user.id != newState.id) return;
      if (!oldState.streaming && newState.streaming || oldState.streaming && !newState.streaming || !oldState.serverDeaf && newState.serverDeaf || oldState.serverDeaf && !newState.serverDeaf || !oldState.serverMute && newState.serverMute || oldState.serverMute && !newState.serverMute || !oldState.selfDeaf && newState.selfDeaf || oldState.selfDeaf && !newState.selfDeaf || !oldState.selfMute && newState.selfMute || oldState.selfMute && !newState.selfMute || !oldState.selfVideo && newState.selfVideo || oldState.selfVideo && !newState.selfVideo) if (!oldState.channelID && newState.channelID || oldState.channelID && newState.channelID) {
        try {
          newState.setDeaf(true);
        } catch (_unused) {}

        return;
      }
    } catch (_unused2) {}
  }); //ANTI UNMUTE THING

  client.on("voiceStateUpdate", function _callee(oldState, newState) {
    var channel;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false) {
              try {
                channel = newState.member.guild.channels.cache.find(function (channel) {
                  return channel.type === "text" && (channel.name.toLowerCase().includes("cmd") || channel.name.toLowerCase().includes("command") || channel.toLowerCase().name.includes("bot")) && channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES");
                });
                channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience");
                newState.setDeaf(true);
              } catch (error) {
                try {
                  console.log("could not send info msg in a botchat");
                  channel = newState.member.guild.channels.cache.find(function (channel) {
                    return channel.type === "text" && channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES");
                  });
                  channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience");
                  newState.setDeaf(true);
                } catch (error) {
                  console.log("could not send info msg in a random chat");
                  newState.setDeaf(true);
                }
              }
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};