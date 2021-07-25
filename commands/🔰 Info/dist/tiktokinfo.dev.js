"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require('moment');

var TikTokScraper = require('tiktok-scraper');

module.exports = {
  name: "tiktokinfo",
  aliases: ["tiktokinfo", "tiktokuserinfo", "tuserinfo", "uinfo", "tuser", "tiktokuser"],
  category: "🔰 Info",
  description: "Get information about a Twitter User",
  usage: "tiktokinfo <TWITTERUSER>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;

            (function _callee() {
              var timeSince, posts, embed, dDate, num, allposts, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, post;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      timeSince = function timeSince(date) {
                        var seconds = Math.floor((new Date() - date) / 1000);
                        var interval = seconds / 31536000;

                        if (interval > 1) {
                          return Math.floor(interval) + " years";
                        }

                        interval = seconds / 2592000;

                        if (interval > 1) {
                          return Math.floor(interval) + " months";
                        }

                        interval = seconds / 86400;

                        if (interval > 1) {
                          return Math.floor(interval) + " days";
                        }

                        interval = seconds / 3600;

                        if (interval > 1) {
                          return Math.floor(interval) + " hours";
                        }

                        interval = seconds / 60;

                        if (interval > 1) {
                          return Math.floor(interval) + " minutes";
                        }

                        return Math.floor(seconds) + " seconds";
                      };

                      _context.next = 4;
                      return regeneratorRuntime.awrap(TikTokScraper.user(args.join(" "), {
                        number: 5
                      }));

                    case 4:
                      posts = _context.sent;

                      if (posts.collector[0]) {
                        _context.next = 7;
                        break;
                      }

                      return _context.abrupt("return", message.reply("**NOT FOUND / No Posts!**"));

                    case 7:
                      author = posts.collector[0].authorMeta;
                      embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setThumbnail(author.avatar).setTitle("Information about: **`".concat(author.name, "`**")).setDescription("**Nickname:** `".concat(author.nickName, "`\n**Bio:**\n> ").concat(author.signature, "\n\n> **`").concat(author.fans, " Followers` | `").concat(author.following, " Follows` | `").concat(author.video, "Posts`**")); //.setFooter(`ID: ${user.id_str}`, user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url)

                      dDate = new Date();
                      num = dDate.getTime();
                      allposts = posts.collector.map(function (p) {
                        var Obj = {};
                        Obj.id = p.id;
                        Obj.url = p.webVideoUrl;
                        Obj.views = p.playCount;
                        Obj.shares = p.shareCount;
                        Obj.comments = p.commentCount;
                        Obj.mentions = p.mentions;
                        Obj.hashtags = p.hashtags;
                        var title = p.text;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                          for (var _iterator = p.hashtags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var tag = _step.value;
                            title = String(title).toLowerCase().replace(String(tag.name).toLowerCase(), "");
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

                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                          for (var _iterator2 = p.mentions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var mention = _step2.value;
                            title = String(title).toLowerCase().replace(String(mention), "");
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

                        Obj.title = title.split("#").join("");
                        if (title.length <= 1) Obj.title = p.id;
                        return Obj;
                      });
                      _iteratorNormalCompletion3 = true;
                      _didIteratorError3 = false;
                      _iteratorError3 = undefined;
                      _context.prev = 15;

                      for (_iterator3 = allposts[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        post = _step3.value;
                        embed.addField("**".concat(String(post.title).charAt(0).toUpperCase() + String(post.title).slice(1), "**"), "> **[Watch it](".concat(post.url, ") | `").concat(post.views, " Views` | `").concat(post.shares, " Shares` | `").concat(post.comments, " Comments`**"));
                      }

                      _context.next = 23;
                      break;

                    case 19:
                      _context.prev = 19;
                      _context.t0 = _context["catch"](15);
                      _didIteratorError3 = true;
                      _iteratorError3 = _context.t0;

                    case 23:
                      _context.prev = 23;
                      _context.prev = 24;

                      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                        _iterator3["return"]();
                      }

                    case 26:
                      _context.prev = 26;

                      if (!_didIteratorError3) {
                        _context.next = 29;
                        break;
                      }

                      throw _iteratorError3;

                    case 29:
                      return _context.finish(26);

                    case 30:
                      return _context.finish(23);

                    case 31:
                      message.channel.send(embed);
                      _context.next = 37;
                      break;

                    case 34:
                      _context.prev = 34;
                      _context.t1 = _context["catch"](0);
                      console.log(_context.t1);

                    case 37:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 34], [15, 19, 23, 31], [24,, 26, 30]]);
            })();

            _context2.next = 9;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](1);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```"))));

          case 9:
            return _context2.abrupt("return");

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 5]]);
  }
};