"use strict";

var config = require(".config.json");

var canvacord = require("canvacord");

var Discord = require("discord.js");

var Canvas = require("canvas");

Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
});
Canvas.registerFont("UbuntuMono.ttf", {
  family: "UbuntuMono"
});

var _require = require("./functions"),
    GetUser = _require.GetUser;

module.exports = function (client) {
  //log that the module is loaded
  client.on("message", function _callee3(message) {
    var databasing, anti_double_messages, Giving_Ranking_Points, LEVELUP, rank, leaderboardembed, leaderboard, newleaderboard, setxpcounter, setglobalxpcounter, addpoints, setpoints, removepoints, addlevel, setlevel, removelevel, resetranking, registerall, resetrankingall, addrandomall, levelinghelp, guildsettings, prefix, embedcolor, ranking, key, args, command, user;
    return regeneratorRuntime.async(function _callee3$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            databasing = function databasing(rankuser) {
              //if(rankuser && rankuser.bot) return console.log("GOTTA IGNORE BOT")
              client.points.ensure(rankuser ? "".concat(message.guild.id, "-").concat(rankuser.id) : "".concat(message.guild.id, "-").concat(message.author.id), {
                user: rankuser ? rankuser.id : message.author.id,
                usertag: rankuser ? rankuser.tag : message.author.tag,
                xpcounter: 1,
                guild: message.guild.id,
                points: 0,
                neededpoints: 400,
                level: 1,
                oldmessage: ""
              });
              client.points.set(rankuser ? "".concat(message.guild.id, "-").concat(rankuser.id) : "".concat(message.guild.id, "-").concat(message.author.id), rankuser ? rankuser.tag : message.author.tag, "usertag"); //set the usertag with EVERY message, if he has nitro his tag might change ;)

              client.points.ensure(message.guild.id, {
                setglobalxpcounter: 1
              });
              client.points.ensure(message.guild.id, {
                channel: false,
                disabled: false
              });
            };

            anti_double_messages = function anti_double_messages() {
              var oldmessage = client.points.get(key, "oldmessage");

              if (oldmessage.toLowerCase() === message.content.toLowerCase().replace(/\s+/g, '')) {
                return;
              }

              client.points.set(key, message.content.toLowerCase().replace(/\s+/g, ''), "oldmessage"); //setting the new old message
            };

            Giving_Ranking_Points = function Giving_Ranking_Points(thekey, maxnumber) {
              if (!thekey && message.author.bot) return;
              var setglobalxpcounter = client.points.get(message.guild.id, "setglobalxpcounter");
              if (!maxnumber) maxnumber = 5;
              var randomnum = (Math.floor(Math.random() * Number(maxnumber)) + 1) * setglobalxpcounter;
              randomnum *= Number(client.points.get(key, "xpcounter"));
              randomnum = Number(Math.floor(randomnum));
              var curPoints = client.points.get(thekey ? thekey : key, "points");
              var neededPoints = client.points.get(thekey ? thekey : key, "neededpoints");
              var leftpoints = neededPoints - curPoints;
              var toaddpoints = randomnum;
              addingpoints(toaddpoints, leftpoints);

              function addingpoints(toaddpoints, leftpoints) {
                if (toaddpoints >= leftpoints) {
                  client.points.set(thekey ? thekey : key, 0, "points"); //set points to 0

                  client.points.inc(thekey ? thekey : key, "level"); //add 1 to level
                  //HARDING UP!

                  var newLevel = client.points.get(thekey ? thekey : key, "level"); //get current NEW level

                  if (newLevel % 4 === 0) client.points.math(thekey ? thekey : key, "+", 100, "neededpoints");
                  var newneededPoints = client.points.get(thekey ? thekey : key, "neededpoints"); //get NEW needed Points

                  var newPoints = client.points.get(thekey ? thekey : key, "points"); //get current NEW points

                  addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!

                  LEVELUP();
                } else {
                  client.points.math(thekey ? thekey : key, "+", Number(toaddpoints), "points");
                }
              }
            };

            LEVELUP = function LEVELUP() {
              var newLevel, newPoints, newneededPoints, filtered, sorted, top10, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, data, canvas, ctx, bgimg, text, avatar, attachment, channel;

              return regeneratorRuntime.async(function LEVELUP$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      newLevel = client.points.get(key, "level"); //get current NEW level

                      newPoints = client.points.get(key, "points"); //get current NEW points

                      newneededPoints = client.points.get(key, "neededpoints"); //send ping and embed message

                      if (!client.points.get(message.guild.id, "disabled")) {
                        _context.next = 5;
                        break;
                      }

                      return _context.abrupt("return");

                    case 5:
                      filtered = client.points.filter(function (p) {
                        return p.guild === message.guild.id;
                      }).array();
                      sorted = filtered.sort(function (a, b) {
                        return b.level - a.level || b.points - a.points;
                      });
                      top10 = sorted.splice(0, message.guild.memberCount);
                      i = 0; //count server rank sometimes an error comes

                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context.prev = 12;
                      _iterator = top10[Symbol.iterator]();

                    case 14:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 29;
                        break;
                      }

                      data = _step.value;
                      _context.prev = 16;
                      i++;

                      if (!(data.user === message.author.id)) {
                        _context.next = 20;
                        break;
                      }

                      return _context.abrupt("break", 29);

                    case 20:
                      _context.next = 26;
                      break;

                    case 22:
                      _context.prev = 22;
                      _context.t0 = _context["catch"](16);
                      i = "X";
                      return _context.abrupt("break", 29);

                    case 26:
                      _iteratorNormalCompletion = true;
                      _context.next = 14;
                      break;

                    case 29:
                      _context.next = 35;
                      break;

                    case 31:
                      _context.prev = 31;
                      _context.t1 = _context["catch"](12);
                      _didIteratorError = true;
                      _iteratorError = _context.t1;

                    case 35:
                      _context.prev = 35;
                      _context.prev = 36;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 38:
                      _context.prev = 38;

                      if (!_didIteratorError) {
                        _context.next = 41;
                        break;
                      }

                      throw _iteratorError;

                    case 41:
                      return _context.finish(38);

                    case 42:
                      return _context.finish(35);

                    case 43:
                      canvas = Canvas.createCanvas(1802, 430);
                      ctx = canvas.getContext('2d');
                      ctx.font = '100px UbuntuMono';
                      ctx.fillStyle = "#2697FF";
                      _context.next = 49;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/levelup.png"));

                    case 49:
                      bgimg = _context.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height); //USERNAME

                      text = "".concat(message.author.username).trim();
                      if (text.length > 15) text = text.substr(0, 11) + "..";
                      text += " leveled up!";
                      _context.next = 56;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text, 475, 150));

                    case 56:
                      ctx.font = '80px UbuntuMono';
                      _context.next = 59;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, "New Level: ".concat(newLevel), 475, 290));

                    case 59:
                      _context.next = 61;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, " New Rank: #".concat(i), 475, 380));

                    case 61:
                      //AVATAR
                      ctx.beginPath();
                      ctx.arc(345 / 2 + 83.5, 345 / 2 + 36, 345 / 2, 0, Math.PI * 2, true);
                      ctx.closePath();
                      ctx.clip();
                      _context.next = 67;
                      return regeneratorRuntime.awrap(Canvas.loadImage(message.author.displayAvatarURL({
                        dynamic: false,
                        format: 'png',
                        size: 512
                      })));

                    case 67:
                      avatar = _context.sent;
                      ctx.drawImage(avatar, 83.5, 36, 345, 345); //get it as a discord attachment

                      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');

                      if (client.points.get(message.guild.id, "channel")) {
                        _context.next = 72;
                        break;
                      }

                      return _context.abrupt("return", message.channel.send(message.author, attachment));

                    case 72:
                      try {
                        channel = message.guild.channels.cache.get(client.points.get(message.guild.id, "channel"));
                        channel.send(message.author, attachment);
                      } catch (e) {
                        console.log(e);
                        message.channel.send(message.author, attachment);
                      }

                    case 73:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[12, 31, 35, 43], [16, 22], [36,, 38, 42]]);
            };

            rank = function rank(the_rankuser) {
              var rankuser, tempmessage, _key, filtered, sorted, top10, i, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, data, j, curpoints, curnextlevel, xp_data, canvas, ctx, bgimg, text, text4, text5, text7, diagonal, bar_text_length, bar_text_height, avatar, attachment;

              return regeneratorRuntime.async(function rank$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      rankuser = the_rankuser || message.author;

                      if (rankuser) {
                        _context2.next = 4;
                        break;
                      }

                      return _context2.abrupt("return", message.reply("PLEASE ADD A RANKUSER!"));

                    case 4:
                      _context2.next = 6;
                      return regeneratorRuntime.awrap(message.channel.send("Getting the Rank-Data of: **".concat(rankuser.tag, "** ...")));

                    case 6:
                      tempmessage = _context2.sent;
                      // if(rankuser.bot) return message.reply("NO BOTS!");
                      //Call the databasing function!
                      _key = "".concat(message.guild.id, "-").concat(rankuser.id);
                      databasing(rankuser); //do some databasing

                      filtered = client.points.filter(function (p) {
                        return p.guild === message.guild.id;
                      }).array();
                      sorted = filtered.sort(function (a, b) {
                        return b.level - a.level || b.points - a.points;
                      });
                      top10 = sorted.splice(0, message.guild.memberCount);
                      i = 0; //count server rank sometimes an error comes

                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context2.prev = 16;
                      _iterator2 = top10[Symbol.iterator]();

                    case 18:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context2.next = 33;
                        break;
                      }

                      data = _step2.value;
                      _context2.prev = 20;
                      i++;

                      if (!(data.user === rankuser.id)) {
                        _context2.next = 24;
                        break;
                      }

                      return _context2.abrupt("break", 33);

                    case 24:
                      _context2.next = 30;
                      break;

                    case 26:
                      _context2.prev = 26;
                      _context2.t0 = _context2["catch"](20);
                      i = "X";
                      return _context2.abrupt("break", 33);

                    case 30:
                      _iteratorNormalCompletion2 = true;
                      _context2.next = 18;
                      break;

                    case 33:
                      _context2.next = 39;
                      break;

                    case 35:
                      _context2.prev = 35;
                      _context2.t1 = _context2["catch"](16);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context2.t1;

                    case 39:
                      _context2.prev = 39;
                      _context2.prev = 40;

                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }

                    case 42:
                      _context2.prev = 42;

                      if (!_didIteratorError2) {
                        _context2.next = 45;
                        break;
                      }

                      throw _iteratorError2;

                    case 45:
                      return _context2.finish(42);

                    case 46:
                      return _context2.finish(39);

                    case 47:
                      j = 0; //count server rank sometimes an error comes

                      curpoints = Number(client.points.get(_key, "points").toFixed(2));
                      curnextlevel = Number(client.points.get(_key, "neededpoints").toFixed(2));
                      if (client.points.get(_key, "level") === undefined) i = "No Rank";
                      xp_data = {
                        avatar: rankuser.displayAvatarURL({
                          dynamic: false,
                          format: 'png',
                          size: 512
                        }),
                        text: {
                          cur_level: Number(client.points.get(_key, "level")),
                          rank: Number(i),
                          current: Number(curpoints.toFixed(2)),
                          needed: Number(curnextlevel.toFixed(2)),
                          percent: Number(curpoints.toFixed(2)) / Number(curnextlevel.toFixed(2)) * 100
                        }
                      };
                      canvas = Canvas.createCanvas(1772, 900);
                      ctx = canvas.getContext('2d');
                      ctx.font = '150px UbuntuMono';
                      ctx.fillStyle = "#2697FF";
                      _context2.next = 58;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/rankcard.png"));

                    case 58:
                      bgimg = _context2.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height); //USERNAME

                      text = "".concat(rankuser.username).trim();
                      if (text.length > 15) text = text.substr(0, 11) + "..";
                      _context2.next = 64;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text, 645, 300));

                    case 64:
                      //Discrimnator
                      text = "#".concat(rankuser.discriminator).trim();
                      _context2.next = 67;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text, 645, 475));

                    case 67:
                      ctx.font = '100px UbuntuMono';
                      ctx.fillStyle = "#6caae7"; //CHAT TEXT: 

                      text4 = "Level ".concat(xp_data.text.cur_level).trim();
                      _context2.next = 72;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text4, 255, 715));

                    case 72:
                      text5 = "Rank #".concat(xp_data.text.rank).trim();
                      _context2.next = 75;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text5, 1230, 715));

                    case 75:
                      ctx.font = '50px UbuntuMono';
                      ctx.fillStyle = "#9b9b9b";
                      ctx.textAlign = "right"; //CHAT TEXT: 

                      text7 = "".concat(shortenLargeNumber(String(xp_data.text.current), 3), "/").concat(shortenLargeNumber(String(xp_data.text.needed), 2));
                      _context2.next = 81;
                      return regeneratorRuntime.awrap(canvacord.Util.renderEmoji(ctx, text7, 1625, 840));

                    case 81:
                      ctx.fillStyle = "#2186e7"; //progressbar TEXT

                      diagonal = 0;
                      if (xp_data.text.percent > 0) diagonal += 1;
                      if (xp_data.text.percent > 1) diagonal += 1;
                      if (xp_data.text.percent > 2) diagonal += 1;
                      if (xp_data.text.percent > 3) diagonal += 1;
                      if (xp_data.text.percent > 4) diagonal += 1;
                      if (xp_data.text.percent > 5) diagonal += 1;
                      if (xp_data.text.percent > 6) diagonal += 1;
                      if (xp_data.text.percent > 7) diagonal += 1;
                      if (xp_data.text.percent > 8) diagonal += 1;
                      if (xp_data.text.percent > 9) diagonal += 1;
                      if (xp_data.text.percent > 10) diagonal += 1;
                      if (xp_data.text.percent > 11) diagonal += 1;
                      if (xp_data.text.percent > 12) diagonal += 1;
                      if (xp_data.text.percent > 13) diagonal += 1;
                      if (xp_data.text.percent > 14) diagonal += 1;
                      if (xp_data.text.percent > 15) diagonal += 1;
                      if (xp_data.text.percent > 84) diagonal -= 1;
                      if (xp_data.text.percent > 85) diagonal -= 1;
                      if (xp_data.text.percent > 86) diagonal -= 1;
                      if (xp_data.text.percent > 87) diagonal -= 1;
                      if (xp_data.text.percent > 88) diagonal -= 1;
                      if (xp_data.text.percent > 89) diagonal -= 1;
                      if (xp_data.text.percent > 90) diagonal -= 1;
                      if (xp_data.text.percent > 91) diagonal -= 1;
                      if (xp_data.text.percent > 92) diagonal -= 1;
                      if (xp_data.text.percent > 93) diagonal -= 1;
                      if (xp_data.text.percent > 94) diagonal -= 1;
                      if (xp_data.text.percent > 95) diagonal -= 1;
                      if (xp_data.text.percent > 96) diagonal -= 1;
                      if (xp_data.text.percent > 97) diagonal -= 1;
                      if (xp_data.text.percent > 98) diagonal -= 1;
                      if (xp_data.text.percent > 99) diagonal -= 1;
                      bar_text_length = 1465;
                      bar_text_height = 40;
                      ctx.save();
                      ctx.beginPath();
                      ctx.moveTo(163.5, 757);
                      ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100, 757);
                      ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100 - diagonal, 757 + bar_text_height);
                      ctx.lineTo(163.5, 757 + bar_text_height);
                      ctx.closePath();
                      ctx.fill();
                      ctx.restore(); //AVATAR

                      ctx.beginPath();
                      ctx.arc(470 / 2 + 130, 470 / 2 + 92, 470 / 2, 0, Math.PI * 2, true);
                      ctx.closePath();
                      ctx.clip();
                      _context2.next = 132;
                      return regeneratorRuntime.awrap(Canvas.loadImage(xp_data.avatar));

                    case 132:
                      avatar = _context2.sent;
                      ctx.drawImage(avatar, 130, 92, 470, 470); //get it as a discord attachment

                      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');
                      tempmessage["delete"]()["catch"](function (e) {
                        return console.log(e);
                      });
                      message.channel.send("Rank of: **".concat(rankuser.tag, "**"), attachment)["catch"](function (e) {
                        return console.log("ranking: " + e);
                      });
                      return _context2.abrupt("return");

                    case 140:
                      _context2.prev = 140;
                      _context2.t2 = _context2["catch"](0);
                      console.log("RANKING:".underline.red + " :: " + _context2.t2.stack.toString().red);
                      message.reply("PLEASE ADD A RANKUSER!");

                    case 144:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[0, 140], [16, 35, 39, 47], [20, 26], [40,, 42, 46]]);
            };

            leaderboardembed = function leaderboardembed() {
              var filtered = client.points.filter(function (p) {
                return p.guild === message.guild.id;
              }).array();
              var orilent;
              var sorted = filtered.sort(function (a, b) {
                return b.level - a.level || b.points - a.points;
              });
              var embeds = [];
              var j = 0;
              var maxnum = sorted.length;
              orilent = sorted.length;

              if (isNaN(maxnum)) {
                console.log("maximum_leaderboard NOT A NUMBER");
                maxnum = 50;
              }

              if (maxnum > sorted.length) maxnum = sorted.length + (25 - Number(String(sorted.length / 25).slice(2)));
              if (maxnum < 25) maxnum = 25; //do some databasing

              var userrank = 0;
              var filtered1 = client.points.filter(function (p) {
                return p.guild === message.guild.id;
              }).array();
              var sorted1 = filtered1.sort(function (a, b) {
                return b.level - a.level || b.points - a.points;
              });
              var top101 = sorted1.splice(0, message.guild.memberCount);
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = top101[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var _data = _step3.value;

                  try {
                    userrank++;
                    if (_data.user === message.author.id) break; //if its the right one then break it ;)
                  } catch (_unused4) {
                    userrank = "X";
                    break;
                  }
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

              for (var i = 25; i <= maxnum; i += 25) {
                var top = sorted.splice(0, 25);
                var embed = new Discord.MessageEmbed().setTitle("`".concat(message.guild.name, "` | Leaderboard | ").concat(i < orilent ? i : orilent, " / ").concat(orilent)).setTimestamp().setColor(embedcolor);
                var string = "";
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = top[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var data = _step4.value;
                    j++;

                    try {
                      if (j == 1) string += ":first_place: **".concat(data.usertag, "**: `Level: ").concat(data.level, " | Points: ").concat(shortenLargeNumber(data.points, 2), "`\n");else if (j == 2) string += ":second_place: **".concat(data.usertag, "**: `Level: ").concat(data.level, " | Points: ").concat(shortenLargeNumber(data.points, 2), "`\n");else if (j == 3) string += ":third_place: **".concat(data.usertag, "**: `Level: ").concat(data.level, " | Points: ").concat(shortenLargeNumber(data.points, 2), "`\n");else string += "`".concat(j, "`. **").concat(data.usertag, "**: `Level: ").concat(data.level, " | Points: ").concat(shortenLargeNumber(data.points, 2), "`\n");
                    } catch (_unused3) {}
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }

                embed.setDescription(string.substr(0, 2048));
                embed.setFooter("Your Rank: #".concat(userrank));
                embeds.push(embed);
              }

              return embeds;
            };

            leaderboard = function leaderboard() {
              var currentPage, embeds, lbembed, filter, collector;
              return regeneratorRuntime.async(function leaderboard$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      currentPage = 0;
                      embeds = leaderboardembed();

                      if (!(embeds.length == 1)) {
                        _context4.next = 4;
                        break;
                      }

                      return _context4.abrupt("return", message.channel.send(embeds[0])["catch"](function (e) {
                        return console.log("ranking: " + e);
                      }));

                    case 4:
                      _context4.next = 6;
                      return regeneratorRuntime.awrap(message.channel.send("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), embeds[currentPage])["catch"](function (e) {
                        return console.log("ranking: " + e);
                      }));

                    case 6:
                      lbembed = _context4.sent;
                      _context4.prev = 7;
                      _context4.next = 10;
                      return regeneratorRuntime.awrap(lbembed.react("⏪"));

                    case 10:
                      _context4.next = 12;
                      return regeneratorRuntime.awrap(lbembed.react("⏹"));

                    case 12:
                      _context4.next = 14;
                      return regeneratorRuntime.awrap(lbembed.react("⏩"));

                    case 14:
                      _context4.next = 19;
                      break;

                    case 16:
                      _context4.prev = 16;
                      _context4.t0 = _context4["catch"](7);
                      console.error(_context4.t0);

                    case 19:
                      filter = function filter(reaction, user) {
                        return ["⏪", "⏹", "⏩"].includes(reaction.emoji.name) && message.author.id === user.id;
                      };

                      collector = lbembed.createReactionCollector(filter, {
                        time: 60000
                      });
                      collector.on("collect", function _callee(reaction, user) {
                        return regeneratorRuntime.async(function _callee$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.prev = 0;

                                if (reaction.emoji.name === "⏩") {
                                  if (currentPage < embeds.length - 1) {
                                    currentPage++;
                                    queueEmbed.edit({
                                      content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                                      embed: embeds[currentPage]
                                    });
                                  }
                                } else if (reaction.emoji.name === "⏪") {
                                  if (currentPage !== 0) {
                                    --currentPage;
                                    queueEmbed.edit({
                                      content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                                      embed: embeds[currentPage]
                                    });
                                  }
                                } else {
                                  collector.stop();
                                  reaction.message.reactions.removeAll();
                                }

                                _context3.next = 4;
                                return regeneratorRuntime.awrap(reaction.users.remove(message.author.id));

                              case 4:
                                _context3.next = 9;
                                break;

                              case 6:
                                _context3.prev = 6;
                                _context3.t0 = _context3["catch"](0);
                                console.error(_context3.t0);

                              case 9:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, null, null, [[0, 6]]);
                      });

                    case 22:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, null, null, [[7, 16]]);
            };

            newleaderboard = function newleaderboard() {
              var tempmessage, filtered, sorted, embeds, j, maxnum, userrank, filtered1, sorted1, top101, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _data2, array_usernames, array_tag, array_textlevel, array_avatar, i, top, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, data, user, canvas, oldcanvas, ctx, bgimg;

              return regeneratorRuntime.async(function newleaderboard$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return regeneratorRuntime.awrap(message.channel.send("Getting the Leaderboard-Data of: **".concat(message.guild.name, "** ...")));

                    case 2:
                      tempmessage = _context6.sent;
                      filtered = client.points.filter(function (p) {
                        return p.guild === message.guild.id;
                      }).array();
                      sorted = filtered.sort(function (a, b) {
                        return b.level - a.level || b.points - a.points;
                      });
                      embeds = [];
                      j = 0;
                      maxnum = 10; //do some databasing

                      userrank = 0;
                      filtered1 = client.points.filter(function (p) {
                        return p.guild === message.guild.id;
                      }).array();
                      sorted1 = filtered1.sort(function (a, b) {
                        return b.level - a.level || b.points - a.points;
                      });
                      top101 = sorted1.splice(0, message.guild.memberCount);
                      _iteratorNormalCompletion5 = true;
                      _didIteratorError5 = false;
                      _iteratorError5 = undefined;
                      _context6.prev = 15;
                      _iterator5 = top101[Symbol.iterator]();

                    case 17:
                      if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                        _context6.next = 32;
                        break;
                      }

                      _data2 = _step5.value;
                      _context6.prev = 19;
                      userrank++;

                      if (!(_data2.user === message.author.id)) {
                        _context6.next = 23;
                        break;
                      }

                      return _context6.abrupt("break", 32);

                    case 23:
                      _context6.next = 29;
                      break;

                    case 25:
                      _context6.prev = 25;
                      _context6.t0 = _context6["catch"](19);
                      userrank = "X";
                      return _context6.abrupt("break", 32);

                    case 29:
                      _iteratorNormalCompletion5 = true;
                      _context6.next = 17;
                      break;

                    case 32:
                      _context6.next = 38;
                      break;

                    case 34:
                      _context6.prev = 34;
                      _context6.t1 = _context6["catch"](15);
                      _didIteratorError5 = true;
                      _iteratorError5 = _context6.t1;

                    case 38:
                      _context6.prev = 38;
                      _context6.prev = 39;

                      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                        _iterator5["return"]();
                      }

                    case 41:
                      _context6.prev = 41;

                      if (!_didIteratorError5) {
                        _context6.next = 44;
                        break;
                      }

                      throw _iteratorError5;

                    case 44:
                      return _context6.finish(41);

                    case 45:
                      return _context6.finish(38);

                    case 46:
                      array_usernames = [];
                      array_tag = [];
                      array_textlevel = [];
                      array_avatar = [];
                      i = 10;

                    case 51:
                      if (!(i <= maxnum)) {
                        _context6.next = 95;
                        break;
                      }

                      top = sorted.splice(0, 10);
                      _iteratorNormalCompletion6 = true;
                      _didIteratorError6 = false;
                      _iteratorError6 = undefined;
                      _context6.prev = 56;
                      _iterator6 = top[Symbol.iterator]();

                    case 58:
                      if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                        _context6.next = 78;
                        break;
                      }

                      data = _step6.value;
                      _context6.prev = 60;
                      _context6.next = 63;
                      return regeneratorRuntime.awrap(client.users.fetch(data.user));

                    case 63:
                      user = _context6.sent;
                      array_usernames.push(user.username);
                      array_tag.push(user.discriminator);
                      array_textlevel.push(data.level || 1);
                      array_avatar.push(user.displayAvatarURL({
                        size: 512,
                        format: "png"
                      }));
                      _context6.next = 75;
                      break;

                    case 70:
                      _context6.prev = 70;
                      _context6.t2 = _context6["catch"](60);
                      console.log(_context6.t2);
                      array_usernames.push("UNKNOWN");
                      array_textlevel.push("X");

                    case 75:
                      _iteratorNormalCompletion6 = true;
                      _context6.next = 58;
                      break;

                    case 78:
                      _context6.next = 84;
                      break;

                    case 80:
                      _context6.prev = 80;
                      _context6.t3 = _context6["catch"](56);
                      _didIteratorError6 = true;
                      _iteratorError6 = _context6.t3;

                    case 84:
                      _context6.prev = 84;
                      _context6.prev = 85;

                      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                        _iterator6["return"]();
                      }

                    case 87:
                      _context6.prev = 87;

                      if (!_didIteratorError6) {
                        _context6.next = 90;
                        break;
                      }

                      throw _iteratorError6;

                    case 90:
                      return _context6.finish(87);

                    case 91:
                      return _context6.finish(84);

                    case 92:
                      i += 10;
                      _context6.next = 51;
                      break;

                    case 95:
                      canvas = Canvas.createCanvas(830, 1030);
                      oldcanvas = false;
                      ctx = canvas.getContext('2d');
                      ctx.font = '75px UbuntuMono';
                      ctx.fillStyle = "#2697FF";
                      _context6.next = 102;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/first_leaderboard.png"));

                    case 102:
                      bgimg = _context6.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
                      array_usernames = array_usernames.slice(0, 10);
                      new Promise(function _callee2(res, rej) {
                        var _i, canvas, ctx, bgimg, text, text4, avatar;

                        return regeneratorRuntime.async(function _callee2$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                _i = 0;

                              case 1:
                                if (!(_i < array_usernames.length)) {
                                  _context5.next = 39;
                                  break;
                                }

                                _context5.prev = 2;
                                canvas = Canvas.createCanvas(830, 1030);
                                ctx = canvas.getContext('2d');
                                ctx.font = '75px UbuntuMono';
                                ctx.fillStyle = "#2697FF";
                                _context5.next = 9;
                                return regeneratorRuntime.awrap(Canvas.loadImage(oldcanvas == false ? "./assets/first_leaderboard.png" : oldcanvas.toBuffer()));

                              case 9:
                                bgimg = _context5.sent;
                                ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height); //USERNAME

                                text = "".concat(array_usernames[_i]).trim();
                                if (text.length > 10) text = text.substr(0, 8) + "..";
                                canvacord.Util.renderEmoji(ctx, text, 435, 85 + _i * 100);
                                ctx.font = '40px UbuntuMono';
                                ctx.fillStyle = "#6caae7"; //CHAT TEXT: 

                                text4 = "LVL ".concat(array_textlevel[_i]).trim();
                                canvacord.Util.renderEmoji(ctx, text4, 275, 100 + _i * 100 - 22.5);
                                ctx.font = '15px UbuntuMono';
                                ctx.fillStyle = "#7F7F7F";
                                canvacord.Util.renderEmoji(ctx, "#" + array_tag[_i], 440, 100 + _i * 100); //CHAT TEXT: 
                                //var text7 = `${shortenLargeNumber(String(xp_data.text.current), 3)}/${shortenLargeNumber(String(xp_data.text.needed), 2)}`
                                //canvacord.Util.renderEmoji(ctx, text7, 1625, 840);
                                //AVATAR

                                ctx.beginPath();
                                ctx.arc(80 / 2 + 30, 80 / 2 + 25 + _i * 100, 80 / 2, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                _context5.next = 27;
                                return regeneratorRuntime.awrap(Canvas.loadImage(array_avatar[_i]));

                              case 27:
                                avatar = _context5.sent;
                                ctx.drawImage(avatar, 30, 25 + _i * 100, 80, 80);
                                oldcanvas = canvas;
                                if (_i == array_usernames.length - 1) res(true);
                                _context5.next = 36;
                                break;

                              case 33:
                                _context5.prev = 33;
                                _context5.t0 = _context5["catch"](2);
                                if (_i == array_usernames.length - 1) res(true);

                              case 36:
                                _i++;
                                _context5.next = 1;
                                break;

                              case 39:
                                _context5.next = 41;
                                return regeneratorRuntime.awrap(res(true));

                              case 41:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, null, null, [[2, 33]]);
                      }).then(function () {
                        var attachment = new Discord.MessageAttachment(oldcanvas.toBuffer(), 'ranking-image.png');
                        tempmessage["delete"]()["catch"](function (e) {
                          return console.log(e);
                        });
                        message.channel.send("Top 10 Leaderboard of **".concat(message.guild.name, "**\nType: `leaderboard all` to see all Ranks\n*Rank is counted for the CHAT RANK*"), attachment)["catch"](function (e) {
                          return console.log("ranking: " + e);
                        });
                      });

                    case 106:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, null, [[15, 34, 38, 46], [19, 25], [39,, 41, 45], [56, 80, 84, 92], [60, 70], [85,, 87, 91]]);
            };

            setxpcounter = function setxpcounter() {
              try {
                /**
                     * GET the Rank User
                     * @info you can tag him
                     */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key2 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                if (!args[1]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setxpcounter @USER 2`");
                if (Number(args[1]) > 100) return message.reply("You cant set more then 100");
                client.points.set(_key2, Number(args[1]), "xpcounter"); //set points to 0

                var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully set XP COUNTER to `".concat(args[1], "x` for: `").concat(rankuser.tag, "`"));
                message.reply(embed);
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            setglobalxpcounter = function setglobalxpcounter() {
              try {
                if (!args[0]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setglobalxpcounter 2`");
                if (Number(args[1]) > 100) return message.reply("You cant set more then 100");
                client.points.set(message.guild.id, Number(args[0]), "setglobalxpcounter"); //set points to 0

                var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully set GLOBAL XP COUNTER to `".concat(args[0], "x` for: `").concat(message.guild.name, "`"));
                message.reply(embed);
              } catch (_unused7) {}
            };

            addpoints = function addpoints(amount) {
              try {
                var addingpoints = function addingpoints(toaddpoints, leftpoints) {
                  if (toaddpoints >= leftpoints) {
                    client.points.set(_key3, 0, "points"); //set points to 0

                    client.points.inc(_key3, "level"); //add 1 to level
                    //HARDING UP!

                    var newLevel = client.points.get(_key3, "level"); //get current NEW level

                    if (newLevel % 4 === 0) client.points.math(_key3, "+", 100, "neededpoints");
                    var newneededPoints = client.points.get(_key3, "neededpoints"); //get NEW needed Points

                    var newPoints = client.points.get(_key3, "points"); //get current NEW points
                    //THE INFORMATION EMBED 

                    var _embed = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                      dynamic: true
                    })).setDescription("You've leveled up to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints + toaddpoints - leftpoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor); //send ping and embed message only IF the adding will be completed!


                    if (toaddpoints - leftpoints < newneededPoints) message.channel.send(rankuser, _embed)["catch"](function (e) {
                      return console.log("ranking: " + e);
                    });
                    addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                  } else {
                    client.points.math(_key3, "+", Number(toaddpoints), "points");
                  }
                };

                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key3 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                var curPoints = client.points.get(_key3, "points");
                var neededPoints = client.points.get(_key3, "neededpoints");
                var leftpoints = neededPoints - curPoints;
                if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `addpoints @USER 100`");
                if (Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply("You cant add more then 10000");
                if (!amount) amount = Number(args[1]);
                if (amount < 0) removepoints(amount);
                var toaddpoints = amount;
                addingpoints(toaddpoints, leftpoints);
                var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully added `".concat(toaddpoints, " Points` to: `").concat(rankuser.tag, "`"));
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            setpoints = function setpoints() {
              try {
                var addingpoints = function addingpoints(toaddpoints, neededPoints) {
                  if (toaddpoints >= neededPoints) {
                    client.points.set(_key4, 0, "points"); //set points to 0

                    client.points.inc(_key4, "level"); //add 1 to level
                    //HARDING UP!

                    var newLevel = client.points.get(_key4, "level"); //get current NEW level

                    if (newLevel % 4 === 0) client.points.math(_key4, "+", 100, "neededpoints");
                    var newneededPoints = client.points.get(_key4, "neededpoints"); //get NEW needed Points

                    var newPoints = client.points.get(_key4, "points"); //get current NEW points
                    //THE INFORMATION EMBED 

                    var _embed2 = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                      dynamic: true
                    })).setDescription("You've leveled up to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor); //send ping and embed message


                    message.channel.send(rankuser, _embed2)["catch"](function (e) {
                      return console.log("ranking: " + e);
                    });
                    addingpoints(toaddpoints - neededPoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                  } else {
                    client.points.set(_key4, Number(toaddpoints), "points");
                  }
                };

                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key4 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                var toaddpoints = Number(args[1]);
                if (!args[1]) return message.reply("PLEASE ADD POINTS TO SET! Usage: `addpoints @USER 100`");
                if (Number(args[1]) > 10000) return message.reply("You cant set more then 10000");
                if (Number(args[1]) < 0) args[1] = 0;
                var neededPoints = client.points.get(_key4, "neededpoints");
                addingpoints(toaddpoints, neededPoints);
                var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully set `".concat(toaddpoints, " Points` to: `").concat(rankuser.tag, "`"));
                message.channel.send(embed)["catch"](function (e) {
                  return console.log("ranking: " + e);
                });
                rank(rankuser); //also sending the rankcard
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            removepoints = function removepoints(amount) {
              try {
                var removingpoints = function removingpoints(amount, curPoints) {
                  if (amount > curPoints) {
                    var removedpoints = amount - curPoints - 1;
                    client.points.set(_key5, neededPoints - 1, "points"); //set points to 0

                    if (client.points.get(_key5, "level") == 1) return message.reply("ALREADY AT 0 POINTS");
                    client.points.dec(_key5, "level"); //remove 1 from level
                    //HARDING UP!

                    var newLevel = client.points.get(_key5, "level"); //get current NEW level

                    if ((newLevel + 1) % 4 === 0) {
                      //if old level was divideable by 4 set neededpoints && points -100
                      client.points.math(_key5, "-", 100, "points");
                      client.points.math(_key5, "-", 100, "neededpoints");
                    }

                    var newneededPoints = client.points.get(_key5, "neededpoints"); //get NEW needed Points

                    var newPoints = client.points.get(_key5, "points"); //get current NEW points
                    //THE INFORMATION EMBED 

                    var _embed3 = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                      dynamic: true
                    })).setDescription("You've leveled down to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints - amount + removedpoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor); //send ping and embed message only IF the removing will be completed!


                    if (amount - removedpoints < neededPoints) message.channel.send(rankuser, _embed3)["catch"](function (e) {
                      return console.log("ranking: " + e);
                    });
                    removingpoints(amount - removedpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                  } else {
                    client.points.math(_key5, "-", Number(amount), "points");
                  }
                };

                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key5 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                var curPoints = client.points.get(_key5, "points");
                var neededPoints = client.points.get(_key5, "neededpoints");
                if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO REMOVE! Usage: `addpoints @USER 100`");
                if (!amount) amount = Number(args[1]);
                if (Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply("You cant remove more then 10000");
                if (amount < 0) addpoints(amount);
                removingpoints(amount, curPoints);
                var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully removed `".concat(amount, " Points` from: `").concat(rankuser.tag, "`"));
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            addlevel = function addlevel() {
              try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key6 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                var newLevel = client.points.get(_key6, "level");
                if (!args[1]) return message.reply("Please add the amount of Levels you want to add to! Usage: addlevel @User 4");
                if (Number(args[1]) > 10000) return message.reply("You cant add more then 10000");
                if (Number(args[1]) < 0) args[1] = 0;

                for (var i = 0; i < Number(args[1]); i++) {
                  client.points.set(_key6, 0, "points"); //set points to 0

                  client.points.inc(_key6, "level"); //add 1 to level
                  //HARDING UP!

                  newLevel = client.points.get(_key6, "level"); //get current NEW level

                  if (newLevel % 4 === 0) client.points.math(_key6, "+", 100, "neededpoints");
                }

                var newneededPoints = client.points.get(_key6, "neededpoints"); //get NEW needed Points

                var newPoints = client.points.get(_key6, "points"); //get current NEW points
                //THE INFORMATION EMBED 

                var embed = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                  dynamic: true
                })).setDescription("You've leveled up to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor);
                message.channel.send(rankuser, embed)["catch"](function (e) {
                  return console.log("ranking: " + e);
                });
                rank(rankuser); //also sending the rankcard

                var sssembed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully added ".concat(args[1], " Levels to: `").concat(rankuser.tag, "`"));
                message.reply(sssembed);
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            setlevel = function setlevel() {
              try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key7 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                if (!args[1]) return message.reply("Please add the amount of Levels you want to set to! Usage: setlevel @User 3");
                if (Number(args[1]) < 1) args[1] = 1;
                if (Number(args[1]) > 10000) return message.reply("You cant set more then 10000");
                client.points.set(_key7, Number(args[1]), "level"); //set level to the wanted level

                client.points.set(_key7, 0, "points"); //set the points to 0

                var newLevel = client.points.get(_key7, "level"); //set level to the wanted level

                var counter = Number(newLevel) / 4;
                client.points.set(_key7, 400, "neededpoints"); //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4

                for (var i = 0; i < Math.floor(counter); i++) {
                  client.points.math(_key7, "+", 100, "neededpoints");
                }

                var newneededPoints = client.points.get(_key7, "neededpoints"); //get NEW needed Points

                var newPoints = client.points.get(_key7, "points"); //get current NEW points
                //THE INFORMATION EMBED 

                var embed = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                  dynamic: true
                })).setDescription("You've leveled up to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor);
                message.channel.send(rankuser, embed)["catch"](function (e) {
                  return console.log("ranking: " + e);
                });
                rank(rankuser); //also sending the rankcard

                var sssembed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully set `".concat(rankuser.tag, "` to Level: ").concat(args[1]));
                message.reply(sssembed);
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            removelevel = function removelevel() {
              try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key8 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                var newLevel = client.points.get(_key8, "level");
                if (!args[1]) return message.reply("Please add the amount of Levels you want to remove to! Usage: removelevel @User 4");
                if (Number(args[1]) < 0) args[1] = 0;

                for (var i = 0; i < Number(args[1]); i++) {
                  client.points.set(_key8, 0, "points"); //set points to 0

                  client.points.dec(_key8, "level"); //add 1 to level
                  //HARDING UP!

                  newLevel = client.points.get(_key8, "level"); //get current NEW level

                  if (newLevel < 1) client.points.set(_key8, 1, "level"); //if smaller then 1 set to 1
                }

                snewLevel = client.points.get(_key8, "level"); //get current NEW level

                var counter = Number(snewLevel) / 4;
                client.points.set(_key8, 400, "neededpoints"); //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4

                for (var _i2 = 0; _i2 < Math.floor(counter); _i2++) {
                  client.points.math(_key8, "+", 100, "neededpoints");
                }

                var newneededPoints = client.points.get(_key8, "neededpoints"); //get NEW needed Points

                var newPoints = client.points.get(_key8, "points"); //get current NEW points
                //THE INFORMATION EMBED 

                var embed = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                  dynamic: true
                })).setDescription("You've leveled down to Level: **`".concat(newLevel, "`**! (Points: `").concat(newPoints, "` / `").concat(newneededPoints, "`) ")).setColor(embedcolor);
                message.channel.send(rankuser, embed)["catch"](function (e) {
                  return console.log("ranking: " + e);
                });
                rank(rankuser); //also sending the rankcard

                var sssembed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully removed `".concat(args[0], "` Levels from:  `").concat(rankuser.tag, "`"));
                message.reply(sssembed);
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            resetranking = function resetranking() {
              try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                var rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!"); // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!

                var _key9 = "".concat(message.guild.id, "-").concat(rankuser.id);

                databasing(rankuser);
                client.points.set(_key9, 1, "level"); //set level to 0

                client.points.set(_key9, 0, "points"); //set the points to 0

                client.points.set(_key9, 400, "neededpoints"); //set neededpoints to 0 for beeing sure

                client.points.set(_key9, "", "oldmessage"); //set old message to 0
                //THE INFORMATION EMBED 

                var embed = new Discord.MessageEmbed().setAuthor("Ranking of:  ".concat(rankuser.tag), rankuser.displayAvatarURL({
                  dynamic: true
                })).setDescription("You've been resetted to Level: **`1`**! (Points: `0` / `400`) ").setColor(embedcolor);
                message.channel.send(rankuser, embed)["catch"](function (e) {
                  return console.log("ranking: " + e);
                });
                rank(rankuser); //also sending the rankcard

                var sssembed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully resetted ranking from:  `".concat(rankuser.tag, "`"));
                message.reply(sssembed);
              } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red);
                message.reply("PLEASE ADD A RANKUSER!");
              }
            };

            registerall = function registerall() {
              var allmembers = message.guild.members.cache.keyArray();

              for (var i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                var rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
              }

              var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully registered everyone");
              message.reply(embed);
            };

            resetrankingall = function resetrankingall() {
              var allmembers = message.guild.members.cache.keyArray();

              for (var i = 0; i < allmembers.length; i++) {
                var rankuser = message.guild.members.cache.get(allmembers[i]).user;

                var _key10 = "".concat(message.guild.id, "-").concat(rankuser.id);

                client.points.set(_key10, 1, "level"); //set level to 0

                client.points.set(_key10, 0, "points"); //set the points to 0

                client.points.set(_key10, 400, "neededpoints"); //set neededpoints to 0 for beeing sure

                client.points.set(_key10, "", "oldmessage"); //set old message to 0
              }

              var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully resetted everyone");
              message.reply(embed);
            };

            addrandomall = function addrandomall() {
              var maxnum = 5;
              if (args[0]) maxnum = Number(args[0]);
              if (args[0] && Number(maxnum) > 10000) return message.reply("You cant add more then 10000");
              var allmembers = message.guild.members.cache.filter(function (member) {
                return !member.user.bot;
              }).keyArray();

              for (var i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                var rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
                if (rankuser.bot) continue;
                Giving_Ranking_Points("".concat(message.guild.id, "-").concat(rankuser.id), maxnum);
                Giving_Ranking_Points("".concat(message.guild.id, "-").concat(message.author.id), maxnum);
              }

              var embed = new Discord.MessageEmbed().setColor(embedcolor).setDescription("Successfully added ".concat(args[0], " Points to  everyone"));
              message.reply(embed);
            };

            levelinghelp = function levelinghelp() {
              var embed = new Discord.MessageEmbed().setTitle("`".concat(message.guild.name, "` | Ranking Commands")).setDescription("> **HELP:**  `".concat(prefix, "levelinghelp`")).setColor(embedcolor).addFields([{
                name: "`rank [@User]`",
                value: ">>> *Shows the Rank of a User*",
                inline: true
              }, {
                name: "`leaderboard`",
                value: ">>> *Shows the Top 10 Leaderboard*",
                inline: true
              }, {
                name: "`setxpcounter <@USER> <AMOUNT>`",
                value: ">>> *Changes the amount of how much to count, x1, x2, x3, ...*",
                inline: true
              }, {
                name: "`addpoints <@User> <Amount`",
                value: ">>> *Add a specific amount of Points to a User*",
                inline: true
              }, {
                name: "`setpoints <@User> <Amount`",
                value: ">>> *Set a specific amount of Points to a User*",
                inline: true
              }, {
                name: "`removepoints <@User> <Amount`",
                value: ">>> *Remove a specific amount of Points to a User*",
                inline: true
              }, {
                name: "`addlevel <@User> <Amount`",
                value: ">>> *Add a specific amount of Levels to a User*",
                inline: true
              }, {
                name: "`setlevel <@User> <Amount`",
                value: ">>> *Set a specific amount of Levels to a User*",
                inline: true
              }, {
                name: "`removelevel <@User> <Amount`",
                value: ">>> *Remove a specific amount of Levels to a User*",
                inline: true
              }, {
                name: "`resetranking <@User>`",
                value: ">>> *Resets the ranking of a User*",
                inline: true
              }, {
                name: "`setglobalxpcounter <AMOUNT>`",
                value: ">>> *Sets the global xp counter for this guild, standard 1*",
                inline: true
              }, {
                name: "\u200B",
                value: "\u200B",
                inline: true
              }, {
                name: "`registerall`",
                value: ">>> *Register everyone in the Server to the Database*",
                inline: true
              }, {
                name: "`resetrankingall`",
                value: ">>> *Reset ranking of everyone in this Server*",
                inline: true
              }, {
                name: "`addrandomall`",
                value: ">>> *Add a random amount of Points to everyone*",
                inline: true
              }]);
              message.channel.send(embed)["catch"](function (e) {
                return console.log("ranking: " + e);
              });
            };

            if (!(message.author.bot || !message.guild)) {
              _context7.next = 24;
              break;
            }

            return _context7.abrupt("return");

          case 24:
            client.setups.ensure(message.guild.id, {
              ranking: {
                enabled: true,
                backgroundimage: "null"
              }
            });
            client.settings.ensure(message.guild.id, {
              embed: {
                "color": ee.color,
                "thumb": true,
                "wrongcolor": ee.wrongcolor,
                "footertext": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).name : ee.footertext,
                "footericon": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).iconURL({
                  dynamic: true
                }) : ee.footericon
              }
            });
            guildsettings = client.settings.get(message.guild.id);
            prefix = guildsettings.prefix;
            embedcolor = guildsettings.embed.color || "#fffff9";
            ranking = client.setups.get(message.guild.id, "ranking");

            if (ranking.enabled) {
              _context7.next = 32;
              break;
            }

            return _context7.abrupt("return");

          case 32:
            key = "".concat(message.guild.id, "-").concat(message.author.id);
            databasing(message.author);
            args = message.content.slice(prefix.length).trim().split(/ +/g);
            command = args.shift().toLowerCase();

            if (!message.content.startsWith(prefix)) {
              _context7.next = 99;
              break;
            }

            _context7.t0 = command;
            _context7.next = _context7.t0 === "rank" ? 40 : _context7.t0 === "leaderboard" ? 45 : _context7.t0 === "lb" ? 45 : _context7.t0 === "top" ? 45 : _context7.t0 === "setxpcounter" ? 47 : _context7.t0 === "setglobalxpcounter" ? 51 : _context7.t0 === "addpoints" ? 55 : _context7.t0 === "setpoints" ? 59 : _context7.t0 === "removepoints" ? 63 : _context7.t0 === "addlevel" ? 67 : _context7.t0 === "setlevel" ? 71 : _context7.t0 === "removelevel" ? 75 : _context7.t0 === "resetranking" ? 79 : _context7.t0 === "registerall" ? 83 : _context7.t0 === "addrandomall" ? 87 : _context7.t0 === "resetrankingall" ? 91 : _context7.t0 === "levelhelp" ? 95 : _context7.t0 === "rankinghelp" ? 95 : _context7.t0 === "levelinghelp" ? 95 : _context7.t0 === "rankhelp" ? 95 : 97;
            break;

          case 40:
            _context7.next = 42;
            return regeneratorRuntime.awrap(GetUser(message, args[0]));

          case 42:
            user = _context7.sent;
            rank(user);
            return _context7.abrupt("break", 98);

          case 45:
            if (args[0]) {
              if (args[0].toLowerCase() === "all") {
                leaderboard();
              } else {
                newleaderboard();
              }
            } else newleaderboard();

            return _context7.abrupt("break", 98);

          case 47:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 49;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 49:
            setxpcounter();
            return _context7.abrupt("break", 98);

          case 51:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 53;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 53:
            setglobalxpcounter();
            return _context7.abrupt("break", 98);

          case 55:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 57;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 57:
            addpoints();
            return _context7.abrupt("break", 98);

          case 59:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 61;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 61:
            setpoints();
            return _context7.abrupt("break", 98);

          case 63:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 65;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 65:
            removepoints();
            return _context7.abrupt("break", 98);

          case 67:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 69;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 69:
            addlevel();
            return _context7.abrupt("break", 98);

          case 71:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 73;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 73:
            setlevel();
            return _context7.abrupt("break", 98);

          case 75:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 77;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 77:
            removelevel();
            return _context7.abrupt("break", 98);

          case 79:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 81;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 81:
            resetranking();
            return _context7.abrupt("break", 98);

          case 83:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 85;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 85:
            registerall();
            return _context7.abrupt("break", 98);

          case 87:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 89;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 89:
            addrandomall();
            return _context7.abrupt("break", 98);

          case 91:
            if (!(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD"))) {
              _context7.next = 93;
              break;
            }

            return _context7.abrupt("return", message.reply("You are not allowed to run this cmd!"));

          case 93:
            resetrankingall();
            return _context7.abrupt("break", 98);

          case 95:
            levelinghelp();
            return _context7.abrupt("break", 98);

          case 97:
            return _context7.abrupt("break", 98);

          case 98:
            return _context7.abrupt("return");

          case 99:
            anti_double_messages();
            Giving_Ranking_Points();
            _context7.next = 106;
            break;

          case 103:
            _context7.prev = 103;
            _context7.t1 = _context7["catch"](0);
            console.log("ranking: " + _context7.t1);

          case 106:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 103]]);
  });
}; //Coded by XG#2846!


function shortenLargeNumber(num, digits) {
  var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
      decimal;

  for (var i = units.length - 1; i >= 0; i--) {
    decimal = Math.pow(1000, i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
}