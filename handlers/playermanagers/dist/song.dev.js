"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove; //function for playling song


function song(client, message, args, type) {
  var search, res, player, state, song_, playlist_;
  return regeneratorRuntime.async(function song$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          playlist_ = function _ref2() {
            var playlistembed;
            return regeneratorRuntime.async(function playlist_$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (res.tracks[0]) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

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
                      //add the tracks
                      player.queue.add(res.tracks);
                    } //send information


                    playlistembed = new MessageEmbed().setTitle("Added Playlist \uD83E\uDE78 **`".concat(res.playlist.name).substr(0, 256 - 3) + "`**").setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setThumbnail("https://img.youtube.com/vi/".concat(res.tracks[0].identifier, "/mqdefault.jpg")).addField("⌛ Duration: ", "`".concat(format(res.playlist.duration), "`"), true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(message.author.tag), message.author.displayAvatarURL({
                      dynamic: true
                    }));
                    message.channel.send(playlistembed).then(function (msg) {
                      if (msg) msg["delete"]({
                        timeout: 4000
                      })["catch"](function (e) {
                        return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                      });
                    });

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          song_ = function _ref() {
            var playembed;
            return regeneratorRuntime.async(function song_$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(player.state !== "CONNECTED")) {
                      _context.next = 9;
                      break;
                    }

                    //set the variables
                    player.set("message", message);
                    player.set("playerauthor", message.author.id); //connect

                    player.connect(); //add track

                    player.queue.add(res.tracks[0]); //play track

                    player.play();
                    player.pause(false);
                    _context.next = 18;
                    break;

                  case 9:
                    if (!(!player.queue || !player.queue.current)) {
                      _context.next = 15;
                      break;
                    }

                    //add track
                    player.queue.add(res.tracks[0]); //play track

                    player.play();
                    player.pause(false);
                    _context.next = 18;
                    break;

                  case 15:
                    //add the latest track
                    player.queue.add(res.tracks[0]); //send track information

                    playembed = new MessageEmbed().setTitle("Added to Queue \uD83E\uDE78 **`".concat(res.tracks[0].title).substr(0, 256 - 3) + "`**").setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setThumbnail("https://img.youtube.com/vi/".concat(res.tracks[0].identifier, "/mqdefault.jpg")).addField("⌛ Duration: ", "`".concat(res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration), "`"), true).addField("💯 Song By: ", "`".concat(res.tracks[0].author, "`"), true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(res.tracks[0].requester.tag), res.tracks[0].requester.displayAvatarURL({
                      dynamic: true
                    }));
                    return _context.abrupt("return", message.channel.send(playembed).then(function (msg) {
                      if (msg) msg["delete"]({
                        timeout: 4000
                      })["catch"](function (e) {
                        return console.log("couldn't delete message this is a catch to prevent a crash".grey);
                      });
                    }));

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          search = args.join(" ");
          player = client.manager.players.get(message.guild.id);

          if (player) {
            _context3.next = 8;
            break;
          }

          if (message.member.voice.channel) {
            _context3.next = 7;
            break;
          }

          throw "NOT IN A VC";

        case 7:
          player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: config.settings.selfDeaf
          });

        case 8:
          state = player.state;

          if (state !== "CONNECTED") {
            //set the variables
            player.set("message", message);
            player.set("playerauthor", message.author.id);
            player.connect();
            player.stop();
          }

          _context3.prev = 10;

          if (!(type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")) {
            _context3.next = 17;
            break;
          }

          _context3.next = 14;
          return regeneratorRuntime.awrap(client.manager.search({
            query: search,
            source: type.split(":")[1]
          }, message.author));

        case 14:
          res = _context3.sent;
          _context3.next = 20;
          break;

        case 17:
          _context3.next = 19;
          return regeneratorRuntime.awrap(client.manager.search(search, message.author));

        case 19:
          res = _context3.sent;

        case 20:
          if (!(res.loadType === "LOAD_FAILED")) {
            _context3.next = 24;
            break;
          }

          throw res.exception;

        case 24:
          if (res.loadType === "PLAYLIST_LOADED") {
            playlist_();
          } else {
            song_();
          }

        case 25:
          _context3.next = 31;
          break;

        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](10);
          console.log(String(_context3.t0.stack).red);
          return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("There was an error while searching:").setDescription("```".concat(_context3.t0.message, "```"))));

        case 31:
          if (res.tracks[0]) {
            _context3.next = 33;
            break;
          }

          return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 27]]);
}

module.exports = song;