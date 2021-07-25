"use strict";

var request = require('request'),
    Discord = require('discord.js'),
    CronJob = require('cron').CronJob,
    config = require("../social_log/streamconfig.json"),
    fs = require('fs');

var _require = require('../handlers/functions'),
    databasing = _require.databasing,
    delay = _require.delay;

var moment = require("moment");

module.exports = function _callee4(client) {
  var CronJob, getStreams, getStreamData, getChannelData, getKey, UpdateAuthConfig;
  return regeneratorRuntime.async(function _callee4$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          UpdateAuthConfig = function _ref5() {
            var tempData, authKey, tempConfig;
            return regeneratorRuntime.async(function UpdateAuthConfig$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    tempData = JSON.parse(fs.readFileSync('./social_log/streamconfig.json'));
                    _context7.next = 3;
                    return regeneratorRuntime.awrap(getKey(tempData.twitch_clientID, tempData.twitch_secret));

                  case 3:
                    authKey = _context7.sent;

                    if (authKey) {
                      _context7.next = 6;
                      break;
                    }

                    return _context7.abrupt("return", console.log("NO AUTH"));

                  case 6:
                    tempConfig = JSON.parse(fs.readFileSync('./social_log/streamconfig.json'));
                    tempConfig.authToken = authKey;
                    fs.writeFileSync('./social_log/streamconfig.json', JSON.stringify(tempConfig, null, 3));

                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          };

          getKey = function _ref4(clientID, clientSecret) {
            return regeneratorRuntime.async(function getKey$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt("return", new Promise(function (resolve, reject) {
                      request.post("https://id.twitch.tv/oauth2/token?client_id=".concat(clientID, "&client_secret=").concat(clientSecret, "&grant_type=client_credentials"), function (error, res, body) {
                        if (error) {
                          return console.error(error);
                        }

                        try {
                          resolve(JSON.parse(body).access_token);
                        } catch (e) {
                          reject(e);
                        }
                      });
                    }));

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          };

          getChannelData = function _ref3(channelName, clientID, authkey) {
            return regeneratorRuntime.async(function getChannelData$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt("return", new Promise(function (resolve, reject) {
                      var headers = {
                        'client-id': clientID,
                        'Authorization': "Bearer ".concat(authkey)
                      };
                      request.get("https://api.twitch.tv/helix/search/channels?query=".concat(channelName), {
                        headers: headers
                      }, function (error, res, body) {
                        if (error) {
                          return console.error(error);
                        }

                        try {
                          resolve(JSON.parse(body).data[0]);
                        } catch (e) {
                          reject(e);
                        }
                      });
                    }));

                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          };

          getStreamData = function _ref2(channelName, clientID, authkey) {
            return regeneratorRuntime.async(function getStreamData$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", new Promise(function (resolve, reject) {
                      var headers = {
                        'Client-Id': clientID,
                        'Authorization': "Bearer ".concat(authkey)
                      };
                      request.get("https://api.twitch.tv/helix/streams?user_login=".concat(channelName), {
                        headers: headers
                      }, function (error, res, body) {
                        if (error) {
                          return console.error(error);
                        }

                        try {
                          resolve(JSON.parse(body));
                        } catch (e) {
                          reject(e);
                        }
                      });
                    }));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          };

          getStreams = function _ref(guild) {
            client.social_log.ensure(guild.id, {
              twitch: {
                DiscordServerId: guild.id,
                channelID: "",
                roleID_PING: "",
                roleID_GIVE: "",
                channels: []
              }
            });
            var tempData = client.social_log.get(guild.id, "twitch");
            if (!tempData.channels) return console.log("NO TWITCH DATA (TW-CHANNELS)".magenta);
            if (!tempData.channelID || tempData.channelID == undefined || tempData.channelID.length != 18) return console.log("NO TWITCH DATA (DCCHANNEL)".magenta);
            tempData.channels.map(function _callee3(chan, i) {
              var member, StreamData, ChannelData, embed;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (chan.ChannelName) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return", console.log("TWITCH - NO CHANNEL NAME FOUND :C".magenta));

                    case 2:
                      _context3.next = 4;
                      return regeneratorRuntime.awrap(guild.members.fetch(chan.DISCORD_USER_ID));

                    case 4:
                      member = _context3.sent;

                      if (member) {
                        _context3.next = 7;
                        break;
                      }

                      return _context3.abrupt("return", console.log("TWITCH - MEMBER NOT FOUND!".magenta));

                    case 7:
                      _context3.next = 9;
                      return regeneratorRuntime.awrap(getStreamData(chan.ChannelName, config.twitch_clientID, config.authToken));

                    case 9:
                      StreamData = _context3.sent;

                      if (StreamData) {
                        _context3.next = 12;
                        break;
                      }

                      return _context3.abrupt("return", console.log("TWITCH - F".magenta));

                    case 12:
                      if (!(!StreamData.data || StreamData.data.length == 0)) {
                        _context3.next = 15;
                        break;
                      }

                      if (member.roles.cache.has(tempData.roleID_GIVE)) member.roles.remove(tempData.roleID_GIVE)["catch"](function (e) {
                        return console.log("TWITCH - REMOVE ROLE | prevented bug".gray);
                      });
                      return _context3.abrupt("return", console.log("TWITCH - NO STREAM DATA AKA RETURN".magenta));

                    case 15:
                      StreamData = StreamData.data[0]; //ADD / REMOVE ROLE

                      if (chan.DISCORD_USER_ID) {
                        if (StreamData.type.toLowerCase() === "live") {
                          member.roles.add(tempData.roleID_GIVE)["catch"](function (e) {
                            return console.log("TWITCH - ADD ROLE | prevented bug".gray);
                          });
                        } else {
                          member.roles.remove(tempData.roleID_GIVE)["catch"](function (e) {
                            return console.log("TWITCH - REMOVE ROLE | prevented bug".gray);
                          });
                        }
                      } //get the channel data for the thumbnail image


                      _context3.next = 19;
                      return regeneratorRuntime.awrap(getChannelData(chan.ChannelName, config.twitch_clientID, config.authToken));

                    case 19:
                      ChannelData = _context3.sent;

                      if (ChannelData) {
                        _context3.next = 22;
                        break;
                      }

                      return _context3.abrupt("return", console.log("TWITCH - NO TWITCH CHANNEL DATA INFORMATION FOUND".magenta));

                    case 22:
                      //structure for the embed
                      embed = new Discord.MessageEmbed().setColor("BLUE").setURL("https://www.twitch.tv/".concat(StreamData.user_login)).setDescription(StreamData.title ? StreamData.title : "\u200B").setTitle("\uD83D\uDD34 ".concat(StreamData.user_name, " is now live")).addField("Playing:", "`".concat(StreamData.game_name ? StreamData.game_name : "Unknown Game", "`"), true).addField("Viewers:", "".concat(StreamData.viewer_count ? "`".concat(StreamData.viewer_count, "`") : "~~`0`~~"), true).addField("Twitch:", "[Watch Stream](https://www.twitch.tv/".concat(StreamData.user_login, ")"), true).setFooter("Check his Stream out ;)").setImage("https://static-cdn.jtvnw.net/previews-ttv/live_user_".concat(StreamData.user_login, "-640x360.jpg?cacheBypass=").concat(Math.random().toString())).setThumbnail(ChannelData.thumbnail_url).setTimestamp(); //get the assigned channel

                      client.channels.fetch(tempData.channelID).then(function (ch) {
                        if (chan.twitch_stream_id != StreamData.id) {
                          var channelObj = tempData.channels[i];
                          member.roles.add(tempData.roleID_GIVE)["catch"](function (e) {
                            return console.log("TWITCH - ADD ROLE | prevented bug".gray);
                          });
                          ch.send("".concat(channelObj.message.length > 0 ? channelObj.message.substr(0, 2000) : "\u200B"), embed).then(function (msg) {
                            channelObj.twitch_stream_id = StreamData.id;

                            if (tempData.roleID_PING && tempData.roleID_PING.length > 2) {
                              ch.send("<@&".concat(tempData.roleID_PING, ">")).then(function (msg) {
                                return msg["delete"]()["catch"](function (e) {
                                  return console.log("TWITCH - prevented delete bug".gray);
                                });
                              })["catch"](function (e) {
                                return console.log("prevented send bug role".gray);
                              });
                            }

                            client.social_log.set(ch.guild.id, JSON.parse(tempData, null, 3), "twitch");
                            console.log("TWITCH - NOTIFICATION SENT: https://www.twitch.tv/".concat(StreamData.user_login).magenta); //fs.writeFileSync('./social_log/streamconfig.json', JSON.stringify(tempData, null, 3))
                          })["catch"](function (e) {
                            return console.log("TWITCH - prevented send bug embed".gray);
                          });
                        }
                      });

                    case 24:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
          };

          //function that will run the checks
          CronJob = require('cron').CronJob;
          client.Joblivelog = new CronJob('0 */7 * * * *', function _callee() {
            var guilds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, g, guild;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(delay(1 * 60 * 1000));

                  case 2:
                    console.log("CHECK TWITCH - ".concat(moment().format("LLLL")).magenta);
                    guilds = client.social_log.filterArray(function (v) {
                      return v.twitch && v.twitch.channels && v.twitch.channels.length > 0 && v.twitch && v.twitch.channelID && v.twitch.channelID.length > 1;
                    }).map(function (v) {
                      return v.twitch;
                    });
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 7;
                    _iterator = guilds[Symbol.iterator]();

                  case 9:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 20;
                      break;
                    }

                    g = _step.value;
                    guild = client.guilds.cache.get(g.DiscordServerId);

                    if (guild) {
                      _context.next = 14;
                      break;
                    }

                    return _context.abrupt("continue", 17);

                  case 14:
                    getStreams(guild);
                    _context.next = 17;
                    return regeneratorRuntime.awrap(delay(1500));

                  case 17:
                    _iteratorNormalCompletion = true;
                    _context.next = 9;
                    break;

                  case 20:
                    _context.next = 26;
                    break;

                  case 22:
                    _context.prev = 22;
                    _context.t0 = _context["catch"](7);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 26:
                    _context.prev = 26;
                    _context.prev = 27;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 29:
                    _context.prev = 29;

                    if (!_didIteratorError) {
                      _context.next = 32;
                      break;
                    }

                    throw _iteratorError;

                  case 32:
                    return _context.finish(29);

                  case 33:
                    return _context.finish(26);

                  case 34:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[7, 22, 26, 34], [27,, 29, 33]]);
          }, null, true, 'America/Los_Angeles'); //update the authorization key every hour

          CronJob = require('cron').CronJob;
          client.Joblivelog2 = new CronJob('0 * * * *', function () {
            UpdateAuthConfig();
          }, null, true, 'America/Los_Angeles');
          client.on('ready', function _callee2() {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    client.Joblivelog.start();
                    client.Joblivelog2.start();
                    UpdateAuthConfig();
                    console.log("CHECK TWITCH - ".concat(moment().format("LLLL")).magenta);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  });
};