"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    format = _require2.format,
    delay = _require2.delay,
    swap_pages = _require2.swap_pages,
    swap_pages2 = _require2.swap_pages2;

module.exports = {
  name: "queue",
  category: "\uD83C\uDFB6 Music",
  aliases: ["qu", "que", "queu", "list"],
  description: "Shows the Queue",
  usage: "queue",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, tracks, quelist, _loop, i, limit, embeds, _i, desc;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            //get the right tracks of the current tracks
            tracks = player.queue; //if there are no other tracks, information

            if (tracks.length) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setAuthor("Queue for ".concat(message.guild.name, "  -  [ ").concat(player.queue.length, " Tracks ]"), "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1").setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField("**0) CURRENT TRACK**", "**".concat(player.queue.current.title.substr(0, 60), "** - `").concat(player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0], "`\n*request by: ").concat(player.queue.current.requester.tag, "*")).setDescription("".concat(emoji.msg.ERROR, " No tracks in the queue"))).then(function (msg) {
              try {
                msg["delete"]({
                  timeout: 5000
                })["catch"](function (e) {
                  return console.log("Couldn't delete msg, this is for preventing a bug".gray);
                });
              } catch (_unused) {
                /* */
              }
            }));

          case 7:
            if (!(tracks.length < 15)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setAuthor("Queue for ".concat(message.guild.name, "  -  [ ").concat(player.queue.length, " Tracks ]"), message.guild.iconURL({
              dynamic: true
            })).setFooter(es.footertext, es.footericon).addField("**0) CURRENT TRACK**", "**".concat(player.queue.current.title.substr(0, 60), "** - `").concat(player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0], "`\n*request by: ").concat(player.queue.current.requester.tag, "*")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(tracks.map(function (track, i) {
              return "**".concat(++i, ")** **").concat(track.title.substr(0, 60), "** - `").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], "`\n*requested by: ").concat(track.requester.tag, "*");
            }).join("\n"))).then(function (msg) {
              try {
                msg["delete"]({
                  timeout: 5000
                })["catch"](function (e) {
                  return console.log("Couldn't delete msg, this is for preventing a bug".gray);
                });
              } catch (_unused2) {
                /* */
              }
            }));

          case 9:
            //get an array of quelist where 15 tracks is one index in the array
            quelist = [];

            _loop = function _loop(i) {
              var songs = tracks.slice(i, i + 15);
              quelist.push(songs.map(function (track, index) {
                return "**".concat(i + ++index, ")** **").concat(track.title.substr(0, 60), "** - `").concat(track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], "`\n*requested by: ").concat(track.requester.tag, "*");
              }).join("\n"));
            };

            for (i = 0; i < tracks.length; i += 15) {
              _loop(i);
            }

            limit = quelist.length <= 5 ? quelist.length : 5;
            embeds = [];
            _i = 0;

          case 15:
            if (!(_i < limit)) {
              _context.next = 22;
              break;
            }

            desc = String(quelist[_i]).substr(0, 2048);
            _context.next = 19;
            return regeneratorRuntime.awrap(embeds.push(new MessageEmbed().setAuthor("Queue for ".concat(message.guild.name, "  -  [ ").concat(player.queue.length, " Tracks ]"), message.guild.iconURL({
              dynamic: true
            })).setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField("**0) CURRENT TRACK**", "**".concat(player.queue.current.title.substr(0, 60), "** - `").concat(player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0], "`\n*request by: ").concat(player.queue.current.requester.tag, "*")).setDescription(desc)));

          case 19:
            _i++;
            _context.next = 15;
            break;

          case 22:
            return _context.abrupt("return", swap_pages2(client, message, embeds));

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 25]]);
  }
};