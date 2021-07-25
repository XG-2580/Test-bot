"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require("fs");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

var twitconfig = require("../../social_log/twitter.json");

var Twit = require('twit');

module.exports = {
  name: "setup-twitter",
  category: "💪 Setup",
  aliases: ["setuptwitter", "twitter-setup"],
  cooldown: 5,
  usage: "setup-twitter  --> Follow the Steps",
  description: "Manage the 2x Twitter Systems (set channel, set twitter)",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, add, username, userid, T;
    return regeneratorRuntime.async(function run$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context3.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            add = "";
            _context3.next = 9;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage **first** Twitter Logger\n\n2\uFE0F\u20E3 **==** Manage **second** Twitter Logger\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 9:
            tempmsg = _context3.sent;
            _context3.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](10);
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 18:
            _context3.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") add = "";else if (reaction.emoji.name === "2️⃣") add = "second";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context3.next = 22;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 22:
            if (!(add == "second")) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | SECOND TWITTER IS DISABLED").setColor(es.wrongcolor).setDescription("Due to rate limits, the second Twitter Log got disabled! SORRY!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 24:
            _context3.next = 26;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== Set** **Twitter Account** (/Overwrite)\n\n2\uFE0F\u20E3 **== Set** Discord **Channel**\n\n3\uFE0F\u20E3 **== Set** Posting **Message**\n\n4\uFE0F\u20E3 **==** ".concat(client.social_log.get(message.guild.id, "".concat(add, "twitter.REETWET")) ? "Disable Posting Retweets" : "Enable that i also Post Retweets", "\n\n5\uFE0F\u20E3 **==** Manually set the **TWITTER ID** && **TWITTER NAME**\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 26:
            tempmsg = _context3.sent;
            _context3.prev = 27;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            _context3.next = 38;
            break;

          case 35:
            _context3.prev = 35;
            _context3.t1 = _context3["catch"](27);
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context3.t1)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 38:
            _context3.next = 40;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "account";else if (reaction.emoji.name === "2️⃣") temptype = "channel";else if (reaction.emoji.name === "3️⃣") temptype = "message";else if (reaction.emoji.name === "4️⃣") temptype = "retweet";else if (reaction.emoji.name === "5️⃣") temptype = "id";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 40:
            if (!timeouterror) {
              _context3.next = 42;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 42:
            if (!(temptype == "account")) {
              _context3.next = 55;
              break;
            }

            _context3.next = 45;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("Which account do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please send me the TWITTER LINK like that: `https://twitter.com/MilratoDev`").setFooter(es.footertext, es.footericon)));

          case 45:
            tempmsg = _context3.sent;
            _context3.next = 48;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var twitlink = collected.first().content;

              if (!String(twitlink).toLowerCase().includes("https")) {
                timeouterror = "INVALID LINK";
                return message.reply("INVALID TWITTER LINK, a Twitter Link looks like that: \`https://twitter.com/MilratoDev\`");
              }

              if (!String(twitlink).toLowerCase().includes("twitter")) {
                timeouterror = "INVALID LINK";
                return message.reply("INVALID TWITTER LINK, a Twitter Link looks like that: \`https://twitter.com/MilratoDev\`");
              }

              username = twitlink.replace("https://twitter", "").split("/")[1];
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 48:
            if (!timeouterror) {
              _context3.next = 50;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 50:
            T = new Twit({
              consumer_key: twitconfig.consumer_key,
              consumer_secret: twitconfig.consumer_secret,
              access_token: twitconfig.access_token,
              access_token_secret: twitconfig.access_token_secret,
              timeout_ms: twitconfig.timeout_ms,
              strictSSL: twitconfig.strictSSL
            });
            _context3.next = 53;
            return regeneratorRuntime.awrap(T.get('users/search', {
              q: "".concat(username),
              count: 1
            }, function (err, data, response) {
              if (err) return message.reply("UNABLE TO FIND USER");
              var user = data[0];
              if (!user) return message.reply("UNABLE TO FIND USER");
              userid = user.id_str;
              var TwitterName = user.screen_name;

              try {
                client.social_log.set(message.guild.id, userid, "".concat(add, "twitter.TWITTER_USER_ID"));
                client.social_log.set(message.guild.id, username, "".concat(add, "twitter.TWITTER_USER_NAME_ONLY_THOSE")); //require("../../social_log/twitterfeed").creat_twit(client);

                return message.reply(new Discord.MessageEmbed().setTitle("I will now watch for new Posts in this account: `".concat(TwitterName, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**IF YOU TWITTER IS NOT THE SAME, THEN MANUALLY DEFINE THE ID THROUGH COMMAND!!!**\n\n**Make sure that you defined a `Discord Channel` too! Otherwise it won't post things!**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!").addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit").setURL("https://twitter.com/".concat(TwitterName)).setFooter(es.footertext, es.footericon));
              } catch (e) {
                return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
              }
            }));

          case 53:
            _context3.next = 91;
            break;

          case 55:
            if (!(temptype == "channel")) {
              _context3.next = 65;
              break;
            }

            _context3.next = 58;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 58:
            tempmsg = _context3.sent;
            _context3.next = 61;
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
                  client.social_log.set(message.guild.id, channel.id, "".concat(add, "twitter.DISCORD_CHANNEL_ID")); //require("../../social_log/twitterfeed").creat_twit(client);

                  return message.reply(new Discord.MessageEmbed().setTitle("I will now post Twitter Messages in `".concat(channel.name, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!").addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit").setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 61:
            if (!timeouterror) {
              _context3.next = 63;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 63:
            _context3.next = 91;
            break;

          case 65:
            if (!(temptype == "message")) {
              _context3.next = 75;
              break;
            }

            _context3.next = 68;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which MEssage do you wanna send with the Twitter Post?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("`{url}` Will be replaced with the Twitter POST LINK\n\n`{Twittername}` will be replaced with the TwitterAccountname").setFooter(es.footertext, es.footericon)
            }));

          case 68:
            tempmsg = _context3.sent;
            _context3.next = 71;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              try {
                client.social_log.set(message.guild.id, collected.first().content, "".concat(add, "twitter.infomsg")); //require("../../social_log/twitterfeed").creat_twit(client);

                return message.reply(new Discord.MessageEmbed().setTitle("I will now post The Twitter Messages with the Twitter Post: ").setDescription("".concat(collected.first().content.replace("{url}", "https://twitter.com/MilratoDev").replace("{Twittername}", "Tomato6966"), "\n\nNote that this is just an **example**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit").setFooter(es.footertext, es.footericon));
              } catch (e) {
                return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 71:
            if (!timeouterror) {
              _context3.next = 73;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 73:
            _context3.next = 91;
            break;

          case 75:
            if (!(temptype == "retweet")) {
              _context3.next = 80;
              break;
            }

            client.social_log.set(message.guild.id, !client.social_log.get(message.guild.id, "".concat(add, "twitter.REETWET")), "".concat(add, "twitter.REETWET")); //require("../../social_log/twitterfeed").creat_twit(client);

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("".concat(client.social_log.get(message.guild.id, "".concat(add, "twitter.REETWET")) ? "Enabled Showing Retweets" : "Disabled Showing Retweets")).setDescription("".concat(client.social_log.get(message.guild.id, "".concat(add, "twitter.REETWET")) ? "I will now post Retweets too!" : "I will not Post Retweets!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit").setFooter(es.footertext, es.footericon)));

          case 80:
            if (!(temptype == "id")) {
              _context3.next = 90;
              break;
            }

            _context3.next = 83;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be the new USERID of your TWITTER LOGGER?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setURL("https://tweeterid.com").setDescription("Go to: https://tweeterid.com to get your USERID and **ENTER IT __NOW__**").setFooter(es.footertext, es.footericon)
            }));

          case 83:
            tempmsg = _context3.sent;
            _context3.next = 86;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function _callee2(collected) {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      client.social_log.set(message.guild.id, collected.first().content, "".concat(add, "twitter.TWITTER_USER_ID")); //require("../../social_log/twitterfeed").creat_twit(client);

                      message.reply(new Discord.MessageEmbed().setTitle("Set the TWITTER USER ID TO: `".concat(collected.first().content, "`").substr(0, 256)).setDescription("You need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(message.reply(new Discord.MessageEmbed().setTitle("What should be the new USERNAME of your TWITTER LOGGER?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("That's your @, forexample: MilratoDev\n\nPlease **just** enter the Name!").setFooter(es.footertext, es.footericon)));

                    case 5:
                      tempmsg = _context2.sent;
                      _context2.next = 8;
                      return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
                        return m.author.id === message.author.id;
                      }, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      }).then(function _callee(collected) {
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                client.social_log.set(message.guild.id, collected.first().content, "".concat(add, "twitter.TWITTER_USER_NAME_ONLY_THOSE")); //require("../../social_log/twitterfeed").creat_twit(client);

                                return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Set the TWITTER USER Name TO: `".concat(collected.first().content, "`").substr(0, 256)).setDescription("".concat(collected.first().content.replace("{url}", "https://twitter.com/".concat(collected.first().content)).replace("{Twittername}", collected.first().content), "\n\nNote that this is just an **example**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit").setFooter(es.footertext, es.footericon)));

                              case 5:
                                _context.prev = 5;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                              case 8:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, null, null, [[0, 5]]);
                      })["catch"](function (e) {
                        timeouterror = e;
                      }));

                    case 8:
                      if (!timeouterror) {
                        _context2.next = 10;
                        break;
                      }

                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

                    case 10:
                      _context2.next = 15;
                      break;

                    case 12:
                      _context2.prev = 12;
                      _context2.t0 = _context2["catch"](0);
                      return _context2.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context2.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

                    case 15:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[0, 12]]);
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 86:
            if (!timeouterror) {
              _context3.next = 88;
              break;
            }

            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 88:
            _context3.next = 91;
            break;

          case 90:
            return _context3.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 91:
            _context3.next = 97;
            break;

          case 93:
            _context3.prev = 93;
            _context3.t2 = _context3["catch"](1);
            console.log(String(_context3.t2.stack).bgRed);
            return _context3.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context3.t2)).substr(0, 2000), "```"))));

          case 97:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 93], [10, 15], [27, 35]]);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/MilratoDev/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */