"use strict";

var _require = require("erela.js"),
    Manager = _require.Manager,
    _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed,
    ms = require("ms"),
    config = require("../.config.json"),
    emoji = require("../../base-system/emoji.json"),
    ee = require("../../base-system/embed.json"),
    _require3 = require("../../handlers/functions"),
    databasing = _require3.databasing;

module.exports = function (client) {
  client.once("ready", function () {
    client.manager.init(client.user.id);
  });
  client.on("raw", function (d) {
    return client.manager.updateVoiceState(d);
  }); //Log if a Channel gets deleted, and the Bot was in, then delete the player if the player exists!

  client.on("channelDelete", function _callee(channel) {
    var player;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(channel.type === "voice")) {
              _context.next = 7;
              break;
            }

            if (!channel.members.has(client.user.id)) {
              _context.next = 7;
              break;
            }

            player = client.manager.players.get(channel.guild.id);

            if (player) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            if (channel.id === player.voiceChannel) {
              //destroy
              player.destroy();
            }

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }); //If the Bot gets Remove from the Guild and there is still a player, remove it ;)

  client.on("guildRemove", function _callee2(guild) {
    var player;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            player = client.manager.players.get(guild.id);

            if (player) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            if (guild.id == player.guild) {
              //destroy
              player.destroy();
            }

            _context2.next = 9;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
  client.on("voiceStateUpdate", function _callee4(oldState, newState) {
    var player;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(oldState.channelID && !newState.channelID)) {
              _context4.next = 11;
              break;
            }

            _context4.prev = 1;

            if (!(oldState.member.user.id === client.user.id)) {
              _context4.next = 7;
              break;
            }

            player = client.manager.players.get(oldState.guild.id);

            if (player) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return");

          case 6:
            //destroy
            player.destroy();

          case 7:
            _context4.next = 11;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);

          case 11:
            player = client.manager.players.get(newState.guild.id);

            if (player) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return");

          case 14:
            databasing(client, player.guild, player.get("playerauthor"));

            if (!(config.settings.leaveOnEmpty_Channel.enabled && oldState && oldState.channel)) {
              _context4.next = 20;
              break;
            }

            player = client.manager.players.get(oldState.guild.id); //if not connect return player.destroy()

            if (oldState.guild.me.voice.channel) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", player.destroy());

          case 19:
            //wait some time...
            if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
              setTimeout(function _callee3() {
                var vc, embed;
                return regeneratorRuntime.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        player = client.manager.players.get(oldState.guild.id); //if not connect return player.destroy()

                        if (!(!oldState.guild.me.voice.channel && player)) {
                          _context3.next = 4;
                          break;
                        }

                        return _context3.abrupt("return", player.destroy());

                      case 4:
                        //wait some time...
                        vc = oldState.guild.channels.cache.get(player.voiceChannel);

                        if (!(player && vc && vc.members.size === 1)) {
                          _context3.next = 12;
                          break;
                        }

                        embed = new MessageEmbed().setTitle("".concat(emoji.msg.ERROR, " Queue has ended | Channel Empty")).setDescription("I left the Channel: ".concat(client.channels.cache.get(player.voiceChannel).name, " because the Channel was empty for: ").concat(ms(config.settings.leaveOnEmpty_Channel.time_delay, {
                          "long": true
                        }))).setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon); //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER

                        if (!(player.get("afk-".concat(player.get("playerauthor"))) || player.get("afk-".concat(player.guild)))) {
                          _context3.next = 9;
                          break;
                        }

                        return _context3.abrupt("return", client.channels.cache.get(player.textChannel).send(embed.setDescription("I will not Leave the Channel, cause afk is \u2714\uFE0F Enabled")).then(function (msg) {
                          try {
                            msg["delete"]({
                              timeout: 4000
                            })["catch"](function (e) {
                              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                            });
                          } catch (_unused4) {
                            /* */
                          }
                        }));

                      case 9:
                        client.channels.cache.get(player.textChannel).send(embed).then(function (msg) {
                          try {
                            msg["delete"]({
                              timeout: 4000
                            })["catch"](function (e) {
                              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                            });
                          } catch (_unused5) {
                            /* */
                          }
                        });

                        try {
                          client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(function (msg) {
                            try {
                              msg["delete"]({
                                timeout: 4000
                              })["catch"](function (e) {
                                return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                              });
                            } catch (_unused6) {
                              /* */
                            }
                          });
                        } catch (e) {
                          console.log(String(e.stack).yellow);
                        }

                        player.destroy();

                      case 12:
                        _context3.next = 17;
                        break;

                      case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3["catch"](0);
                        console.log(String(_context3.t0.stack).yellow);

                      case 17:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, null, [[0, 14]]);
              }, config.settings.leaveOnEmpty_Channel.time_delay);
            }

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 9]]);
  });
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */