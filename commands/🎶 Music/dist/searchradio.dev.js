"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var radios = require("../../base-system/radiostations.json");

var playermanager = require("../../handlers/playermanager");

var RadioBrowser = require('radio-browser');

module.exports = {
  name: "searchradio",
  category: "\uD83C\uDFB6 Music",
  aliases: ["searchr"],
  description: "Searches for a Radio station",
  usage: "searchradio ",
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, filter;
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

            if (args[0]) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("What should be the search Type").setDescription("Useage: `".concat(prefix, "searchradio <TYPE> <Seach Query>`\nValid Types: `country`, `city`, `name`, `genre`\nExample: `").concat(prefix, "searchradio tag jazz`\nExample: `").concat(prefix, "searchradio state Austria`"))));

          case 6:
            if (args[1]) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("What should I search for?").setDescription("Useage: `".concat(prefix, "searchradio <TYPE> <Seach Query>`\nValid Types: `country`, `city`, `name`, `genre`\nExample: `").concat(prefix, "searchradio tag jazz`\nExample: `").concat(prefix, "searchradio state Austria`"))));

          case 8:
            filter = false;
            _context2.t0 = args[0].toLowerCase();
            _context2.next = _context2.t0 === "tag" ? 12 : _context2.t0 === "genre" ? 12 : _context2.t0 === "name" ? 14 : _context2.t0 === "city" ? 16 : _context2.t0 === "country" ? 18 : 20;
            break;

          case 12:
            filter = {
              limit: 60,
              // list max 5 items
              by: 'tag',
              // search in tag
              searchterm: args.slice(1).join(" ") // term in tag

            };
            return _context2.abrupt("break", 22);

          case 14:
            filter = {
              limit: 60,
              // list max 5 items
              by: 'name',
              // search in tag
              searchterm: args.slice(1).join(" ") // term in tag

            };
            return _context2.abrupt("break", 22);

          case 16:
            filter = {
              limit: 60,
              // list max 5 items
              by: 'state',
              // search in tag
              searchterm: args.slice(1).join(" ") // term in tag

            };
            return _context2.abrupt("break", 22);

          case 18:
            filter = {
              limit: 60,
              // list max 5 items
              by: 'country',
              // search in tag
              searchterm: args.slice(1).join(" ") // term in tag

            };
            return _context2.abrupt("break", 22);

          case 20:
            filter = false;
            return _context2.abrupt("break", 22);

          case 22:
            if (filter) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("What should be the search Type").setDescription("Useage: `".concat(prefix, "searchradio <TYPE> <Seach Query>`\nValid Types: `country`, `city`, `name`, `genre`\nExample: `").concat(prefix, "searchradio tag jazz`\nExample: `").concat(prefix, "searchradio state Austria`"))));

          case 24:
            RadioBrowser.getStations(filter).then(function _callee(data) {
              var string, counter, array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track, embed, _i, _array, item, first, index;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      string = "";
                      counter = 0;
                      array = [];
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context.prev = 6;

                      for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        track = _step.value;
                        string += "**".concat(++counter, ")** [`").concat(String(track.name).substr(0, 15).split("[").join("{").split("]").join("}"), "`](").concat(track.url, ")\n");

                        if (counter % 10 === 0) {
                          array.push(string);
                          string = "";
                        }
                      }

                      _context.next = 14;
                      break;

                    case 10:
                      _context.prev = 10;
                      _context.t0 = _context["catch"](6);
                      _didIteratorError = true;
                      _iteratorError = _context.t0;

                    case 14:
                      _context.prev = 14;
                      _context.prev = 15;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 17:
                      _context.prev = 17;

                      if (!_didIteratorError) {
                        _context.next = 20;
                        break;
                      }

                      throw _iteratorError;

                    case 20:
                      return _context.finish(17);

                    case 21:
                      return _context.finish(14);

                    case 22:
                      embed = new MessageEmbed().setTitle("Search result for: \uD83D\uDD0E **`".concat(filter.searchterm).substr(0, 256 - 3) + "`**").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setFooter("Search-Request by: ".concat(message.author.tag), message.author.displayAvatarURL({
                        dynamic: true
                      }));

                      for (_i = 0, _array = array; _i < _array.length; _i++) {
                        item = _array[_i];
                        embed.addField("\u200B", item, true);
                      }

                      message.channel.send(embed);
                      _context.next = 27;
                      return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Radio with the `INDEX Number`")));

                    case 27:
                      _context.prev = 27;
                      _context.next = 30;
                      return regeneratorRuntime.awrap(message.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 30e3,
                        errors: ['time']
                      }));

                    case 30:
                      collected = _context.sent;
                      _context.next = 37;
                      break;

                    case 33:
                      _context.prev = 33;
                      _context.t1 = _context["catch"](27);
                      if (!player.queue.current) player.destroy();
                      return _context.abrupt("return", message.channel.send(new MessageEmbed().setTitle("You didn't provide a selection").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

                    case 37:
                      first = collected.first().content;

                      if (!(first.toLowerCase() === 'end')) {
                        _context.next = 41;
                        break;
                      }

                      if (player && !player.queue.current) player.destroy();
                      return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle('Cancelled selection.')));

                    case 41:
                      index = Number(first) - 1;

                      if (!isNaN(index)) {
                        _context.next = 44;
                        break;
                      }

                      return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The number you provided is not a Number within (1-".concat(counter, ")."))));

                    case 44:
                      if (!(index < 0 || index > counter - 1)) {
                        _context.next = 46;
                        break;
                      }

                      return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("The number you provided too small or too big (1-".concat(counter, ")."))));

                    case 46:
                      playermanager(client, message, Array(data[index].url), "song:radio");

                    case 47:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[6, 10, 14, 22], [15,, 17, 21], [27, 33]]);
            })["catch"](function (e) {
              console.log(String(e.stack).bgRed);
              return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
            });
            _context2.next = 31;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t1 = _context2["catch"](3);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 27]]);
  }
};