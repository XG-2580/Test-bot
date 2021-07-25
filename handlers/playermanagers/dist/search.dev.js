"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var ee = require("../../base-system/embed.json");

var config = require("../.config.json");

var _require2 = require("../functions"),
    format = _require2.format,
    delay = _require2.delay,
    arrayMove = _require2.arrayMove; //function for searching songs


function search(client, message, args, type) {
  var search, res, player, state, max, collected, filter, results, toreact, emojiarray, i, first, emojis, index, embed3;
  return regeneratorRuntime.async(function search$(_context) {
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
          return regeneratorRuntime.awrap(client.manager.search({
            query: search,
            source: type.split(":")[1]
          }, message.author));

        case 9:
          res = _context.sent;

          if (!(res.loadType === "LOAD_FAILED")) {
            _context.next = 14;
            break;
          }

          throw res.exception;

        case 14:
          if (!(res.loadType === "PLAYLIST_LOADED")) {
            _context.next = 16;
            break;
          }

          throw {
            message: "Playlists are not supported with this command. Use   ?playlist  "
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
          max = 10, filter = function filter(r, u) {
            return u.id === message.author.id;
          };
          if (res.tracks.length < max) max = res.tracks.length;
          track = res.tracks[0];
          results = res.tracks.slice(0, max).map(function (track, index) {
            return "**".concat(++index, ")** [`").concat(String(track.title).substr(0, 60).split("[").join("{").split("]").join("}"), "`](").concat(track.uri, ") - `").concat(format(track.duration).split(" | ")[0], "`");
          }).join('\n');
          _context.next = 28;
          return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setTitle("Search result for: \uD83D\uDD0E **`".concat(search).substr(0, 256 - 3) + "`**").setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(results).setFooter("Search-Request by: ".concat(track.requester.tag), track.requester.displayAvatarURL({
            dynamic: true
          }))));

        case 28:
          toreact = _context.sent;
          emojiarray = ["❌", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
          i = 0;

        case 31:
          if (!(i < emojiarray.length)) {
            _context.next = 43;
            break;
          }

          _context.prev = 32;

          if (!(i == max + 1)) {
            _context.next = 35;
            break;
          }

          return _context.abrupt("break", 43);

        case 35:
          toreact.react(emojiarray[i]);
          _context.next = 40;
          break;

        case 38:
          _context.prev = 38;
          _context.t1 = _context["catch"](32);

        case 40:
          i++;
          _context.next = 31;
          break;

        case 43:
          _context.prev = 43;
          _context.next = 46;
          return regeneratorRuntime.awrap(toreact.awaitReactions(filter, {
            max: 1,
            time: 30e3,
            errors: ['time']
          }));

        case 46:
          collected = _context.sent;
          _context.next = 54;
          break;

        case 49:
          _context.prev = 49;
          _context.t2 = _context["catch"](43);
          if (!player.queue.current) player.destroy();
          toreact.reactions.removeAll()["catch"](function (error) {
            return console.error('Failed to clear reactions: ', error);
          });
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("You didn't provide a selection").setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)));

        case 54:
          first = collected.first().emoji.name;

          if (!(first === '❌')) {
            _context.next = 59;
            break;
          }

          if (!player.queue.current) player.destroy();
          toreact.reactions.removeAll()["catch"](function (error) {
            return console.error('Failed to clear reactions: ', error);
          });
          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle('Cancelled selection.')));

        case 59:
          emojis = {
            "1️⃣": "1",
            "2️⃣": "2",
            "3️⃣": "3",
            "4️⃣": "4",
            "5️⃣": "5",
            "6️⃣": "6",
            "7️⃣": "7",
            "8️⃣": "8",
            "9️⃣": "9",
            "🔟": "10"
          };
          toreact.reactions.removeAll()["catch"](function (error) {
            return console.error('Failed to clear reactions: ', error);
          });
          index = Number(emojis[first]) - 1;

          if (!(index < 0 || index > max - 1)) {
            _context.next = 64;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("The number you provided too small or too big (1-".concat(max, ")."))));

        case 64:
          track = res.tracks[index];

          if (res.tracks[0]) {
            _context.next = 67;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**").setDescription("Please retry!")));

        case 67:
          if (!(player.state !== "CONNECTED")) {
            _context.next = 76;
            break;
          }

          //set the variables
          player.set("message", message);
          player.set("playerauthor", message.author.id);
          player.connect(); //add track

          player.queue.add(track); //set the variables
          //play track

          player.play();
          player.pause(false);
          _context.next = 85;
          break;

        case 76:
          if (!(!player.queue || !player.queue.current)) {
            _context.next = 82;
            break;
          }

          //add track
          player.queue.add(track); //play track

          player.play();
          player.pause(false);
          _context.next = 85;
          break;

        case 82:
          player.queue.add(track);
          embed3 = new MessageEmbed().setTitle("Added to Queue \uD83E\uDE78 **`".concat(track.title).substr(0, 256 - 3) + "`**").setURL(track.uri).setColor(ee.color).setThumbnail(track.displayThumbnail(1)).addField("⌛ Duration: ", "`".concat(track.isStream ? "LIVE STREAM" : format(track.duration), "`"), true).addField("💯 Song By: ", "`".concat(track.author, "`"), true).addField("🔂 Queue length: ", "`".concat(player.queue.length, " Songs`"), true).setFooter("Requested by: ".concat(track.requester.tag), track.requester.displayAvatarURL({
            dynamic: true
          }));
          return _context.abrupt("return", message.channel.send(embed3).then(function (msg) {
            if (msg) msg["delete"]({
              timeout: 4000
            })["catch"](function (e) {
              return console.log("couldn't delete message this is a catch to prevent a crash".grey);
            });
          }));

        case 85:
          _context.next = 91;
          break;

        case 87:
          _context.prev = 87;
          _context.t3 = _context["catch"](1);
          console.log(String(_context.t3.stack).red);
          message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(String("Found nothing for: **`" + search).substr(0, 256 - 3) + "`**"));

        case 91:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 87], [6, 18], [32, 38], [43, 49]]);
}

module.exports = search;