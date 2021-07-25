"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Discord = require("discord.js");

var _require = require("discord.js"),
    Client = _require.Client,
    Collection = _require.Collection,
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var emoji = require("../base-system/emoji.json");

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var radios = require("../base-system/radiostations.json");

var ms = require("ms");

var officegen = require('officegen');

var fs = require('fs');

module.exports.ensure_economy_user = ensure_economy_user;
module.exports.nFormatter = nFormatter;
module.exports.create_transcript = create_transcript;
module.exports.databasing = databasing;
module.exports.simple_databasing = simple_databasing;
module.exports.reset_DB = reset_DB;
module.exports.change_status = change_status;
module.exports.check_voice_channels = check_voice_channels;
module.exports.check_created_voice_channels = check_created_voice_channels;
module.exports.create_join_to_create_Channel = create_join_to_create_Channel;
module.exports.getMember = getMember;
module.exports.shuffle = shuffle;
module.exports.formatDate = formatDate;
module.exports.promptMessage = promptMessage;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.duration = duration;
module.exports.getRandomNum = getRandomNum;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.stations = stations;
module.exports.swap_pages2 = swap_pages2;
module.exports.swap_pages = swap_pages;
module.exports.escapeRegex = escapeRegex;
module.exports.autoplay = autoplay;
module.exports.arrayMove = arrayMove;
module.exports.edit_msg = edit_msg;
module.exports.send_roster = send_roster;
module.exports.edit_msg2 = edit_msg2;
module.exports.send_roster2 = send_roster2;
module.exports.edit_msg3 = edit_msg3;
module.exports.send_roster3 = send_roster3;
module.exports.isValidURL = isValidURL;
module.exports.GetUser = GetUser;
module.exports.GetRole = GetRole;
module.exports.GetGlobalUser = GetGlobalUser;
module.exports.parseMilliseconds = parseMilliseconds;

function parseMilliseconds(milliseconds) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Expected a number');
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
  };
}

function isValidURL(string) {
  var args = string.split(" ");
  var url;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arg = _step.value;

      try {
        url = new URL(arg);
        url = url.protocol === "http:" || url.protocol === "https:";
        break;
      } catch (_) {
        url = false;
      }
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

  return url;
}

;

function GetUser(message, arg) {
  var errormessage = "I failed finding that User...";
  return new Promise(function _callee(resolve, reject) {
    var args, client, user, alluser;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = arg, client = message.client;

            if (!(!client || !message)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", reject("CLIENT IS NOT DEFINED"));

          case 3:
            if (!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
            user = message.mentions.users.first();

            if (!(!user && args[0] && args[0].length == 18)) {
              _context.next = 14;
              break;
            }

            _context.next = 8;
            return regeneratorRuntime.awrap(client.users.fetch(args[0]));

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", reject(errormessage));

          case 11:
            return _context.abrupt("return", resolve(user));

          case 14:
            if (!(!user && args[0])) {
              _context.next = 32;
              break;
            }

            alluser = message.guild.members.cache.map(function (member) {
              return String(member.user.tag).toLowerCase();
            });
            user = alluser.find(function (user) {
              return user.startsWith(args.join(" ").toLowerCase());
            });
            user = message.guild.members.cache.find(function (me) {
              return String(me.user.tag).toLowerCase() == user;
            });

            if (!(!user || user == null || !user.id)) {
              _context.next = 24;
              break;
            }

            alluser = message.guild.members.cache.map(function (member) {
              return String(member.displayName + "#" + member.user.discriminator).toLowerCase();
            });
            user = alluser.find(function (user) {
              return user.startsWith(args.join(" ").toLowerCase());
            });
            user = message.guild.members.cache.find(function (me) {
              return String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user;
            });

            if (!(!user || user == null || !user.id)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", reject(errormessage));

          case 24:
            _context.next = 26;
            return regeneratorRuntime.awrap(client.users.fetch(user.user.id));

          case 26:
            user = _context.sent;

            if (user) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", reject(errormessage));

          case 29:
            return _context.abrupt("return", resolve(user));

          case 32:
            user = message.mentions.users.first() || message.author;
            return _context.abrupt("return", resolve(user));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}

function GetRole(message, arg) {
  var errormessage = "I failed finding that Role...";
  return new Promise(function _callee2(resolve, reject) {
    var args, client, user, alluser;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            args = arg, client = message.client;

            if (!(!client || !message)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", reject("CLIENT IS NOT DEFINED"));

          case 3:
            if (!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
            user = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first();

            if (!(!user && args[0] && args[0].length == 18)) {
              _context2.next = 12;
              break;
            }

            user = message.guild.roles.cache.get(args[0]);

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", reject(errormessage));

          case 9:
            return _context2.abrupt("return", resolve(user));

          case 12:
            if (!(!user && args[0])) {
              _context2.next = 21;
              break;
            }

            alluser = message.guild.roles.cache.map(function (role) {
              return String(role.name).toLowerCase();
            });
            user = alluser.find(function (r) {
              return r.split(" ").join("").includes(args.join("").toLowerCase());
            });
            user = message.guild.roles.cache.find(function (role) {
              return String(role.name).toLowerCase() === user;
            });

            if (user) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", reject(errormessage));

          case 18:
            return _context2.abrupt("return", resolve(user));

          case 21:
            user = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first();

            if (user) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return", reject(errormessage));

          case 24:
            return _context2.abrupt("return", resolve(user));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

function GetGlobalUser(message, arg) {
  var errormessage = "I failed finding that User...";
  return new Promise(function _callee3(resolve, reject) {
    var args, client, user, alluser, allmembers, guilds, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, g, members, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, m;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args = arg, client = message.client;

            if (!(!client || !message)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", reject("CLIENT IS NOT DEFINED"));

          case 3:
            if (!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
            user = message.mentions.users.first();

            if (!(!user && args[0] && args[0].length == 18)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 8;
            return regeneratorRuntime.awrap(client.users.fetch(args[0]));

          case 8:
            user = _context3.sent;

            if (user) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", reject(errormessage));

          case 11:
            return _context3.abrupt("return", resolve(user));

          case 14:
            if (!(!user && args[0])) {
              _context3.next = 76;
              break;
            }

            alluser = [], allmembers = [];
            guilds = client.guilds.cache.array();
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 20;
            _iterator2 = guilds[Symbol.iterator]();

          case 22:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 47;
              break;
            }

            g = _step2.value;
            members = g.members.cache.array();
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 28;

            for (_iterator3 = members[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              m = _step3.value;
              alluser.push(m.user.tag);
              allmembers.push(m);
            }

            _context3.next = 36;
            break;

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](28);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 36:
            _context3.prev = 36;
            _context3.prev = 37;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 39:
            _context3.prev = 39;

            if (!_didIteratorError3) {
              _context3.next = 42;
              break;
            }

            throw _iteratorError3;

          case 42:
            return _context3.finish(39);

          case 43:
            return _context3.finish(36);

          case 44:
            _iteratorNormalCompletion2 = true;
            _context3.next = 22;
            break;

          case 47:
            _context3.next = 53;
            break;

          case 49:
            _context3.prev = 49;
            _context3.t1 = _context3["catch"](20);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t1;

          case 53:
            _context3.prev = 53;
            _context3.prev = 54;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 56:
            _context3.prev = 56;

            if (!_didIteratorError2) {
              _context3.next = 59;
              break;
            }

            throw _iteratorError2;

          case 59:
            return _context3.finish(56);

          case 60:
            return _context3.finish(53);

          case 61:
            user = alluser.find(function (user) {
              return user.startsWith(args.join(" ").toLowerCase());
            });
            user = allmembers.find(function (me) {
              return String(me.user.tag).toLowerCase() == user;
            });

            if (!(!user || user == null || !user.id)) {
              _context3.next = 68;
              break;
            }

            user = alluser.find(function (user) {
              return user.startsWith(args.join(" ").toLowerCase());
            });
            user = allmembers.find(function (me) {
              return String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user;
            });

            if (!(!user || user == null || !user.id)) {
              _context3.next = 68;
              break;
            }

            return _context3.abrupt("return", reject(errormessage));

          case 68:
            _context3.next = 70;
            return regeneratorRuntime.awrap(client.users.fetch(user.user.id));

          case 70:
            user = _context3.sent;

            if (user) {
              _context3.next = 73;
              break;
            }

            return _context3.abrupt("return", reject(errormessage));

          case 73:
            return _context3.abrupt("return", resolve(user));

          case 76:
            user = message.mentions.users.first() || message.author;
            return _context3.abrupt("return", resolve(user));

          case 78:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[20, 49, 53, 61], [28, 32, 36, 44], [37,, 39, 43], [54,, 56, 60]]);
  });
}

function edit_msg(client, guild) {
  edit_Roster_msg(client, guild, client.roster);
}

function edit_msg2(client, guild) {
  edit_Roster_msg(client, guild, client.roster2);
}

function edit_msg3(client, guild) {
  edit_Roster_msg(client, guild, client.roster3);
}

function send_roster(client, guild) {
  send_roster_msg(client, guild, client.roster);
}

function send_roster2(client, guild) {
  send_roster_msg(client, guild, client.roster2);
}

function send_roster3(client, guild) {
  send_roster_msg(client, guild, client.roster3);
}
/**
 * function edit_Roster_msg
 * @param {*} client | The Discord Bot Client
 * @param {*} guild | The Guild to edit the Message at
 * @param {*} the_roster_db | the Database of the Roster
 * @returns true / false + edits the message
 */


function edit_Roster_msg(client, guild, the_roster_db) {
  var data, es, channel, _message, totalbreak, rosterembed, rosterroles, i, role, leftnum, memberarray, _i, thearray, _memberarray, _i2, _memberarray2, _i3, _memberarray3, _i4, _memberarray4, _i5, _memberarray5, _i6, _memberarray6, _i7, _memberarray7, _i8;

  return regeneratorRuntime.async(function edit_Roster_msg$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          data = the_roster_db.get(guild.id); //get the EMBED SETTINGS

          es = client.settings.get(guild.id, "embed"); //if the rosterchannel is not valid, then send error + return

          if (!(data.rosterchannel == "notvalid")) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return");

        case 5:
          //console.log("Roster Channel not valid | :: | " + data.rosterchannel);
          //get the channel from the guild
          channel = guild.channels.cache.get(data.rosterchannel); //get the channel from the client if not found from the guild

          if (!channel) channel = client.channels.cache.get(data.rosterchannel); //if the rosterchannel is not found, then send error + return

          if (channel) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return");

        case 9:
          if (!(data.rostermessage.length < 2)) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return");

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(channel.messages.fetch(data.rostermessage));

        case 13:
          _message = _context4.sent;

          if (!(!_message || _message == null || !_message.id || _message.id == null)) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", send_roster(client, guild));

        case 16:
          //define a variable for the total break of the loop later
          totalbreak = false; //define the embed

          rosterembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle(String(data.rostertitle).substr(0, 256)); //get rosterole and loop through every single role

          rosterroles = data.rosterroles; //if there are no roles added add this to the embed

          if (rosterroles.length === 0) rosterembed.addField("NO ROLES ADDED", "Add them with: `".concat(client.settings.get(guild.id, "prefix"), "setup-roster`")); //loop through every single role

          i = 0;

        case 21:
          if (!(i < rosterroles.length)) {
            _context4.next = 233;
            break;
          }

          _context4.next = 24;
          return regeneratorRuntime.awrap(guild.roles.fetch(rosterroles[i]));

        case 24:
          role = _context4.sent;

          if (!(!role || role == undefined || !role.members || role.members == undefined)) {
            _context4.next = 27;
            break;
          }

          return _context4.abrupt("continue", 230);

        case 27:
          if (!(rosterembed.length > 5900)) {
            _context4.next = 29;
            break;
          }

          return _context4.abrupt("break", 233);

        case 29:
          //get the maximum field value length on an variabel
          leftnum = 1024; //if the length is bigger then the maximum length - the leftnumber

          if (rosterembed.length > 6000 - leftnum) {
            //set the left number to the maximumlength - the leftnumber
            leftnum = rosterembed.length - leftnum - 100;
          } //try to send the roster with the right style..


          if (!(data.rosterstyle == "1")) {
            _context4.next = 56;
            break;
          }

          //define the memberarray
          memberarray = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | `").concat(member.user.tag, "`");
          }); //loopthrough the array for 20 members / page

          _i = 0;

        case 34:
          if (!(_i < memberarray.length)) {
            _context4.next = 53;
            break;
          }

          thearray = memberarray;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 38;
            break;
          }

          return _context4.abrupt("break", 53);

        case 38:
          if (!(!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)) {
            _context4.next = 49;
            break;
          }

          _context4.prev = 39;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i, _i + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 53);

        case 44:
          _context4.prev = 44;
          _context4.t0 = _context4["catch"](39);
          console.log(_context4.t0);

        case 47:
          _context4.next = 50;
          break;

        case 49:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i, _i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 50:
          _i += 20;
          _context4.next = 34;
          break;

        case 53:
          //if there are no members who have this role, do this
          if (memberarray.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 56:
          if (!(data.rosterstyle == "2")) {
            _context4.next = 81;
            break;
          }

          //define the memberarray
          _memberarray = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, ">");
          }); //loopthrough the array for 20 members / page

          _i2 = 0;

        case 59:
          if (!(_i2 < _memberarray.length)) {
            _context4.next = 78;
            break;
          }

          thearray = _memberarray;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 63;
            break;
          }

          return _context4.abrupt("break", 78);

        case 63:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray.length < 20)) {
            _context4.next = 74;
            break;
          }

          _context4.prev = 64;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i2, _i2 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 78);

        case 69:
          _context4.prev = 69;
          _context4.t1 = _context4["catch"](64);
          console.log(_context4.t1);

        case 72:
          _context4.next = 75;
          break;

        case 74:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i2, _i2 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 75:
          _i2 += 20;
          _context4.next = 59;
          break;

        case 78:
          //if there are no members who have this role, do this
          if (_memberarray.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 81:
          if (!(data.rosterstyle == "3")) {
            _context4.next = 106;
            break;
          }

          //define the memberarray
          _memberarray2 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " **").concat(member.user.tag, "**");
          }); //loopthrough the array for 20 members / page

          _i3 = 0;

        case 84:
          if (!(_i3 < _memberarray2.length)) {
            _context4.next = 103;
            break;
          }

          thearray = _memberarray2;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 88;
            break;
          }

          return _context4.abrupt("break", 103);

        case 88:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray2.length < 20)) {
            _context4.next = 99;
            break;
          }

          _context4.prev = 89;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i3, _i3 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 103);

        case 94:
          _context4.prev = 94;
          _context4.t2 = _context4["catch"](89);
          console.log(_context4.t2);

        case 97:
          _context4.next = 100;
          break;

        case 99:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i3, _i3 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 100:
          _i3 += 20;
          _context4.next = 84;
          break;

        case 103:
          //if there are no members who have this role, do this   
          if (_memberarray2.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 106:
          if (!(data.rosterstyle == "4")) {
            _context4.next = 131;
            break;
          }

          //define the memberarray
          _memberarray3 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " **").concat(member.user.username, "**");
          }); //loopthrough the array for 20 members / page

          _i4 = 0;

        case 109:
          if (!(_i4 < _memberarray3.length)) {
            _context4.next = 128;
            break;
          }

          thearray = _memberarray3;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 113;
            break;
          }

          return _context4.abrupt("break", 128);

        case 113:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray3.length < 20)) {
            _context4.next = 124;
            break;
          }

          _context4.prev = 114;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i4, _i4 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 128);

        case 119:
          _context4.prev = 119;
          _context4.t3 = _context4["catch"](114);
          console.log(_context4.t3);

        case 122:
          _context4.next = 125;
          break;

        case 124:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i4, _i4 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 125:
          _i4 += 20;
          _context4.next = 109;
          break;

        case 128:
          //if there are no members who have this role, do this
          if (_memberarray3.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 131:
          if (!(data.rosterstyle == "5")) {
            _context4.next = 153;
            break;
          }

          //define the memberarray
          _memberarray4 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | `").concat(member.user.id, "`");
          }); //loopthrough the array for 20 members / page

          _i5 = 0;

        case 134:
          if (!(_i5 < _memberarray4.length)) {
            _context4.next = 142;
            break;
          }

          thearray = _memberarray4;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 138;
            break;
          }

          return _context4.abrupt("break", 142);

        case 138:
          if (!the_roster_db.get(guild.id, "showallroles") || _memberarray4.length < 20) try {
            rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i5, _i5 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          } else try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i5, _i5 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 139:
          _i5 += 20;
          _context4.next = 134;
          break;

        case 142:
          if (!(_memberarray4.length === 0)) {
            _context4.next = 151;
            break;
          }

          _context4.prev = 143;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 233);

        case 148:
          _context4.prev = 148;
          _context4.t4 = _context4["catch"](143);
          console.log(_context4.t4);

        case 151:
          _context4.next = 228;
          break;

        case 153:
          if (!(data.rosterstyle == "6")) {
            _context4.next = 180;
            break;
          }

          //define the memberarray
          _memberarray5 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | **").concat(member.user.username, "**");
          }); //loopthrough the array for 20 members / page

          _i6 = 0;

        case 156:
          if (!(_i6 < _memberarray5.length)) {
            _context4.next = 177;
            break;
          }

          thearray = _memberarray5;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 160;
            break;
          }

          return _context4.abrupt("break", 177);

        case 160:
          if (thearray) {
            _context4.next = 162;
            break;
          }

          return _context4.abrupt("return");

        case 162:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray5.length < 20)) {
            _context4.next = 173;
            break;
          }

          _context4.prev = 163;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i6, _i6 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 177);

        case 168:
          _context4.prev = 168;
          _context4.t5 = _context4["catch"](163);
          console.log(_context4.t5);

        case 171:
          _context4.next = 174;
          break;

        case 173:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i6, _i6 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 174:
          _i6 += 20;
          _context4.next = 156;
          break;

        case 177:
          //if there are no members who have this role, do this
          if (_memberarray5.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 180:
          if (!(data.rosterstyle == "7")) {
            _context4.next = 205;
            break;
          }

          //define the memberarray
          _memberarray6 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | **").concat(member.user.tag, "**");
          }); //loopthrough the array for 20 members / page

          _i7 = 0;

        case 183:
          if (!(_i7 < _memberarray6.length)) {
            _context4.next = 202;
            break;
          }

          thearray = _memberarray6;

          if (!(rosterembed.length > 5000)) {
            _context4.next = 187;
            break;
          }

          return _context4.abrupt("break", 202);

        case 187:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray6.length < 20)) {
            _context4.next = 198;
            break;
          }

          _context4.prev = 188;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i7, _i7 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 202);

        case 193:
          _context4.prev = 193;
          _context4.t6 = _context4["catch"](188);
          console.log(_context4.t6);

        case 196:
          _context4.next = 199;
          break;

        case 198:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i7, _i7 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 199:
          _i7 += 20;
          _context4.next = 183;
          break;

        case 202:
          //if there are no members who have this role, do this
          if (_memberarray6.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

          _context4.next = 228;
          break;

        case 205:
          //define the memberarray
          _memberarray7 = role.members.map(function (member) {
            return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | `").concat(member.user.tag, "`");
          }); //loopthrough the array for 20 members / page

          _i8 = 0;

        case 207:
          if (!(_i8 < _memberarray7.length)) {
            _context4.next = 227;
            break;
          }

          if (rosterembed.length > 5000) leftnum = 800;

          if (!(rosterembed.length > 5500)) {
            _context4.next = 212;
            break;
          }

          totalbreak = true;
          return _context4.abrupt("break", 227);

        case 212:
          if (!(!the_roster_db.get(guild.id, "showallroles") || _memberarray7.length < 20)) {
            _context4.next = 223;
            break;
          }

          _context4.prev = 213;
          rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i8, _i8 + 20).join("\n").substr(0, leftnum) + "".concat(role.members.array().length - 20 > 0 ? "\n".concat(the_roster_db.get(guild.id, "rosteremoji"), " ***`").concat(role.members.array().length - 20, "` other Members have this Role ...***") : "").substr(0, 1024), the_roster_db.get(guild.id, "inline"));
          return _context4.abrupt("break", 227);

        case 218:
          _context4.prev = 218;
          _context4.t7 = _context4["catch"](213);
          console.log(_context4.t7);

        case 221:
          _context4.next = 224;
          break;

        case 223:
          try {
            rosterembed.addField("\u200B", role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(_i8, _i8 + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 224:
          _i8 += 20;
          _context4.next = 207;
          break;

        case 227:
          //if there are no members who have this role, do this
          if (_memberarray7.length === 0) {
            try {
              rosterembed.addField("**__".concat(role.name.toUpperCase(), " [0]__**"), "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"));
            } catch (e) {
              console.log(e);
            }
          }

        case 228:
          if (!totalbreak) {
            _context4.next = 230;
            break;
          }

          return _context4.abrupt("return", _message.edit({
            embed: rosterembed
          })["catch"](function (e) {
            return console.log("could not edit roster 1" + e);
          }));

        case 230:
          i++;
          _context4.next = 21;
          break;

        case 233:
          //after the loop, edit the message
          _message.edit({
            embed: rosterembed
          })["catch"](function (e) {
            return console.log("! Could not edit roster 1" + e);
          });

          _context4.next = 239;
          break;

        case 236:
          _context4.prev = 236;
          _context4.t8 = _context4["catch"](0);
          console.log("ROSTER_COULD NOT FIND THE MESSAGE".grey);

        case 239:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 236], [39, 44], [64, 69], [89, 94], [114, 119], [143, 148], [163, 168], [188, 193], [213, 218]]);
}

function send_roster_msg(client, guild, the_roster_db) {
  var es, channel, rosterembed, rosterroles, i, role, leftnum;
  return regeneratorRuntime.async(function send_roster_msg$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          //ensure the database
          the_roster_db.ensure(guild.id, {
            rosterchannel: "notvalid",
            showallroles: false,
            rostermessage: "",
            rostertitle: "Roster",
            rosteremoji: "➤",
            rosterstyle: "1",
            rosterroles: [],
            inline: false
          });
          es = client.settings.get(guild.id, "embed");

          if (!(the_roster_db.get(guild.id, "rosterchannel") == "notvalid")) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return");

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(client.channels.fetch(the_roster_db.get(guild.id, "rosterchannel")));

        case 6:
          channel = _context5.sent;
          //define the embed
          rosterembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(String(the_roster_db.get(guild.id, "rostertitle")).substr(0, 256)).setFooter(es.footertext, es.footericon); //get rosterole and loop through every single role

          rosterroles = the_roster_db.get(guild.id, "rosterroles");
          if (rosterroles.length === 0) try {
            rosterembed.addField("NO ROLES ADDED", "Add them with: `".concat(client.settings.get(guild.id, "prefix"), "setup-roster`"));
          } catch (e) {
            console.log(e);
          }
          i = 0;

        case 11:
          if (!(i < rosterroles.length)) {
            _context5.next = 21;
            break;
          }

          role = guild.roles.cache.get(rosterroles[i]); //if the embed is too big break

          if (!(rosterembed.length > 5900)) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("break", 21);

        case 15:
          //get the maximum field value length on an variabel
          leftnum = 1024; //if the length is bigger then the maximum length - the leftnumber

          if (rosterembed.length > 6000 - leftnum) {
            //set the left number to the maximumlength - the leftnumber
            leftnum = rosterembed.length - leftnum;
          }

          try {
            rosterembed.addField("**__".concat(role.name.toUpperCase(), " [").concat(role.members.array().length, "]__**"), role.members.array().length === 0 ? "> No one has this Role" : role.members.map(function (member) {
              return "".concat(the_roster_db.get(guild.id, "rosteremoji"), " <@").concat(member.user.id, "> | `").concat(member.user.tag, "`");
            }).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"));
          } catch (e) {
            console.log(e);
          }

        case 18:
          i++;
          _context5.next = 11;
          break;

        case 21:
          channel.send(rosterembed).then(function (msg) {
            the_roster_db.set(guild.id, msg.id, "rostermessage");
            setTimeout(function () {
              edit_msg(client, guild);
            }, 500);
          })["catch"](function (e) {
            return console.log("Couldn't send a message, give the Bot permissions or smt!");
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getMember(message) {
  var toFind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  toFind = toFind.toLowerCase();
  var target = message.guild.members.cache.get(toFind);
  if (!target && message.mentions.members) target = message.mentions.members.filter(function (member) {
    return member.guild.id == message.guild.id;
  }).first();

  if (!target && toFind) {
    target = message.guild.members.cache.find(function (member) {
      return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
    });
  }

  if (!target) target = message.member;
  return target;
}

function shuffle(a) {
  try {
    var j, x, i;

    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("en-US").format(date);
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function parseDuration(duration) {
  var remain = duration;
  var days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);
  var hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);
  var minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);
  var seconds = Math.floor(remain / 1000);
  remain = remain % 1000;
  var milliseconds = remain;
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function formatTime(o) {
  var useMilli = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var parts = [];

  if (o.days) {
    var ret = o.days + ' Day';

    if (o.days !== 1) {
      ret += 's';
    }

    parts.push(ret);
  }

  if (o.hours) {
    var _ret = o.hours + ' Hr';

    if (o.hours !== 1) {
      _ret += 's';
    }

    parts.push(_ret);
  }

  if (o.minutes) {
    var _ret2 = o.minutes + ' Min';

    if (o.minutes !== 1) {
      _ret2 += 's';
    }

    parts.push(_ret2);
  }

  if (o.seconds) {
    var _ret3 = o.seconds + ' Sec';

    if (o.seconds !== 1) {
      _ret3 += 's';
    }

    parts.push(_ret3);
  }

  if (useMilli && o.milliseconds) {
    var _ret4 = o.milliseconds + ' ms';

    parts.push(_ret4);
  }

  if (parts.length === 0) {
    return 'instantly';
  } else {
    return parts;
  }
}

function duration(duration) {
  var useMilli = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var time = parseDuration(duration);
  return formatTime(time, useMilli);
}

function promptMessage(message, author, time, validReactions) {
  var es, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, reaction, filter;

  return regeneratorRuntime.async(function promptMessage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          es = client.settings.get(message.guild.id, "embed");
          _context6.prev = 1;
          time *= 1000;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context6.prev = 6;
          _iterator4 = validReactions[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context6.next = 15;
            break;
          }

          reaction = _step4.value;
          _context6.next = 12;
          return regeneratorRuntime.awrap(message.react(reaction));

        case 12:
          _iteratorNormalCompletion4 = true;
          _context6.next = 8;
          break;

        case 15:
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](6);
          _didIteratorError4 = true;
          _iteratorError4 = _context6.t0;

        case 21:
          _context6.prev = 21;
          _context6.prev = 22;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 24:
          _context6.prev = 24;

          if (!_didIteratorError4) {
            _context6.next = 27;
            break;
          }

          throw _iteratorError4;

        case 27:
          return _context6.finish(24);

        case 28:
          return _context6.finish(21);

        case 29:
          filter = function filter(reaction, user) {
            return validReactions.includes(reaction.emoji.name) && user.id === author.id;
          };

          return _context6.abrupt("return", message.awaitReactions(filter, {
            max: 1,
            time: time
          }).then(function (collected) {
            return collected.first() && collected.first().emoji.name;
          }));

        case 33:
          _context6.prev = 33;
          _context6.t1 = _context6["catch"](1);
          console.log(String(_context6.t1.stack).bgRed);

        case 36:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 33], [6, 17, 21, 29], [22,, 24, 28]]);
}

function delay(delayInms) {
  try {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function getRandomInt(max) {
  try {
    return Math.floor(Math.random() * Math.floor(max));
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function getRandomNum(min, max) {
  try {
    return Math.floor(Math.random() * Math.floor(max - min + min));
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function createBar(player) {
  try {
    var size = 25;
    var line = "▬"; //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", "🔷")

    if (!player.queue.current) return "**[".concat("🔷", line.repeat(size - 1), "]**\n**00:00:00 / 00:00:00**");
    var current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    var total = player.queue.current.duration;
    var slider = "🔷";
    var bar = current > total ? [line.repeat(size / 2 * 2), current / total * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
    if (!String(bar).includes("🔷")) return "**[".concat("🔷", line.repeat(size - 1), "]**\n**00:00:00 / 00:00:00**");
    return "**[".concat(bar[0], "]**\n**").concat(new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8)), "**");
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = (millis % 60000 / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + Math.floor(millis / 1000) + " Seconds";else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + Math.floor(millis / 1000) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function stations(client, prefix, message) {
  var es = client.settings.get(message.guild.id, "embed");

  try {
    var amount = 0;
    var stationsembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 11`");
    var stationsembed2 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 69`");
    var stationsembed3 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 180`");
    var United_Kingdom = "";

    for (var i = 0; i < radios.EU.United_Kingdom.length; i++) {
      United_Kingdom += "**".concat(i + 1 + 10 * amount, "**[").concat(radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.United_Kingdom[i].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇬🇧 United Kingdom", ">>> ".concat(United_Kingdom), true);
    amount++;
    var austria = "";

    for (var _i9 = 0; _i9 < radios.EU.Austria.length; _i9++) {
      austria += "**".concat(_i9 + 1 + 10 * amount, "**[").concat(radios.EU.Austria[_i9].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Austria[_i9].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇦🇹 Austria", ">>> ".concat(austria), true);
    amount++;
    var Belgium = "";

    for (var _i10 = 0; _i10 < radios.EU.Belgium.length; _i10++) {
      Belgium += "**".concat(_i10 + 1 + 10 * amount, "**[").concat(radios.EU.Belgium[_i10].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Belgium[_i10].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇧🇪 Belgium", ">>> ".concat(Belgium), true);
    amount++;
    var Bosnia = "";

    for (var _i11 = 0; _i11 < radios.EU.Bosnia.length; _i11++) {
      Bosnia += "**".concat(_i11 + 1 + 10 * amount, "**[").concat(radios.EU.Bosnia[_i11].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Bosnia[_i11].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇧🇦 Bosnia", ">>> ".concat(Bosnia), true);
    amount++;
    var Czech = "";

    for (var _i12 = 0; _i12 < radios.EU.Czech.length; _i12++) {
      Czech += "**".concat(_i12 + 1 + 10 * amount, "**[").concat(radios.EU.Czech[_i12].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Czech[_i12].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇨🇿 Czech", ">>> ".concat(Czech), true);
    amount++;
    var Denmark = "";

    for (var _i13 = 0; _i13 < radios.EU.Denmark.length; _i13++) {
      Denmark += "**".concat(_i13 + 1 + 10 * amount, "**[").concat(radios.EU.Denmark[_i13].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Denmark[_i13].split(" ")[1], ")\n");
    }

    stationsembed.addField("🇩🇰 Denmark", ">>> ".concat(Denmark), true);
    amount++;
    var germany = "";

    for (var _i14 = 0; _i14 < radios.EU.Germany.length; _i14++) {
      germany += "**".concat(_i14 + 1 + 10 * amount, "**[").concat(radios.EU.Germany[_i14].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Germany[_i14].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇩🇪 Germany", ">>> ".concat(germany), true);
    amount++;
    var Hungary = "";

    for (var _i15 = 0; _i15 < radios.EU.Hungary.length; _i15++) {
      Hungary += "**".concat(_i15 + 1 + 10 * amount, "**[").concat(radios.EU.Hungary[_i15].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Hungary[_i15].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇭🇺 Hungary", ">>> ".concat(Hungary), true);
    amount++;
    var Ireland = "";

    for (var _i16 = 0; _i16 < radios.EU.Ireland.length; _i16++) {
      Ireland += "**".concat(_i16 + 1 + 10 * amount, "**[").concat(radios.EU.Ireland[_i16].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Ireland[_i16].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇮🇪 Ireland", ">>> ".concat(Ireland), true);
    amount++;
    var Italy = "";

    for (var _i17 = 0; _i17 < radios.EU.Italy.length; _i17++) {
      Italy += "**".concat(_i17 + 1 + 10 * amount, "**[").concat(radios.EU.Italy[_i17].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Italy[_i17].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇮🇹 Italy", ">>> ".concat(Italy), true);
    amount++;
    var Luxembourg = "";

    for (var _i18 = 0; _i18 < radios.EU.Luxembourg.length; _i18++) {
      Luxembourg += "**".concat(_i18 + 1 + 10 * amount, "**[").concat(radios.EU.Luxembourg[_i18].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Luxembourg[_i18].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇱🇺 Luxembourg", ">>> ".concat(Luxembourg), true);
    amount++;
    var Romania = "";

    for (var _i19 = 0; _i19 < radios.EU.Romania.length; _i19++) {
      Romania += "**".concat(_i19 + 1 + 10 * amount, "**[").concat(radios.EU.Romania[_i19].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Romania[_i19].split(" ")[1], ")\n");
    }

    stationsembed2.addField("🇷🇴 Romania", ">>> ".concat(Romania), true);
    amount++;
    var Serbia = "";

    for (var _i20 = 0; _i20 < radios.EU.Serbia.length; _i20++) {
      Serbia += "**".concat(_i20 + 1 + 10 * amount, "**[").concat(radios.EU.Serbia[_i20].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Serbia[_i20].split(" ")[1], ")\n");
    }

    stationsembed3.addField("🇷🇸 Serbia", ">>> ".concat(Serbia), true);
    amount++;
    var Spain = "";

    for (var _i21 = 0; _i21 < radios.EU.Spain.length; _i21++) {
      Spain += "**".concat(_i21 + 1 + 10 * amount, "**[").concat(radios.EU.Spain[_i21].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Spain[_i21].split(" ")[1], ")\n");
    }

    stationsembed3.addField("🇪🇸 Spain", ">>> ".concat(Spain), true);
    amount++;
    var Sweden = "";

    for (var _i22 = 0; _i22 < radios.EU.Sweden.length; _i22++) {
      Sweden += "**".concat(_i22 + 1 + 10 * amount, "**[").concat(radios.EU.Sweden[_i22].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Sweden[_i22].split(" ")[1], ")\n");
    }

    stationsembed3.addField("🇸🇪 Sweden", ">>> ".concat(Sweden), true);
    amount++;
    var Ukraine = "";

    for (var _i23 = 0; _i23 < radios.EU.Ukraine.length; _i23++) {
      Ukraine += "**".concat(_i23 + 1 + 10 * amount, "**[").concat(radios.EU.Ukraine[_i23].split(" ")[0].replace("-", " ").substr(0, 16), "](").concat(radios.EU.Ukraine[_i23].split(" ")[1], ")\n");
    }

    stationsembed3.addField("🇺🇦 Ukraine", ">>> ".concat(Ukraine), true);
    amount++;
    var requests = "";

    for (var _i24 = 0; _i24 < 10; _i24++) {
      requests += "**".concat(_i24 + 1 + 10 * amount, "**[").concat(radios.OTHERS.request[_i24].split(" ")[0].replace("-", " ").substr(0, 15), "](").concat(radios.OTHERS.request[_i24].split(" ")[1], ")\n");
    }

    stationsembed3.addField("🧾 OTHERS", ">>> ".concat(requests), true);
    requests = "";

    for (var _i25 = 10; _i25 < 20; _i25++) {
      try {
        requests += "**".concat(_i25 + 1 + 10 * amount, "**[").concat(radios.OTHERS.request[_i25].split(" ")[0].replace("-", " ").substr(0, 15), "](").concat(radios.OTHERS.request[_i25].split(" ")[1], ")\n");
      } catch (_unused2) {}
    }

    stationsembed3.addField("🧾 OTHERS", ">>> ".concat(requests), true);
    message.channel.send(stationsembed)["catch"](function (e) {
      return console.log("THIS IS TO PREVENT A CRASH");
    });
    message.channel.send(stationsembed2)["catch"](function (e) {
      return console.log("THIS IS TO PREVENT A CRASH");
    });
    message.channel.send(stationsembed3)["catch"](function (e) {
      return console.log("THIS IS TO PREVENT A CRASH");
    });
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function autoplay(client, player, type) {
  var es, previoustrack, mixURL, response, embed;
  return regeneratorRuntime.async(function autoplay$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          es = client.settings.get(player.guild, "embed");
          _context8.prev = 1;

          if (!(player.queue.length > 0)) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt("return");

        case 4:
          previoustrack = player.get("previoustrack");

          if (previoustrack) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return");

        case 7:
          mixURL = "https://www.youtube.com/watch?v=".concat(previoustrack.identifier, "&list=RD").concat(previoustrack.identifier);
          _context8.next = 10;
          return regeneratorRuntime.awrap(client.manager.search(mixURL, previoustrack.requester));

        case 10:
          response = _context8.sent;

          if (!(!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED')) {
            _context8.next = 19;
            break;
          }

          embed = new MessageEmbed().setTitle("Found nothing related for the latest Song!").setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? "I'll leave the Channel: `".concat(client.channels.cache.get(player.voiceChannel).name, "` in: `").concat(ms(config.settings.LeaveOnEmpty_Queue.time_delay, {
            "long": true
          }), "`, If the Queue stays Empty! ") : "I left the Channel: `".concat(client.channels.cache.get(player.voiceChannel).name, "` because the Queue was empty for: `").concat(ms(config.settings.LeaveOnEmpty_Queue.time_delay, {
            "long": true
          }), "`")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
          client.channels.cache.get(player.textChannel).send(embed)["catch"](function (e) {
            return console.log("THIS IS TO PREVENT A CRASH");
          });

          if (!(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip")) {
            _context8.next = 18;
            break;
          }

          return _context8.abrupt("return", setTimeout(function () {
            try {
              player = client.manager.players.get(player.guild);

              if (player.queue.size === 0) {
                var _embed = new MessageEmbed();

                try {
                  _embed.setTitle("❌ Queue has ended.");
                } catch (_unused3) {}

                try {
                  _embed.setDescription("I left the Channel: `".concat(client.channels.cache.get(player.voiceChannel).name, "` because the Queue was empty for: `").concat(ms(config.settings.LeaveOnEmpty_Queue.time_delay, {
                    "long": true
                  }), "`"));
                } catch (_unused4) {}

                try {
                  _embed.setColor(es.wrongcolor);
                } catch (_unused5) {}

                try {
                  _embed.setFooter(es.footertext, es.footericon);
                } catch (_unused6) {}

                client.channels.cache.get(player.textChannel).send(_embed)["catch"](function (e) {
                  return console.log("THIS IS TO PREVENT A CRASH");
                });

                try {
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(function _callee4(msg) {
                    return regeneratorRuntime.async(function _callee4$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.prev = 0;
                            _context7.next = 3;
                            return regeneratorRuntime.awrap(delay(7500));

                          case 3:
                            if (msg && message.channel.messages.cache.get(msg.id)) msg["delete"]();
                            _context7.next = 8;
                            break;

                          case 6:
                            _context7.prev = 6;
                            _context7.t0 = _context7["catch"](0);

                          case 8:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, null, null, [[0, 6]]);
                  });
                } catch (e) {
                  console.log(String(e.stack).yellow);
                }

                player.destroy();
              }
            } catch (e) {
              console.log(String(e.stack).yellow);
            }
          }, config.settings.LeaveOnEmpty_Queue.time_delay));

        case 18:
          player.destroy();

        case 19:
          player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
          return _context8.abrupt("return", player.play());

        case 23:
          _context8.prev = 23;
          _context8.t0 = _context8["catch"](1);
          console.log(String(_context8.t0.stack).bgRed);

        case 26:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 23]]);
}

function arrayMove(array, from, to) {
  try {
    array = _toConsumableArray(array);
    var startIndex = from < 0 ? array.length + from : from;

    if (startIndex >= 0 && startIndex < array.length) {
      var endIndex = to < 0 ? array.length + to : to;

      var _array$splice = array.splice(from, 1),
          _array$splice2 = _slicedToArray(_array$splice, 1),
          item = _array$splice2[0];

      array.splice(endIndex, 0, item);
    }

    return array;
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function nFormatter(num) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var lookup = [{
    value: 1,
    symbol: ""
  }, {
    value: 1e3,
    symbol: "k"
  }, {
    value: 1e6,
    symbol: "M"
  }, {
    value: 1e9,
    symbol: "G"
  }, {
    value: 1e12,
    symbol: "T"
  }, {
    value: 1e15,
    symbol: "P"
  }, {
    value: 1e18,
    symbol: "E"
  }];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function swap_pages(client, message, description, TITLE) {
  var es, currentPage, embeds, k, i, current, embed, _k, _i26, _current, _embed2, queueEmbed, reactionemojis, _i27, _reactionemojis, _emoji, filter, collector;

  return regeneratorRuntime.async(function swap_pages$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          es = client.settings.get(message.guild.id, "embed");
          currentPage = 0; //GET ALL EMBEDS

          embeds = []; //if input is an array

          if (Array.isArray(description)) {
            try {
              k = 15;

              for (i = 0; i < description.length; i += 15) {
                current = description.slice(i, k);
                k += 15;
                embed = new MessageEmbed().setDescription(current).setTitle(TITLE).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon);
                embeds.push(embed);
              }

              embeds;
            } catch (_unused8) {}
          } else {
            try {
              _k = 1000;

              for (_i26 = 0; _i26 < description.length; _i26 += 1000) {
                _current = description.slice(_i26, _k);
                _k += 1000;
                _embed2 = new MessageEmbed().setDescription(_current).setTitle(TITLE).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon);
                embeds.push(_embed2);
              }

              embeds;
            } catch (_unused9) {}
          }

          if (!(embeds.length === 1)) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return", message.channel.send(embeds[0])["catch"](function (e) {
            return console.log("THIS IS TO PREVENT A CRASH");
          }));

        case 6:
          _context10.next = 8;
          return regeneratorRuntime.awrap(message.channel.send("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), embeds[currentPage])["catch"](function (e) {
            return console.log("THIS IS TO PREVENT A CRASH");
          }));

        case 8:
          queueEmbed = _context10.sent;
          reactionemojis = ["⬅️", "⏹", "➡️"];
          _context10.prev = 10;
          _i27 = 0, _reactionemojis = reactionemojis;

        case 12:
          if (!(_i27 < _reactionemojis.length)) {
            _context10.next = 19;
            break;
          }

          _emoji = _reactionemojis[_i27];
          _context10.next = 16;
          return regeneratorRuntime.awrap(queueEmbed.react(_emoji));

        case 16:
          _i27++;
          _context10.next = 12;
          break;

        case 19:
          _context10.next = 23;
          break;

        case 21:
          _context10.prev = 21;
          _context10.t0 = _context10["catch"](10);

        case 23:
          filter = function filter(reaction, user) {
            return (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
          };

          collector = queueEmbed.createReactionCollector(filter, {
            time: 45000
          });
          collector.on("collect", function _callee5(reaction, user) {
            return regeneratorRuntime.async(function _callee5$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.prev = 0;

                    if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
                      if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      } else {
                        currentPage = 0;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      }
                    } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                      if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      } else {
                        currentPage = embeds.length - 1;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      }
                    } else {
                      collector.stop();
                      reaction.message.reactions.removeAll();
                    }

                    _context9.next = 4;
                    return regeneratorRuntime.awrap(reaction.users.remove(message.author.id));

                  case 4:
                    _context9.next = 8;
                    break;

                  case 6:
                    _context9.prev = 6;
                    _context9.t0 = _context9["catch"](0);

                  case 8:
                  case "end":
                    return _context9.stop();
                }
              }
            }, null, null, [[0, 6]]);
          });

        case 26:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[10, 21]]);
}

function swap_pages2(client, message, embeds) {
  var es, currentPage, reactionemojis, _i28, _reactionemojis2, _emoji2, filter, collector;

  return regeneratorRuntime.async(function swap_pages2$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          es = client.settings.get(message.guild.id, "embed");
          currentPage = 0;

          if (!(embeds.length === 1)) {
            _context12.next = 4;
            break;
          }

          return _context12.abrupt("return", message.channel.send(embeds[0])["catch"](function (e) {
            return console.log("THIS IS TO PREVENT A CRASH");
          }));

        case 4:
          _context12.next = 6;
          return regeneratorRuntime.awrap(message.channel.send("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), embeds[currentPage])["catch"](function (e) {
            return console.log("THIS IS TO PREVENT A CRASH");
          }));

        case 6:
          queueEmbed = _context12.sent;
          reactionemojis = ["⬅️", "⏹", "➡️"];
          _context12.prev = 8;
          _i28 = 0, _reactionemojis2 = reactionemojis;

        case 10:
          if (!(_i28 < _reactionemojis2.length)) {
            _context12.next = 17;
            break;
          }

          _emoji2 = _reactionemojis2[_i28];
          _context12.next = 14;
          return regeneratorRuntime.awrap(queueEmbed.react(_emoji2));

        case 14:
          _i28++;
          _context12.next = 10;
          break;

        case 17:
          _context12.next = 21;
          break;

        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](8);

        case 21:
          filter = function filter(reaction, user) {
            return (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
          };

          collector = queueEmbed.createReactionCollector(filter, {
            time: 45000
          });
          collector.on("collect", function _callee6(reaction, user) {
            return regeneratorRuntime.async(function _callee6$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.prev = 0;

                    if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
                      if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      } else {
                        currentPage = 0;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      }
                    } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                      if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      } else {
                        currentPage = embeds.length - 1;
                        queueEmbed.edit("**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"), {
                          content: "**Current Page - ".concat(currentPage + 1, "/").concat(embeds.length, "**"),
                          embed: embeds[currentPage]
                        });
                      }
                    } else {
                      collector.stop();
                      reaction.message.reactions.removeAll();
                    }

                    _context11.next = 4;
                    return regeneratorRuntime.awrap(reaction.users.remove(message.author.id));

                  case 4:
                    _context11.next = 8;
                    break;

                  case 6:
                    _context11.prev = 6;
                    _context11.t0 = _context11["catch"](0);

                  case 8:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, null, [[0, 6]]);
          });

        case 24:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[8, 19]]);
}

function databasing(client, guildid, userid) {
  if (!client || client == undefined || !client.user || client.user == undefined) return;

  try {
    client.stats.ensure("global", {
      commands: 0,
      songs: 0,
      setups: 0
    });
    client.premium.ensure("premiumlist", {
      list: [
        /*{
        "u": "XXXYYYXXXYYYXXXYYY"
        }, {
        "g": "XXXYYYXXXYYYXXXYYY"
        }*/
      ]
    });
    client.setups.ensure("TICKETS", {
      tickets: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: []
    });

    if (guildid) {
      client.customcommands.ensure(guildid, {
        commands: []
      });
      client.keyword.ensure(guildid, {
        commands: []
      });
      client.social_log.ensure(guildid, {
        tiktok: {
          channels: [],
          dc_channel: ""
        },
        youtube: {
          channels: [],
          dc_channel: ""
        },
        twitter: {
          TWITTER_USER_ID: "",
          TWITTER_USER_NAME_ONLY_THOSE: "",
          DISCORD_CHANNEL_ID: "",
          latesttweet: "",
          REETWET: false,
          infomsg: "**{Twittername}** posted a new Tweet:\n\n{url}"
        },
        secondtwitter: {
          TWITTER_USER_ID: "",
          TWITTER_USER_NAME_ONLY_THOSE: "",
          DISCORD_CHANNEL_ID: "",
          latesttweet: "",
          REETWET: false,
          infomsg: "**{Twittername}** posted a new Tweet:\n\n{url}"
        },
        twitch: {
          DiscordServerId: guildid,
          channelID: "",
          roleID_PING: "",
          roleID_GIVE: "",
          channels: []
        }
      });
      client.roster.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false
      });
      client.roster2.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false
      });
      client.roster3.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false
      });
      client.stats.ensure(guildid, {
        commands: 0,
        songs: 0
      });
      client.premium.ensure(guildid, {
        enabled: false
      });
      client.setups.ensure(guildid, {
        textchannel: "0",
        voicechannel: "0",
        category: "0",
        message_cmd_info: "0",
        message_queue_info: "0",
        message_track_info: "0",
        blacklist: {
          whitelistedroles: [],
          words: [],
          enabled: true
        },
        ticketsystem: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem2: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem3: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem4: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem5: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        }
      });
      client.blacklist.ensure(guildid, {
        words: []
      });
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        channel: "773836425678422046",
        adminlog: "no",
        dailyfact: "no",
        reportlog: "no",
        autoembed: [],
        volume: "69",
        adminroles: [],
        MUSIC: true,
        FUN: true,
        MINIGAMES: true,
        ECONOMY: true,
        SCHOOL: true,
        NSFW: false,
        VOICE: true,
        SOUNDBOARD: true,
        anticaps: {
          enabled: true,
          percent: 75
        },
        cmdadminroles: {
          addrole: [],
          addroletoeveryone: [],
          ban: [],
          clear: [],
          clearbotmessages: [],
          close: [],
          copymessage: [],
          deleterole: [],
          detailwarn: [],
          dm: [],
          editembed: [],
          editimgembed: [],
          embed: [],
          embedbuilder: [],
          esay: [],
          giveaway: [],
          image: [],
          imgembed: [],
          kick: [],
          mute: [],
          poll: [],
          react: [],
          removeallwarns: [],
          removerole: [],
          report: [],
          say: [],
          slowmode: [],
          suggest: [],
          ticket: [],
          unmute: [],
          unwarn: [],
          updatemessage: [],
          warn: [],
          warnings: []
        },
        antilink: {
          enabled: false,
          whitelistedchannels: []
        },
        antidiscord: {
          enabled: false,
          whitelistedchannels: []
        },
        embed: {
          "color": ee.color,
          "thumb": true,
          "wrongcolor": ee.wrongcolor,
          "footertext": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).name : ee.footertext,
          "footericon": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).iconURL({
            dynamic: true
          }) : ee.footericon
        },
        logger: {
          "channel": "no",
          "webhook_id": "",
          "webhook_token": ""
        },
        welcome: {
          captcha: false,
          roles: [],
          channel: "nochannel",
          image: true,
          custom: "no",
          background: "transparent",
          frame: true,
          framecolor: "white",
          pb: true,
          invite: true,
          discriminator: true,
          membercount: true,
          servername: true,
          msg: "{user} Welcome to this Server",
          dm: true,
          imagedm: true,
          customdm: "no",
          backgrounddm: "transparent",
          framedm: true,
          framecolordm: "white",
          pbdm: true,
          invitedm: true,
          discriminatordm: true,
          membercountdm: true,
          servernamedm: true,
          dm_msg: "{user} Welcome to this Server"
        },
        leave: {
          channel: "nochannel",
          image: true,
          custom: "no",
          background: "transparent",
          frame: true,
          framecolor: "white",
          pb: true,
          invite: true,
          discriminator: true,
          membercount: true,
          servername: true,
          msg: "{user} left this Server",
          dm: true,
          imagedm: true,
          customdm: "no",
          backgrounddm: "transparent",
          framedm: true,
          framecolordm: "white",
          pbdm: true,
          invitedm: true,
          discriminatordm: true,
          membercountdm: true,
          servernamedm: true,
          dm_msg: "{user} left this Server"
        },
        song: "https://streams.ilovemusic.de/iloveradio14.mp3",
        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: []
      });
      client.jtcsettings.ensure(guildid, {
        prefix: ".",
        channel: "",
        channelname: "{user}' Room",
        guild: guildid
      });
      client.jtcsettings2.ensure(guildid, {
        channel: "",
        channelname: "{user}' Channel",
        guild: guildid
      });
      client.jtcsettings3.ensure(guildid, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: guildid
      });
    }

    if (userid) {
      client.premium.ensure(userid, {
        enabled: false
      });
      client.queuesaves.ensure(userid, {
        "TEMPLATEQUEUEINFORMATION": ["queue", "sadasd"]
      });
      client.settings.ensure(userid, {
        dm: true
      });
      client.stats.ensure(guildid + userid, {
        ban: [],
        kick: [],
        mute: [],
        ticket: [],
        says: [],
        warn: []
      });
    }

    if (userid && guildid) {
      client.stats.ensure(guildid + userid, {
        ban: [],
        kick: [],
        mute: [],
        ticket: [],
        says: [],
        warn: []
      });
      client.userProfiles.ensure(userid, {
        id: userid,
        guild: guildid,
        totalActions: 0,
        warnings: [],
        kicks: []
      });
    }

    return;
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function reset_DB(guildid, client) {
  client.settings.set(guildid, {
    prefix: ".",
    channel: "",
    channelname: "{user}' Room",
    guild: guildid
  });
  client.settings2.set(guildid, {
    channel: "",
    channelname: "{user}' Channel",
    guild: guildid
  });
  client.settings3.set(guildid, {
    channel: "",
    channelname: "{user}' Lounge",
    guild: guildid
  });
}

function change_status(client) {
  try {
    client.user.setActivity("".concat(config.prefix, "help | ").concat(config.prefix, "setup | ").concat(totalGuilds, " Guilds | ").concat(Math.ceil(totalMembers / 1000), "k Members"), {
      type: "WATCHING",
      shardID: shard
    });
  } catch (e) {
    client.user.setActivity("".concat(config.prefix, "help | ").concat(config.prefix, "setup | ").concat(client.guilds.cache.size, " Guilds | ").concat(Math.ceil(client.users.cache.size / 1000), "k Members"), {
      type: "WATCHING",
      shardID: 0
    });
  }
}

function check_voice_channels(client) {
  var guilds, i;
  return regeneratorRuntime.async(function check_voice_channels$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          guilds = client.guilds.cache.map(function (guild) {
            return guild.id;
          });
          i = 0;

        case 2:
          if (!(i < guilds.length)) {
            _context15.next = 14;
            break;
          }

          _context15.prev = 3;
          _context15.next = 6;
          return regeneratorRuntime.awrap(function _callee8() {
            var guild, jointocreate;
            return regeneratorRuntime.async(function _callee8$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(client.guilds.fetch(guilds[i]));

                  case 2:
                    guild = _context14.sent;
                    client.jtcsettings.ensure(guild.id, {
                      channel: "",
                      channelname: "{user}' Room",
                      guild: guild.id
                    });
                    client.jtcsettings2.ensure(guild.id, {
                      channel: "",
                      channelname: "{user}' Channel",
                      guild: guild.id
                    });
                    client.jtcsettings3.ensure(guild.id, {
                      channel: "",
                      channelname: "{user}' Lounge",
                      guild: guild.id
                    });
                    jointocreate = []; //get the data from the database onto one variables

                    jointocreate.push(client.jtcsettings.get(guild.id, "channel"));
                    jointocreate.push(client.jtcsettings2.get(guild.id, "channel"));
                    jointocreate.push(client.jtcsettings3.get(guild.id, "channel"));
                    _context14.next = 12;
                    return regeneratorRuntime.awrap(guild.channels.cache.filter(function (ch) {
                      return ch.type == "voice" && jointocreate.includes(ch.id);
                    }).each(function _callee7(channel, j) {
                      var members, k, themember;
                      return regeneratorRuntime.async(function _callee7$(_context13) {
                        while (1) {
                          switch (_context13.prev = _context13.next) {
                            case 0:
                              _context13.prev = 0;
                              members = channel.members.array();

                              if (!(members && members.length != 0)) {
                                _context13.next = 14;
                                break;
                              }

                              k = 0;

                            case 4:
                              if (!(k < members.length)) {
                                _context13.next = 12;
                                break;
                              }

                              _context13.next = 7;
                              return regeneratorRuntime.awrap(guild.members.fetch(members[k]));

                            case 7:
                              themember = _context13.sent;
                              create_join_to_create_Channel(client, themember.voice, j + 1);

                            case 9:
                              k++;
                              _context13.next = 4;
                              break;

                            case 12:
                              _context13.next = 14;
                              break;

                            case 14:
                              _context13.next = 19;
                              break;

                            case 16:
                              _context13.prev = 16;
                              _context13.t0 = _context13["catch"](0);
                              console.log(_context13.t0);

                            case 19:
                            case "end":
                              return _context13.stop();
                          }
                        }
                      }, null, null, [[0, 16]]);
                    }));

                  case 12:
                  case "end":
                    return _context14.stop();
                }
              }
            });
          }());

        case 6:
          _context15.next = 11;
          break;

        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](3);
          console.log(_context15.t0);

        case 11:
          i++;
          _context15.next = 2;
          break;

        case 14:
          return _context15.abrupt("return");

        case 15:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[3, 8]]);
}

function check_created_voice_channels(client) {
  var guilds, i, _guild;

  return regeneratorRuntime.async(function check_created_voice_channels$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          guilds = client.guilds.cache.map(function (guild) {
            return guild.id;
          });
          i = 0;

        case 2:
          if (!(i < guilds.length)) {
            _context17.next = 17;
            break;
          }

          _context17.prev = 3;
          _context17.next = 6;
          return regeneratorRuntime.awrap(client.guilds.fetch(guilds[i]));

        case 6:
          _guild = _context17.sent;
          _context17.next = 9;
          return regeneratorRuntime.awrap(_guild.channels.cache.filter(function (ch) {
            return ch.type == "voice";
          }).each(function _callee9(vc) {
            var members;
            return regeneratorRuntime.async(function _callee9$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    try {
                      if (client.jointocreatemap.get("tempvoicechannel_".concat(vc.guild.id, "_").concat(vc.id)) == vc.id) {
                        members = vc.members.array();

                        if (!members || members == undefined || members.length == undefined || members.length == 0) {
                          client.jointocreatemap["delete"]("tempvoicechannel_".concat(vc.guild.id, "_").concat(vc.id));
                          client.jointocreatemap["delete"]("owner_".concat(vc.guild.id, "_").concat(vc.id));
                          console.log("Deleted the Channel: ".concat(vc.name, " in: ").concat(vc.guild ? vc.guild.name : "undefined", " DUE TO EMPTYNESS").strikethrough.brightRed);
                          vc["delete"]()["catch"](function (e) {
                            return console.log(e);
                          });
                        }
                      }
                    } catch (e) {// console.log("Not in db")
                    }

                  case 1:
                  case "end":
                    return _context16.stop();
                }
              }
            });
          }));

        case 9:
          _context17.next = 14;
          break;

        case 11:
          _context17.prev = 11;
          _context17.t0 = _context17["catch"](3);
          console.log(_context17.t0);

        case 14:
          i++;
          _context17.next = 2;
          break;

        case 17:
          return _context17.abrupt("return");

        case 18:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[3, 11]]);
}

function create_join_to_create_Channel(client, user, type) {
  if (type == 1) chname = client.jtcsettings.get(user.member.guild.id, "channelname");else if (type == 2) chname = client.jtcsettings2.get(user.member.guild.id, "channelname");else if (type == 3) chname = client.jtcsettings3.get(user.member.guild.id, "channelname");else chname = "{user}'s Room"; //CREATE THE CHANNEL

  var allowed = true;

  if (!user.guild.me.hasPermission("MANAGE_CHANNELS")) {
    allowed = false;

    try {
      user.member.user.send("${user.member.user} | Error | Please give me the permission, `MANGE CHANNELS` --> I need to be able to create Channels ...");
    } catch (_unused14) {
      try {
        var channel = guild.channels.cache.find(function (channel) {
          return channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES");
        });
        channel.send("".concat(user.member.user, " | Error | Please give me the permission, `MANGE CHANNELS` --> I need to be able to create Channels ..."))["catch"](function (e) {
          return console.log("THIS IS TO PREVENT A CRASH");
        });
      } catch (_unused15) {}
    }
  }

  if (allowed) {
    console.log("Created the Channel: ".concat(String(chname.replace("{user}", user.member.user.username)).substr(0, 32), " in: ").concat(user.guild ? user.guild.name : "undefined").brightGreen);
    user.guild.channels.create(String(chname.replace("{user}", user.member.user.username)).substr(0, 32), {
      type: 'voice',
      permissionOverwrites: [//update the permissions
      {
        id: user.id,
        //the user is allowed to change everything
        allow: ['MANAGE_CHANNELS', "VIEW_CHANNEL", "MANAGE_ROLES", "CONNECT"]
      }, {
        //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
        id: user.guild.id,
        allow: ['VIEW_CHANNEL', "CONNECT"]
      }]
    }).then(function _callee10(vc) {
      var userlimit, Bitrate;
      return regeneratorRuntime.async(function _callee10$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              //add to the DB
              client.jointocreatemap.set("owner_".concat(vc.guild.id, "_").concat(vc.id), user.id);
              client.jointocreatemap.set("tempvoicechannel_".concat(vc.guild.id, "_").concat(vc.id), vc.id); //if parent do these, else just move the Member

              if (!user.channel.parent) {
                _context18.next = 19;
                break;
              }

              //save userlimit on a var
              userlimit = user.channel.userLimit;
              Bitrate = user.channel.bitrate; //move to parent

              _context18.next = 7;
              return regeneratorRuntime.awrap(vc.setParent(user.channel.parent));

            case 7:
              _context18.next = 9;
              return regeneratorRuntime.awrap(user.setChannel(vc));

            case 9:
              _context18.next = 11;
              return regeneratorRuntime.awrap(vc.lockPermissions()["catch"](console.error));

            case 11:
              _context18.next = 13;
              return regeneratorRuntime.awrap(vc.setUserLimit(userlimit)["catch"](console.error));

            case 13:
              _context18.next = 15;
              return regeneratorRuntime.awrap(vc.setBitrate(Bitrate)["catch"](console.error));

            case 15:
              _context18.next = 17;
              return regeneratorRuntime.awrap(vc.updateOverwrite(user.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              })["catch"](console.error));

            case 17:
              _context18.next = 21;
              break;

            case 19:
              _context18.next = 21;
              return regeneratorRuntime.awrap(user.setChannel(vc));

            case 21:
            case "end":
              return _context18.stop();
          }
        }
      });
    });
  }
}

function create_transcript(message, client, msglimit) {
  var docx, messageCollection, channelMessages, tomanymsgs, messagelimit, lastMessageId, msgs, out;
  return regeneratorRuntime.async(function create_transcript$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return regeneratorRuntime.awrap(message.reply(new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1")));

        case 2:
          docx = officegen({
            type: 'docx',
            author: client.user.username,
            creator: client.user.username,
            description: "Transcript for the Channel #".concat(message.channel.name, " with the ID: ").concat(message.channel.id),
            pageMargins: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000
            },
            title: "Transcript!"
          }); //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!

          docx.on('finalize', function (written) {}); //if an error occurs then stop

          docx.on('error', function (err) {
            console.log(err);
            return;
          }); //The "TITLE" 

          pObj = docx.createP(); //Make a new paragraph

          pObj.options.align = 'left'; //align it to the left page

          pObj.options.indentLeft = -350; //overdrive it 350px to the left

          pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive

          pObj.addText('Transcript for:    #' + message.channel.name, {
            font_face: 'Arial',
            color: '3c5c63',
            bold: true,
            font_size: 22
          }); //add the TEXT CHANNEL NAME

          pObj.addLineBreak(); //make a new LINE

          pObj.addText("Channelid: " + message.channel.id, {
            font_face: 'Arial',
            color: '000000',
            bold: false,
            font_size: 10
          }); //Channel id

          pObj.addLineBreak(); //Make a new LINE

          pObj.addText("Oldest message at the BOTTOM ", {
            hyperlink: 'myBookmark',
            font_face: 'Arial',
            color: '5dbcd2',
            italic: true,
            font_size: 8
          }); //Make a hyperlink to the BOOKMARK (Created later)

          pObj.addText("  [CLICK HERE TO JUMP]", {
            hyperlink: 'myBookmark',
            font_face: 'Arial',
            color: '1979a9',
            italic: false,
            bold: true,
            font_size: 8
          }); //Make a hyperlink to the BOOKMARK (Created later)

          pObj.addLineBreak(); //Make a new Line
          //The text content collection

          messageCollection = new Collection(); //make a new collection

          _context21.next = 19;
          return regeneratorRuntime.awrap(message.channel.messages.fetch({
            //fetch the last 100 messages
            limit: 100
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 19:
          channelMessages = _context21.sent;
          //catch any error
          messageCollection = messageCollection.concat(channelMessages); //add them to the Collection

          tomanymsgs = 1; //some calculation for the messagelimit

          if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100

          messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter

          if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1

        case 25:
          if (!(channelMessages.size === 100)) {
            _context21.next = 36;
            break;
          }

          if (!(tomanymsgs === messagelimit)) {
            _context21.next = 28;
            break;
          }

          return _context21.abrupt("break", 36);

        case 28:
          //if the counter equals to the limit stop the loop
          tomanymsgs += 1; //add 1 to the counter

          lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above

          _context21.next = 32;
          return regeneratorRuntime.awrap(message.channel.messages.fetch({
            limit: 100,
            before: lastMessageId
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 32:
          channelMessages = _context21.sent;
          //Fetch again, 100 messages above the already fetched messages
          if (channelMessages) //if its true
            messageCollection = messageCollection.concat(channelMessages); //add them to the collection

          _context21.next = 25;
          break;

        case 36:
          msgs = messageCollection.array().reverse(); //reverse the array to have it listed like the discord chat
          //now for every message in the array make a new paragraph!

          _context21.next = 39;
          return regeneratorRuntime.awrap(msgs.forEach(function _callee11(msg) {
            var umsg;
            return regeneratorRuntime.async(function _callee11$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    // Create a new paragraph:
                    pObj = docx.createP();
                    pObj.options.align = 'left'; //Also 'right' or 'justify'.
                    //Username and Date

                    pObj.addText("".concat(msg.author.tag), {
                      font_face: 'Arial',
                      color: '3c5c63',
                      bold: true,
                      font_size: 14
                    });
                    pObj.addText("  |  ".concat(msg.createdAt.toDateString(), "  |  ").concat(msg.createdAt.toLocaleTimeString()), {
                      font_face: 'Arial',
                      color: '3c5c63',
                      bold: true,
                      font_size: 14
                    }); //
                    //LINEBREAK

                    pObj.addLineBreak(); //message of user     

                    if (msg.content.startsWith("```")) {
                      umsg = msg.content.replace(/```/g, "");
                    } else if (msg.attachments.size > 0) {
                      umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
                    } else {
                      umsg = msg.content;
                    }

                    pObj.addText(umsg, {
                      font_face: 'Arial',
                      color: '000000',
                      bold: false,
                      font_size: 10
                    }); //LINEBREAK

                    pObj.addLineBreak();
                    pObj.addText("______________________________________________________________________________________________________________________________________________________________________________________________________________", {
                      color: 'a6a6a6',
                      font_size: 4
                    });

                  case 9:
                  case "end":
                    return _context19.stop();
                }
              }
            });
          }));

        case 39:
          // Start somewhere a bookmark:
          pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 

          pObj.endBookmark();
          out = fs.createWriteStream("".concat(message.channel.name, ".docx")); //write everything in the docx file
          //if a error happens tells it

          out.on('error', function (err) {
            console.log(err);
          }); //wenn the writing is finished

          out.on("finish", function _callee12(err, result) {
            return regeneratorRuntime.async(function _callee12$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    _context20.next = 2;
                    return regeneratorRuntime.awrap(delay(3000));

                  case 2:
                    return _context20.abrupt("return");

                  case 3:
                  case "end":
                    return _context20.stop();
                }
              }
            });
          }); // Async call to generate the output file:

          return _context21.abrupt("return", docx.generate(out));

        case 45:
        case "end":
          return _context21.stop();
      }
    }
  });
}

function simple_databasing(client, guildid, userid) {
  if (!client || client == undefined || !client.user || client.user == undefined) return;

  try {
    client.stats.ensure("global", {
      commands: 0,
      songs: 0,
      setups: 0
    });

    if (guildid) {
      client.customcommands.ensure(guildid, {
        commands: []
      });
      client.stats.ensure(guildid, {
        commands: 0,
        songs: 0
      });
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        unkowncmdmessage: false,
        channel: "773836425678422046",
        adminlog: "no",
        reportlog: "no",
        autonsfw: "no",
        dailyfact: "no",
        autoembed: [],
        adminroles: [],
        volume: "69",
        MUSIC: true,
        FUN: true,
        MINIGAMES: true,
        ECONOMY: true,
        SCHOOL: true,
        NSFW: false,
        VOICE: true,
        SOUNDBOARD: true,
        cmdadminroles: {
          addrole: [],
          addroletoeveryone: [],
          ban: [],
          clear: [],
          clearbotmessages: [],
          close: [],
          copymessage: [],
          deleterole: [],
          detailwarn: [],
          dm: [],
          editembed: [],
          editimgembed: [],
          embed: [],
          embedbuilder: [],
          esay: [],
          giveaway: [],
          image: [],
          imgembed: [],
          kick: [],
          mute: [],
          poll: [],
          react: [],
          removeallwarns: [],
          removerole: [],
          report: [],
          say: [],
          slowmode: [],
          suggest: [],
          ticket: [],
          unmute: [],
          unwarn: [],
          updatemessage: [],
          warn: [],
          warnings: []
        },
        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: []
      });
    }

    return;
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}

function ensure_economy_user(client, guildid, userid) {
  client.economy.ensure("".concat(guildid, "-").concat(userid), {
    user: userid,
    work: 0,
    balance: 0,
    bank: 0,
    hourly: 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
    beg: 0,
    crime: 0,
    rob: 0,
    items: {
      yacht: 0,
      lamborghini: 0,
      car: 0,
      motorbike: 0,
      bicycle: 0,
      nike: 0,
      tshirt: 0,
      mansion: 0,
      house: 0,
      dirthut: 0,
      pensil: 0,
      pen: 0,
      condom: 0,
      bottle: 0,
      fish: 0,
      hamster: 0,
      dog: 0,
      cat: 0
    },
    black_market: {
      boost: {
        time: 0,
        multiplier: 1
      }
    }
  });
  var data = client.economy.get("".concat(guildid, "-").concat(userid)); //reset the blackmarket Booster if it's over!

  if (data.black_market.boost.time !== 0 && 86400000 * 2 - (Date.now() - data.black_market.boost.time) <= 0) {
    console.log("Reset Multiplier from Black Market for: ".concat(userid, " | TIME: ").concat(86400000 * 2 - (Date.now() - data.black_market.boost.time)));
    client.economy.set("".concat(guildid, "-").concat(userid), 1, "black_market.boost.multiplier");
    client.economy.set("".concat(guildid, "-").concat(userid), 0, "black_market.boost.time");
  }
}