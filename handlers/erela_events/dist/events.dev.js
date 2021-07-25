"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    ms = require("ms"),
    config = require("../.config.json"),
    emoji = require("../../base-system/emoji.json"),
    ee = require("../../base-system/embed.json"),
    _require2 = require("../../handlers/functions"),
    createBar = _require2.createBar,
    format = _require2.format,
    databasing = _require2.databasing,
    autoplay = _require2.autoplay,
    playermanager = require("../../handlers/playermanager"),
    hasmap = new Map();

var mi;

module.exports = function (client) {
  client.manager.on("playerCreate", function _callee(player) {
    var es, embed, i;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(player.guild, "embed") || ee;
            player.set("autoplay", false);
            player.set("afk-".concat(player.guild), false);
            player.set("afk-".concat(player.get("playerauthor")), false);
            databasing(client, player.guild, player.get("playerauthor"));
            embed = new MessageEmbed();

            try {
              embed.setTitle(":thumbsup: **Joined** `".concat(client.channels.cache.get(player.voiceChannel).name, "`"));
            } catch (_unused) {}

            try {
              embed.setDescription("**Commands bound to: ** <#".concat(client.channels.cache.get(player.textChannel).id, ">"));
              embed.addField("<:Milrato:840259659163893820> Music Powered by Limsathya", "**[Invite their Public Bot](https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot)  \u2022  [WEBSITE](https://Limsathya)  \u2022  [Get your OWN BOT](https://discord.gg/FQGXbypRf8)**");
            } catch (_unused2) {}

            _context.next = 10;
            return regeneratorRuntime.awrap(client.channels.cache.get(player.textChannel).send(embed.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null))["catch"](function (e) {
              return console.log("this prevents a crash");
            }));

          case 10:
            player.setVolume(50);
            player.setEQ(client.eqs.music);
            i = 0;

          case 13:
            if (!(i <= 5)) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return regeneratorRuntime.awrap(new Promise(function (res) {
              setTimeout(function () {
                try {
                  var guild = client.guilds.cache.get(player.guild);
                  guild.me.voice.setDeaf(true)["catch"](function (e) {
                    return console.log("ignore that log".gray);
                  });
                  i = 10;
                  res(2);
                } catch (_unused3) {
                  res(2);
                }
              }, 1000);
            }));

          case 16:
            i++;
            _context.next = 13;
            break;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    });
  }).on("playerMove", function _callee2(player, oldChannel, newChannel) {
    var es, embed;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(player.guild, "embed") || ee;

            if (newChannel) {
              _context2.next = 10;
              break;
            }

            embed = new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
            embed.setTitle("".concat(emoji.msg.ERROR, " Queue has ended."));
            embed.setDescription("I left the Channel: `\uD83D\uDD08 ".concat(client.channels.cache.get(player.voiceChannel).name, "`"));
            client.channels.cache.get(player.textChannel).send(embed);

            try {
              client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(function (msg) {
                if (msg && msg.deletable) msg["delete"]({
                  timeout: 1500
                })["catch"](function (e) {
                  return console.log("Couldn't delete message this is a catch to prevent a crash".grey);
                });
              });
            } catch (e) {
              console.log(String(e.stack).yellow);
            }

            player.destroy();
            _context2.next = 14;
            break;

          case 10:
            player.voiceChannel = newChannel;

            if (!player.paused) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return");

          case 13:
            setTimeout(function () {
              player.pause(true);
              setTimeout(function () {
                return player.pause(false);
              }, client.ws.ping * 2);
            }, client.ws.ping * 2);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    });
  }).on("trackStart", function _callee4(player, track) {
    var es, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userid, embed;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            es = client.settings.get(player.guild, "embed") || ee;
            _context4.prev = 1;
            //votes for skip --> 0
            player.set("votes", "0"); //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 6;

            for (_iterator = client.guilds.cache.get(player.guild).members.cache.map(function (member) {
              return member.user.id;
            })[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              userid = _step.value;
              player.set("vote-".concat(userid), false);
            } //set the previous track just have idk where its used ^-^


            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context4.t0;

          case 14:
            _context4.prev = 14;
            _context4.prev = 15;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 17:
            _context4.prev = 17;

            if (!_didIteratorError) {
              _context4.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context4.finish(17);

          case 21:
            return _context4.finish(14);

          case 22:
            player.set("previoustrack", track); //increasing the stats of the BOT

            client.stats.inc(player.guild, "songs");
            client.stats.inc("global", "songs"); //wait 500 ms

            _context4.next = 27;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              setTimeout(function () {
                resolve(2);
              }, 500);
            }));

          case 27:
            // playANewTrack(client,player,track);
            embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
            embed.setAuthor("".concat(track.title), "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1");
            embed.setURL(track.uri);
            embed.setThumbnail("https://img.youtube.com/vi/".concat(track.identifier, "/mqdefault.jpg"));
            embed.addField("**".concat(emoji.msg.time, " Duration: **"), "`\u276F ".concat(track.isStream ? "LIVE STREAM" : format(track.duration), "`"), true);
            embed.addField("**".concat(emoji.msg.song_by, " Song By:**"), "`\u276F ".concat(track.author, "`"), true);
            embed.addField("**".concat(emoji.msg.repeat_mode, " Queue length:**"), "`\u276F ".concat(player.queue.length, " Songs`"), true);
            embed.setFooter("Requested by: ".concat(track.requester.tag), track.requester.displayAvatarURL({
              dynamic: true
            })); //if pruning is enabled --> send the msg

            if (client.settings.get(player.guild, "pruning")) client.channels.cache.get(player.textChannel).send(embed).then(function (msg) {
              //try to delete the old playingsongmsg informational track if not available / get able --> catch and dont crash
              try {
                if (player.get("playingsongmsg") && msg.id !== player.get("playingsongmsg").id) player.get("playingsongmsg")["delete"]()["catch"](function (e) {
                  return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                });
              } catch (_unused4) {}
              /* */
              //set the old message information to a variable


              player.set("playingsongmsg", msg); //react with all emojis

              var failed = false;
              msg.react(emoji.react.rewind)["catch"](function (e) {
                return failed = true;
              }); //rewind 20 seconds

              msg.react(emoji.react.forward)["catch"](function (e) {
                return failed = true;
              }); //forward 20 seconds

              msg.react(emoji.react.pause_resume)["catch"](function (e) {
                return failed = true;
              }); //pause / resume

              msg.react(emoji.react.stop)["catch"](function (e) {
                return failed = true;
              }); //stop playing music

              msg.react(emoji.react.previous_track)["catch"](function (e) {
                return failed = true;
              }); //skip back  track / (play previous)

              msg.react(emoji.react.skip_track)["catch"](function (e) {
                return failed = true;
              }); //skip track / stop playing

              msg.react(emoji.react.replay_track)["catch"](function (e) {
                return failed = true;
              }); //replay track

              msg.react(emoji.react.reduce_volume)["catch"](function (e) {
                return failed = true;
              }); //reduce volume by 10%

              msg.react(emoji.react.raise_volume)["catch"](function (e) {
                return failed = true;
              }); //raise volume by 10%

              msg.react(emoji.react.toggle_mute)["catch"](function (e) {
                return failed = true;
              }); //toggle mute

              msg.react(emoji.react.repeat_mode)["catch"](function (e) {
                return failed = true;
              }); //change repeat mode --> track --> Queue --> none

              msg.react(emoji.react.autoplay_mode)["catch"](function (e) {
                return failed = true;
              }); //toggle autoplay mode

              msg.react(emoji.react.shuffle)["catch"](function (e) {
                return failed = true;
              }); //shuffle the Queue

              msg.react(emoji.react.show_queue)["catch"](function (e) {
                return failed = true;
              }); //shows the Queue

              msg.react(emoji.react.show_current_track)["catch"](function (e) {
                return failed = true;
              }); //shows the current Track

              if (failed) msg.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("".concat(emojis.msg.ERROR, " ERROR | Couldn't add Reaction")).setDescription("Make sure that I have permissions to add (custom) REACTIONS")); //create the collector

              var collector = msg.createReactionCollector(function (reaction, user) {
                return user.id !== client.user.id;
              }, {
                time: track.duration > 0 ? track.duration : 600000
              });
              collector.on("collect", function _callee3(reaction, user) {
                var message, db, member, channel, player, reactionemoji, rewind, forward, type, channelmembersize, voteamount, volumedown, volumeup, volumemute, embed, tracks, quelist, i, songs, limit;
                return regeneratorRuntime.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;

                        if (!user.bot) {
                          _context3.next = 3;
                          break;
                        }

                        return _context3.abrupt("return");

                      case 3:
                        //get the message object out of the reaction
                        message = reaction.message; //get the database information

                        db = client.setups.get(message.guild.id); //removing the reaction of the User

                        try {
                          reaction.users.remove(user.id)["catch"](function (e) {
                            return console.log(String(e.stack).yellow);
                          });
                        } catch (_unused5) {}
                        /* */
                        //get the member who makes the reaction


                        member = message.guild.members.cache.get(user.id); //getting the Voice Channel Data of the Message Member

                        channel = member.voice.channel; //if not in a Voice Channel return!

                        if (channel) {
                          _context3.next = 10;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to join a voice channel.")));

                      case 10:
                        //get the lavalink erela.js player information
                        player = client.manager.players.get(message.guild.id); //if no player return

                        if (!(!player || player == undefined)) {
                          _context3.next = 13;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am not playing anything in this Server")));

                      case 13:
                        if (!(player && channel.id !== player.voiceChannel)) {
                          _context3.next = 15;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am already playing somewhere else!").setDescription("You can listen to me in: ".concat(message.guild.channels.cache.get(player.VoiceChannel).name))));

                      case 15:
                        //switch case for every single reaction emoji someone
                        reactionemoji = reaction.emoji.id || reaction.emoji.name;
                        _context3.t0 = reactionemoji;
                        _context3.next = _context3.t0 === String(emoji.react.rewind) ? 19 : _context3.t0 === String(emoji.react.forward) ? 24 : _context3.t0 === String(emoji.react.pause_resume) ? 29 : _context3.t0 === String(emoji.react.stop) ? 32 : _context3.t0 === String(emoji.react.previous_track) ? 35 : _context3.t0 === String(emoji.react.skip_track) ? 42 : _context3.t0 === String(emoji.react.replay_track) ? 71 : _context3.t0 === String(emoji.react.reduce_volume) ? 74 : _context3.t0 === String(emoji.react.raise_volume) ? 79 : _context3.t0 === String(emoji.react.toggle_mute) ? 84 : _context3.t0 === String(emoji.react.repeat_mode) ? 88 : _context3.t0 === String(emoji.react.autoplay_mode) ? 90 : _context3.t0 === String(emoji.react.shuffle) ? 93 : _context3.t0 === String(emoji.react.show_queue) ? 96 : _context3.t0 === String(emoji.react.show_current_track) ? 116 : 118;
                        break;

                      case 19:
                        //get the rewind
                        rewind = player.position - 20 * 1000; //if the rewind is too big or too small set it to 0

                        if (rewind >= player.queue.current.duration - player.position || rewind < 0) {
                          rewind = 0;
                        } //seek to the position after the rewind


                        player.seek(Number(rewind)); //send an information message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.rewind, " Rewinded the song for: 20 Seconds, to: ").concat(format(Number(player.position)))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 24:
                        //gets the forward time
                        forward = Number(player.position) + 20 * 1000; //if the forward is too big set it 1 second less

                        if (Number(forward) >= player.queue.current.duration) {
                          forward = player.queue.current.duration - 1000;
                        } //seek to the amount of time after the forwards


                        player.seek(Number(forward)); //send an information message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.forward, " Forwarded the Song for: 20 Seconds, to: ").concat(format(Number(player.position)))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 29:
                        //pause the player / resume it
                        player.pause(player.playing); //send information message

                        message.channel.send(new MessageEmbed().setTitle("".concat(player.playing ? "".concat(emoji.msg.resume, " Resumed") : "".concat(emoji.msg.pause, " Paused"), " the Player.")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 32:
                        //leave and stop the music
                        player.destroy(); //send information message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.stop, " Stopped and left your channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 35:
                        if (!(!player.queue.previous || player.queue.previous === null)) {
                          _context3.next = 37;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("There is no previous song yet!")).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }));

                      case 37:
                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.previous_track, " Playing Previous Track")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }); //define the type

                        type = "skiptrack:youtube"; //if the previous was from soundcloud, then use type soundcloud

                        if (player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"; //plays it

                        playermanager(client, message, Array(player.queue.previous.uri), type);
                        return _context3.abrupt("break", 118);

                      case 42:
                        if (!(client.settings.get(message.guild.id, "djroles").toString() !== "")) {
                          _context3.next = 63;
                          break;
                        }

                        channelmembersize = channel.members.size;
                        voteamount = 0;
                        if (channelmembersize <= 3) voteamount = 1;
                        voteamount = Math.ceil(channelmembersize / 3);

                        if (player.get("vote-".concat(user.id))) {
                          _context3.next = 58;
                          break;
                        }

                        player.set("vote-".concat(user.id), true);
                        player.set("votes", String(Number(player.get("votes")) + 1));

                        if (!(voteamount <= Number(player.get("votes")))) {
                          _context3.next = 55;
                          break;
                        }

                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: ".concat(player.get("votes"), " of ").concat(voteamount, " needed Votes\n\n> Amount reached! Skipping ").concat(emoji.msg.skip_track)));

                        if (player.queue.size == 0) {
                          player.destroy();
                        } else {
                          player.stop();
                        }

                        _context3.next = 56;
                        break;

                      case 55:
                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Added your Vote!").setDescription("There are now: ".concat(player.get("votes"), " of ").concat(voteamount, " needed Votes"))));

                      case 56:
                        _context3.next = 61;
                        break;

                      case 58:
                        player.set("vote-".concat(user.id), false);
                        player.set("votes", String(Number(player.get("votes")) - 1));
                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed your Vote!").setDescription("There are now: ".concat(player.get("votes"), " of ").concat(voteamount, " needed Votes"))));

                      case 61:
                        _context3.next = 70;
                        break;

                      case 63:
                        if (!(player.queue.size == 0)) {
                          _context3.next = 68;
                          break;
                        }

                        if (!player.get("autoplay")) {
                          _context3.next = 66;
                          break;
                        }

                        return _context3.abrupt("return", autoplay(client, player, "skip"));

                      case 66:
                        //stop playing
                        player.destroy(); //send success message

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.stop, " Stopped and left your Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                      case 68:
                        //skip the track
                        player.stop(); //send success message

                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.skip_track, " Skipped to the next Song")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                      case 70:
                        return _context3.abrupt("break", 118);

                      case 71:
                        //seek to 0
                        player.seek(0); //send an information message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.replay_track, " Replaying Current Track")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 74:
                        //get the volume
                        volumedown = player.volume - 10; //if its too small set it to 0

                        if (volumedown < 0) volumedown = 0; //set the palyer volume to the volume

                        player.setVolume(volumedown); //send an informational message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.reduce_volume, " Volume set to: **").concat(player.volume, " %**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 79:
                        //get the volume
                        volumeup = player.volume + 10; //if its too small set it to 0

                        if (volumeup > 150) volumeup = 0; //set the palyer volume to the volume

                        player.setVolume(volumeup); //send an informational message

                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.raise_volume, " Volume set to: **").concat(player.volume, " %**")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 84:
                        //get the volume
                        volumemute = player.volume === 0 ? 50 : 0; //set the palyer volume to the volume

                        player.setVolume(volumemute); //send an informational message

                        message.channel.send(new MessageEmbed().setTitle("".concat(player.volume === 0 ? "".concat(emoji.msg.toggle_mute, " Muted the Player") : "".concat(emoji.msg.reduce_volume, " Unmuted the Player"))).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 88:
                        //if both repeat modes are off
                        if (!player.trackRepeat && !hasmap.get(message.guild.id)) {
                          hasmap.set(message.guild.id, 1); //and queue repeat mode to off

                          player.setQueueRepeat(!player.queueRepeat); //set track repeat mode to on

                          player.setTrackRepeat(!player.trackRepeat); //Send an informational message

                          message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Track Loop is now ").concat(player.trackRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setDescription("And Queue Loop is now ".concat(player.queueRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                            if (msg && msg.deletable) msg["delete"]({
                              timeout: 4000
                            })["catch"](function (e) {
                              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                            });
                          });
                        } //if track repeat mode is on and queue repeat mode off
                        else if (player.trackRepeat && hasmap.get(message.guild.id) === 1) {
                            hasmap.set(message.guild.id, 2); //set track repeat mode off

                            player.setTrackRepeat(!player.trackRepeat); //set queue repeat mode on

                            player.setQueueRepeat(!player.queueRepeat);
                            message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Queue Loop is now ").concat(player.queueRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setDescription("And Track Loop is now ".concat(player.trackRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                              if (msg && msg.deletable) msg["delete"]({
                                timeout: 4000
                              })["catch"](function (e) {
                                return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                              });
                            });
                          } //otherwise like queue on and track should be off...
                          else {
                              hasmap["delete"](message.guild.id); //set track repeat mode off

                              player.setTrackRepeat(false); //set queue repeat mode off

                              player.setQueueRepeat(false);
                              message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.repeat_mode, " Queue Loop is now ").concat(player.queueRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setDescription("And Track Loop is now ".concat(player.trackRepeat ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), ".")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                                if (msg && msg.deletable) msg["delete"]({
                                  timeout: 4000
                                })["catch"](function (e) {
                                  return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                                });
                              });
                            }

                        return _context3.abrupt("break", 118);

                      case 90:
                        //toggle autoplay
                        player.set("autoplay", !player.get("autoplay")); //Send Success Message

                        message.channel.send(new MessageEmbed().setTitle("".concat(player.get("autoplay") ? "".concat(emoji.msg.enabled, " Enabled") : "".concat(emoji.msg.disabled, " Disabled"), " Autoplay")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 93:
                        //shuffle the Queue
                        player.queue.shuffle();
                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.shuffle, " The queue is now shuffled.")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 96:
                        //define the Embed
                        embed = new MessageEmbed().setAuthor("Queue for ".concat(message.guild.name, "  -  [ ").concat(player.queue.length, " Tracks ]"), "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null); //if there is something playing rn, then add it to the embed

                        if (player.queue.current) embed.addField("**0) CURRENT TRACK**", "[".concat(player.queue.current.title.substr(0, 35), "](").concat(player.queue.current.uri, ") - ").concat(player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0], " - request by: **").concat(player.queue.current.requester.tag, "**")); //get the right tracks of the current tracks

                        tracks = player.queue; //if there are no other tracks, information

                        if (tracks.length) {
                          _context3.next = 101;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(embed.setDescription("".concat(emoji.msg.ERROR, " No tracks in the queue"))).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }));

                      case 101:
                        if (!(tracks.length < 15)) {
                          _context3.next = 103;
                          break;
                        }

                        return _context3.abrupt("return", message.channel.send(embed.setDescription(tracks.map(function (track, i) {
                          return "**".concat(++i, ")** [").concat(track.title.substr(0, 35), "](").concat(track.uri, ") - ").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], " - **requested by: ").concat(track.requester.tag, "**");
                        }).join("\n"))).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }));

                      case 103:
                        //get an array of quelist where 15 tracks is one index in the array
                        quelist = [];

                        for (i = 0; i < tracks.length; i += 15) {
                          songs = tracks.slice(i, i + 15);
                          quelist.push(songs.map(function (track, index) {
                            return "**".concat(i + ++index, ")** [").concat(track.title.split("[").join("{").split("]").join("}").substr(0, 35), "](").concat(track.uri, ") - ").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], " - **requested by: ").concat(track.requester.tag, "**");
                          }).join("\n"));
                        }

                        limit = quelist.length <= 5 ? quelist.length : 5;
                        i = 0;

                      case 107:
                        if (!(i < limit)) {
                          _context3.next = 113;
                          break;
                        }

                        _context3.next = 110;
                        return regeneratorRuntime.awrap(user.send(embed.setDescription(String(quelist[i]).substr(0, 2048))));

                      case 110:
                        i++;
                        _context3.next = 107;
                        break;

                      case 113:
                        user.send(new MessageEmbed().setDescription("".concat(emoji.msg.SUCCESS, " Sent from <#").concat(message.channel.id, ">").concat(quelist.length <= 5 ? "" : "\nNote: Send 5 Embeds, but there would be more...")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                        message.channel.send(new MessageEmbed().setTitle("".concat(emoji.msg.SUCCESS, " Check your direct messages to see the Queue")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        return _context3.abrupt("break", 118);

                      case 116:
                        return _context3.abrupt("return", message.channel.send(new MessageEmbed().setAuthor("Current song playing:", "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1").setThumbnail("https://img.youtube.com/vi/".concat(player.queue.current.identifier, "/mqdefault.jpg")).setURL(player.queue.current.uri).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(player.playing ? emoji.msg.resume : emoji.msg.pause, " **").concat(player.queue.current.title, "**")).addField("".concat(emoji.msg.time, " Duration: "), "`" + format(player.queue.current.duration) + "`", true).addField("".concat(emoji.msg.song_by, " Song By: "), "`" + player.queue.current.author + "`", true).addField("".concat(emoji.msg.repeat_mode, " Queue length: "), "".concat(player.queue.length, " Songs"), true).addField("".concat(emoji.msg.time, " Progress: "), createBar(player)).setFooter("Requested by: ".concat(player.queue.current.requester.tag), player.queue.current.requester.displayAvatarURL({
                          dynamic: true
                        }))).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }));

                      case 118:
                        _context3.next = 123;
                        break;

                      case 120:
                        _context3.prev = 120;
                        _context3.t1 = _context3["catch"](0);
                        console.log(_context3.t1);
                        /* */

                      case 123:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, null, [[0, 120]]);
              });
            });
            _context4.next = 41;
            break;

          case 38:
            _context4.prev = 38;
            _context4.t1 = _context4["catch"](1);
            console.log(String(_context4.t1.stack).yellow);
            /* */

          case 41:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 38], [6, 10, 14, 22], [15,, 17, 21]]);
  }).on("trackStuck", function (player, track, payload) {
    var es = client.settings.get(player.guild, "embed") || ee;
    var embed = new MessageEmbed().setTitle("".concat(emoji.msg.ERROR, " Track got stuck!")).setDescription("".concat(emoji.msg.skip_track, " I skipped the track: [").concat(track.title, "](").concat(track.uri, ")")).setThumbnail("https://img.youtube.com/vi/".concat(track.identifier, "/mqdefault.jpg")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
    client.channels.cache.get(player.textChannel).send(embed).then(function (msg) {
      if (msg && msg.deletable) msg["delete"]({
        timeout: 7500
      })["catch"](function (e) {
        return console.log("couldn't delete message this is a catch to prevent a crash".grey);
      });
    });
    player.stop();
  }).on("trackError", function (player, track, payload) {
    var es = client.settings.get(player.guild, "embed") || ee;
    var embed = new MessageEmbed().setTitle("".concat(emoji.msg.ERROR, " Track got errored!")).setDescription("".concat(emoji.msg.skip_track, " I skipped the track: **").concat(track.title, "**")).setThumbnail("https://img.youtube.com/vi/".concat(track.identifier, "/mqdefault.jpg")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
    player.stop();
    client.channels.cache.get(player.textChannel).send(embed).then(function (msg) {
      if (msg && msg.deletable) msg["delete"]({
        timeout: 7500
      })["catch"](function (e) {
        return console.log("couldn't delete message this is a catch to prevent a crash".grey);
      });
    });
  }).on("queueEnd", function _callee6(player) {
    var es;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            es = client.settings.get(player.guild, "embed") || ee; // "uncomment" to enable trackEnd also for one song long Queus
            // client.manager.emit("trackEnd", player, track)

            databasing(client, player.guild, player.get("playerauthor"));

            if (!player.get("autoplay")) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", autoplay(client, player));

          case 4:
            //DEvar TIME OUT
            if (config.settings.LeaveOnEmpty_Queue.enabled) {
              setTimeout(function _callee5() {
                var embed;
                return regeneratorRuntime.async(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        player = client.manager.players.get(player.guild);

                        if (!(!player.queue || !player.queue.current)) {
                          _context5.next = 12;
                          break;
                        }

                        embed = new MessageEmbed();
                        embed.setTitle("".concat(emoji.msg.ERROR, " Queue has ended."));
                        embed.setDescription("I left the Channel: ".concat(client.channels.cache.get(player.voiceChannel) ? client.channels.cache.get(player.voiceChannel).name : "UNKNOWN", " because the Queue was empty for: ").concat(ms(config.settings.LeaveOnEmpty_Queue.time_delay, {
                          "long": true
                        })));
                        embed.setColor(es.wrongcolor); //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER

                        if (!(player.get("afk-".concat(player.get("playerauthor"))) || player.get("afk-".concat(player.guild)))) {
                          _context5.next = 9;
                          break;
                        }

                        return _context5.abrupt("return", client.channels.cache.get(player.textChannel).send(embed.setDescription("I will not Leave the Channel, cause afk is \u2714\uFE0F Enabled")).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        }));

                      case 9:
                        //send information message
                        client.channels.cache.get(player.textChannel).send(embed).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(function (msg) {
                          if (msg && msg.deletable) msg["delete"]({
                            timeout: 4000
                          })["catch"](function (e) {
                            return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                          });
                        });
                        player.destroy();

                      case 12:
                        _context5.next = 17;
                        break;

                      case 14:
                        _context5.prev = 14;
                        _context5.t0 = _context5["catch"](0);
                        console.log(String(_context5.t0.stack).yellow);

                      case 17:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, null, null, [[0, 14]]);
              }, config.settings.LeaveOnEmpty_Queue.time_delay);
            }

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
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