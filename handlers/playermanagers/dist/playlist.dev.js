"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove; //function for playing playlists


function playlist(client, message, args, type) {
  var search, res, player, state, playlistembed;
  return regeneratorRuntime.async(function playlist$(_context) {
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
          _context.next = 9;
          return regeneratorRuntime.awrap(client.manager.search(search, message.author));

        case 9:
          res = _context.sent;

          if (!(res.loadType === "LOAD_FAILED")) {
            _context.next = 14;
            break;
          }

          throw res.exception;

        case 14:
          if (!(res.loadType === "SEARCH_RESULT")) {
            _context.next = 16;
            break;
          }

          throw {
            message: "Searches are not supported with this command. Use   ?play   or   ?search"
          };

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          console.log(String(_context.t0.stack).red);
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("There was an error while searching:").setDescription("```".concat(_context.t0.message, "```"))));

        case 22:
          if (res.tracks[0]) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

        case 24:
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
          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](1);
          console.log(String(_context.t1.stack).red);
          message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**"));

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 29], [6, 18]]);
}

module.exports = playlist;