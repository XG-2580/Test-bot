"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    splitMessage = _require.splitMessage;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    parseMilliseconds = _require2.parseMilliseconds,
    duration = _require2.duration,
    GetUser = _require2.GetUser,
    nFormatter = _require2.nFormatter,
    ensure_economy_user = _require2.ensure_economy_user;

module.exports = {
  name: "ecolb",
  category: "💸 Economy",
  aliases: ["ecoleaderboard"],
  description: "Shows leaderboard of econmy",
  usage: "ecolb",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, users, datas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _user, sorted, stringarray, yourrank, i, index, data, tuser, items, itemsvalue, itemarray, prize, theindex, description, TITLE, currentPage, embeds, k, _i, current, embed, queueEmbed, reactionemojis, _i2, _reactionemojis, _emoji, filter, collector;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "ECONOMY")) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context2.prev = 3;
            user = message.author; //ensure the economy data

            ensure_economy_user(client, message.guild.id, user.id);
            users = client.economy.keyArray().filter(function (i) {
              return String(i).startsWith(message.guild.id);
            });
            datas = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 11;

            for (_iterator = users[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _user = _step.value;

              try {
                datas.push(client.economy.get(_user));
              } catch (_unused4) {}
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
            sorted = datas.sort(function (a, b) {
              var prizea = 0;

              for (var itemarray in a.items) {
                switch (itemarray.toLowerCase()) {
                  case "yacht":
                    prizea += a.items["".concat(itemarray)] * 75000;
                    break;

                  case "lamborghini":
                    prizea += a.items["".concat(itemarray)] * 50000;
                    break;

                  case "car":
                    prizea += a.items["".concat(itemarray)] * 6400;
                    break;

                  case "motorbike":
                    prizea += a.items["".concat(itemarray)] * 1500;
                    break;

                  case "bicycle":
                    prizea += a.items["".concat(itemarray)] * 500;
                    break;

                  case "nike":
                    prizea += a.items["".concat(itemarray)] * 300;
                    break;

                  case "tshirt":
                    prizea += a.items["".concat(itemarray)] * 60;
                    break;

                  case "mansion":
                    prizea += a.items["".concat(itemarray)] * 45000;
                    break;

                  case "house":
                    prizea += a.items["".concat(itemarray)] * 8000;
                    break;

                  case "dirthut":
                    prizea += a.items["".concat(itemarray)] * 150;
                    break;

                  case "pensil":
                    prizea += a.items["".concat(itemarray)] * 20;
                    break;

                  case "pen":
                    prizea += a.items["".concat(itemarray)] * 10;
                    break;

                  case "condom":
                    prizea += a.items["".concat(itemarray)] * 30;
                    break;

                  case "bottle":
                    prizea += a.items["".concat(itemarray)] * 50;
                    break;

                  case "fish":
                    prizea += a.items["".concat(itemarray)] * 1000;
                    break;

                  case "hamster":
                    prizea += a.items["".concat(itemarray)] * 1500;
                    break;

                  case "dog":
                    prizea += a.items["".concat(itemarray)] * 2000;
                    break;

                  case "cat":
                    prizea += a.items["".concat(itemarray)] * 2000;
                    break;
                }
              }

              var prizeb = 0;

              for (var _itemarray in b.items) {
                switch (_itemarray.toLowerCase()) {
                  case "yacht":
                    prizeb += b.items["".concat(_itemarray)] * 75000;
                    break;

                  case "lamborghini":
                    prizeb += b.items["".concat(_itemarray)] * 50000;
                    break;

                  case "car":
                    prizeb += b.items["".concat(_itemarray)] * 6400;
                    break;

                  case "motorbike":
                    prizeb += b.items["".concat(_itemarray)] * 1500;
                    break;

                  case "bicycle":
                    prizeb += b.items["".concat(_itemarray)] * 500;
                    break;

                  case "nike":
                    prizeb += b.items["".concat(_itemarray)] * 300;
                    break;

                  case "tshirt":
                    prizeb += b.items["".concat(_itemarray)] * 60;
                    break;

                  case "mansion":
                    prizeb += b.items["".concat(_itemarray)] * 45000;
                    break;

                  case "house":
                    prizeb += b.items["".concat(_itemarray)] * 8000;
                    break;

                  case "dirthut":
                    prizeb += b.items["".concat(_itemarray)] * 150;
                    break;

                  case "pensil":
                    prizeb += b.items["".concat(_itemarray)] * 20;
                    break;

                  case "pen":
                    prizeb += b.items["".concat(_itemarray)] * 10;
                    break;

                  case "condom":
                    prizeb += b.items["".concat(_itemarray)] * 30;
                    break;

                  case "bottle":
                    prizeb += b.items["".concat(_itemarray)] * 50;
                    break;

                  case "fish":
                    prizeb += b.items["".concat(_itemarray)] * 1000;
                    break;

                  case "hamster":
                    prizeb += b.items["".concat(_itemarray)] * 1500;
                    break;

                  case "dog":
                    prizeb += b.items["".concat(_itemarray)] * 2000;
                    break;

                  case "cat":
                    prizeb += b.items["".concat(_itemarray)] * 2000;
                    break;
                }
              }

              return b.balance + b.bank + prizeb - (a.balance + a.bank + prizea);
            });
            stringarray = [];
            yourrank = false;
            i = 0;

          case 31:
            if (!(i < sorted.length)) {
              _context2.next = 99;
              break;
            }

            index = i;
            data = sorted[i];

            if (!(!data.user || data.user == undefined)) {
              _context2.next = 36;
              break;
            }

            return _context2.abrupt("continue", 96);

          case 36:
            _context2.next = 38;
            return regeneratorRuntime.awrap(client.users.fetch(data.user));

          case 38:
            tuser = _context2.sent;

            if (tuser) {
              _context2.next = 41;
              break;
            }

            return _context2.abrupt("continue", 96);

          case 41:
            if (user == message.author) {
              if (yourrank && yourrank > index + 1) yourrank = index + 1;
              if (!yourrank) yourrank = index + 1;
            }

            items = 0;
            itemsvalue = 0;
            _context2.t1 = regeneratorRuntime.keys(data.items);

          case 45:
            if ((_context2.t2 = _context2.t1()).done) {
              _context2.next = 91;
              break;
            }

            itemarray = _context2.t2.value;
            items += data.items["".concat(itemarray)];
            prize = 0;
            _context2.t3 = itemarray.toLowerCase();
            _context2.next = _context2.t3 === "yacht" ? 52 : _context2.t3 === "lamborghini" ? 54 : _context2.t3 === "car" ? 56 : _context2.t3 === "motorbike" ? 58 : _context2.t3 === "bicycle" ? 60 : _context2.t3 === "nike" ? 62 : _context2.t3 === "tshirt" ? 64 : _context2.t3 === "mansion" ? 66 : _context2.t3 === "house" ? 68 : _context2.t3 === "dirthut" ? 70 : _context2.t3 === "pensil" ? 72 : _context2.t3 === "pen" ? 74 : _context2.t3 === "condom" ? 76 : _context2.t3 === "bottle" ? 78 : _context2.t3 === "fish" ? 80 : _context2.t3 === "hamster" ? 82 : _context2.t3 === "dog" ? 84 : _context2.t3 === "cat" ? 86 : 88;
            break;

          case 52:
            prize = 75000;
            return _context2.abrupt("break", 88);

          case 54:
            prize = 50000;
            return _context2.abrupt("break", 88);

          case 56:
            prize = 6400;
            return _context2.abrupt("break", 88);

          case 58:
            prize = 1500;
            return _context2.abrupt("break", 88);

          case 60:
            prize = 500;
            return _context2.abrupt("break", 88);

          case 62:
            prize = 300;
            return _context2.abrupt("break", 88);

          case 64:
            prize = 60;
            return _context2.abrupt("break", 88);

          case 66:
            prize = 45000;
            return _context2.abrupt("break", 88);

          case 68:
            prize = 8000;
            return _context2.abrupt("break", 88);

          case 70:
            prize = 150;
            return _context2.abrupt("break", 88);

          case 72:
            prize = 20;
            return _context2.abrupt("break", 88);

          case 74:
            prize = 10;
            return _context2.abrupt("break", 88);

          case 76:
            prize = 30;
            return _context2.abrupt("break", 88);

          case 78:
            prize = 50;
            return _context2.abrupt("break", 88);

          case 80:
            prize = 1000;
            return _context2.abrupt("break", 88);

          case 82:
            prize = 1500;
            return _context2.abrupt("break", 88);

          case 84:
            prize = 2000;
            return _context2.abrupt("break", 88);

          case 86:
            prize = 2000;
            return _context2.abrupt("break", 88);

          case 88:
            itemsvalue += prize * data.items["".concat(itemarray)];
            _context2.next = 45;
            break;

          case 91:
            theindex = index + 1;
            if (theindex == 1) theindex = "🥇";
            if (theindex == 2) theindex = "🥈";
            if (theindex == 3) theindex = "🥉";
            stringarray.push("**".concat(theindex, ". `").concat(tuser.tag, "`** \u30FB ").concat(tuser, "```yml\nPocket: ").concat(nFormatter(Math.floor(data.balance)), " \uD83D\uDCB8 \u30FB Bank: ").concat(nFormatter(data.bank), " \uD83D\uDCB8 \u30FB [").concat(items, "] Items: ").concat(nFormatter(itemsvalue), " \uD83D\uDCB8```"));

          case 96:
            i++;
            _context2.next = 31;
            break;

          case 99:
            description = stringarray;
            console.log(description);
            TITLE = "".concat(message.guild.name, " | Economy Leaderboard \uD83D\uDCB8");
            currentPage = 0;
            embeds = [];

            try {
              k = 10;

              for (_i = 0; _i < description.length; _i += 10) {
                current = description.slice(_i, k);
                k += 10;
                embed = new MessageEmbed().setDescription(current).setTitle(TITLE).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
                embeds.push(embed);
              }

              embeds;
            } catch (_unused) {}

            if (!(embeds.length === 1)) {
              _context2.next = 107;
              break;
            }

            return _context2.abrupt("return", message.channel.send(embeds[0])["catch"](function (e) {
              return console.log("THIS IS TO PREVENT A CRASH");
            }));

          case 107:
            _context2.next = 109;
            return regeneratorRuntime.awrap(message.channel.send(embeds[currentPage].setFooter("You are: Rank #".concat(yourrank, " \u30FB Page: ").concat(currentPage + 1, "/").concat(embeds.length), user.displayAvatarURL({
              dynamic: true
            })))["catch"](function (e) {
              return console.log("THIS IS TO PREVENT A CRASH");
            }));

          case 109:
            queueEmbed = _context2.sent;
            reactionemojis = ["⏪", "⏩"];
            _context2.prev = 111;
            _i2 = 0, _reactionemojis = reactionemojis;

          case 113:
            if (!(_i2 < _reactionemojis.length)) {
              _context2.next = 120;
              break;
            }

            _emoji = _reactionemojis[_i2];
            _context2.next = 117;
            return regeneratorRuntime.awrap(queueEmbed.react(_emoji));

          case 117:
            _i2++;
            _context2.next = 113;
            break;

          case 120:
            _context2.next = 124;
            break;

          case 122:
            _context2.prev = 122;
            _context2.t4 = _context2["catch"](111);

          case 124:
            filter = function filter(reaction, user) {
              return (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
            };

            collector = queueEmbed.createReactionCollector(filter, {
              time: 45000
            });
            collector.on("collect", function _callee(reaction, user) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      if (reaction.emoji.name === reactionemojis[1] || reaction.emoji.id === reactionemojis[1]) {
                        if (currentPage < embeds.length - 1) {
                          currentPage++;
                          queueEmbed.edit({
                            embed: embeds[currentPage].setFooter("You are: Rank #".concat(yourrank, " \u30FB Page: ").concat(currentPage + 1, "/").concat(embeds.length), user.displayAvatarURL({
                              dynamic: true
                            }))
                          });
                        } else {
                          currentPage = 0;
                          queueEmbed.edit({
                            embed: embeds[currentPage].setFooter("You are: Rank #".concat(yourrank, " \u30FB Page: ").concat(currentPage + 1, "/").concat(embeds.length), user.displayAvatarURL({
                              dynamic: true
                            }))
                          });
                        }
                      } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                        if (currentPage !== 0) {
                          --currentPage;
                          queueEmbed.edit({
                            embed: embeds[currentPage].setFooter("You are: Rank #".concat(yourrank, " \u30FB Page: ").concat(currentPage + 1, "/").concat(embeds.length), user.displayAvatarURL({
                              dynamic: true
                            }))
                          });
                        } else {
                          currentPage = embeds.length - 1;
                          queueEmbed.edit({
                            embed: embeds[currentPage.setFooter("You are: Rank #".concat(yourrank, " \u30FB Page: ").concat(currentPage + 1, "/").concat(embeds.length), user.displayAvatarURL({
                              dynamic: true
                            }))]
                          });
                        }
                      } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                      }

                      _context.next = 4;
                      return regeneratorRuntime.awrap(reaction.users.remove(message.author.id));

                    case 4:
                      _context.next = 8;
                      break;

                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context["catch"](0);

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 6]]);
            });
            _context2.next = 133;
            break;

          case 129:
            _context2.prev = 129;
            _context2.t5 = _context2["catch"](3);
            console.log(String(_context2.t5.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t5)).substr(0, 2000), "```"))));

          case 133:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 129], [11, 15, 19, 27], [20,, 22, 26], [111, 122]]);
  }
};