"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    isrequestchannel = _require2.isrequestchannel,
    delay = _require2.delay,
    edit_request_message_queue_info = _require2.edit_request_message_queue_info,
    edit_request_message_track_info = _require2.edit_request_message_track_info,
    arrayMove = _require2.arrayMove; //function for playling song


function request(client, message, args, type) {
  var search, res, player, state, song_, playlist_;
  return regeneratorRuntime.async(function request$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          playlist_ = function _ref2() {
            return regeneratorRuntime.async(function playlist_$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (res.tracks[0]) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", message.channel.send("**Found nothing for: `".concat(search, "`**")));

                  case 2:
                    //if the player is not connected, then connect and create things
                    if (player.state !== "CONNECTED") {
                      //set the variables
                      player.set("message", message);
                      player.set("playerauthor", message.author.id);
                      player.connect(); //add track

                      player.queue.add(res.tracks); //play track

                      player.play();
                      player.pause(false);
                    } else if (!player.queue || !player.queue.current) {
                      //add track
                      player.queue.add(res.tracks); //play track

                      player.play();
                      player.pause(false);
                    } else {
                      player.queue.add(res.tracks);
                    }

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          song_ = function _ref() {
            return regeneratorRuntime.async(function song_$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (res.tracks[0]) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", message.channel.send("**Found nothing for: `".concat(search, "`**")));

                  case 2:
                    //create a player if not created
                    //if the player is not connected, then connect and create things
                    if (player.state !== "CONNECTED") {
                      //set the variables
                      player.set("message", message);
                      player.set("playerauthor", message.author.id);
                      player.connect(); //add track

                      player.queue.add(res.tracks[0]); //play track

                      player.play();
                      player.pause(false);
                    } else if (!player.queue || !player.queue.current) {
                      //add track
                      player.queue.add(res.tracks[0]); //play track

                      player.play();
                      player.pause(false);
                    } //otherwise
                    else {
                        //add track
                        player.queue.add(res.tracks[0]);
                      }

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          search = args.join(" ");
          player = client.manager.players.get(message.guild.id);
          if (!player) player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: config.settings.selfDeaf
          });
          state = player.state;

          if (state !== "CONNECTED") {
            //set the variables
            player.set("message", message);
            player.set("playerauthor", message.author.id);
            player.connect();
            player.stop();
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(client.manager.search({
            query: search,
            source: type.split(":")[1]
          }, message.author));

        case 9:
          res = _context3.sent;

          if (!(res.loadType === "LOAD_FAILED")) {
            _context3.next = 14;
            break;
          }

          throw res.exception;

        case 14:
          if (res.loadType === "PLAYLIST_LOADED") {
            playlist_();
          } else {
            song_();
          }

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = request;