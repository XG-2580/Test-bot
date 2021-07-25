"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup-jtc",
  category: "💪 Setup",
  aliases: ["setup-jointocreate", "setupjtc", "setupjointocreate", "jtc-setup", "jtcsetup"],
  cooldown: 5,
  usage: "setup-jtc  -->  Follow Steps",
  description: "Manage 3 different Join to Create Systems",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context4.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context4.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage the **first** Join to Create Setup\n\n2\uFE0F\u20E3 **==** Manage the **second** Join to Create Setup\n\n3\uFE0F\u20E3 **==** Manage the **third** Join to Create Setup\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context4.sent;
            _context4.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](9);
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context4.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context4.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "1";else if (reaction.emoji.name === "2️⃣") temptype = "2";else if (reaction.emoji.name === "3️⃣") temptype = "3";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context4.next = 22;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            if (!(temptype == "1")) {
              _context4.next = 32;
              break;
            }

            _context4.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | JOIN TO CREATE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n        1\uFE0F\u20E3 **==** **Create** a Channel Setup \n\n        2\uFE0F\u20E3 **==** **Use** the Channel you are currently **connected** to as a `JOIN TO CREATE` Channel\n\n        3\uFE0F\u20E3 **==** Manage the **Name** of the Created Channels\n\n        *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 25:
            tempmsg = _context4.sent;
            _context4.next = 28;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee(collected) {
              var reaction, maxbitrate, boosts, channel;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Create CHANNEL

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context.next = 11;
                        break;
                      }

                      maxbitrate = 96000;
                      boosts = message.guild.premiumSubscriptionCount;
                      if (boosts >= 2) maxbitrate = 128000;
                      if (boosts >= 15) maxbitrate = 256000;
                      if (boosts >= 30) maxbitrate = 384000;
                      message.guild.channels.create("Join to Create", {
                        type: 'voice',
                        bitrate: maxbitrate,
                        userLimit: 4,
                        permissionOverwrites: [//update the permissions
                        {
                          //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "CONNECT"],
                          deny: ["SPEAK"]
                        }]
                      }).then(function (vc) {
                        if (message.channel.parent) vc.setParent(message.channel.parent.id);
                        message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(vc.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(vc.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                        client.jtcsettings.set(message.guild.id, vc.id, "channel");
                      });
                      _context.next = 30;
                      break;

                    case 11:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context.next = 19;
                        break;
                      }

                      channel = message.member.voice.channel;

                      if (channel) {
                        _context.next = 15;
                        break;
                      }

                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("You are not connected to a Channel").setColor(es.wrongcolor).setDescription("Please redo the Setup, and join a Channel").setFooter(es.footertext, es.footericon)));

                    case 15:
                      message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(channel.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(channel.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                      client.jtcsettings.set(message.guild.id, channel.id, "channel");
                      _context.next = 30;
                      break;

                    case 19:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context.next = 29;
                        break;
                      }

                      _context.next = 22;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What should be the new Hosted Channel Names?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that, if you add `{user}` it will be replaced with the **USERNAME**").setFooter(es.footertext, es.footericon)
                      }));

                    case 22:
                      tempmsg = _context.sent;
                      _context.next = 25;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        client.jtcsettings.set(message.guild.id, collected.first().content, "channelname");
                        message.channel.send(new Discord.MessageEmbed().setTitle("✅ Successfully changed the Channelname for the temp. Channels").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("New Channelname: `".concat(client.jtcsettings.get(message.guild.id, "channelname"), "`\n\nWhat it could look like: `").concat(client.jtcsettings.get(message.guild.id, "channelname").replace("{user}", message.author.username), "`")).setFooter(es.footertext, es.footericon));
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 25:
                      if (!timeouterror) {
                        _context.next = 27;
                        break;
                      }

                      return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 27:
                      _context.next = 30;
                      break;

                    case 29:
                      throw "You reacted with a wrong emoji";

                    case 30:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 28:
            if (!timeouterror) {
              _context4.next = 30;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 30:
            _context4.next = 53;
            break;

          case 32:
            if (!(temptype == "2")) {
              _context4.next = 42;
              break;
            }

            _context4.next = 35;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | JOIN TO CREATE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n          1\uFE0F\u20E3 **==** **Create** a Channel Setup \n  \n          2\uFE0F\u20E3 **==** **Use** the Channel you are currently **connected** to as a `JOIN TO CREATE` Channel\n  \n          3\uFE0F\u20E3 **==** Manage the **Name** of the Created Channels\n  \n          *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 35:
            tempmsg = _context4.sent;
            _context4.next = 38;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee2(collected) {
              var reaction, maxbitrate, boosts, channel;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Create CHANNEL

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context2.next = 11;
                        break;
                      }

                      maxbitrate = 96000;
                      boosts = message.guild.premiumSubscriptionCount;
                      if (boosts >= 2) maxbitrate = 128000;
                      if (boosts >= 15) maxbitrate = 256000;
                      if (boosts >= 30) maxbitrate = 384000;
                      message.guild.channels.create("Join to Create", {
                        type: 'voice',
                        bitrate: maxbitrate,
                        userLimit: 4,
                        permissionOverwrites: [//update the permissions
                        {
                          //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "CONNECT"],
                          deny: ["SPEAK"]
                        }]
                      }).then(function (vc) {
                        if (message.channel.parent) vc.setParent(message.channel.parent.id);
                        message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(vc.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(vc.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                        client.jtcsettings2.set(message.guild.id, vc.id, "channel");
                      });
                      _context2.next = 30;
                      break;

                    case 11:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context2.next = 19;
                        break;
                      }

                      channel = message.member.voice.channel;

                      if (channel) {
                        _context2.next = 15;
                        break;
                      }

                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("You are not connected to a Channel").setColor(es.wrongcolor).setDescription("Please redo the Setup, and join a Channel").setFooter(es.footertext, es.footericon)));

                    case 15:
                      message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(channel.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(channel.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                      client.jtcsettings2.set(message.guild.id, channel.id, "channel");
                      _context2.next = 30;
                      break;

                    case 19:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context2.next = 29;
                        break;
                      }

                      _context2.next = 22;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What should be the new Hosted Channel Names?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that, if you add `{user}` it will be replaced with the **USERNAME**").setFooter(es.footertext, es.footericon)
                      }));

                    case 22:
                      tempmsg = _context2.sent;
                      _context2.next = 25;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        client.jtcsettings2.set(message.guild.id, collected.first().content, "channelname");
                        message.channel.send(new Discord.MessageEmbed().setTitle("✅ Successfully changed the Channelname for the temp. Channels").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("New Channelname: `".concat(client.jtcsettings2.get(message.guild.id, "channelname"), "`\n\nWhat it could look like: `").concat(client.jtcsettings2.get(message.guild.id, "channelname").replace("{user}", message.author.username), "`")).setFooter(es.footertext, es.footericon));
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 25:
                      if (!timeouterror) {
                        _context2.next = 27;
                        break;
                      }

                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 27:
                      _context2.next = 30;
                      break;

                    case 29:
                      throw "You reacted with a wrong emoji";

                    case 30:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 38:
            if (!timeouterror) {
              _context4.next = 40;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 40:
            _context4.next = 53;
            break;

          case 42:
            if (!(temptype == "3")) {
              _context4.next = 52;
              break;
            }

            _context4.next = 45;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | JOIN TO CREATE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n          1\uFE0F\u20E3 **==** **Create** a Channel Setup \n  \n          2\uFE0F\u20E3 **==** **Use** the Channel you are currently **connected** to as a `JOIN TO CREATE` Channel\n  \n          3\uFE0F\u20E3 **==** Manage the **Name** of the Created Channels\n  \n          *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 45:
            tempmsg = _context4.sent;
            _context4.next = 48;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee3(collected) {
              var reaction, maxbitrate, boosts, channel;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Create CHANNEL

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context3.next = 11;
                        break;
                      }

                      maxbitrate = 96000;
                      boosts = message.guild.premiumSubscriptionCount;
                      if (boosts >= 2) maxbitrate = 128000;
                      if (boosts >= 15) maxbitrate = 256000;
                      if (boosts >= 30) maxbitrate = 384000;
                      message.guild.channels.create("Join to Create", {
                        type: 'voice',
                        bitrate: maxbitrate,
                        userLimit: 4,
                        permissionOverwrites: [//update the permissions
                        {
                          //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "CONNECT"],
                          deny: ["SPEAK"]
                        }]
                      }).then(function (vc) {
                        if (message.channel.parent) vc.setParent(message.channel.parent.id);
                        message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(vc.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(vc.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                        client.jtcsettings3.set(message.guild.id, vc.id, "channel");
                      });
                      _context3.next = 30;
                      break;

                    case 11:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context3.next = 19;
                        break;
                      }

                      channel = message.member.voice.channel;

                      if (channel) {
                        _context3.next = 15;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("You are not connected to a Channel").setColor(es.wrongcolor).setDescription("Please redo the Setup, and join a Channel").setFooter(es.footertext, es.footericon)));

                    case 15:
                      message.reply(new Discord.MessageEmbed().setTitle("✅ Setup Complete for Join to Create").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Bound to Channel: `".concat(channel.name, "`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from `").concat(channel.name, "`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from `").concat(channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE", "`!\nLike, which Role / User is allowed to do smt, or to not do smt")).setFooter(es.footertext, es.footericon));
                      client.jtcsettings3.set(message.guild.id, channel.id, "channel");
                      _context3.next = 30;
                      break;

                    case 19:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context3.next = 29;
                        break;
                      }

                      _context3.next = 22;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What should be the new Hosted Channel Names?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that, if you add `{user}` it will be replaced with the **USERNAME**").setFooter(es.footertext, es.footericon)
                      }));

                    case 22:
                      tempmsg = _context3.sent;
                      _context3.next = 25;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        client.jtcsettings3.set(message.guild.id, collected.first().content, "channelname");
                        message.channel.send(new Discord.MessageEmbed().setTitle("✅ Successfully changed the Channelname for the temp. Channels").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("New Channelname: `".concat(client.jtcsettings3.get(message.guild.id, "channelname"), "`\n\nWhat it could look like: `").concat(client.jtcsettings3.get(message.guild.id, "channelname").replace("{user}", message.author.username), "`")).setFooter(es.footertext, es.footericon));
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 25:
                      if (!timeouterror) {
                        _context3.next = 27;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 27:
                      _context3.next = 30;
                      break;

                    case 29:
                      throw "You reacted with a wrong emoji";

                    case 30:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 48:
            if (!timeouterror) {
              _context4.next = 50;
              break;
            }

            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 50:
            _context4.next = 53;
            break;

          case 52:
            return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 53:
            _context4.next = 59;
            break;

          case 55:
            _context4.prev = 55;
            _context4.t1 = _context4["catch"](1);
            console.log(String(_context4.t1.stack).bgRed);
            return _context4.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context4.t1.stack, "```"))));

          case 59:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 55], [9, 15]]);
  }
};
/**
  * @INFO
  * Bot Coded by XG#2846 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://Limsathya
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/