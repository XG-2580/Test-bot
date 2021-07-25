"use strict";

// ************* IMPORT MODULES *************  //
var CronJob = require('cron').CronJob; // ************ IMPORT FILE DATA ************* //


var TikTokScraper = require('tiktok-scraper');

var _require = require('../handlers/functions'),
    databasing = _require.databasing,
    delay = _require.delay;

module.exports = function (client) {
  client.Jobtiktok = new CronJob('0 */7 * * * *', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(delay(2 * 60 * 1000));

          case 2:
            check(client);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }, null, true, 'America/Los_Angeles');
  client.on("ready", function () {
    client.Jobtiktok.start(); //start the JOB
  });

  function check(client) {
    return regeneratorRuntime.async(function check$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("Checking TikToks...".italic.brightMagenta);
            client.guilds.cache.map(function (guild) {
              return guild.id;
            }).forEach(function (guildid) {
              try {
                client.social_log.ensure(guildid, {
                  tiktok: {
                    channels: [],
                    dc_channel: ""
                  }
                });
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = client.social_log.get(guildid, "tiktok.channels")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tt = _step.value;
                    client.tiktok.ensure(tt, {
                      oldvid: "",
                      message: "**{videoAuthorName}** uploaded \`{videoTitle}\`!\n**Watch it:** {videoURL}"
                    });
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                client.social_log.get(guildid, "tiktok.channels").forEach(function _callee2(tiktoker) {
                  var posts, allposts, video, channel;
                  return regeneratorRuntime.async(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          console.log("[".concat(tiktoker, "] | Start checking...").italic.brightMagenta);
                          _context2.prev = 1;
                          _context2.next = 4;
                          return regeneratorRuntime.awrap(TikTokScraper.user(tiktoker, {
                            number: 5
                          }));

                        case 4:
                          posts = _context2.sent;

                          if (posts.collector[0]) {
                            _context2.next = 7;
                            break;
                          }

                          return _context2.abrupt("return", console.log("<:no:833101993668771842> NOT FOUND / No Posts!".italic.brightMagenta));

                        case 7:
                          author = posts.collector[0].authorMeta;
                          allposts = posts.collector.map(function (p) {
                            var Obj = {};
                            Obj.id = p.id;
                            Obj.url = p.webVideoUrl;
                            Obj.mentions = p.mentions;
                            Obj.hashtags = p.hashtags;
                            var title = p.text;
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                              for (var _iterator2 = p.hashtags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var tag = _step2.value;
                                title = String(title).toLowerCase().replace(String(tag.name).toLowerCase(), "");
                              }
                            } catch (err) {
                              _didIteratorError2 = true;
                              _iteratorError2 = err;
                            } finally {
                              try {
                                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                  _iterator2["return"]();
                                }
                              } finally {
                                if (_didIteratorError2) {
                                  throw _iteratorError2;
                                }
                              }
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                              for (var _iterator3 = p.mentions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var mention = _step3.value;
                                title = String(title).toLowerCase().replace(String(mention), "");
                              }
                            } catch (err) {
                              _didIteratorError3 = true;
                              _iteratorError3 = err;
                            } finally {
                              try {
                                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                                  _iterator3["return"]();
                                }
                              } finally {
                                if (_didIteratorError3) {
                                  throw _iteratorError3;
                                }
                              }
                            }

                            Obj.title = title.split("#").join("");
                            if (title.length <= 1) Obj.title = p.id;
                            return Obj;
                          });
                          video = allposts[0];

                          if (!(client.tiktok.get(tiktoker, "oldvid") == video.id)) {
                            _context2.next = 12;
                            break;
                          }

                          return _context2.abrupt("return", console.log("[".concat(tiktoker, "] | Last video is the same as the last saved").italic.brightMagenta));

                        case 12:
                          _context2.next = 14;
                          return regeneratorRuntime.awrap(client.channels.fetch(client.social_log.get(guildid, "tiktok.dc_channel"))["catch"](function () {}));

                        case 14:
                          channel = _context2.sent;
                          channel.send(client.tiktok.get(tiktoker, "message").replace("{videoURL}", video.url).replace("{videoAuthorName}", author.name).replace("{videoTitle}", video.title).replace("{url}", video.url).replace("{author}", author.name).replace("{title}", video.title));
                          client.tiktok.set(tiktoker, video.id, "oldvid");
                          console.log("Notification sent !".italic.brightMagenta);
                          _context2.next = 23;
                          break;

                        case 20:
                          _context2.prev = 20;
                          _context2.t0 = _context2["catch"](1);
                          console.log(_context2.t0);

                        case 23:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, null, null, [[1, 20]]);
                });
              } catch (e) {
                console.log(String(e).grey);
              }
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};