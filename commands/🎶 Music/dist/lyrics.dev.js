"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var _require2 = require("@ksoft/api"),
    KSoftClient = _require2.KSoftClient;

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var lyricsFinder = require("lyrics-finder");

var _require3 = require("../../handlers/functions"),
    format = _require3.format,
    delay = _require3.delay,
    swap_pages = _require3.swap_pages;

module.exports = {
  name: "lyrics",
  category: "\uD83C\uDFB6 Music",
  aliases: ["songlyrics", "ly", "tracklyrics"],
  description: "Shows The Lyrics of the current track",
  usage: "lyrics [Songtitle]",
  cooldown: 15,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, title, author, lyrics, ksoft;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context2.prev = 3;
            //get the Song Title
            title = player.queue.current.title; //get the song Creator Author

            author = player.queue.current.author; //if there are search terms, search for the lyrics

            if (args[0]) {
              //get the new title
              title = args.join(" "); //sending the Embed and deleting it afterwards

              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Searching lyrics for: ".concat(emoji.msg.search, " `").concat(title, "`").substr(0, 256)));
            } //set the lyrics temp. to null


            lyrics = null; //if there is the use of lyrics_finder

            if (!config.lyricssettings.lyrics_finder) {
              _context2.next = 27;
              break;
            }

            if (!config.lyricssettings.ksoft_api.use_this_instead) {
              _context2.next = 15;
              break;
            }

            //create a new Ksoft Client
            ksoft = new KSoftClient(config.lyricssettings.ksoft_api.api_key); //get the lyrics

            _context2.next = 13;
            return regeneratorRuntime.awrap(ksoft.lyrics.get(title).then(function _callee(track) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (track.lyrics) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("No Lyrics found for:")));

                    case 2:
                      //safe the lyrics on the temp. variable
                      lyrics = track.lyrics;

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }));

          case 13:
            _context2.next = 27;
            break;

          case 15:
            _context2.prev = 15;
            _context2.next = 18;
            return regeneratorRuntime.awrap(lyricsFinder(title, author ? author : ""));

          case 18:
            lyrics = _context2.sent;

            if (lyrics) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("No Lyrics found for:")));

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](15);
            //log the Error
            console.log(String(_context2.t0.stack).yellow);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("No Lyrics found for:")));

          case 27:
            return _context2.abrupt("return", swap_pages(client, message, lyrics, "Lyrics for: ".concat(emoji.msg.lyrics, " `").concat(title, "`").substr(0, 256)));

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2["catch"](3);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 30], [15, 23]]);
  }
};