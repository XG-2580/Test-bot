"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    Collection = _require.Collection;

var _require2 = require("http2"),
    getUnpackedSettings = _require2.getUnpackedSettings;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require3 = require("../../handlers/functions"),
    delay = _require3.delay,
    databasing = _require3.databasing;

module.exports = {
  name: "clear",
  aliases: ["purge"],
  category: "\uD83D\uDEAB Administration",
  description: "Deletes messages in a text channel or specified number of messages in a text channel.\n\nIf you Ping a User / Type \"BOTS\" after it, the amount of messages you give, is the amount of messages that will be checked, not that will be cleared!",
  usage: "clear <Amount of messages> [@USER/BOTS]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, messageCollection, channelMessages, tomanymsgs, messagelimit, lastMessageId, msgs, _ret, limit, i, channel;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;

            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE MESSAGES`!")));

          case 4:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.clear");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context2.next = 27;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 11;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.clear");
              }
            }

            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 19:
            _context2.prev = 19;
            _context2.prev = 20;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 22:
            _context2.prev = 22;

            if (!_didIteratorError) {
              _context2.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context2.finish(22);

          case 26:
            return _context2.finish(19);

          case 27:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context2.next = 29;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 29:
            if (!args[1]) {
              _context2.next = 69;
              break;
            }

            if (!(args[1].toLowerCase() == "bots" || args[1].toLowerCase() == "bot")) {
              _context2.next = 62;
              break;
            }

            messageCollection = new Collection(); //make a new collection

            _context2.next = 34;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              //fetch the last 100 messages
              limit: 100
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 34:
            channelMessages = _context2.sent;
            //catch any error
            messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
              return msg.author.bot;
            })); //add them to the Collection

            tomanymsgs = 1; //some calculation for the messagelimit

            messagelimit = 250 / 100; //devide it by 100 to get a counter

            if (!args[0]) {
              _context2.next = 44;
              break;
            }

            if (!(Number(args[0]) > 5000 || Number(args[0]) < 0)) {
              _context2.next = 41;
              break;
            }

            return _context2.abrupt("return", message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 1)**"));

          case 41:
            if (!isNaN(args[0])) {
              _context2.next = 43;
              break;
            }

            return _context2.abrupt("return", message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 1)**"));

          case 43:
            messagelimit = Number(args[0]) / 100;

          case 44:
            if (!(Number(args[0]) > 100)) {
              _context2.next = 56;
              break;
            }

          case 45:
            if (!(channelMessages.size === 100)) {
              _context2.next = 56;
              break;
            }

            if (!(tomanymsgs === messagelimit)) {
              _context2.next = 48;
              break;
            }

            return _context2.abrupt("break", 56);

          case 48:
            //if the counter equals to the limit stop the loop
            tomanymsgs += 1; //add 1 to the counter

            lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above

            _context2.next = 52;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              limit: 100,
              before: lastMessageId
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 52:
            channelMessages = _context2.sent;
            //Fetch again, 100 messages above the already fetched messages
            if (channelMessages) //if its true
              messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
                return msg.author.bot;
              })); //add them to the collection

            _context2.next = 45;
            break;

          case 56:
            msgs = messageCollection.array();
            message.channel.bulkDelete(msgs);
            _context2.next = 60;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " ").concat(msgs.length, " messages successfully deleted!")).setDescription("I found ".concat(msgs.length, " messages of the ").concat(args[0], " Amount of Messages, which were sent by a Bot"))).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              });
            }));

          case 60:
            _context2.next = 67;
            break;

          case 62:
            _context2.next = 64;
            return regeneratorRuntime.awrap(function _callee() {
              var user, messageCollection, channelMessages, tomanymsgs, messagelimit, _lastMessageId, msgs;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      user = message.mentions.members.filter(function (member) {
                        return member.guild.id == message.guild.id;
                      }).first() || message.guild.members.cache.get(args[0] ? args[0] : "");

                      if (user) {
                        _context.next = 3;
                        break;
                      }

                      return _context.abrupt("return", {
                        v: message.reply("User not found")
                      });

                    case 3:
                      messageCollection = new Collection(); //make a new collection

                      _context.next = 6;
                      return regeneratorRuntime.awrap(message.channel.messages.fetch({
                        //fetch the last 100 messages
                        limit: 100
                      })["catch"](function (err) {
                        return console.log(err);
                      }));

                    case 6:
                      channelMessages = _context.sent;
                      //catch any error
                      messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
                        return msg.author.id == user.id;
                      })); //add them to the Collection

                      tomanymsgs = 1; //some calculation for the messagelimit

                      messagelimit = 250 / 100; //devide it by 100 to get a counter

                      if (!args[0]) {
                        _context.next = 16;
                        break;
                      }

                      if (!(Number(args[0]) > 5000 || Number(args[0]) < 0)) {
                        _context.next = 13;
                        break;
                      }

                      return _context.abrupt("return", {
                        v: message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 1)**")
                      });

                    case 13:
                      if (!isNaN(args[0])) {
                        _context.next = 15;
                        break;
                      }

                      return _context.abrupt("return", {
                        v: message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 1)**")
                      });

                    case 15:
                      messagelimit = Number(args[0]) / 100;

                    case 16:
                      if (!(Number(args[0]) > 100)) {
                        _context.next = 28;
                        break;
                      }

                    case 17:
                      if (!(channelMessages.size === 100)) {
                        _context.next = 28;
                        break;
                      }

                      if (!(tomanymsgs === messagelimit)) {
                        _context.next = 20;
                        break;
                      }

                      return _context.abrupt("break", 28);

                    case 20:
                      //if the counter equals to the limit stop the loop
                      tomanymsgs += 1; //add 1 to the counter

                      _lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above

                      _context.next = 24;
                      return regeneratorRuntime.awrap(message.channel.messages.fetch({
                        limit: 100,
                        before: _lastMessageId
                      })["catch"](function (err) {
                        return console.log(err);
                      }));

                    case 24:
                      channelMessages = _context.sent;
                      //Fetch again, 100 messages above the already fetched messages
                      if (channelMessages) //if its true
                        messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
                          return msg.author.id == user.id;
                        })); //add them to the collection

                      _context.next = 17;
                      break;

                    case 28:
                      msgs = messageCollection.array();
                      message.channel.bulkDelete(msgs);
                      _context.next = 32;
                      return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " ").concat(msgs.length, " messages successfully deleted!")).setDescription("I found ".concat(msgs.length, " messages of the ").concat(args[0], " Amount of Messages, which were sent from ").concat(user))).then(function (msg) {
                        return msg["delete"]({
                          timeout: 3000
                        });
                      }));

                    case 32:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }());

          case 64:
            _ret = _context2.sent;

            if (!(_typeof(_ret) === "object")) {
              _context2.next = 67;
              break;
            }

            return _context2.abrupt("return", _ret.v);

          case 67:
            _context2.next = 94;
            break;

          case 69:
            _context2.next = 71;
            return regeneratorRuntime.awrap(message["delete"]()["catch"](function (e) {
              return console.log(e);
            }));

          case 71:
            clearamount = Number(args[0]);

            if (!(clearamount >= 1 && clearamount <= 100)) {
              _context2.next = 77;
              break;
            }

            _context2.next = 75;
            return regeneratorRuntime.awrap(message.channel.bulkDelete(clearamount));

          case 75:
            _context2.next = 92;
            break;

          case 77:
            limit = clearamount > 1000 ? 1000 : clearamount;
            i = 100;

          case 79:
            if (!(i <= limit)) {
              _context2.next = 92;
              break;
            }

            _context2.prev = 80;
            _context2.next = 83;
            return regeneratorRuntime.awrap(message.channel.bulkDelete(i));

          case 83:
            _context2.next = 87;
            break;

          case 85:
            _context2.prev = 85;
            _context2.t1 = _context2["catch"](80);

          case 87:
            _context2.next = 89;
            return regeneratorRuntime.awrap(delay(1500));

          case 89:
            i += 100;
            _context2.next = 79;
            break;

          case 92:
            _context2.next = 94;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " ").concat(clearamount, " messages successfully deleted!"))).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              });
            }));

          case 94:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context2.next = 105;
              break;
            }

            _context2.prev = 95;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context2.next = 99;
              break;
            }

            return _context2.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 99:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context2.next = 105;
            break;

          case 102:
            _context2.prev = 102;
            _context2.t2 = _context2["catch"](95);
            console.log(_context2.t2);

          case 105:
            _context2.next = 111;
            break;

          case 107:
            _context2.prev = 107;
            _context2.t3 = _context2["catch"](1);
            console.log(String(_context2.t3.stack).red);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t3)).substr(0, 2000), "```"))));

          case 111:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 107], [11, 15, 19, 27], [20,, 22, 26], [80, 85], [95, 102]]);
  }
};