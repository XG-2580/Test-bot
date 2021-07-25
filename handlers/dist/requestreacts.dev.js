"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var _require2 = require("../handlers/functions"),
    format = _require2.format,
    databasing = _require2.databasing,
    escapeRegex = _require2.escapeRegex,
    autoplay = _require2.autoplay,
    createBar = _require2.createBar;

var playermanager = require("../handlers/playermanager");

var hasmap = new Map();

module.exports = function _callee21(client, message) {
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          try {
            client.on("messageReactionAdd", function _callee20(reaction, user) {
              var _message, es, db, member, channel, player, rewind, forward, type, channelmembersize, voteamount, volumedown, volumeup, volumemute, embed, tracks, quelist, _loop, i, limit, _i;

              return regeneratorRuntime.async(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      _context20.prev = 0;

                      if (!reaction.message.channel.partial) {
                        _context20.next = 4;
                        break;
                      }

                      _context20.next = 4;
                      return regeneratorRuntime.awrap(reaction.message.channel.fetch());

                    case 4:
                      if (!reaction.message.partial) {
                        _context20.next = 7;
                        break;
                      }

                      _context20.next = 7;
                      return regeneratorRuntime.awrap(reaction.message.fetch());

                    case 7:
                      if (!reaction.partial) {
                        _context20.next = 10;
                        break;
                      }

                      _context20.next = 10;
                      return regeneratorRuntime.awrap(reaction.fetch());

                    case 10:
                      if (!user.bot) {
                        _context20.next = 12;
                        break;
                      }

                      return _context20.abrupt("return");

                    case 12:
                      if (reaction.message.guild) {
                        _context20.next = 14;
                        break;
                      }

                      return _context20.abrupt("return");

                    case 14:
                      //get the message object out of the reaction
                      _message = reaction.message;
                      es = client.settings.get(_message.guild.id, "embed"); //get the database information

                      db = client.setups.get(_message.guild.id); //if its not in the setup channel return

                      if (!(_message.channel != db.textchannel)) {
                        _context20.next = 19;
                        break;
                      }

                      return _context20.abrupt("return");

                    case 19:
                      //removing the reaction of the User
                      try {
                        reaction.users.remove(user.id)["catch"](function (e) {
                          return console.log(String(e.stack).yellow);
                        });
                      } catch (_unused) {}
                      /* */
                      //get the member who makes the reaction


                      member = _message.guild.members.cache.get(user.id); //getting the Voice Channel Data of the Message Member

                      channel = member.voice.channel; //if not in a Voice Channel return!

                      if (channel) {
                        _context20.next = 24;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to join a voice channel.")));

                    case 24:
                      //get the lavalink erela.js player information
                      player = client.manager.players.get(_message.guild.id); //if no player available return error | aka not playing anything

                      if (player) {
                        _context20.next = 27;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("There is nothing playing")));

                    case 27:
                      if (!(player && channel.id !== player.voiceChannel)) {
                        _context20.next = 29;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am already playing somewhere else!").setDescription("You can listen to me in: `".concat(_message.guild.channels.cache.get(player.VoiceChannel).name, "`"))));

                    case 29:
                      if (!(channel.id !== db.voicechannel)) {
                        _context20.next = 31;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to be in the: `".concat(_message.guild.channels.cache.get(db.voicechannel).name, "` VoiceChannel"))));

                    case 31:
                      _context20.t0 = reaction.emoji.name;
                      _context20.next = _context20.t0 === "⏪" ? 34 : _context20.t0 === "⏩" ? 39 : _context20.t0 === "⏯" ? 44 : _context20.t0 === "⏹" ? 47 : _context20.t0 === "⏮" ? 50 : _context20.t0 === "⏭" ? 57 : _context20.t0 === "🔃" ? 86 : _context20.t0 === "🔉" ? 89 : _context20.t0 === "🔊" ? 94 : _context20.t0 === "🔇" ? 99 : _context20.t0 === "🔁" ? 103 : _context20.t0 === "♾" ? 105 : _context20.t0 === "🔀" ? 108 : _context20.t0 === "📑" ? 111 : _context20.t0 === "🩸" ? 132 : 134;
                      break;

                    case 34:
                      //get the rewind
                      rewind = player.position - 20 * 1000; //if the rewind is too big or too small set it to 0

                      if (rewind >= player.queue.current.duration - player.position || rewind < 0) {
                        rewind = 0;
                      } //seek to the position after the rewind


                      player.seek(Number(rewind)); //send an information message

                      _message.channel.send(new MessageEmbed().setTitle("\u23EA Rewinded the song for: `20 Seconds`, to: ".concat(format(Number(player.position)))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee(msg) {
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context.next = 8;
                                break;

                              case 6:
                                _context.prev = 6;
                                _context.t0 = _context["catch"](0);

                              case 8:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 39:
                      //gets the forward time
                      forward = Number(player.position) + 20 * 1000; //if the forward is too big set it 1 second less

                      if (Number(forward) >= player.queue.current.duration) {
                        forward = player.queue.current.duration - 1000;
                      } //seek to the amount of time after the forwards


                      player.seek(Number(forward)); //send an information message

                      _message.channel.send(new MessageEmbed().setTitle("\u23E9 Forwarded the Song for: `20 Seconds`, to: ".concat(format(Number(player.position)))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee2(msg) {
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context2.next = 8;
                                break;

                              case 6:
                                _context2.prev = 6;
                                _context2.t0 = _context2["catch"](0);

                              case 8:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 44:
                      //pause the player / resume it
                      player.pause(player.playing); //send information message

                      _message.channel.send(new MessageEmbed().setTitle("".concat(player.playing ? "▶️ Resumed" : "⏸ Paused", " the Player.")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee3(msg) {
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context3.next = 8;
                                break;

                              case 6:
                                _context3.prev = 6;
                                _context3.t0 = _context3["catch"](0);

                              case 8:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 47:
                      //leave and stop the music
                      player.destroy(); //send information message

                      _message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your channel").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee4(msg) {
                        return regeneratorRuntime.async(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context4.next = 8;
                                break;

                              case 6:
                                _context4.prev = 6;
                                _context4.t0 = _context4["catch"](0);

                              case 8:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 50:
                      if (!(!player.queue.previous || player.queue.previous === null)) {
                        _context20.next = 52;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is no previous song yet!")).then(function _callee5(msg) {
                        return regeneratorRuntime.async(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context5.next = 8;
                                break;

                              case 6:
                                _context5.prev = 6;
                                _context5.t0 = _context5["catch"](0);

                              case 8:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      }));

                    case 52:
                      _message.channel.send(new MessageEmbed().setTitle("⏮ Playing Previous Track").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee6(msg) {
                        return regeneratorRuntime.async(function _callee6$(_context6) {
                          while (1) {
                            switch (_context6.prev = _context6.next) {
                              case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context6.next = 8;
                                break;

                              case 6:
                                _context6.prev = 6;
                                _context6.t0 = _context6["catch"](0);

                              case 8:
                              case "end":
                                return _context6.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      }); //define the type


                      type = "skiptrack:youtube"; //if the previous was from soundcloud, then use type soundcloud

                      if (player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"; //plays it

                      playermanager(client, _message, Array(player.queue.previous.uri), type);
                      return _context20.abrupt("break", 134);

                    case 57:
                      if (!(client.settings.get(_message.guild.id, "djroles").toString() !== "")) {
                        _context20.next = 78;
                        break;
                      }

                      channelmembersize = channel.members.size;
                      voteamount = 0;
                      if (channelmembersize <= 3) voteamount = 1;
                      voteamount = Math.ceil(channelmembersize / 3);

                      if (player.get("vote-".concat(_message.author.id))) {
                        _context20.next = 73;
                        break;
                      }

                      player.set("vote-".concat(_message.author.id), true);
                      player.set("votes", String(Number(player.get("votes")) + 1));

                      if (!(voteamount <= Number(player.get("votes")))) {
                        _context20.next = 70;
                        break;
                      }

                      _message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes\n\n> Amount reached! Skipping \u23ED")));

                      if (player.queue.size == 0) {
                        player.destroy();
                      } else {
                        player.stop();
                      }

                      _context20.next = 71;
                      break;

                    case 70:
                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

                    case 71:
                      _context20.next = 76;
                      break;

                    case 73:
                      player.set("vote-".concat(_message.author.id), false);
                      player.set("votes", String(Number(player.get("votes")) - 1));
                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed your Vote!").setDescription("There are now: `".concat(player.get("votes"), "` of `").concat(voteamount, "` needed Votes"))));

                    case 76:
                      _context20.next = 85;
                      break;

                    case 78:
                      if (!(player.queue.size == 0)) {
                        _context20.next = 83;
                        break;
                      }

                      if (!player.get("autoplay")) {
                        _context20.next = 81;
                        break;
                      }

                      return _context20.abrupt("return", autoplay(client, player, "skip"));

                    case 81:
                      //stop playing
                      player.destroy(); //send success message

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your Channel").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 83:
                      //skip the track
                      player.stop(); //send success message

                      return _context20.abrupt("return", _message.channel.send(new MessageEmbed().setTitle("⏭ Skipped to the next Song").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 85:
                      return _context20.abrupt("break", 134);

                    case 86:
                      //seek to 0
                      player.seek(0); //send an information message

                      _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD03 Replaying Current Track").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee7(msg) {
                        return regeneratorRuntime.async(function _callee7$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                _context7.prev = 0;
                                _context7.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context7.next = 8;
                                break;

                              case 6:
                                _context7.prev = 6;
                                _context7.t0 = _context7["catch"](0);

                              case 8:
                              case "end":
                                return _context7.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 89:
                      //get the volume
                      volumedown = player.volume - 10; //if its too small set it to 0

                      if (volumedown < 0) volumedown = 0; //set the palyer volume to the volume

                      player.setVolume(volumedown); //send an informational message

                      _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD0A Volume set to: **`".concat(player.volume, " %`**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee8(msg) {
                        return regeneratorRuntime.async(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                _context8.prev = 0;
                                _context8.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context8.next = 8;
                                break;

                              case 6:
                                _context8.prev = 6;
                                _context8.t0 = _context8["catch"](0);

                              case 8:
                              case "end":
                                return _context8.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 94:
                      //get the volume
                      volumeup = player.volume + 10; //if its too small set it to 0

                      if (volumeup > 150) volumeup = 0; //set the palyer volume to the volume

                      player.setVolume(volumeup); //send an informational message

                      _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD0A Volume set to: **`".concat(player.volume, " %`**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee9(msg) {
                        return regeneratorRuntime.async(function _callee9$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                _context9.prev = 0;
                                _context9.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context9.next = 8;
                                break;

                              case 6:
                                _context9.prev = 6;
                                _context9.t0 = _context9["catch"](0);

                              case 8:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 99:
                      //get the volume
                      volumemute = player.volume === 0 ? 50 : 0; //set the palyer volume to the volume

                      player.setVolume(volumemute); //send an informational message

                      _message.channel.send(new MessageEmbed().setTitle("".concat(player.volume === 0 ? "\uD83D\uDD07 Muted the Player" : "\uD83D\uDD09 Unmuted the Player")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee10(msg) {
                        return regeneratorRuntime.async(function _callee10$(_context10) {
                          while (1) {
                            switch (_context10.prev = _context10.next) {
                              case 0:
                                _context10.prev = 0;
                                _context10.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context10.next = 8;
                                break;

                              case 6:
                                _context10.prev = 6;
                                _context10.t0 = _context10["catch"](0);

                              case 8:
                              case "end":
                                return _context10.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 103:
                      //if both repeat modes are off
                      if (!player.trackRepeat && !hasmap.get(_message.guild.id)) {
                        hasmap.set(_message.guild.id, 1); //and queue repeat mode to off

                        player.setQueueRepeat(!player.queueRepeat); //set track repeat mode to on

                        player.setTrackRepeat(!player.trackRepeat); //Send an informational message

                        _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD00 Track Loop is now ".concat(player.trackRepeat ? "active" : "disabled", ".")).setDescription("And Queue Loop is now ".concat(player.queueRepeat ? "active" : "disabled", ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee11(msg) {
                          return regeneratorRuntime.async(function _callee11$(_context11) {
                            while (1) {
                              switch (_context11.prev = _context11.next) {
                                case 0:
                                  _context11.prev = 0;
                                  _context11.next = 3;
                                  return regeneratorRuntime.awrap(delay(4000));

                                case 3:
                                  if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                  _context11.next = 8;
                                  break;

                                case 6:
                                  _context11.prev = 6;
                                  _context11.t0 = _context11["catch"](0);

                                case 8:
                                case "end":
                                  return _context11.stop();
                              }
                            }
                          }, null, null, [[0, 6]]);
                        });
                      } //if track repeat mode is on and queue repeat mode off
                      else if (player.trackRepeat && hasmap.get(_message.guild.id) === 1) {
                          hasmap.set(_message.guild.id, 2); //set track repeat mode off

                          player.setTrackRepeat(!player.trackRepeat); //set queue repeat mode on

                          player.setQueueRepeat(!player.queueRepeat);

                          _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD00 Queue Loop is now ".concat(player.queueRepeat ? "active" : "disabled", ".")).setDescription("And Track Loop is now ".concat(player.trackRepeat ? "active" : "disabled", ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee12(msg) {
                            return regeneratorRuntime.async(function _callee12$(_context12) {
                              while (1) {
                                switch (_context12.prev = _context12.next) {
                                  case 0:
                                    _context12.prev = 0;
                                    _context12.next = 3;
                                    return regeneratorRuntime.awrap(delay(4000));

                                  case 3:
                                    if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                    _context12.next = 8;
                                    break;

                                  case 6:
                                    _context12.prev = 6;
                                    _context12.t0 = _context12["catch"](0);

                                  case 8:
                                  case "end":
                                    return _context12.stop();
                                }
                              }
                            }, null, null, [[0, 6]]);
                          });
                        } //otherwise like queue on and track should be off...
                        else {
                            hasmap["delete"](_message.guild.id); //set track repeat mode off

                            player.setTrackRepeat(false); //set queue repeat mode off

                            player.setQueueRepeat(false);

                            _message.channel.send(new MessageEmbed().setTitle("\uD83D\uDD00 Queue Loop is now ".concat(player.queueRepeat ? "active" : "disabled", ".")).setDescription("And Track Loop is now ".concat(player.trackRepeat ? "active" : "disabled", ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee13(msg) {
                              return regeneratorRuntime.async(function _callee13$(_context13) {
                                while (1) {
                                  switch (_context13.prev = _context13.next) {
                                    case 0:
                                      _context13.prev = 0;
                                      _context13.next = 3;
                                      return regeneratorRuntime.awrap(delay(4000));

                                    case 3:
                                      if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                      _context13.next = 8;
                                      break;

                                    case 6:
                                      _context13.prev = 6;
                                      _context13.t0 = _context13["catch"](0);

                                    case 8:
                                    case "end":
                                      return _context13.stop();
                                  }
                                }
                              }, null, null, [[0, 6]]);
                            });
                          }

                      return _context20.abrupt("break", 134);

                    case 105:
                      //toggle autoplay
                      player.set("autoplay", !player.get("autoplay")); //Send Success Message

                      _message.channel.send(new MessageEmbed().setTitle("".concat(player.get("autoplay") ? "`\u2714\uFE0F Enabled`" : "`\u274C Disabled`", " Autoplay")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee14(msg) {
                        return regeneratorRuntime.async(function _callee14$(_context14) {
                          while (1) {
                            switch (_context14.prev = _context14.next) {
                              case 0:
                                _context14.prev = 0;
                                _context14.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context14.next = 8;
                                break;

                              case 6:
                                _context14.prev = 6;
                                _context14.t0 = _context14["catch"](0);

                              case 8:
                              case "end":
                                return _context14.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 108:
                      //shuffle the Queue
                      player.queue.shuffle();

                      _message.channel.send(new MessageEmbed().setTitle("🔀 The queue is now shuffled.").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee15(msg) {
                        return regeneratorRuntime.async(function _callee15$(_context15) {
                          while (1) {
                            switch (_context15.prev = _context15.next) {
                              case 0:
                                _context15.prev = 0;
                                _context15.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context15.next = 8;
                                break;

                              case 6:
                                _context15.prev = 6;
                                _context15.t0 = _context15["catch"](0);

                              case 8:
                              case "end":
                                return _context15.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 111:
                      //define the Embed
                      embed = new MessageEmbed().setAuthor("Queue for ".concat(_message.guild.name, "  -  [ ").concat(player.queue.length, " Tracks ]"), _message.guild.iconURL({
                        dynamic: true
                      })).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null); //if there is something playing rn, then add it to the embed

                      if (player.queue.current) embed.addField("**0) CURRENT TRACK**", "[".concat(player.queue.current.title.substr(0, 35), "](").concat(player.queue.current.uri, ") - `").concat(player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0], "` - request by: **").concat(player.queue.current.requester.tag, "**")); //get the right tracks of the current tracks

                      tracks = player.queue; //if there are no other tracks, information

                      if (tracks.length) {
                        _context20.next = 116;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(embed.setDescription("\u274C No tracks in the queue")).then(function _callee16(msg) {
                        return regeneratorRuntime.async(function _callee16$(_context16) {
                          while (1) {
                            switch (_context16.prev = _context16.next) {
                              case 0:
                                _context16.prev = 0;
                                _context16.next = 3;
                                return regeneratorRuntime.awrap(delay(5000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context16.next = 8;
                                break;

                              case 6:
                                _context16.prev = 6;
                                _context16.t0 = _context16["catch"](0);

                              case 8:
                              case "end":
                                return _context16.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      }));

                    case 116:
                      if (!(tracks.length < 15)) {
                        _context20.next = 118;
                        break;
                      }

                      return _context20.abrupt("return", _message.channel.send(embed.setDescription(tracks.map(function (track, i) {
                        return "**".concat(++i, ")** [").concat(track.title.substr(0, 35), "](").concat(track.uri, ") - `").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], "` - **requested by: ").concat(track.requester.tag, "**");
                      }).join("\n"))).then(function _callee17(msg) {
                        return regeneratorRuntime.async(function _callee17$(_context17) {
                          while (1) {
                            switch (_context17.prev = _context17.next) {
                              case 0:
                                _context17.prev = 0;
                                _context17.next = 3;
                                return regeneratorRuntime.awrap(delay(5000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context17.next = 8;
                                break;

                              case 6:
                                _context17.prev = 6;
                                _context17.t0 = _context17["catch"](0);

                              case 8:
                              case "end":
                                return _context17.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      }));

                    case 118:
                      //get an array of quelist where 15 tracks is one index in the array
                      quelist = [];

                      _loop = function _loop(i) {
                        var songs = tracks.slice(i, i + 15);
                        quelist.push(songs.map(function (track, index) {
                          return "**".concat(i + ++index, ")** [").concat(track.title.split("[").join("{").split("]").join("}").substr(0, 35), "](").concat(track.uri, ") - `").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], "` - **requested by: ").concat(track.requester.tag, "**");
                        }).join("\n"));
                      };

                      for (i = 0; i < tracks.length; i += 15) {
                        _loop(i);
                      }

                      limit = quelist.length <= 5 ? quelist.length : 5;
                      _i = 0;

                    case 123:
                      if (!(_i < limit)) {
                        _context20.next = 129;
                        break;
                      }

                      _context20.next = 126;
                      return regeneratorRuntime.awrap(user.send(embed.setDescription(String(quelist[_i]).substr(0, 2048))));

                    case 126:
                      _i++;
                      _context20.next = 123;
                      break;

                    case 129:
                      user.send(new MessageEmbed().setDescription("\u2705 Sent from <#".concat(_message.channel.id, ">").concat(quelist.length <= 5 ? "" : "\nNote: Send 5 Embeds, but there would be more...")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));

                      _message.channel.send(new MessageEmbed().setTitle("\u2705 Check your `direct messages` to see the Queue").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function _callee18(msg) {
                        return regeneratorRuntime.async(function _callee18$(_context18) {
                          while (1) {
                            switch (_context18.prev = _context18.next) {
                              case 0:
                                _context18.prev = 0;
                                _context18.next = 3;
                                return regeneratorRuntime.awrap(delay(4000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context18.next = 8;
                                break;

                              case 6:
                                _context18.prev = 6;
                                _context18.t0 = _context18["catch"](0);

                              case 8:
                              case "end":
                                return _context18.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 132:
                      //Send Now playing Message
                      _message.channel.send(new MessageEmbed().setAuthor("Current song playing:", _message.author.displayAvatarURL({
                        dynamic: true
                      })).setThumbnail(player.queue.current.displayThumbnail(1)).setURL(player.queue.current.uri).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(player.playing ? "▶" : "⏸", " **").concat(player.queue.current.title, "**")).addField("⌛️ Duration: ", "`" + format(player.queue.current.duration) + "`", true).addField("💯 Song By: ", "`" + player.queue.current.author + "`", true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).addField("⏳ Progress: ", createBar(player)).setFooter("Requested by: ".concat(player.queue.current.requester.tag), player.queue.current.requester.displayAvatarURL({
                        dynamic: true
                      }))).then(function _callee19(msg) {
                        return regeneratorRuntime.async(function _callee19$(_context19) {
                          while (1) {
                            switch (_context19.prev = _context19.next) {
                              case 0:
                                _context19.prev = 0;
                                _context19.next = 3;
                                return regeneratorRuntime.awrap(delay(5000));

                              case 3:
                                if (msg && _message.channel.messages.cache.get(msg.id)) msg["delete"]();
                                _context19.next = 8;
                                break;

                              case 6:
                                _context19.prev = 6;
                                _context19.t0 = _context19["catch"](0);

                              case 8:
                              case "end":
                                return _context19.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                      return _context20.abrupt("break", 134);

                    case 134:
                      _context20.next = 139;
                      break;

                    case 136:
                      _context20.prev = 136;
                      _context20.t1 = _context20["catch"](0);
                      console.log(String(_context20.t1.stack).yellow);
                      /* */

                    case 139:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, null, null, [[0, 136]]);
            });
          } catch (e) {
            console.log(String(e.stack).bgRed);
          }

        case 1:
        case "end":
          return _context21.stop();
      }
    }
  });
};