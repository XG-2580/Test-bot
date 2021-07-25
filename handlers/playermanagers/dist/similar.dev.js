"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove; //function for playling song


function similar(client, message, args, type) {
  var mixURL, player, res, embed2, max, collected, filter, results, searchembed, first, index, embed;
  return regeneratorRuntime.async(function similar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //get a playlist out of it
          mixURL = args.join(" "); //get the player instance

          player = client.manager.players.get(message.guild.id); //search for similar tracks

          _context.next = 5;
          return regeneratorRuntime.awrap(client.manager.search(mixURL, message.author));

        case 5:
          res = _context.sent;

          if (!(!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED')) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", client.channels.cache.get(player.textChannel).send(new MessageEmbed().setTitle("Found nothing related for the latest Song").setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)));

        case 8:
          if (!(type.split(":")[1] === "add")) {
            _context.next = 12;
            break;
          }

          //add the track
          player.queue.add(res.tracks[0]); //send information message

          embed2 = new MessageEmbed().setTitle("Added to Queue \uD83E\uDE78 **`".concat(res.tracks[0].title).substr(0, 256 - 3) + "`**").setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setThumbnail("https://img.youtube.com/vi/".concat(res.tracks[0].identifier, "/mqdefault.jpg")).addField("⌛ Duration: ", "`".concat(res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration), "`"), true).addField("💯 Song By: ", "`".concat(res.tracks[0].author, "`"), true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(res.tracks[0].requester.tag), res.tracks[0].requester.displayAvatarURL({
            dynamic: true
          }));
          return _context.abrupt("return", message.channel.send(embed2).then(function (msg) {
            if (msg) msg["delete"]({
              timeout: 4000
            })["catch"](function (e) {
              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
            });
          }));

        case 12:
          if (!(type.split(":")[1] === "search")) {
            _context.next = 53;
            break;
          }

          max = 15, filter = function filter(m) {
            return m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
          };
          if (res.tracks.length < max) max = res.tracks.length;
          track = res.tracks[0];
          results = res.tracks.slice(0, max).map(function (track, index) {
            return "**".concat(++index, ")** [`").concat(String(track.title).substr(0, 60).split("[").join("{").split("]").join("}"), "`](").concat(track.uri, ") - `").concat(format(track.duration).split(" | ")[0], "`");
          }).join('\n');
          searchembed = new MessageEmbed().setTitle("Search result for: \uD83D\uDD0E **`".concat(player.queue.current.title).substr(0, 256 - 3) + "`**").setColor(ee.color).setDescription(results).setFooter("Search-Request by: ".concat(track.requester.tag), track.requester.displayAvatarURL({
            dynamic: true
          }));
          message.channel.send(searchembed);
          _context.next = 21;
          return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("👍 Pick your Song with the `INDEX Number`")));

        case 21:
          _context.prev = 21;
          _context.next = 24;
          return regeneratorRuntime.awrap(message.channel.awaitMessages(filter, {
            max: 1,
            time: 30e3,
            errors: ['time']
          }));

        case 24:
          collected = _context.sent;
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](21);
          if (!player.queue.current) player.destroy();
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("You didn't provide a selection").setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)));

        case 31:
          first = collected.first().content;

          if (!(first.toLowerCase() === 'end')) {
            _context.next = 35;
            break;
          }

          if (!player.queue.current) player.destroy();
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle('Cancelled selection.')));

        case 35:
          index = Number(first) - 1;

          if (!(index < 0 || index > max - 1)) {
            _context.next = 38;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("The number you provided too small or too big (1-".concat(max, ")."))));

        case 38:
          track = res.tracks[index];

          if (res.tracks[0]) {
            _context.next = 41;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

        case 41:
          if (!(player.state !== "CONNECTED")) {
            _context.next = 50;
            break;
          }

          //set the variables
          player.set("message", message);
          player.set("playerauthor", message.author.id); // Connect to the voice channel and add the track to the queue

          player.connect();
          player.queue.add(track);
          player.play();
          player.pause(false);
          _context.next = 53;
          break;

        case 50:
          player.queue.add(track);
          embed = new MessageEmbed().setTitle("Added to Queue \uD83E\uDE78 **`".concat(track.title).substr(0, 256 - 3) + "`**").setURL(track.uri).setColor(ee.color).setThumbnail(track.displayThumbnail(1)).addField("⌛ Duration: ", "`".concat(track.isStream ? "LIVE STREAM" : format(track.duration), "`"), true).addField("💯 Song By: ", "`".concat(track.author, "`"), true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(track.requester.tag), track.requester.displayAvatarURL({
            dynamic: true
          }));
          return _context.abrupt("return", message.channel.send(embed).then(function (msg) {
            if (msg) msg["delete"]({
              timeout: 4000
            })["catch"](function (e) {
              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
            });
          }));

        case 53:
          _context.next = 59;
          break;

        case 55:
          _context.prev = 55;
          _context.t1 = _context["catch"](0);
          console.log(String(_context.t1.stack).red);
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**")));

        case 59:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 55], [21, 27]]);
}

module.exports = similar;