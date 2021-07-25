"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove; //function for playling song + skipping


function skiptrack(client, message, args, type) {
  var search, res, player, state, QueueArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track;

  return regeneratorRuntime.async(function skiptrack$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          search = args.join(" ");
          _context.prev = 1;
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

          _context.prev = 6;

          if (!(type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(client.manager.search({
            query: search,
            source: type.split(":")[1]
          }, message.author));

        case 10:
          res = _context.sent;
          _context.next = 16;
          break;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(client.manager.search(search, message.author));

        case 15:
          res = _context.sent;

        case 16:
          if (!(res.loadType === "LOAD_FAILED")) {
            _context.next = 20;
            break;
          }

          throw res.exception;

        case 20:
          if (!(res.loadType === "PLAYLIST_LOADED")) {
            _context.next = 22;
            break;
          }

          throw {
            message: "Playlists are not supported with this command. Use   ?playlist  "
          };

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](6);
          console.log(String(_context.t0.stack).red);
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("There was an error while searching:").setDescription("```".concat(_context.t0.message, "```"))));

        case 28:
          if (res.tracks[0]) {
            _context.next = 30;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

        case 30:
          if (!(state !== "CONNECTED")) {
            _context.next = 39;
            break;
          }

          //set the variables
          player.set("message", message);
          player.set("playerauthor", message.author.id);
          player.connect(); //add track

          player.queue.add(res.tracks[0]); //play track

          player.play();
          player.pause(false);
          _context.next = 70;
          break;

        case 39:
          if (!(!player.queue || !player.queue.current)) {
            _context.next = 45;
            break;
          }

          //add track
          player.queue.add(res.tracks[0]); //play track

          player.play();
          player.pause(false);
          _context.next = 70;
          break;

        case 45:
          player.queue.add(res.tracks[0]);
          player.queue[player.queue.length - 1]; //move the Song to the first position using my selfmade Function and save it on an array

          QueueArray = arrayMove(player.queue, player.queue.length - 1, 0); //clear teh Queue

          player.queue.clear(); //now add every old song again

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 52;

          for (_iterator = QueueArray[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            track = _step.value;
            player.queue.add(track);
          } //skip the track


          _context.next = 60;
          break;

        case 56:
          _context.prev = 56;
          _context.t1 = _context["catch"](52);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 60:
          _context.prev = 60;
          _context.prev = 61;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 63:
          _context.prev = 63;

          if (!_didIteratorError) {
            _context.next = 66;
            break;
          }

          throw _iteratorError;

        case 66:
          return _context.finish(63);

        case 67:
          return _context.finish(60);

        case 68:
          player.stop();
          return _context.abrupt("return");

        case 70:
          _context.next = 76;
          break;

        case 72:
          _context.prev = 72;
          _context.t2 = _context["catch"](1);
          console.log(String(_context.t2.stack).red);
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")));

        case 76:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 72], [6, 24], [52, 56, 60, 68], [61,, 63, 67]]);
}

module.exports = skiptrack;