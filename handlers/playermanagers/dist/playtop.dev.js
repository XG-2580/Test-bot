"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove;

module.exports = playtop;

function playtop(client, message, args, type) {
  var search, res, song_, playlist_;
  return regeneratorRuntime.async(function playtop$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          playlist_ = function _ref2() {
            var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _track3, player, oldQueue, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, track, _i2, _oldQueue2, _track2, time, playlistembed, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _track4;

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
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 5;
                    _iterator2 = res.tracks[Symbol.iterator]();

                  case 7:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context2.next = 14;
                      break;
                    }

                    _track3 = _step2.value;

                    if (!(_track3.duration > 3 * 60 * 60 * 1000)) {
                      _context2.next = 11;
                      break;
                    }

                    return _context2.abrupt("return", message.channel.send("**Cannot play a song that's longer than 3 hours --> playlist skipped!**"));

                  case 11:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 7;
                    break;

                  case 14:
                    _context2.next = 20;
                    break;

                  case 16:
                    _context2.prev = 16;
                    _context2.t0 = _context2["catch"](5);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t0;

                  case 20:
                    _context2.prev = 20;
                    _context2.prev = 21;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 23:
                    _context2.prev = 23;

                    if (!_didIteratorError2) {
                      _context2.next = 26;
                      break;
                    }

                    throw _iteratorError2;

                  case 26:
                    return _context2.finish(23);

                  case 27:
                    return _context2.finish(20);

                  case 28:
                    player = client.manager.create({
                      guild: message.guild.id,
                      voiceChannel: message.member.voice.channel.id,
                      textChannel: message.channel.id,
                      selfDeafen: false
                    }); //if the player is not connected, then connect and create things

                    if (!(state !== "CONNECTED")) {
                      _context2.next = 34;
                      break;
                    }

                    //add track
                    player.queue.add(res.tracks); //play track

                    player.play();
                    _context2.next = 62;
                    break;

                  case 34:
                    if (!(!player.queue || !player.queue.current)) {
                      _context2.next = 39;
                      break;
                    }

                    //add track
                    player.queue.add(res.tracks); //play track

                    player.play();
                    _context2.next = 62;
                    break;

                  case 39:
                    //save old tracks on an var
                    oldQueue = [];
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context2.prev = 43;

                    for (_iterator3 = player.queue[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      track = _step3.value;
                      oldQueue.push(track);
                    } //clear queue


                    _context2.next = 51;
                    break;

                  case 47:
                    _context2.prev = 47;
                    _context2.t1 = _context2["catch"](43);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context2.t1;

                  case 51:
                    _context2.prev = 51;
                    _context2.prev = 52;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                      _iterator3["return"]();
                    }

                  case 54:
                    _context2.prev = 54;

                    if (!_didIteratorError3) {
                      _context2.next = 57;
                      break;
                    }

                    throw _iteratorError3;

                  case 57:
                    return _context2.finish(54);

                  case 58:
                    return _context2.finish(51);

                  case 59:
                    player.queue.clear(); //add new tracks

                    player.queue.add(res.tracks); //now add every old song again

                    for (_i2 = 0, _oldQueue2 = oldQueue; _i2 < _oldQueue2.length; _i2++) {
                      _track2 = _oldQueue2[_i2];
                      player.queue.add(_track2);
                    }

                  case 62:
                    time = 0;
                    playlistembed = new Discord.MessageEmbed().setAuthor("Playlist added to Queue", message.author.displayAvatarURL({
                      dynamic: true
                    }), "https://Limsathya").setColor(ee.color).setTitle("**" + res.playlist.name + "**").setThumbnail("https://img.youtube.com/vi/".concat(res.tracks[0].identifier, "/mqdefault.jpg")); //timing for estimated time creation

                    if (player.queue.size > 0) player.queue.map(function (track) {
                      return time += track.duration;
                    });
                    time += player.queue.current.duration - player.position;
                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    _context2.prev = 69;

                    for (_iterator4 = res.tracks[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      _track4 = _step4.value;
                      time -= _track4.duration;
                    }

                    _context2.next = 77;
                    break;

                  case 73:
                    _context2.prev = 73;
                    _context2.t2 = _context2["catch"](69);
                    _didIteratorError4 = true;
                    _iteratorError4 = _context2.t2;

                  case 77:
                    _context2.prev = 77;
                    _context2.prev = 78;

                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }

                  case 80:
                    _context2.prev = 80;

                    if (!_didIteratorError4) {
                      _context2.next = 83;
                      break;
                    }

                    throw _iteratorError4;

                  case 83:
                    return _context2.finish(80);

                  case 84:
                    return _context2.finish(77);

                  case 85:
                    playlistembed.addField("Estimated time until playing", time > 10 ? format(time).split(" | ")[0] : "NOW").addField("Position in queue", "".concat(player.queue.length - res.tracks.length + 1 === 0 ? "NOW" : player.queue.length - res.tracks.length + 1), true).addField("Enqueued", "`".concat(res.tracks.length, "`"), true);
                    setTimeout(function () {
                      //if bot allowed to send embed, do it otherwise pure txt msg
                      if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) message.channel.send(playlistembed);else message.channel.send("Added: `".concat(res.tracks[0].title, "` - to the Queue\n**Channel:** ").concat(res.tracks[0].author, "\n**Song Duration:** ").concat(res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0], "\n**Estimated time until playing:** ").concat(time, "\n**Position in queue:** ").concat(player.queue.length, "\n").concat(res.tracks[0].uri));
                    }, 500);

                  case 87:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[5, 16, 20, 28], [21,, 23, 27], [43, 47, 51, 59], [52,, 54, 58], [69, 73, 77, 85], [78,, 80, 84]]);
          };

          song_ = function _ref() {
            var player, oldQueue, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track, _i, _oldQueue, _track, playembed;

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
                    if (!(res.tracks[0].duration > 3 * 60 * 60 * 1000)) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt("return", message.channel.send("**Cannot play a song that's longer than 3 hours**"));

                  case 4:
                    player = client.manager.create({
                      guild: message.guild.id,
                      voiceChannel: message.member.voice.channel.id,
                      textChannel: message.channel.id,
                      selfDeafen: false
                    }); //if the player is not connected, then connect and create things

                    if (!(player.state !== "CONNECTED")) {
                      _context.next = 14;
                      break;
                    }

                    //set the variables
                    player.set("message", message);
                    player.set("playerauthor", message.author.id); //connect

                    player.connect(); //add track

                    player.queue.add(res.tracks[0]); //play track

                    player.play();
                    player.pause(false);
                    _context.next = 43;
                    break;

                  case 14:
                    if (!(!player.queue || !player.queue.current)) {
                      _context.next = 20;
                      break;
                    }

                    //add track
                    player.queue.add(res.tracks[0]); //play track

                    player.play();
                    player.pause(false);
                    _context.next = 43;
                    break;

                  case 20:
                    //save old tracks on an var
                    oldQueue = [];
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 24;

                    for (_iterator = player.queue[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      track = _step.value;
                      oldQueue.push(track);
                    } //clear queue


                    _context.next = 32;
                    break;

                  case 28:
                    _context.prev = 28;
                    _context.t0 = _context["catch"](24);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 32:
                    _context.prev = 32;
                    _context.prev = 33;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 35:
                    _context.prev = 35;

                    if (!_didIteratorError) {
                      _context.next = 38;
                      break;
                    }

                    throw _iteratorError;

                  case 38:
                    return _context.finish(35);

                  case 39:
                    return _context.finish(32);

                  case 40:
                    player.queue.clear(); //add new tracks

                    player.queue.add(res.tracks[0]); //now add every old song again

                    for (_i = 0, _oldQueue = oldQueue; _i < _oldQueue.length; _i++) {
                      _track = _oldQueue[_i];
                      player.queue.add(_track);
                    }

                  case 43:
                    //send track information
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

                  case 45:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[24, 28, 32, 40], [33,, 35, 39]]);
          };

          search = args.join(" ");
          _context3.next = 5;
          return regeneratorRuntime.awrap(client.manager.search({
            query: search,
            source: type.split(":")[1]
          }, message.author));

        case 5:
          res = _context3.sent;

          if (!(res.loadType === "LOAD_FAILED")) {
            _context3.next = 10;
            break;
          }

          throw res.exception;

        case 10:
          if (res.loadType === "PLAYLIST_LOADED") {
            playlist_();
          } else {
            song_();
          }

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}