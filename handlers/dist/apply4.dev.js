"use strict";

//all reactions for the finished channel
var all_finished_reactions = ["✅", "❌", "🎟️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

var moment = require('moment'); // require
//import the config.json file


var config = require(".config.json"); //import the Discord Library


var Discord = require("discord.js"); //antispam SET


var antimap = new Map(); //apply cooldown

var cooldown = new Set(); //Start the module

module.exports = function (client) {
  //define the apply system variable
  var apply_db = client.apply4; //once a reaction is added this will fire

  client.on("messageReactionAdd", function _callee4(reaction, user) {
    var message, es, ask_question, send_finished, attachIsImage, originaluser, originalchannel, guild, channel_tosend, answers, counter, url, Questions, current_question, targetMessage, oldEmbed, embed, i, approve, usert, roleid, member, deny, _roleid, _roleid2, _roleid3, _roleid4, _roleid5;

    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            message = reaction.message;

            if (!(user.bot || !message.guild)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return");

          case 3:
            if (!message.partial) {
              _context5.next = 6;
              break;
            }

            _context5.next = 6;
            return regeneratorRuntime.awrap(message.fetch());

          case 6:
            if (!reaction.partial) {
              _context5.next = 9;
              break;
            }

            _context5.next = 9;
            return regeneratorRuntime.awrap(reaction.fetch());

          case 9:
            es = client.settings.get(message.guild.id, "embed");
            apply_db.ensure(message.guild.id, {
              "channel_id": "",
              "message_id": "",
              "f_channel_id": "",
              //changequestions --> which one (lists everyone with index) --> 4. --> Question
              "QUESTIONS": [{
                "1": "DEFAULT"
              }],
              "TEMP_ROLE": "0",
              "accept": "You've got accepted!",
              "accept_role": "0",
              "deny": "You've got denied!",
              "ticket": "Hey {user}! We have some Questions!",
              "one": {
                "role": "0",
                "message": "Hey you've got accepted for Team 1",
                "image": {
                  "enabled": false,
                  "url": ""
                }
              },
              "two": {
                "role": "0",
                "message": "Hey you've got accepted for Team 2",
                "image": {
                  "enabled": false,
                  "url": ""
                }
              },
              "three": {
                "role": "0",
                "message": "Hey you've got accepted for Team 3",
                "image": {
                  "enabled": false,
                  "url": ""
                }
              },
              "four": {
                "role": "0",
                "message": "Hey you've got accepted for Team 4",
                "image": {
                  "enabled": false,
                  "url": ""
                }
              },
              "five": {
                "role": "0",
                "message": "Hey you've got accepted for Team 5",
                "image": {
                  "enabled": false,
                  "url": ""
                }
              }
            });
            /** ///////////////////////////////////////////////////////////// *
             *
             * THIS IF IS FOR DISPLAYING IF THERE WAS A VALID REACTION START POINT
             *
             * ///////////////////////////////////////////////////////////// *
             */

            if (!(message.id === apply_db.get(message.guild.id, "message_id") && message.channel.id === apply_db.get(message.guild.id, "channel_id") && reaction.emoji.name === "✅")) {
              _context5.next = 48;
              break;
            }

            _context5.prev = 12;

            /** @param ask_question {qu} Question == Ask the current Question and push the answer
             * This function is for asking ONE SINGLE Question to the USER
             */
            ask_question = function ask_question(qu) {
              if (counter === Questions.length) return send_finished(); //send the user the first question

              user.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(qu).setAuthor("Question ".concat(counter + 1, " / ").concat(Questions.length), client.user.displayAvatarURL(), "https://discord.com/api/oauth2/authorize?client_id=806086994031411221&permissions=8&scope=bot%20applications.commands").setFooter(es.footertext, es.footericon)).then(function (msg) {
                msg.channel.awaitMessages(function (m) {
                  return m.author.id === user.id;
                }, {
                  max: 1,
                  time: 60 * 10 * 1000,
                  errors: ["time"]
                }).then(function _callee(collected) {
                  var new_current_question;
                  return regeneratorRuntime.async(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          //push the answer of the user into the answers lmfao
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              answers.push("".concat(collected.first().content, "\n").concat(url));
                            } else {
                              answers.push("".concat(collected.first().content, "\nThere was an attachment, which i cannot display!"));
                            }
                          } else {
                            answers.push("".concat(collected.first().content));
                          } //count up with 1


                          counter++; //if it reached the questions limit return with the finished embed

                          if (!(counter === Questions.length)) {
                            _context.next = 4;
                            break;
                          }

                          return _context.abrupt("return", send_finished());

                        case 4:
                          //get the new current question
                          new_current_question = Object.values(Questions[counter]).join(" "); //ask the new current question

                          ask_question(new_current_question);

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                })["catch"](function (error) {
                  console.log(error);
                  antimap["delete"](user.id);
                  return user.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Your max. Time for answering this Question ran out | Application cancelled").setFooter(es.footertext, es.footericon))["catch"](function (e) {
                    antimap["delete"](user.id);
                    message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | Turn your DMs ON").setDescription("```" + e.message + "```")).then(function (msg) {
                      return msg["delete"]({
                        timeout: 7500
                      });
                    });
                  });
                });
              })["catch"](function (e) {
                antimap["delete"](user.id);
                message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | Turn your DMs ON").setDescription("```" + e.message + "```")).then(function (msg) {
                  return msg["delete"]({
                    timeout: 7500
                  });
                });
              });
            };
            /** @param send_finished {*} == Send the finished application embed to the finished application questions channel ;)
             * This function is for asking ONE SINGLE Question to the USER
             */


            send_finished = function send_finished() {
              var embed, i, qu, finished_embed, roleid, member, role;
              return regeneratorRuntime.async(function send_finished$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!apply_db.get(guild.id, "last_verify")) {
                        _context4.next = 4;
                        break;
                      }

                      user.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Do u really wanna send the Application?").setFooter(es.footertext, es.footericon)).then(function _callee3(msg) {
                        var filter;
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                msg.react("✅");
                                msg.react("❌");

                                filter = function filter(reaction, user) {
                                  return user.id === originaluser.id;
                                };

                                msg.awaitReactions(filter, {
                                  max: 1,
                                  time: 60 * 10 * 1000,
                                  errors: ['time']
                                }).then(function _callee2(collected) {
                                  var reaction, embed, i, qu, finished_embed, roleid, member, role;
                                  return regeneratorRuntime.async(function _callee2$(_context2) {
                                    while (1) {
                                      switch (_context2.prev = _context2.next) {
                                        case 0:
                                          reaction = collected.first();

                                          if (!(reaction.emoji.name === "✅")) {
                                            _context2.next = 29;
                                            break;
                                          }

                                          antimap["delete"](originaluser.id);
                                          embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("A new application from: `" + originaluser.tag + "`") //${user.tag} -
                                          .setDescription("**\u276F** ".concat(originaluser, "  |  `").concat(moment().format().split("-")[2].split("T")[0] + "/" + moment().format().split("-")[1] + "/" + moment().format().split("-")[0] + " | " + moment().format().split("T")[1], "`")).setFooter(originaluser.id, originaluser.displayAvatarURL({
                                            dynamic: true
                                          })).setThumbnail(originaluser.displayAvatarURL({
                                            dynamic: true
                                          })).setTimestamp(); //for each question add a field

                                          for (i = 0; i < Questions.length; i++) {
                                            try {
                                              qu = Object.values(Questions[i]);
                                              if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ...";
                                              embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000));
                                            } catch (e) {
                                              console.log(e);
                                              /* */
                                            }
                                          } //send the embed into the channel


                                          channel_tosend.send(embed).then(function (msg) {
                                            //react with each emoji of all reactions
                                            var _iteratorNormalCompletion = true;
                                            var _didIteratorError = false;
                                            var _iteratorError = undefined;

                                            try {
                                              for (var _iterator = all_finished_reactions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                var emoji = _step.value;
                                                msg.react(emoji);
                                              } //set the message to the database

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

                                            apply_db.set(msg.id, originaluser.id, "temp");
                                          }); // "Producing Code" (May take some time)

                                          finished_embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Thanks for applying to:\n**❯** `" + message.guild.name + "`").addField("\u200B", "**\u276F** Go Back to the Channel ".concat(originalchannel)).setFooter(es.footertext, es.footericon); //send an informational message

                                          originaluser.send(finished_embed); //then try catch

                                          _context2.prev = 8;
                                          //find the role from the database
                                          roleid = apply_db.get(message.guild.id, "TEMP_ROLE");

                                          if (!roleid) {
                                            _context2.next = 21;
                                            break;
                                          }

                                          if (!(roleid.length == 18)) {
                                            _context2.next = 21;
                                            break;
                                          }

                                          //find the member from the reaction event
                                          member = message.guild.members.cache.get(originaluser.id); //find the role

                                          _context2.next = 15;
                                          return regeneratorRuntime.awrap(message.guild.roles.cache.get(roleid));

                                        case 15:
                                          role = _context2.sent;

                                          if (role) {
                                            _context2.next = 18;
                                            break;
                                          }

                                          return _context2.abrupt("return", channel_tosend.send("I was not able to find the ROLE"));

                                        case 18:
                                          if (member) {
                                            _context2.next = 20;
                                            break;
                                          }

                                          return _context2.abrupt("return", channel_tosend.send("I was not able to find the User, to whom I shall add the ROLE"));

                                        case 20:
                                          //add the role
                                          member.roles.add(role.id);

                                        case 21:
                                          _context2.next = 27;
                                          break;

                                        case 23:
                                          _context2.prev = 23;
                                          _context2.t0 = _context2["catch"](8);
                                          console.log(_context2.t0);
                                          channel_tosend.send("I am Missing Permissions to grant the TEMPROLE\n" + _context2.t0.message);
                                          /* */

                                        case 27:
                                          _context2.next = 31;
                                          break;

                                        case 29:
                                          antimap["delete"](originaluser.id);
                                          originaluser.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Cancelled your Application").setFooter(es.footertext, es.footericon));

                                        case 31:
                                        case "end":
                                          return _context2.stop();
                                      }
                                    }
                                  }, null, null, [[8, 23]]);
                                })["catch"](function (e) {
                                  console.log(e);
                                  antimap["delete"](originaluser.id);
                                  originaluser.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Cancelled your Application").setFooter(es.footertext, es.footericon));
                                });

                              case 4:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      });
                      _context4.next = 29;
                      break;

                    case 4:
                      antimap["delete"](user.id);
                      embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("A new application from: `" + originaluser.tag + "`") //${user.tag} -
                      .setDescription("**\u276F** ".concat(originaluser, "  |  `").concat(moment().format().split("-")[2].split("T")[0] + "/" + moment().format().split("-")[1] + "/" + moment().format().split("-")[0] + " | " + moment().format().split("T")[1], "`")).setFooter(originaluser.id, originaluser.displayAvatarURL({
                        dynamic: true
                      })).setTimestamp(); //for each question add a field

                      for (i = 0; i < Questions.length; i++) {
                        try {
                          qu = Object.values(Questions[i]);
                          if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ...";
                          embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000));
                        } catch (_unused) {
                          /* */
                        }
                      } //send the embed into the channel


                      channel_tosend.send(embed).then(function (msg) {
                        //react with each emoji of all reactions
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                          for (var _iterator2 = all_finished_reactions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var emoji = _step2.value;
                            msg.react(emoji);
                          } //set the message to the database

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

                        apply_db.set(msg.id, user.id, "temp");
                      }); // "Producing Code" (May take some time)

                      finished_embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("Thanks for applying to:\n**❯** `" + message.guild.name + "`").addField("\u200B", "**\u276F** Go Back to the Channel ".concat(originalchannel)).setFooter(es.footertext, es.footericon);
                      originaluser.send(finished_embed); //then try catch

                      _context4.prev = 10;
                      //find the role from the database
                      roleid = apply_db.get(message.guild.id, "TEMP_ROLE");

                      if (!roleid) {
                        _context4.next = 23;
                        break;
                      }

                      if (!(roleid.length == 18)) {
                        _context4.next = 23;
                        break;
                      }

                      //find the member from the reaction event
                      member = message.guild.members.cache.get(originaluser.id); //find the role

                      _context4.next = 17;
                      return regeneratorRuntime.awrap(message.guild.roles.cache.get(roleid));

                    case 17:
                      role = _context4.sent;

                      if (role) {
                        _context4.next = 20;
                        break;
                      }

                      return _context4.abrupt("return", channel_tosend.send("I was not able to find the ROLE"));

                    case 20:
                      if (member) {
                        _context4.next = 22;
                        break;
                      }

                      return _context4.abrupt("return", channel_tosend.send("I was not able to find the User, to whom I shall add the ROLE"));

                    case 22:
                      //add the role
                      member.roles.add(role.id);

                    case 23:
                      _context4.next = 29;
                      break;

                    case 25:
                      _context4.prev = 25;
                      _context4.t0 = _context4["catch"](10);
                      console.log(_context4.t0);
                      channel_tosend.send("I am Missing Permissions to grant the TEMPROLE");
                      /* */

                    case 29:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, null, null, [[10, 25]]);
            }; //this function is for turning each attachment into a url


            attachIsImage = function attachIsImage(msgAttach) {
              url = msgAttach.url; //True if this url is a png image.

              return url.indexOf("png", url.length - "png".length
              /*or 3*/
              ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
              /*or 3*/
              ) !== -1 || url.indexOf("gif", url.length - "gif".length
              /*or 3*/
              ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
              /*or 3*/
              ) !== -1;
            };

            //remove the users' reaction
            reaction.users.remove(user); //COOLDOWN SYSTEM

            if (!cooldown.has(user.id)) {
              _context5.next = 21;
              break;
            }

            return _context5.abrupt("return", user.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("\u274C Please wait 2 minutes before you apply again!").addField("Why a delay?", "Because that's the only way how I can prevent you from abusing(spamming) Applications!")));

          case 21:
            cooldown.add(user.id);
            setTimeout(function () {
              cooldown["delete"](user.id);
            }, 120 * 1000);

          case 23:
            originaluser = user;
            originalchannel = reaction.message.channel; //get the guild

            _context5.next = 27;
            return regeneratorRuntime.awrap(message.guild.fetch());

          case 27:
            guild = _context5.sent;
            //get the channel to send the finished applies
            channel_tosend = guild.channels.cache.get(apply_db.get(message.guild.id, "f_channel_id")); //if channel-to-send not found return error

            if (channel_tosend) {
              _context5.next = 31;
              break;
            }

            return _context5.abrupt("return");

          case 31:
            if (antimap.has(user.id)) {
              _context5.next = 35;
              break;
            }

            antimap.set(user.id); //but if he is having an running application somewhere then return error

            _context5.next = 36;
            break;

          case 35:
            return _context5.abrupt("return", user.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("You are always having a Running Application somwhere!").setTitle("ERROR").setFooter(es.footertext, es.footericon))["catch"](function (e) {
              message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | Turn your DMs ON").setDescription("```" + e.message + "```")).then(function (msg) {
                return msg["delete"]({
                  timeout: 5000
                });
              });
            }));

          case 36:
            //the array of answers for the current user
            answers = []; //set the counter variable to 0

            counter = 0; //define the url, if there would be an attachment ;)

            url = ""; //get all Questions from the Database

            Questions = apply_db.get(message.guild.id, "QUESTIONS"); //get the actual current question from the Questions

            current_question = Object.values(Questions[counter]).join(" "); //ask the current (first) Question from the Database

            ask_question(current_question);
            _context5.next = 48;
            break;

          case 44:
            _context5.prev = 44;
            _context5.t0 = _context5["catch"](12);
            console.log(_context5.t0);
            message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | ERROR").setDescription("```" + _context5.t0.message + "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 7500
              });
            });

          case 48:
            if (!(message.channel.id === apply_db.get(message.guild.id, "f_channel_id") && all_finished_reactions.includes(reaction.emoji.name))) {
              _context5.next = 212;
              break;
            }

            _context5.prev = 49;
            //Entferne Alle Reactions vom BOT
            reaction.message.reactions.removeAll()["catch"](function (error) {
              return console.error('Failed to clear reactions: ', error);
            }); //fetch the message from the data

            _context5.next = 53;
            return regeneratorRuntime.awrap(message.channel.messages.fetch(message.id, false, true));

          case 53:
            targetMessage = _context5.sent;

            if (targetMessage) {
              _context5.next = 56;
              break;
            }

            return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Couldn't get information about this Message?").setFooter(es.footertext, es.footericon)));

          case 56:
            //get the old embed information
            oldEmbed = targetMessage.embeds[0]; //if there is no old embed, return an error

            if (oldEmbed) {
              _context5.next = 59;
              break;
            }

            return _context5.abrupt("return", message.reply(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("Not a valid Embed").setFooter(es.footertext, es.footericon)));

          case 59:
            //create a new embed
            embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setTitle(oldEmbed.title).setDescription("".concat(oldEmbed.description ? "".concat(oldEmbed.description, "\n") : "", " Edited by: ").concat(user, " | ").concat(reaction.emoji).substr(0, 2048)); //for each data in it from before hand

            if (oldEmbed.fields[0]) {
              try {
                for (i = 0; i <= oldEmbed.fields.length; i++) {
                  try {
                    if (oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value);
                  } catch (_unused2) {}
                }
              } catch (_unused3) {}
            } //try to remove all roles after that continue?


            _context5.next = 63;
            return regeneratorRuntime.awrap(rome_old_roles(reaction, user, apply_db));

          case 63:
            if (!(reaction.emoji.name === "✅")) {
              _context5.next = 83;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("GREEN"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "accept")); //GET THE USER FROM THE DATABASE

            _context5.next = 69;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 69:
            usert = _context5.sent;
            _context5.prev = 70;
            //get the roleid from the db
            roleid = apply_db.get(message.id, "accept_role");

            if (!roleid) {
              _context5.next = 77;
              break;
            }

            if (!(roleid.length !== 18)) {
              _context5.next = 75;
              break;
            }

            return _context5.abrupt("return");

          case 75:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(roleid);

          case 77:
            _context5.next = 82;
            break;

          case 79:
            _context5.prev = 79;
            _context5.t1 = _context5["catch"](70);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t1)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 82:
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            });

          case 83:
            if (!(reaction.emoji.name === "❌")) {
              _context5.next = 91;
              break;
            }

            embed.setColor(es.wrongcolor);
            targetMessage.edit({
              embed: embed
            });
            deny = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("You've got denied from: `" + message.guild.name + "`").setDescription(apply_db.get(message.guild.id, "deny")).setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }));
            _context5.next = 89;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 89:
            usert = _context5.sent;
            usert.send(deny)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            });

          case 91:
            if (!(reaction.emoji.name === "🎟️")) {
              _context5.next = 98;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("ORANGE"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //GET THE USER FROM THE DATABASE

            _context5.next = 96;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 96:
            usert = _context5.sent;

            //TRY CATCH --- ADDING ROLE
            try {
              message.guild.channels.create("Ticket-".concat(usert.username).substr(0, 32), {
                type: 'text',
                topic: "Just Delete this channel, if not needed there is no delete/close command!",
                permissionOverwrites: [{
                  id: message.guild.id,
                  deny: ['VIEW_CHANNEL']
                }, {
                  id: usert.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }, {
                  id: user.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }]
              }).then(function (channel) {
                setTimeout(function () {
                  try {
                    channel.updateOverwrite("847416435898974251", {
                      VIEW_CHANNEL: false
                    });
                    channel.updateOverwrite(usert.id, {
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: true
                    });
                    channel.updateOverwrite(user.id, {
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: true
                    });
                  } catch (_unused4) {}
                }, 2000); //TRY CATCH SEND CHANNEL INFORMATION

                try {
                  channel.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("A Ticket for: `".concat(usert.tag, "`")).setFooter("Just Delete this channel, if not needed there is no delete/close command!", message.guild.iconURL({
                    dynamic: true
                  })).setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", "<@".concat(usert.id, ">"))));
                  channel.send("<@".concat(usert.id, ">"));
                } catch (_unused5) {}
                /* */
                //try catch send user message


                try {
                  //CREATE THE APPROVE MESSAGE
                  var approve = new Discord.MessageEmbed().setColor("ORANGE").setTitle("We've created a Ticket in: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
                    dynamic: true
                  })).setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", "<@".concat(usert.id, ">")) + "Channel: <#".concat(channel.id, ">")); //send the user the approve message

                  usert.send(approve)["catch"](function (e) {
                    message.channel.send("COULDN'T DM THIS PERSON!");
                    console.log(e);
                  });
                } catch (_unused6) {
                  /* */
                }
              });
            } catch (e) {
              //if an error happens, show it
              message.channel.send("".concat(user, ", ERROR ```").concat(String(JSON.stringify(e)).substr(0, 2000), "```")).then(function (msg) {
                return msg["delete"]({
                  timeout: 5000
                });
              });
            }

          case 98:
            if (!(reaction.emoji.name === "1️⃣")) {
              _context5.next = 120;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#54eeff"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "one.message")); //if image is enabled then set the image

            if (apply_db.get(message.guild.id, "one.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "one.image.url"));
            } catch (_unused7) {}
            /* */
            //GET THE USER FROM THE DATABASE

            _context5.next = 105;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 105:
            usert = _context5.sent;
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            }); //TRY CATCH --- ADDING ROLE

            _context5.prev = 107;
            //get the roleid from the db
            _roleid = apply_db.get(message.guild.id, "one.role");

            if (!_roleid) {
              _context5.next = 115;
              break;
            }

            if (!(_roleid.length !== 18)) {
              _context5.next = 112;
              break;
            }

            return _context5.abrupt("return");

          case 112:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(_roleid);
            console.log("added role");

          case 115:
            _context5.next = 120;
            break;

          case 117:
            _context5.prev = 117;
            _context5.t2 = _context5["catch"](107);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t2)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 120:
            if (!(reaction.emoji.name === "2️⃣")) {
              _context5.next = 141;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#54cfff"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "two.message")); //if image is enabled then set the image

            if (apply_db.get(message.guild.id, "two.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "two.image.url"));
            } catch (_unused8) {}
            /* */
            //GET THE USER FROM THE DATABASE

            _context5.next = 127;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 127:
            usert = _context5.sent;
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            }); //TRY CATCH --- ADDING ROLE

            _context5.prev = 129;
            //get the roleid from the db
            _roleid2 = apply_db.get(message.guild.id, "two.role");

            if (!_roleid2) {
              _context5.next = 136;
              break;
            }

            if (!(_roleid2.length !== 18)) {
              _context5.next = 134;
              break;
            }

            return _context5.abrupt("return");

          case 134:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(_roleid2);

          case 136:
            _context5.next = 141;
            break;

          case 138:
            _context5.prev = 138;
            _context5.t3 = _context5["catch"](129);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t3)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 141:
            if (!(reaction.emoji.name === "3️⃣")) {
              _context5.next = 162;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#549bff"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "three.message")); //if image is enabled then set the image

            if (apply_db.get(message.guild.id, "three.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "three.image.url"));
            } catch (_unused9) {}
            /* */
            //GET THE USER FROM THE DATABASE

            _context5.next = 148;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 148:
            usert = _context5.sent;
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            }); //TRY CATCH --- ADDING ROLE

            _context5.prev = 150;
            //get the roleid from the db
            _roleid3 = apply_db.get(message.guild.id, "three.role");

            if (!_roleid3) {
              _context5.next = 157;
              break;
            }

            if (!(_roleid3.length !== 18)) {
              _context5.next = 155;
              break;
            }

            return _context5.abrupt("return");

          case 155:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(_roleid3);

          case 157:
            _context5.next = 162;
            break;

          case 159:
            _context5.prev = 159;
            _context5.t4 = _context5["catch"](150);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t4)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 162:
            if (!(reaction.emoji.name === "4️⃣")) {
              _context5.next = 183;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#6254ff"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "four.message")); //if image is enabled then set the image

            if (apply_db.get(message.guild.id, "four.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "four.image.url"));
            } catch (_unused10) {}
            /* */
            //GET THE USER FROM THE DATABASE

            _context5.next = 169;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 169:
            usert = _context5.sent;
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            }); //TRY CATCH --- ADDING ROLE

            _context5.prev = 171;
            //get the roleid from the db
            _roleid4 = apply_db.get(message.guild.id, "four.role");

            if (!_roleid4) {
              _context5.next = 178;
              break;
            }

            if (!(_roleid4.length !== 18)) {
              _context5.next = 176;
              break;
            }

            return _context5.abrupt("return");

          case 176:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(_roleid4);

          case 178:
            _context5.next = 183;
            break;

          case 180:
            _context5.prev = 180;
            _context5.t5 = _context5["catch"](171);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t5)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 183:
            if (!(reaction.emoji.name === "5️⃣")) {
              _context5.next = 205;
              break;
            }

            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#1705e6"); //EDIT THE EMBED

            targetMessage.edit({
              embed: embed
            }); //CREATE THE APPROVE MESSAGE

            approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setTitle("You've got accepted from: `" + message.guild.name + "`").setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            })).setDescription(apply_db.get(message.guild.id, "five.message")); //if image is enabled then set the image

            if (apply_db.get(message.guild.id, "five.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "five.image.url"));
            } catch (_unused11) {}
            /* */
            //GET THE USER FROM THE DATABASE

            _context5.next = 190;
            return regeneratorRuntime.awrap(client.users.fetch(apply_db.get(message.id, "temp")));

          case 190:
            usert = _context5.sent;
            //send the user the approve message
            usert.send(approve)["catch"](function (e) {
              message.channel.send("COULDN'T DM THIS PERSON!");
              console.log(e);
            }); //TRY CATCH --- ADDING ROLE

            _context5.prev = 192;
            //get the roleid from the db
            _roleid5 = apply_db.get(message.guild.id, "five.role");

            if (!_roleid5) {
              _context5.next = 200;
              break;
            }

            if (!(_roleid5.length !== 18)) {
              _context5.next = 197;
              break;
            }

            return _context5.abrupt("return");

          case 197:
            //try to add the role
            member = reaction.message.guild.members.cache.get(usert.id);
            member.roles.add(_roleid5);
            console.log("added role");

          case 200:
            _context5.next = 205;
            break;

          case 202:
            _context5.prev = 202;
            _context5.t6 = _context5["catch"](192);
            //if an error happens, show it
            message.channel.send("".concat(user, ", couldn't add him the APPROVE ROLE! check if the role exists!\n\n```").concat(String(JSON.stringify(_context5.t6)).substr(0, 2000), "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 5000
              });
            });

          case 205:
            //EDIT THE TARGET MESSAGE WITH THE NEW EMBED ! ;)
            targetMessage.edit({
              embed: embed
            });
            _context5.next = 212;
            break;

          case 208:
            _context5.prev = 208;
            _context5.t7 = _context5["catch"](49);
            console.log(_context5.t7);
            message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | ERROR").setDescription("```" + _context5.t7.message + "```")).then(function (msg) {
              return msg["delete"]({
                timeout: 7500
              });
            });

          case 212:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[12, 44], [49, 208], [70, 79], [107, 117], [129, 138], [150, 159], [171, 180], [192, 202]]);
  });
};
/** ////////////////////////////////////////// *
 * FUNCTION FOR REMOVING ALL OLD ROLES
 * ////////////////////////////////////////// *
 */


function rome_old_roles(reaction, user, apply_db) {
  new Promise(function (resolve) {
    //get the reactionmember from the reactions
    var reactionmember = reaction.message.guild.member(user); //get the temprole, Try to remove the temprole if its valid

    var temprole = apply_db.get(reaction.message.guild.id, "TEMP_ROLE");
    console.log(temprole);

    if (temprole != "0") {
      try {
        if (reactionmember.roles.cache.has(temprole)) reactionmember.roles.remove(temprole);
      } catch (_unused12) {
        /* */
      }
    } //get the one.role, Try to remove the temprole if its valid


    var onerole = apply_db.get(reaction.message.guild.id, "one.role");
    console.log(onerole);

    if (onerole != "0") {
      try {
        if (reactionmember.roles.cache.has(onerole)) reactionmember.roles.remove(onerole);
      } catch (_unused13) {
        /* */
      }
    } //get the two.role, Try to remove the temprole if its valid


    var tworole = apply_db.get(reaction.message.guild.id, "two.role");

    if (tworole != "0") {
      try {
        if (reactionmember.roles.cache.has(tworole)) reactionmember.roles.remove(tworole);
      } catch (_unused14) {
        /* */
      }
    } //get the three.role, Try to remove the temprole if its valid


    var threerole = apply_db.get(reaction.message.guild.id, "three.role");

    if (threerole != "0") {
      try {
        if (reactionmember.roles.cache.has(threerole)) reactionmember.roles.remove(threerole);
      } catch (_unused15) {
        /* */
      }
    } //get the four.role, Try to remove the temprole if its valid


    var fourrole = apply_db.get(reaction.message.guild.id, "four.role");

    if (fourrole != "0") {
      try {
        if (reactionmember.roles.cache.has(fourrole)) reactionmember.roles.remove(fourrole);
      } catch (_unused16) {
        /* */
      }
    } //get the five.role, Try to remove the temprole if its valid


    var fiverole = apply_db.get(reaction.message.guild.id, "five.role");

    if (fiverole != "0") {
      try {
        if (reactionmember.roles.cache.has(fiverole)) reactionmember.roles.remove(fiverole);
      } catch (_unused17) {
        /* */
      }
    }
  });
}