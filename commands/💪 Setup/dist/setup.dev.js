"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup",
  category: "💪 Setup",
  aliases: [""],
  cooldown: 5,
  usage: "setup  -->  Follow the Steps",
  description: "Shows all setup commands",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, items, items2, embed, embed2, error;
    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(function _callee() {
              var emojistring = function emojistring(emoji) {
                if (!emoji || !emoji.id) return "";
                var string = "<";

                if (emoji.id.length == 18) {
                  if (emoji.animated) string += "a";
                  string += ":".concat(emoji.name, ":").concat(emoji.id, ">");
                } else {
                  string = emoji.name;
                }

                return string;
              };

              var emojis, _loop, i, _loop2, _i, themsg, themsg2, _i2, _i3;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      emojis = ["🚫", "🔨", "🅰️", "🅱️", "🔗", "📩", "🛠", "📘", "⚙️", "💯", "👍", "🔈", "🆗", "📤", "💥", "📻", "🔱", "📌", "📯", "📑", "💡", "🏷", "840260133753061408", "840255600851812393", "📥"];
                      items = client.commands.filter(function (cmd) {
                        return cmd.category.toLowerCase().includes("setup");
                      }).map(function (cmd) {
                        return "`".concat(cmd.name, "`");
                      });
                      items2 = client.commands.filter(function (cmd) {
                        return cmd.category.toLowerCase().includes("setup");
                      }).map(function (cmd) {
                        return "*".concat(cmd.description, "*");
                      });
                      embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("\uD83D\uDCAA The Setup Commands `1/2`");
                      embed2 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("\uD83D\uDCAA The Setup Commands `2/2`");

                      _loop = function _loop(i) {
                        embed.addField("".concat(emojis[i] ? emojis[i].length == 18 ? "".concat(emojistring(client.guilds.cache.get("862914514571886633").emojis.cache.find(function (emoji) {
                          return emoji.id === emojis[i];
                        }))) : emojis[i] + " " : "") + items[i], items2[i], true);
                      };

                      for (i = 0; i < 20; i++) {
                        _loop(i);
                      }

                      _loop2 = function _loop2(_i) {
                        embed2.addField("".concat(emojis[_i] ? emojis[_i].length == 18 ? "".concat(emojistring(client.guilds.cache.get("862914514571886633").emojis.cache.find(function (emoji) {
                          return emoji.id === emojis[_i];
                        }))) : emojis[_i] + " " : "") + items[_i], items2[_i], true);
                      };

                      for (_i = 20; _i < items.length; _i++) {
                        _loop2(_i);
                      }

                      _context.next = 11;
                      return regeneratorRuntime.awrap(message.channel.send(embed));

                    case 11:
                      themsg = _context.sent;
                      _context.next = 14;
                      return regeneratorRuntime.awrap(message.channel.send(embed2));

                    case 14:
                      themsg2 = _context.sent;
                      _i2 = 0;

                    case 16:
                      if (!(_i2 < 20)) {
                        _context.next = 27;
                        break;
                      }

                      _context.prev = 17;
                      themsg.react(emojis[_i2]);
                      _context.next = 24;
                      break;

                    case 21:
                      _context.prev = 21;
                      _context.t0 = _context["catch"](17);
                      return _context.abrupt("break", 27);

                    case 24:
                      _i2++;
                      _context.next = 16;
                      break;

                    case 27:
                      _i3 = 20;

                    case 28:
                      if (!(_i3 < items.length)) {
                        _context.next = 39;
                        break;
                      }

                      _context.prev = 29;
                      themsg2.react(emojis[_i3]);
                      _context.next = 36;
                      break;

                    case 33:
                      _context.prev = 33;
                      _context.t1 = _context["catch"](29);
                      return _context.abrupt("break", 39);

                    case 36:
                      _i3++;
                      _context.next = 28;
                      break;

                    case 39:
                      error = false;
                      themsg.awaitReactions(function (r, u) {
                        return u.id == cmduser.id;
                      }, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      }).then(function (collected) {
                        themsg.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });
                        themsg2.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });

                        require("./".concat(client.commands.filter(function (cmd) {
                          return cmd.category.toLowerCase().includes("setup");
                        }).map(function (cmd) {
                          return cmd.name;
                        })[emojis.indexOf(collected.first().emoji.id || collected.first().emoji.name)], ".js")).run(client, message, args, cmduser, text, prefix);
                      })["catch"](function (e) {
                        themsg.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });
                        themsg2.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });

                        if (!error) {
                          error = true;
                          return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                        }
                      });
                      themsg2.awaitReactions(function (r, u) {
                        return u.id == cmduser.id;
                      }, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      }).then(function (collected) {
                        themsg.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });
                        themsg2.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });

                        require("./".concat(client.commands.filter(function (cmd) {
                          return cmd.category.toLowerCase().includes("setup");
                        }).map(function (cmd) {
                          return cmd.name;
                        })[emojis.indexOf(collected.first().emoji.id || collected.first().emoji.name)], ".js")).run(client, message, args, cmduser, text, prefix);
                      })["catch"](function (e) {
                        themsg.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });
                        themsg2.reactions.removeAll()["catch"](function (error) {
                          if (error) return;
                        });

                        if (!error) {
                          error = true;
                          return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon));
                        }
                      });

                    case 42:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[17, 21], [29, 33]]);
            }());

          case 4:
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            console.log(String(_context2.t0.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t0, null, 2)).substr(0, 2000), "```"))));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 6]]);
  }
};