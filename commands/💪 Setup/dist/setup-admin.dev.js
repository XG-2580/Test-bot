"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup-admin",
  category: "💪 Setup",
  aliases: ["setupadmin", "setup-mod", "setupmod", "admin-setup", "adminsetup"],
  cooldown: 5,
  usage: "setup-admin  -->  Follow the Steps",
  description: "Allowe specific Roles to execute specific Commands / all Commands!",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thecmd, cmd, cmdrole, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, r, db, _i, _Object$entries, _Object$entries$_i, _cmd3, values, percmd, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _r3, key, embed, _i2, _cmdrole, _cmd4, _db, _i3, _Object$entries2, _Object$entries2$_i, _cmd5, _values, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _r4, _i4, _cmdrole2, _cmd6, _db2, _i5, _Object$entries3, _Object$entries3$_i, _cmd7, _values2, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _r5, _i6, _cmdrole3, _cmd8;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context2.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** Roles to the GENERAL ADMINISTRATOR ROLES\n\n2\uFE0F\u20E3 **== Remove** Roles from the GENERAL ADMINISTRATOR ROLES\n\n3\uFE0F\u20E3 **== Show** all Administrator Roles\n\n4\uFE0F\u20E3 **==** Define Administrator Role/Users per **Admin Command**\n\n\uD83D\uDCD1 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context2.sent;
            _context2.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("📑");
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](9);
            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 20:
            _context2.next = 22;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "add";else if (reaction.emoji.name === "2️⃣") temptype = "remove";else if (reaction.emoji.name === "3️⃣") temptype = "show";else if (reaction.emoji.name === "4️⃣") temptype = "cmdrole";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 22:
            if (!timeouterror) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 24:
            if (!(temptype == "cmdrole")) {
              _context2.next = 118;
              break;
            }

            _context2.next = 27;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Command do you wanna manage?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n        ".concat(client.commands.filter(function (cmd) {
                return cmd.category.includes("Admin");
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(" | "), "\n\n        \n        *Enter one of those Commands!*")).setFooter(es.footertext, es.footericon)
            }));

          case 27:
            tempmsg = _context2.sent;
            _context2.next = 30;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id == message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var com, cmd;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      com = collected.first().content.split(" ")[0];
                      cmd = client.commands.get(com.toLowerCase()) || client.commands.get(client.aliases.get(com.toLowerCase()));

                      if (cmd) {
                        _context.next = 4;
                        break;
                      }

                      return _context.abrupt("return", message.reply({
                        embed: new Discord.MessageEmbed().setTitle("ERROR | Unable to find the Command").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                      }));

                    case 4:
                      if (cmd.category.toLowerCase().includes("admin")) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt("return", message.reply({
                        embed: new Discord.MessageEmbed().setTitle("ERROR | Command is **not** an Administration Command").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                      }));

                    case 6:
                      thecmd = cmd.name;

                      if (!["detailwarn", "warnings", "report"].includes(thecmd.toLowerCase())) {
                        _context.next = 9;
                        break;
                      }

                      return _context.abrupt("return", timeouterror = {
                        message: "YOU CANNOT USE THAT COMMAND, CAUSE IT DOES NOT NEED PERMISSIONS"
                      });

                    case 9:
                      if (!["dm"].includes(thecmd.toLowerCase())) {
                        _context.next = 11;
                        break;
                      }

                      return _context.abrupt("return", timeouterror = {
                        message: "YOU CANNOT USE THAT COMMAND, CAUSE IT IS ADMIN ONLY"
                      });

                    case 11:
                      _context.next = 13;
                      return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Add** Roles/Users to the ".concat(thecmd.toUpperCase(), " ADMINISTRATOR ROLES\n\n2\uFE0F\u20E3 **== Remove** Roles/Users from the ").concat(thecmd.toUpperCase(), " ADMINISTRATOR ROLES\n            \n3\uFE0F\u20E3 **== Show** the ").concat(thecmd.toUpperCase(), " Administrator Roles\n                        \n\uD83D\uDCD1 **== Show Settings**\n\n            \n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

                    case 13:
                      tempmsg = _context.sent;
                      _context.prev = 14;
                      tempmsg.react("1️⃣");
                      tempmsg.react("2️⃣");
                      tempmsg.react("3️⃣");
                      tempmsg.react("📑");
                      _context.next = 24;
                      break;

                    case 21:
                      _context.prev = 21;
                      _context.t0 = _context["catch"](14);
                      return _context.abrupt("return", message.reply({
                        embed: new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
                      }));

                    case 24:
                      _context.next = 26;
                      return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        var reaction = collected.first();
                        reaction.users.remove(message.author.id);
                        if (reaction.emoji.name === "1️⃣") temptype = "add";else if (reaction.emoji.name === "2️⃣") temptype = "remove";else if (reaction.emoji.name === "3️⃣") temptype = "show";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 26:
                      if (!timeouterror) {
                        _context.next = 28;
                        break;
                      }

                      return _context.abrupt("return", message.reply({
                        embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
                      }));

                    case 28:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[14, 21]]);
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 30:
            if (!timeouterror) {
              _context2.next = 32;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 32:
            if (!(temptype == "add")) {
              _context2.next = 42;
              break;
            }

            _context2.next = 35;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role/User do you wanna add to " + thecmd).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role/User now!").setFooter(es.footertext, es.footericon)
            }));

          case 35:
            tempmsg = _context2.sent;
            _context2.next = 38;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();
              var user = message.mentions.users.first();

              if (role) {
                var adminroles = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                if (adminroles.includes(role.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is already registered as an Admin Role for ").concat(thecmd)).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.push(message.guild.id, role.id, "cmdadminroles.".concat(thecmd));
                  var cmd = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                  var cmdrole = [];

                  if (cmd.length > 0) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = cmd[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var r = _step.value;

                        if (message.guild.roles.cache.get(r)) {
                          cmdrole.push("<@&".concat(r, ">"));
                        } else if (message.guild.members.cache.get(r)) {
                          cmdrole.push("<@".concat(r, ">"));
                        } else {
                          console.log("F");
                          console.log(r);
                          client.settings.remove(message.guild.id, r, "cmdadminroles.".concat(cmd));
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
                  }

                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The role: `".concat(role.name, "` is now registered as an Admin Role")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles/Users:\n".concat(cmdrole.join("\n"), "\nis now able to use the ").concat(thecmd, " Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else if (user) {
                var adminroles = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                if (adminroles.includes(user.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The User: `".concat(user.username, "` is already registered as an Admin Role for ").concat(thecmd)).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.push(message.guild.id, user.id, "cmdadminroles.".concat(thecmd));

                  var _cmd = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));

                  var cmdrole = [];

                  if (_cmd.length > 0) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = _cmd[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _r = _step2.value;

                        if (message.guild.roles.cache.get(_r)) {
                          cmdrole.push("<@&".concat(_r, ">"));
                        } else if (message.guild.members.cache.get(_r)) {
                          cmdrole.push("<@".concat(_r, ">"));
                        } else {
                          console.log("F");
                          console.log(_r);
                          client.settings.remove(message.guild.id, _r, "cmdadminroles.".concat(_cmd));
                        }
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
                  }

                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The User: `".concat(user.username, "` is now registered as an Admin Role")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles/Users:\n".concat(cmdrole.join("\n"), "\nis now able to use the ").concat(thecmd, " Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 38:
            if (!timeouterror) {
              _context2.next = 40;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 40:
            _context2.next = 116;
            break;

          case 42:
            if (!(temptype == "remove")) {
              _context2.next = 52;
              break;
            }

            _context2.next = 45;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role/User do you wanna remove from " + thecmd).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role/User now!").setFooter(es.footertext, es.footericon)
            }));

          case 45:
            tempmsg = _context2.sent;
            _context2.next = 48;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();
              var user = message.mentions.users.first();

              if (role) {
                var adminroles = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                if (!adminroles.includes(role.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is not registered as an Admin Role yet for ").concat(thecmd)).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.remove(message.guild.id, role.id, "cmdadminroles.".concat(thecmd));
                  var cmd = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                  var cmdrole = [];

                  if (cmd.length > 0) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = cmd[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var r = _step3.value;

                        if (message.guild.roles.cache.get(r)) {
                          cmdrole.push("<@&".concat(r, ">"));
                        } else if (message.guild.members.cache.get(r)) {
                          cmdrole.push("<@".concat(r, ">"));
                        } else {
                          console.log("F");
                          console.log(r);
                          client.settings.remove(message.guild.id, r, "cmdadminroles.".concat(cmd));
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
                  }

                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The role: `".concat(role.name, "` is not registered as an Admin Role anymore")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles/Users:\n".concat(cmdrole.join("\n"), "\nis now able to use the ").concat(thecmd, " Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else if (user) {
                var adminroles = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
                if (!adminroles.includes(user.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The User: `".concat(user.username, "` is not registered as an Admin Role yet for ").concat(thecmd)).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.remove(message.guild.id, user.id, "cmdadminroles.".concat(thecmd));

                  var _cmd2 = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));

                  var cmdrole = [];

                  if (_cmd2.length > 0) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      for (var _iterator4 = _cmd2[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _r2 = _step4.value;

                        if (message.guild.roles.cache.get(_r2)) {
                          cmdrole.push("<@&".concat(_r2, ">"));
                        } else if (message.guild.members.cache.get(_r2)) {
                          cmdrole.push("<@".concat(_r2, ">"));
                        } else {
                          console.log("F");
                          console.log(_r2);
                          client.settings.remove(message.guild.id, _r2, "cmdadminroles.".concat(_cmd2));
                        }
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
                  }

                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The User: `".concat(user.username, "` is not registered as an Admin Role anymore")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles/Users:\n".concat(cmdrole.join("\n"), "\nis now able to use the ").concat(thecmd, " Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 48:
            if (!timeouterror) {
              _context2.next = 50;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 50:
            _context2.next = 116;
            break;

          case 52:
            if (!(temptype == "show")) {
              _context2.next = 78;
              break;
            }

            cmd = client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd));
            cmdrole = [];

            if (!(cmd.length > 0)) {
              _context2.next = 75;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context2.prev = 59;

            for (_iterator5 = cmd[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              r = _step5.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push("<@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push("<@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.".concat(cmd));
              }
            }

            _context2.next = 67;
            break;

          case 63:
            _context2.prev = 63;
            _context2.t1 = _context2["catch"](59);
            _didIteratorError5 = true;
            _iteratorError5 = _context2.t1;

          case 67:
            _context2.prev = 67;
            _context2.prev = 68;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 70:
            _context2.prev = 70;

            if (!_didIteratorError5) {
              _context2.next = 73;
              break;
            }

            throw _iteratorError5;

          case 73:
            return _context2.finish(70);

          case 74:
            return _context2.finish(67);

          case 75:
            return _context2.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("Everyone with one of those Roles is able to use the Admin Commands").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(client.settings.get(message.guild.id, "cmdadminroles.".concat(thecmd)).length > 0 ? "".concat(cmdrole.join("\n")) : "No ".concat(thecmd, " Admin Roles Setup yet"), ")").substr(0, 2048)).setFooter(es.footertext, es.footericon)
            }));

          case 78:
            if (!(temptype == "thesettings")) {
              _context2.next = 115;
              break;
            }

            db = client.settings.get(message.guild.id, "cmdadminroles");
            cmdrole = [];
            _i = 0, _Object$entries = Object.entries(db);

          case 82:
            if (!(_i < _Object$entries.length)) {
              _context2.next = 110;
              break;
            }

            _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), _cmd3 = _Object$entries$_i[0], values = _Object$entries$_i[1];
            percmd = [];

            if (!(values.length > 0)) {
              _context2.next = 107;
              break;
            }

            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context2.prev = 89;

            for (_iterator6 = values[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              _r3 = _step6.value;

              if (message.guild.roles.cache.get(_r3)) {
                percmd.push("<@&".concat(_r3, ">"));
              } else if (message.guild.members.cache.get(_r3)) {
                percmd.push("<@".concat(_r3, ">"));
              } else {
                client.settings.remove(message.guild.id, _r3, "cmdadminroles.".concat(_cmd3));
              }
            }

            _context2.next = 97;
            break;

          case 93:
            _context2.prev = 93;
            _context2.t2 = _context2["catch"](89);
            _didIteratorError6 = true;
            _iteratorError6 = _context2.t2;

          case 97:
            _context2.prev = 97;
            _context2.prev = 98;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 100:
            _context2.prev = 100;

            if (!_didIteratorError6) {
              _context2.next = 103;
              break;
            }

            throw _iteratorError6;

          case 103:
            return _context2.finish(100);

          case 104:
            return _context2.finish(97);

          case 105:
            key = "For the `".concat(_cmd3, "` Command");
            cmdrole.push({
              "info": percmd,
              "name": key
            });

          case 107:
            _i++;
            _context2.next = 82;
            break;

          case 110:
            embed = new MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Administration Setup").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**General Admin Roles:**\n".concat(client.settings.get(message.guild.id, "adminroles").length > 0 ? "<@&".concat(client.settings.get(message.guild.id, "adminroles").join(">, <@&"), ">") : "No General Admin Roles Setup yet").substr(0, 2048)).setFooter(es.footertext, es.footericon);

            for (_i2 = 0, _cmdrole = cmdrole; _i2 < _cmdrole.length; _i2++) {
              _cmd4 = _cmdrole[_i2];
              embed.addField(_cmd4.name, _cmd4.info.join(", "));
            }

            return _context2.abrupt("return", message.reply({
              embed: embed
            }));

          case 115:
            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 116:
            _context2.next = 213;
            break;

          case 118:
            if (!(temptype == "add")) {
              _context2.next = 128;
              break;
            }

            _context2.next = 121;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
            }));

          case 121:
            tempmsg = _context2.sent;
            _context2.next = 124;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (role) {
                var adminroles = client.settings.get(message.guild.id, "adminroles");
                if (adminroles.includes(role.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is already registered as an Admin Role")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.push(message.guild.id, role.id, "adminroles");
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The role: `".concat(role.name, "` is now registered as an Admin Role")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles:\n<@&".concat(client.settings.get(message.guild.id, "adminroles").join(">\n<@&"), ">\nis now able to use the Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 124:
            if (!timeouterror) {
              _context2.next = 126;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 126:
            _context2.next = 213;
            break;

          case 128:
            if (!(temptype == "remove")) {
              _context2.next = 138;
              break;
            }

            _context2.next = 131;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna remove?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
            }));

          case 131:
            tempmsg = _context2.sent;
            _context2.next = 134;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (role) {
                var adminroles = client.settings.get(message.guild.id, "adminroles");
                if (!adminroles.includes(role.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is not registered as an Admin Role yet")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.remove(message.guild.id, role.id, "adminroles");
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The role: `".concat(role.name, "` is now registered as an Admin Role")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone with one of those Roles:\n<@&".concat(client.settings.get(message.guild.id, "adminroles").join(">\n<@&"), ">\nis now able to use the Admin Commands").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 134:
            if (!timeouterror) {
              _context2.next = 136;
              break;
            }

            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 136:
            _context2.next = 213;
            break;

          case 138:
            if (!(temptype == "show")) {
              _context2.next = 175;
              break;
            }

            _db = client.settings.get(message.guild.id, "cmdadminroles");
            cmdrole = [];
            _i3 = 0, _Object$entries2 = Object.entries(_db);

          case 142:
            if (!(_i3 < _Object$entries2.length)) {
              _context2.next = 170;
              break;
            }

            _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2), _cmd5 = _Object$entries2$_i[0], _values = _Object$entries2$_i[1];
            percmd = [];

            if (!(_values.length > 0)) {
              _context2.next = 167;
              break;
            }

            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context2.prev = 149;

            for (_iterator7 = _values[Symbol.iterator](); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              _r4 = _step7.value;

              if (message.guild.roles.cache.get(_r4)) {
                percmd.push("<@&".concat(_r4, ">"));
              } else if (message.guild.members.cache.get(_r4)) {
                percmd.push("<@".concat(_r4, ">"));
              } else {
                client.settings.remove(message.guild.id, _r4, "cmdadminroles.".concat(_cmd5));
              }
            }

            _context2.next = 157;
            break;

          case 153:
            _context2.prev = 153;
            _context2.t3 = _context2["catch"](149);
            _didIteratorError7 = true;
            _iteratorError7 = _context2.t3;

          case 157:
            _context2.prev = 157;
            _context2.prev = 158;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 160:
            _context2.prev = 160;

            if (!_didIteratorError7) {
              _context2.next = 163;
              break;
            }

            throw _iteratorError7;

          case 163:
            return _context2.finish(160);

          case 164:
            return _context2.finish(157);

          case 165:
            key = "For the `".concat(_cmd5, "` Command");
            cmdrole.push({
              "info": percmd,
              "name": key
            });

          case 167:
            _i3++;
            _context2.next = 142;
            break;

          case 170:
            embed = new MessageEmbed().setTitle("Everyone with one of those Roles is able to use the Admin Commands").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(client.settings.get(message.guild.id, "adminroles").length > 0 ? "<@&".concat(client.settings.get(message.guild.id, "adminroles").join(">, <@&"), ">") : "No General Admin Roles Setup yet").substr(0, 2048)).setFooter(es.footertext, es.footericon);

            for (_i4 = 0, _cmdrole2 = cmdrole; _i4 < _cmdrole2.length; _i4++) {
              _cmd6 = _cmdrole2[_i4];
              embed.addField(_cmd6.name, _cmd6.info.join(", "));
            }

            return _context2.abrupt("return", message.reply({
              embed: embed
            }));

          case 175:
            if (!(temptype == "thesettings")) {
              _context2.next = 212;
              break;
            }

            _db2 = client.settings.get(message.guild.id, "cmdadminroles");
            cmdrole = [];
            _i5 = 0, _Object$entries3 = Object.entries(_db2);

          case 179:
            if (!(_i5 < _Object$entries3.length)) {
              _context2.next = 207;
              break;
            }

            _Object$entries3$_i = _slicedToArray(_Object$entries3[_i5], 2), _cmd7 = _Object$entries3$_i[0], _values2 = _Object$entries3$_i[1];
            percmd = [];

            if (!(_values2.length > 0)) {
              _context2.next = 204;
              break;
            }

            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context2.prev = 186;

            for (_iterator8 = _values2[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              _r5 = _step8.value;

              if (message.guild.roles.cache.get(_r5)) {
                percmd.push("<@&".concat(_r5, ">"));
              } else if (message.guild.members.cache.get(_r5)) {
                percmd.push("<@".concat(_r5, ">"));
              } else {
                client.settings.remove(message.guild.id, _r5, "cmdadminroles.".concat(_cmd7));
              }
            }

            _context2.next = 194;
            break;

          case 190:
            _context2.prev = 190;
            _context2.t4 = _context2["catch"](186);
            _didIteratorError8 = true;
            _iteratorError8 = _context2.t4;

          case 194:
            _context2.prev = 194;
            _context2.prev = 195;

            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }

          case 197:
            _context2.prev = 197;

            if (!_didIteratorError8) {
              _context2.next = 200;
              break;
            }

            throw _iteratorError8;

          case 200:
            return _context2.finish(197);

          case 201:
            return _context2.finish(194);

          case 202:
            key = "For the `".concat(_cmd7, "` Command");
            cmdrole.push({
              "info": percmd,
              "name": key
            });

          case 204:
            _i5++;
            _context2.next = 179;
            break;

          case 207:
            embed = new MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Administration Setup").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**General Admin Roles:**\n".concat(client.settings.get(message.guild.id, "adminroles").length > 0 ? "<@&".concat(client.settings.get(message.guild.id, "adminroles").join(">, <@&"), ">") : "No General Admin Roles Setup yet").substr(0, 2048)).setFooter(es.footertext, es.footericon);

            for (_i6 = 0, _cmdrole3 = cmdrole; _i6 < _cmdrole3.length; _i6++) {
              _cmd8 = _cmdrole3[_i6];
              embed.addField(_cmd8.name, _cmd8.info.join(", "));
            }

            return _context2.abrupt("return", message.reply({
              embed: embed
            }));

          case 212:
            return _context2.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 213:
            _context2.next = 219;
            break;

          case 215:
            _context2.prev = 215;
            _context2.t5 = _context2["catch"](1);
            console.log(String(_context2.t5.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context2.t5)).substr(0, 2000), "```"))));

          case 219:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 215], [9, 17], [59, 63, 67, 75], [68,, 70, 74], [89, 93, 97, 105], [98,, 100, 104], [149, 153, 157, 165], [158,, 160, 164], [186, 190, 194, 202], [195,, 197, 201]]);
  }
};