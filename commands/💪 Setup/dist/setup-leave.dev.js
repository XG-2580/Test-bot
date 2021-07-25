"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "setup-leave",
  category: "💪 Setup",
  aliases: ["setupleave"],
  cooldown: 5,
  usage: "setup-leave --> and follow the steps",
  description: "Manage the Leave Message System",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
    return regeneratorRuntime.async(function run$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context8.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context8.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage the leave Message in a **Channel**\n\n2\uFE0F\u20E3 **==** Manage the leave Message for **DM MESSAGES**").setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context8.sent;
            _context8.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            _context8.next = 17;
            break;

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](9);
            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context8.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 17:
            _context8.next = 19;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "channel";else if (reaction.emoji.name === "2️⃣") temptype = "dm";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 19:
            if (!timeouterror) {
              _context8.next = 21;
              break;
            }

            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 21:
            if (!(temptype == "channel")) {
              _context8.next = 40;
              break;
            }

            _context8.next = 24;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | CHANNEL leave").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n        1\uFE0F\u20E3 **==** **Enable** / Set Channel *for this Server*\n\n        2\uFE0F\u20E3 **==** **Disable** leave *for this Server*\n\n        3\uFE0F\u20E3 **==** Manage **Image** *for the leave Message*\n\n        4\uFE0F\u20E3 **==** Set **Message** *for the leave Message*\n        \n        5\uFE0F\u20E3 **==** ".concat(client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information" : "**Enable Invite** Information", "\n\n        *React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 24:
            tempmsg = _context8.sent;
            _context8.prev = 25;
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context8.next = 34;
            break;

          case 31:
            _context8.prev = 31;
            _context8.t1 = _context8["catch"](25);
            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context8.t1)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 34:
            _context8.next = 36;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee3(collected) {
              var reaction;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Enable / Set Channel - CHANNEL

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context3.next = 12;
                        break;
                      }

                      _context3.next = 5;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("In which Channel shall I send the leave Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
                      }));

                    case 5:
                      tempmsg = _context3.sent;
                      _context3.next = 8;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        var message = collected.first();
                        var channel = message.mentions.channels.filter(function (ch) {
                          return ch.guild.id == message.guild.id;
                        }).first();

                        if (channel) {
                          try {
                            client.settings.set(message.guild.id, channel.id, "leave.channel");
                            return message.reply(new Discord.MessageEmbed().setTitle("The new leave Cannel is: `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet", "!\nEdit the message with: `").concat(prefix, "setup-leave  --> Pick 1\uFE0F\u20E3 --> Pick 4\uFE0F\u20E3`").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                          } catch (e) {
                            return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                          }
                        } else {
                          throw "you didn't ping a valid channel";
                        }
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 8:
                      if (!timeouterror) {
                        _context3.next = 10;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 10:
                      _context3.next = 68;
                      break;

                    case 12:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context3.next = 23;
                        break;
                      }

                      _context3.prev = 13;
                      client.settings.set(reaction.message.guild.id, "nochannel", "leave.channel");
                      return _context3.abrupt("return", reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Disabled the leave **Message**").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, no message will be sent into a Channel!\nSet a Channel with: `".concat(prefix, "setup-leave` --> Pick 1\uFE0F\u20E3 --> Pick 1\uFE0F\u20E3").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 18:
                      _context3.prev = 18;
                      _context3.t0 = _context3["catch"](13);
                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 21:
                      _context3.next = 68;
                      break;

                    case 23:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context3.next = 46;
                        break;
                      }

                      _context3.next = 26;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n                1\uFE0F\u20E3 **==** **Disable** Image\n\n                2\uFE0F\u20E3 **==** **Enable Auto** Image\n\n                3\uFE0F\u20E3 **==** **Set** Auto-Image **Background**\n\n                4\uFE0F\u20E3 **==** **Delete** Auto-Image **Background**\n\n                5\uFE0F\u20E3 **==** Enable & **Set CUSTOM Image** (no Userinfo)\n        \n                6\uFE0F\u20E3 **==** ".concat(client.settings.get(message.guild.id, "leave.frame") ? "**Disable**" : "**Enable**", " Auto-Image **Frame**\n\n                7\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.discriminator") ? "**Disable**" : "**Enable**", " **User Discriminator** (The 4 Numbers with the \"#\")\n\n                8\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.membercount") ? "**Disable**" : "**Enable**", " **Member Counter Text**\n\n                9\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.servername") ? "**Disable**" : "**Enable**", " **Servername Text **\n \n                \uD83D\uDD1F **==** ").concat(client.settings.get(message.guild.id, "leave.pb") ? "**Disable**" : "**Enable**", " **Profile Picture**\n                \n                \u2B1C **==** **Manage Frame/Text Color**\n\n\n                *React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
                      }));

                    case 26:
                      tempmsg = _context3.sent;
                      _context3.prev = 27;
                      tempmsg.react("3️⃣");
                      tempmsg.react("6️⃣");
                      tempmsg.react("7️⃣");
                      tempmsg.react("8️⃣");
                      tempmsg.react("9️⃣");
                      tempmsg.react("🔟");
                      tempmsg.react("⬜");
                      _context3.next = 40;
                      break;

                    case 37:
                      _context3.prev = 37;
                      _context3.t1 = _context3["catch"](27);
                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t1)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 40:
                      _context3.next = 42;
                      return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee2(collected) {
                        var reaction, url;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                reaction = collected.first();
                                reaction.users.remove(message.author.id);
                                url = "";

                                if (!(reaction.emoji.name === "1️⃣")) {
                                  _context2.next = 12;
                                  break;
                                }

                                _context2.prev = 4;
                                client.settings.set(message.guild.id, false, "leave.image");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send no Image with the leave Message").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with__out__ an image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2["catch"](4);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 12:
                                if (!(reaction.emoji.name === "2️⃣")) {
                                  _context2.next = 21;
                                  break;
                                }

                                _context2.prev = 13;
                                client.settings.set(message.guild.id, true, "leave.image");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send an Image with the leave Message").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image", "\n\nIf Someone joins this Server, a message **with an image** will be sent into ").concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 18:
                                _context2.prev = 18;
                                _context2.t1 = _context2["catch"](13);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 21:
                                if (!(reaction.emoji.name === "3️⃣")) {
                                  _context2.next = 29;
                                  break;
                                }

                                _context2.next = 24;
                                return regeneratorRuntime.awrap(tempmsg.edit({
                                  embed: new Discord.MessageEmbed().setTitle("Please add an Image now").setDescription("Mind, that the Format is: \`2100 px\` : \`750 px\`").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                }));

                              case 24:
                                tempmsg = _context2.sent;
                                _context2.next = 27;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 60000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  //push the answer of the user into the answers lmfao
                                  if (collected.first().attachments.size > 0) {
                                    if (collected.first().attachments.every(attachIsImage)) {
                                      client.settings.set(message.guild.id, "no", "leave.custom");
                                      client.settings.set(message.guild.id, url, "leave.background");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Background image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image", "\n\nIf Someone joins this Server, a message **with an image** will be sent into ").concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | Your Attachment is not a valid Image!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } else {
                                    if (isValidURL(collected.first().content)) {
                                      url = collected.first().content;
                                      client.settings.set(message.guild.id, "no", "leave.custom");
                                      client.settings.set(message.guild.id, url, "leave.background");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Background image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image", "\n\nIf Someone joins this Server, a message **with an image** will be sent into ").concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | You didn't entered a valid Link!").setDescription("Please retry the whole process").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } //this function is for turning each attachment into a url


                                  function attachIsImage(msgAttach) {
                                    url = msgAttach.url; //True if this url is a png image.

                                    return url.indexOf("png", url.length - "png".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                    /*or 3*/
                                    ) !== -1;
                                  }
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 27:
                                if (!timeouterror) {
                                  _context2.next = 29;
                                  break;
                                }

                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 29:
                                if (!(reaction.emoji.name === "4️⃣")) {
                                  _context2.next = 39;
                                  break;
                                }

                                _context2.prev = 30;
                                client.settings.set(message.guild.id, true, "leave.image");
                                client.settings.get(message.guild.id, "transparent", "leave.background");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send an Auto generated Image with an transparent Background, including your Guild Avatar").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 36:
                                _context2.prev = 36;
                                _context2.t2 = _context2["catch"](30);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t2)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 39:
                                if (!(reaction.emoji.name === "5️⃣")) {
                                  _context2.next = 47;
                                  break;
                                }

                                _context2.next = 42;
                                return regeneratorRuntime.awrap(tempmsg.edit({
                                  embed: new Discord.MessageEmbed().setTitle("Please add an Image now").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                }));

                              case 42:
                                tempmsg = _context2.sent;
                                _context2.next = 45;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 60000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  //push the answer of the user into the answers lmfao
                                  if (collected.first().attachments.size > 0) {
                                    if (collected.first().attachments.every(attachIsImage)) {
                                      client.settings.set(message.guild.id, url, "leave.custom");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image", "\n\nIf Someone joins this Server, a message **with an image** will be sent into ").concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | Your Attachment is not a valid Image!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } else {
                                    if (isValidURL(collected.first().content)) {
                                      url = collected.first().content;
                                      client.settings.set(message.guild.id, url, "leave.custom");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image", "\n\nIf Someone joins this Server, a message **with an image** will be sent into ").concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | You didn't entered a valid Link!").setDescription("Please retry the whole process").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } //this function is for turning each attachment into a url


                                  function attachIsImage(msgAttach) {
                                    url = msgAttach.url; //True if this url is a png image.

                                    return url.indexOf("png", url.length - "png".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                    /*or 3*/
                                    ) !== -1;
                                  }
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 45:
                                if (!timeouterror) {
                                  _context2.next = 47;
                                  break;
                                }

                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 47:
                                if (!(reaction.emoji.name === "6️⃣")) {
                                  _context2.next = 57;
                                  break;
                                }

                                _context2.prev = 48;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.frame"), "leave.frame");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.frame") ? "Enabled the Frame for the Automated leave Image" : "Disabled the Frame for the Automated leave Image")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 54:
                                _context2.prev = 54;
                                _context2.t3 = _context2["catch"](48);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t3)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 57:
                                if (!(reaction.emoji.name === "7️⃣")) {
                                  _context2.next = 67;
                                  break;
                                }

                                _context2.prev = 58;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminator"), "leave.discriminator");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.discriminator") ? "Enabled the Discrimantor (4 Numbers with #) for the Automated leave Image" : "Disabled the Discrimantor (4 Numbers with #) for the Automated leave Image")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 64:
                                _context2.prev = 64;
                                _context2.t4 = _context2["catch"](58);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t4)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 67:
                                if (!(reaction.emoji.name === "8️⃣")) {
                                  _context2.next = 77;
                                  break;
                                }

                                _context2.prev = 68;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercount"), "leave.membercount");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.membercount") ? "Enabled the MemberCount Text for the Automated leave Image" : "Disabled the MemberCount Text for the Automated leave Image")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 74:
                                _context2.prev = 74;
                                _context2.t5 = _context2["catch"](68);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t5)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 77:
                                if (!(reaction.emoji.name === "9️⃣")) {
                                  _context2.next = 87;
                                  break;
                                }

                                _context2.prev = 78;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servername"), "leave.servername");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.servername") ? "Enabled Servername Text Frame for the Automated leave Image" : "Disabled the Servername Text for the Automated leave Image")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 84:
                                _context2.prev = 84;
                                _context2.t6 = _context2["catch"](78);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t6)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 87:
                                if (!(reaction.emoji.name === "🔟")) {
                                  _context2.next = 97;
                                  break;
                                }

                                _context2.prev = 88;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pb"), "leave.pb");
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.pb") ? "Enabled Profile Picture for the Automated leave Image" : "Disabled Profile Picture for the Automated leave Image")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 94:
                                _context2.prev = 94;
                                _context2.t7 = _context2["catch"](88);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t7)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 97:
                                if (!(reaction.emoji.name === "⬜")) {
                                  _context2.next = 119;
                                  break;
                                }

                                _context2.next = 100;
                                return regeneratorRuntime.awrap(reaction.message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n                *React to the Color you want the Frame/Text to be like ;)*").setFooter(es.footertext, es.footericon)));

                              case 100:
                                tempmsg = _context2.sent;
                                _context2.prev = 101;
                                tempmsg.react("⬜");
                                tempmsg.react("🟨");
                                tempmsg.react("🟧");
                                tempmsg.react("🟥");
                                tempmsg.react("🟩");
                                tempmsg.react("🟦");
                                tempmsg.react("🟪");
                                tempmsg.react("⬛");
                                _context2.next = 115;
                                break;

                              case 112:
                                _context2.prev = 112;
                                _context2.t8 = _context2["catch"](101);
                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t8)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 115:
                                _context2.next = 117;
                                return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                }).then(function _callee(collected) {
                                  var reaction, color;
                                  return regeneratorRuntime.async(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          reaction = collected.first();
                                          reaction.users.remove(message.author.id);
                                          color = "#fffff9";
                                          if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                                          if (reaction.emoji.name === "🟨") color = "#FAFA25";
                                          if (reaction.emoji.name === "🟧") color = "#FA9E25";
                                          if (reaction.emoji.name === "🟥") color = "#FA2525";
                                          if (reaction.emoji.name === "🟩") color = "#25FA6C";
                                          if (reaction.emoji.name === "🟦") color = "#3A98F0";
                                          if (reaction.emoji.name === "🟪") color = "#8525FA";
                                          if (reaction.emoji.name === "⬛") color = "#030303";
                                          _context.prev = 11;
                                          client.settings.set(message.guild.id, color, "leave.framecolor");
                                          return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("CHANGED THE COLOR FOR THE FRAME").setColor(color).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                                        case 16:
                                          _context.prev = 16;
                                          _context.t0 = _context["catch"](11);
                                          return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                                        case 19:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  }, null, null, [[11, 16]]);
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 117:
                                if (!timeouterror) {
                                  _context2.next = 119;
                                  break;
                                }

                                return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 119:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, null, null, [[4, 9], [13, 18], [30, 36], [48, 54], [58, 64], [68, 74], [78, 84], [88, 94], [101, 112]]);
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 42:
                      if (!timeouterror) {
                        _context3.next = 44;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 44:
                      _context3.next = 68;
                      break;

                    case 46:
                      if (!(reaction.emoji.name === "4️⃣")) {
                        _context3.next = 56;
                        break;
                      }

                      _context3.next = 49;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What should be the leave Message?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that `{user}` will ping the User\n\nEnter your Message now!").setFooter(es.footertext, es.footericon)
                      }));

                    case 49:
                      tempmsg = _context3.sent;
                      _context3.next = 52;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        var message = collected.first();

                        try {
                          client.settings.set(message.guild.id, message.content, "leave.msg");
                          return message.reply(new Discord.MessageEmbed().setTitle("The new leave Message is:").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, this message will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL YET", "!\n\n").concat(message.content.replace("{user}", message.author)).substr(0, 2048)).setFooter(es.footertext, es.footericon));
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                        }
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 52:
                      if (!timeouterror) {
                        _context3.next = 54;
                        break;
                      }

                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 54:
                      _context3.next = 68;
                      break;

                    case 56:
                      if (!(reaction.emoji.name === "5️⃣")) {
                        _context3.next = 67;
                        break;
                      }

                      _context3.prev = 57;
                      cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invite"), "leave.invite");
                      return _context3.abrupt("return", reaction.message.channel.send(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.invite") ? "Enabled Invite Information" : "Disabled INvite INformation")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message with Invite Information will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet", "!\nEdit the message with: `").concat(prefix, "setup-leave  --> Pick 1\uFE0F\u20E3 --> Pick 4\uFE0F\u20E3`").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 62:
                      _context3.prev = 62;
                      _context3.t2 = _context3["catch"](57);
                      return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t2)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 65:
                      _context3.next = 68;
                      break;

                    case 67:
                      throw "You reacted with a wrong emoji";

                    case 68:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, null, [[13, 18], [27, 37], [57, 62]]);
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 36:
            if (!timeouterror) {
              _context8.next = 38;
              break;
            }

            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 38:
            _context8.next = 79;
            break;

          case 40:
            if (!(temptype == "dm")) {
              _context8.next = 59;
              break;
            }

            _context8.next = 43;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | CHANNEL leave").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n        1\uFE0F\u20E3 **==** Enable *for this Server (in DM)*\n\n        2\uFE0F\u20E3 **==** Disable leave *for this Server (in DM)*\n\n        3\uFE0F\u20E3 **==** Manage Image *for the leave Message (in DM)*\n\n        4\uFE0F\u20E3 **==** Set Message *for the leave Message (in DM)*\n        \n        5\uFE0F\u20E3 **==** ".concat(client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information" : "**Enable Invite** Information", "\n\n        *React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 43:
            tempmsg = _context8.sent;
            _context8.prev = 44;
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context8.next = 53;
            break;

          case 50:
            _context8.prev = 50;
            _context8.t2 = _context8["catch"](44);
            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context8.t2)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 53:
            _context8.next = 55;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee6(collected) {
              var reaction;
              return regeneratorRuntime.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Enable / Set Channel - CHANNEL

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context6.next = 13;
                        break;
                      }

                      _context6.prev = 3;
                      client.settings.set(message.guild.id, true, "leave.dm");
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send leave-Messages to a new User in his DMS").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 8:
                      _context6.prev = 8;
                      _context6.t0 = _context6["catch"](3);
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 11:
                      _context6.next = 68;
                      break;

                    case 13:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context6.next = 24;
                        break;
                      }

                      _context6.prev = 14;
                      client.settings.set(message.guild.id, false, "leave.dm");
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send **NO** leave-Messages to a new User in his DMS").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 19:
                      _context6.prev = 19;
                      _context6.t1 = _context6["catch"](14);
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 22:
                      _context6.next = 68;
                      break;

                    case 24:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context6.next = 46;
                        break;
                      }

                      _context6.next = 27;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n                1\uFE0F\u20E3 **==** **Disable** Image\n\n                2\uFE0F\u20E3 **==** **Enable Auto** Image\n\n                3\uFE0F\u20E3 **==** **Set** Auto-Image **Background**\n\n                4\uFE0F\u20E3 **==** **Delete** Auto-Image **Background**\n\n                5\uFE0F\u20E3 **==** Enable & **Set CUSTOM Image** (no Userinfo)\n        \n                6\uFE0F\u20E3 **==** ".concat(client.settings.get(message.guild.id, "leave.framedm") ? "**Disable**" : "**Enable**", " Auto-Image **Frame**\n\n                7\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.discriminatordm") ? "**Disable**" : "**Enable**", " **User Discriminator** (The 4 Numbers with the \"#\")\n\n                8\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.membercountdm") ? "**Disable**" : "**Enable**", " **Member Counter Text**\n\n                9\uFE0F\u20E3 **==** ").concat(client.settings.get(message.guild.id, "leave.servernamedm") ? "**Disable**" : "**Enable**", " **Servername Text **\n                \n                \uD83D\uDD1F **==** ").concat(client.settings.get(message.guild.id, "leave.pbdm") ? "**Disable**" : "**Enable**", " **Profile Picture**\n                \n                \u2B1C **==** **Manage Frame/Text Color**\n\n                *React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
                      }));

                    case 27:
                      tempmsg = _context6.sent;
                      _context6.prev = 28;
                      tempmsg.react("6️⃣");
                      tempmsg.react("7️⃣");
                      tempmsg.react("8️⃣");
                      tempmsg.react("9️⃣");
                      tempmsg.react("🔟");
                      tempmsg.react("⬜");
                      _context6.next = 40;
                      break;

                    case 37:
                      _context6.prev = 37;
                      _context6.t2 = _context6["catch"](28);
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t2)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 40:
                      _context6.next = 42;
                      return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee5(collected) {
                        var reaction, url;
                        return regeneratorRuntime.async(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                reaction = collected.first();
                                reaction.users.remove(message.author.id);
                                url = "";

                                if (!(reaction.emoji.name === "1️⃣")) {
                                  _context5.next = 12;
                                  break;
                                }

                                _context5.prev = 4;
                                client.settings.set(message.guild.id, false, "leave.imagedm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send no Image with the leave Message (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                              case 9:
                                _context5.prev = 9;
                                _context5.t0 = _context5["catch"](4);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 12:
                                if (!(reaction.emoji.name === "2️⃣")) {
                                  _context5.next = 21;
                                  break;
                                }

                                _context5.prev = 13;
                                client.settings.set(message.guild.id, true, "leave.imagedm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send an Image with the leave Message (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                              case 18:
                                _context5.prev = 18;
                                _context5.t1 = _context5["catch"](13);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 21:
                                if (!(reaction.emoji.name === "3️⃣")) {
                                  _context5.next = 29;
                                  break;
                                }

                                _context5.next = 24;
                                return regeneratorRuntime.awrap(tempmsg.edit({
                                  embed: new Discord.MessageEmbed().setTitle("Please add an Image now").setDescription("Mind, that the Format is: \`2100 px\` : \`750 px\`").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                }));

                              case 24:
                                tempmsg = _context5.sent;
                                _context5.next = 27;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 60000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  //push the answer of the user into the answers lmfao
                                  if (collected.first().attachments.size > 0) {
                                    if (collected.first().attachments.every(attachIsImage)) {
                                      client.settings.set(message.guild.id, "no", "leave.customdm");
                                      client.settings.set(message.guild.id, url, "leave.backgrounddm");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Background image (dm)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | Your Attachment is not a valid Image!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } else {
                                    if (isValidURL(collected.first().content)) {
                                      url = collected.first().content;
                                      client.settings.set(message.guild.id, "no", "leave.customdm");
                                      client.settings.set(message.guild.id, url, "leave.backgrounddm");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Background image").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | You didn't entered a valid Link!").setDescription("Please retry the whole process").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } //this function is for turning each attachment into a url


                                  function attachIsImage(msgAttach) {
                                    url = msgAttach.url; //True if this url is a png image.

                                    return url.indexOf("png", url.length - "png".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                    /*or 3*/
                                    ) !== -1;
                                  }
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 27:
                                if (!timeouterror) {
                                  _context5.next = 29;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 29:
                                if (!(reaction.emoji.name === "4️⃣")) {
                                  _context5.next = 39;
                                  break;
                                }

                                _context5.prev = 30;
                                client.settings.set(message.guild.id, true, "leave.imagedm");
                                client.settings.get(message.guild.id, "transparent", "leave.backgrounddm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("I will now send an Auto generated Image with an transparent Background, including your Guild Avatar (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                              case 36:
                                _context5.prev = 36;
                                _context5.t2 = _context5["catch"](30);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t2)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 39:
                                if (!(reaction.emoji.name === "5️⃣")) {
                                  _context5.next = 47;
                                  break;
                                }

                                _context5.next = 42;
                                return regeneratorRuntime.awrap(tempmsg.edit({
                                  embed: new Discord.MessageEmbed().setTitle("Please add an Image now").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                }));

                              case 42:
                                tempmsg = _context5.sent;
                                _context5.next = 45;
                                return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                                  return m.author.id === message.author.id;
                                }, {
                                  max: 1,
                                  time: 60000,
                                  errors: ["time"]
                                }).then(function (collected) {
                                  //push the answer of the user into the answers lmfao
                                  if (collected.first().attachments.size > 0) {
                                    if (collected.first().attachments.every(attachIsImage)) {
                                      client.settings.set(message.guild.id, url, "leave.customdm");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom image (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | Your Attachment is not a valid Image!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } else {
                                    if (isValidURL(collected.first().content)) {
                                      url = collected.first().content;
                                      client.settings.set(message.guild.id, url, "leave.customdm");
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("I will now use your Custom Image (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("I will be using ".concat(client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data" : "Your defined, custom Image").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                                    } else {
                                      return reaction.message.channel.send(new Discord.MessageEmbed().setTitle("Error | You didn't entered a valid Link!").setDescription("Please retry the whole process").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                                    }
                                  } //this function is for turning each attachment into a url


                                  function attachIsImage(msgAttach) {
                                    url = msgAttach.url; //True if this url is a png image.

                                    return url.indexOf("png", url.length - "png".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                                    /*or 3*/
                                    ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                                    /*or 3*/
                                    ) !== -1;
                                  }
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 45:
                                if (!timeouterror) {
                                  _context5.next = 47;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 47:
                                if (!(reaction.emoji.name === "6️⃣")) {
                                  _context5.next = 57;
                                  break;
                                }

                                _context5.prev = 48;
                                client.settings.set(message.guild.id, "no", "leave.customdm");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.framedm"), "leave.framedm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.framedm") ? "Enabled the Frame for the Automated leave Image" : "Disabled the Frame for the Automated leave Image", " (DM)")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                              case 54:
                                _context5.prev = 54;
                                _context5.t3 = _context5["catch"](48);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t3)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 57:
                                if (!(reaction.emoji.name === "7️⃣")) {
                                  _context5.next = 67;
                                  break;
                                }

                                _context5.prev = 58;
                                client.settings.set(message.guild.id, "no", "leave.customdm");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminatordm"), "leave.discriminatordm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.discriminatordm") ? "Enabled the Discrimantor (4 Numbers with #) for the Automated leave Image" : "Disabled the Discrimantor (4 Numbers with #) for the Automated leave Image", " (DM)")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 64:
                                _context5.prev = 64;
                                _context5.t4 = _context5["catch"](58);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t4)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 67:
                                if (!(reaction.emoji.name === "8️⃣")) {
                                  _context5.next = 77;
                                  break;
                                }

                                _context5.prev = 68;
                                client.settings.set(message.guild.id, "no", "leave.customdm");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercountdm"), "leave.membercountdm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.membercountdm") ? "Enabled the MemberCount Text for the Automated leave Image" : "Disabled the MemberCount Textthe Automated leave Image", " (DM)")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 74:
                                _context5.prev = 74;
                                _context5.t5 = _context5["catch"](68);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t5)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 77:
                                if (!(reaction.emoji.name === "9️⃣")) {
                                  _context5.next = 87;
                                  break;
                                }

                                _context5.prev = 78;
                                client.settings.set(message.guild.id, "no", "leave.customdm");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servernamedm"), "leave.servernamedm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.servernamedm") ? "Enabled Servername Text Frame for the Automated leave Image" : "Disabled the Servername Text for the Automated leave Image", " (DM)")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 84:
                                _context5.prev = 84;
                                _context5.t6 = _context5["catch"](78);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t6)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 87:
                                if (!(reaction.emoji.name === "🔟")) {
                                  _context5.next = 97;
                                  break;
                                }

                                _context5.prev = 88;
                                client.settings.set(message.guild.id, "no", "leave.custom");
                                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pbdm"), "leave.pbdm");
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.pbdm") ? "Enabled Profile Picture for the Automated leave Image" : "Disabled Profile Picture for the Automated leave Image", " (DM)")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                              case 94:
                                _context5.prev = 94;
                                _context5.t7 = _context5["catch"](88);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t7)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 97:
                                if (!(reaction.emoji.name === "⬜")) {
                                  _context5.next = 119;
                                  break;
                                }

                                _context5.next = 100;
                                return regeneratorRuntime.awrap(reaction.message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n                *React to the Color you want the Frame/Text to be like ;)*").setFooter(es.footertext, es.footericon)));

                              case 100:
                                tempmsg = _context5.sent;
                                _context5.prev = 101;
                                tempmsg.react("⬜");
                                tempmsg.react("🟨");
                                tempmsg.react("🟧");
                                tempmsg.react("🟥");
                                tempmsg.react("🟩");
                                tempmsg.react("🟦");
                                tempmsg.react("🟪");
                                tempmsg.react("⬛");
                                _context5.next = 115;
                                break;

                              case 112:
                                _context5.prev = 112;
                                _context5.t8 = _context5["catch"](101);
                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context5.t8)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 115:
                                _context5.next = 117;
                                return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                }).then(function _callee4(collected) {
                                  var reaction, color;
                                  return regeneratorRuntime.async(function _callee4$(_context4) {
                                    while (1) {
                                      switch (_context4.prev = _context4.next) {
                                        case 0:
                                          reaction = collected.first();
                                          reaction.users.remove(message.author.id);
                                          color = "#fffff9";
                                          if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                                          if (reaction.emoji.name === "🟨") color = "#FAFA25";
                                          if (reaction.emoji.name === "🟧") color = "#FA9E25";
                                          if (reaction.emoji.name === "🟥") color = "#FA2525";
                                          if (reaction.emoji.name === "🟩") color = "#25FA6C";
                                          if (reaction.emoji.name === "🟦") color = "#3A98F0";
                                          if (reaction.emoji.name === "🟪") color = "#8525FA";
                                          if (reaction.emoji.name === "⬛") color = "#030303";
                                          _context4.prev = 11;
                                          client.settings.set(message.guild.id, color, "leave.framecolordm");
                                          return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("CHANGED THE COLOR FOR THE FRAME (DM)").setColor(color).setDescription("If Someone joins this Server, a message **with an automated image** will be sent into ".concat(message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                                        case 16:
                                          _context4.prev = 16;
                                          _context4.t0 = _context4["catch"](11);
                                          return _context4.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context4.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                                        case 19:
                                        case "end":
                                          return _context4.stop();
                                      }
                                    }
                                  }, null, null, [[11, 16]]);
                                })["catch"](function (e) {
                                  timeouterror = e;
                                }));

                              case 117:
                                if (!timeouterror) {
                                  _context5.next = 119;
                                  break;
                                }

                                return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                              case 119:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, null, null, [[4, 9], [13, 18], [30, 36], [48, 54], [58, 64], [68, 74], [78, 84], [88, 94], [101, 112]]);
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 42:
                      if (!timeouterror) {
                        _context6.next = 44;
                        break;
                      }

                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 44:
                      _context6.next = 68;
                      break;

                    case 46:
                      if (!(reaction.emoji.name === "4️⃣")) {
                        _context6.next = 56;
                        break;
                      }

                      _context6.next = 49;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("What should be the leave Message? (DM").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that `{user}` will ping the User\n\nEnter your Message now!").setFooter(es.footertext, es.footericon)
                      }));

                    case 49:
                      tempmsg = _context6.sent;
                      _context6.next = 52;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function (collected) {
                        var message = collected.first();

                        try {
                          client.settings.set(message.guild.id, message.content, "leave.dm_msg");
                          return message.reply(new Discord.MessageEmbed().setTitle("The new leave Message is: (DM)").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(message.content.replace("{user}", message.author)).substr(0, 2048)).setFooter(es.footertext, es.footericon));
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                        }
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 52:
                      if (!timeouterror) {
                        _context6.next = 54;
                        break;
                      }

                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 54:
                      _context6.next = 68;
                      break;

                    case 56:
                      if (!(reaction.emoji.name === "5️⃣")) {
                        _context6.next = 67;
                        break;
                      }

                      _context6.prev = 57;
                      cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invitedm"), "leave.invite");
                      return _context6.abrupt("return", reaction.message.channel.send(new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "leave.invitedm") ? "Enabled Invite Information" : "Disabled INvite INformation")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

                    case 62:
                      _context6.prev = 62;
                      _context6.t3 = _context6["catch"](57);
                      return _context6.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context6.t3)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 65:
                      _context6.next = 68;
                      break;

                    case 67:
                      throw "You reacted with a wrong emoji";

                    case 68:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, null, [[3, 8], [14, 19], [28, 37], [57, 62]]);
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 55:
            if (!timeouterror) {
              _context8.next = 57;
              break;
            }

            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 57:
            _context8.next = 79;
            break;

          case 59:
            if (!(temptype == "roles")) {
              _context8.next = 78;
              break;
            }

            _context8.next = 62;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | CHANNEL leave").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n        1\uFE0F\u20E3 **==** **Add** Role\n\n        2\uFE0F\u20E3 **==** **Remove** Role\n\n        3\uFE0F\u20E3 **==** **Show** Roles\n\n\n        *React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 62:
            tempmsg = _context8.sent;
            _context8.prev = 63;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            _context8.next = 72;
            break;

          case 69:
            _context8.prev = 69;
            _context8.t3 = _context8["catch"](63);
            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context8.t3)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 72:
            _context8.next = 74;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee7(collected) {
              var reaction;
              return regeneratorRuntime.async(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      reaction = collected.first();
                      reaction.users.remove(message.author.id); //Add Role

                      if (!(reaction.emoji.name === "1️⃣")) {
                        _context7.next = 12;
                        break;
                      }

                      _context7.next = 5;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
                      }));

                    case 5:
                      tempmsg = _context7.sent;
                      _context7.next = 8;
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
                          var leaveroles = client.settings.get(message.guild.id, "leave.roles");
                          if (leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is already registered as an leave Role")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
                          client.settings.push(message.guild.id, role.id, "leave.roles");
                          return message.reply(new Discord.MessageEmbed().setTitle("The role: `".concat(role.name, "` is now registered as an leave Role")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone who joins will get those Roles now:\n<@&".concat(client.settings.get(message.guild.id, "leave.roles").join(">\n<@&"), ">").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                        } else {
                          throw "you didn't ping a valid Role";
                        }
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 8:
                      if (!timeouterror) {
                        _context7.next = 10;
                        break;
                      }

                      return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 10:
                      _context7.next = 27;
                      break;

                    case 12:
                      if (!(reaction.emoji.name === "2️⃣")) {
                        _context7.next = 22;
                        break;
                      }

                      _context7.next = 15;
                      return regeneratorRuntime.awrap(tempmsg.edit({
                        embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna remove?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
                      }));

                    case 15:
                      tempmsg = _context7.sent;
                      _context7.next = 18;
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
                          var leaveroles = client.settings.get(message.guild.id, "leave.roles");
                          if (!leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is not registered as an leave Role yet")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
                          client.settings.remove(message.guild.id, role.id, "leave.roles");
                          return message.reply(new Discord.MessageEmbed().setTitle("Remove the role: `".concat(role.name, "` from the leave Roles")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Everyone who joins will get those Roles now:\n<@&".concat(client.settings.get(message.guild.id, "leave.roles").join(">\n<@&"), ">").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                        } else {
                          throw "you didn't ping a valid Role";
                        }
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 18:
                      if (!timeouterror) {
                        _context7.next = 20;
                        break;
                      }

                      return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 20:
                      _context7.next = 27;
                      break;

                    case 22:
                      if (!(reaction.emoji.name === "3️⃣")) {
                        _context7.next = 26;
                        break;
                      }

                      return _context7.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Everyone who joins will get those Roles now:").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("<@&".concat(client.settings.get(message.guild.id, "leave.roles").join(">\n<@&"), ">").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

                    case 26:
                      throw "You reacted with a wrong emoji";

                    case 27:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 74:
            if (!timeouterror) {
              _context8.next = 76;
              break;
            }

            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 76:
            _context8.next = 79;
            break;

          case 78:
            return _context8.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 79:
            _context8.next = 85;
            break;

          case 81:
            _context8.prev = 81;
            _context8.t4 = _context8["catch"](1);
            console.log(String(_context8.t4.stack).bgRed);
            return _context8.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context8.t4)).substr(0, 2000), "```"))));

          case 85:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[1, 81], [9, 14], [25, 31], [44, 50], [63, 69]]);
  }
};