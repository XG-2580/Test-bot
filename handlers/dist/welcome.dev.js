"use strict";

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var Discord = require("discord.js");

var Canvas = require("canvas");

Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
});

var _require = require("../handlers/functions"),
    delay = _require.delay;

var _require2 = require('captcha-canvas'),
    CaptchaGenerator = _require2.CaptchaGenerator; //require package here
//Start the module


module.exports = function (client) {
  var getInviteCounts = function getInviteCounts(guild) {
    return regeneratorRuntime.async(function getInviteCounts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              try {
                guild.fetchInvites().then(function (invites) {
                  var inviteCounter = {}; // { memberId: count }

                  try {
                    invites.forEach(function (invite) {
                      try {
                        var uses = invite.uses,
                            inviter = invite.inviter;
                        var username = inviter.username,
                            discriminator = inviter.discriminator;
                        var name = "".concat(username, "#").concat(discriminator);
                        inviteCounter[name] = (inviteCounter[name] || 0) + uses;
                      } catch (_unused) {}
                    });
                    resolve(inviteCounter);
                  } catch (_unused2) {}
                })["catch"](function (e) {
                  return console.log("\n\n\n\n\n\nwelcome.js | Line 35 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                });
              } catch (_unused3) {}
            }));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  client.on("ready", function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, guild;

    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 4;
            _iterator = client.guilds.cache.array()[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 16;
              break;
            }

            guild = _step.value;
            _context2.next = 10;
            return regeneratorRuntime.awrap(delay(1000));

          case 10:
            _context2.next = 12;
            return regeneratorRuntime.awrap(getInviteCounts(guild));

          case 12:
            client.invites[guild.id] = _context2.sent;

          case 13:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 22:
            _context2.prev = 22;
            _context2.prev = 23;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 25:
            _context2.prev = 25;

            if (!_didIteratorError) {
              _context2.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return _context2.finish(25);

          case 29:
            return _context2.finish(22);

          case 30:
            _context2.next = 34;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t1 = _context2["catch"](0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 32], [4, 18, 22, 30], [23,, 25, 29]]);
  });
  client.on("guildCreate", function _callee2(guild) {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(getInviteCounts(guild));

          case 3:
            client.invites[guild.id] = _context3.sent;
            _context3.next = 8;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 6]]);
  });
  client.on("guildMemberAdd", function _callee3(member) {
    var es, captcha, buffer, attachment, mutedrole, allguildroles, i, highestrolepos, captchaembed;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (member.guild) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return");

          case 2:
            if (client.invites[member.guild.id]) {
              _context4.next = 5;
              break;
            }

            _context4.next = 5;
            return regeneratorRuntime.awrap(getInviteCounts(member.guild));

          case 5:
            es = client.settings.get(member.guild.id, "embed");

            if (!(client.settings.get(member.guild.id, "welcome.captcha") && !member.user.bot)) {
              _context4.next = 34;
              break;
            }

            captcha = new CaptchaGenerator({
              height: 200,
              width: 600
            });
            _context4.next = 10;
            return regeneratorRuntime.awrap(captcha.generate());

          case 10:
            buffer = _context4.sent;
            //returns buffer of the captcha image
            attachment = new Discord.MessageAttachment(buffer, "".concat(captcha.text, "_Captcha.png"));
            mutedrole = false;
            allguildroles = member.guild.roles.cache.array();
            i = 0;

          case 15:
            if (!(i < allguildroles.length)) {
              _context4.next = 22;
              break;
            }

            if (!allguildroles[i].name.toLowerCase().includes("captcha")) {
              _context4.next = 19;
              break;
            }

            mutedrole = allguildroles[i];
            return _context4.abrupt("break", 22);

          case 19:
            i++;
            _context4.next = 15;
            break;

          case 22:
            if (mutedrole) {
              _context4.next = 27;
              break;
            }

            highestrolepos = member.guild.me.roles.highest.position;
            _context4.next = 26;
            return regeneratorRuntime.awrap(member.guild.roles.create({
              data: {
                name: "DISABLED - CAPTCHA",
                color: "#222222",
                hoist: true,
                position: Number(highestrolepos) - 1
              },
              reason: "This role got created, to DISABLED - CAPTCHA Members!"
            })["catch"](function (e) {
              console.log(String(e.stack).red);
            }));

          case 26:
            mutedrole = _context4.sent;

          case 27:
            _context4.next = 29;
            return regeneratorRuntime.awrap(member.guild.channels.cache.forEach(function (ch) {
              try {
                ch.updateOverwrite(mutedrole, {
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false,
                  SPEAK: false
                });
              } catch (e) {
                console.log(String(e.stack).red);
              }
            }));

          case 29:
            member.roles.add(mutedrole.id)["catch"](function (e) {
              return console.log(e);
            });
            captchaembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter(es.footertext, es.footericon).setTitle("**".concat(member.guild.name, " IS PROTECT BY A CAPTCHA SYSTEM**")).setDescription("<@".concat(member.user.id, "> please send me (type) the Captcha Code (Text) in the next 30 Seconds, otherwise, you will be not verified and kicked!")).setImage("attachment://".concat(captcha.text, "_Captcha.png")).attachFiles(attachment);
            member.send(captchaembed).then(function (msg) {
              msg.channel.awaitMessages(function (m) {
                return m.author.id === member.user.id;
              }, {
                max: 1,
                time: 30000,
                errors: ["time"]
              }).then(function (collected) {
                if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
                  member.roles.remove(mutedrole.id)["catch"](function (e) {
                    return console.log(e);
                  });
                  msg.edit({
                    embed: msg.embeds[0].setDescription("\u2705 Successfully verified for: **".concat(member.guild.name, "**")).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")
                  });
                  add_roles(member);
                  message(member);
                } else {
                  member.guild.channels.cache.filter(function (ch) {
                    return ch.type == "text";
                  }).first().create({
                    temporary: false
                  }).then(function (invite) {
                    member.user.send("BECAUSE U FAILED THE CAPTCHA, I KICKED U! HERE IS AN INVITE: " + invite.url)["catch"](function (e) {
                      return console.log("prevented bug");
                    });
                    member.kick("FAILED THE CAPTCHA");
                  })["catch"](function (e) {
                    console.log(e);
                    member.user.send("BECAUSE U FAILED THE CAPTCHA, I KICKED U!")["catch"](function (e) {
                      return console.log("prevented bug");
                    });
                    member.kick("FAILED THE CAPTCHA");
                  });
                }
              });
            })["catch"](function (e) {
              member.guild.channels.create("VERIFY-YOURSELF", {
                type: "text",
                topic: "PLEASE SEND THE CAPTCHA CODE IN THE CHAT!",
                permissionOverwrites: [{
                  id: member.user.id,
                  allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                }, {
                  id: member.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }]
              }).then(function (ch) {
                ch.send({
                  content: "<@".concat(member.user.id, ">"),
                  embed: captchaembed
                }).then(function (msg) {
                  msg.channel.awaitMessages(function (m) {
                    return m.author.id === member.user.id;
                  }, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  }).then(function (collected) {
                    if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
                      member.roles.remove(mutedrole.id)["catch"](function (e) {
                        return console.log(e);
                      });
                      msg.edit({
                        embed: msg.embeds[0].setDescription("\u2705 Successfully verified for: **".concat(member.guild.name, "**\n\nDELETING CHANNEL in 15 SECONDS, *only if noone else joins until then!*")).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")
                      })["catch"](function (e) {
                        return console.log("PREVENTED BUG");
                      });
                      ch["delete"]()["catch"](function (e) {
                        return console.log("e");
                      });
                      add_roles(member);
                      message(member);
                    } else {
                      member.guild.channels.cache.filter(function (ch) {
                        return ch.type == "text";
                      }).first().create({
                        temporary: false
                      }).then(function (invite) {
                        member.kick("FAILED THE CAPTCHA")["catch"](function (e) {
                          return console.log("e");
                        });
                        ch["delete"]()["catch"](function (e) {
                          return console.log("e");
                        });
                      })["catch"](function (e) {
                        console.log(e);
                        member.kick("FAILED THE CAPTCHA")["catch"](function (e) {
                          return console.log("e");
                        });
                        console.log("channel delete");
                        ch["delete"]()["catch"](function (e) {
                          return console.log("e");
                        });
                      });
                    }
                  });
                });
              });
            });
            _context4.next = 36;
            break;

          case 34:
            add_roles(member);
            message(member);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    });
  });

  function message(member) {
    var invitedstring, ts, invitesBefore, invitesAfter, inviter, welcome, msg_withoutimg, dm_msg_withoutimg, dm_msg_withimg, msg_withimg, dm_msg_autoimg, msg_autoimg;
    return regeneratorRuntime.async(function message$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            msg_autoimg = function _ref6(member) {
              var es, welcomechannel, channel, welcomeembed, canvas, ctx, bgimg, img, background, framecolor, fillcolor, textString3, avatar, attachment;
              return regeneratorRuntime.async(function msg_autoimg$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.prev = 0;
                      console.log("WELCOME - (fn-msg_autoimg)".italic.yellow);

                      if (member.guild) {
                        _context10.next = 4;
                        break;
                      }

                      return _context10.abrupt("return", console.log("WELCOME - (fn-msg_autoimg) - NOT IN A GUILD".italic.yellow));

                    case 4:
                      es = client.settings.get(member.guild.id, "embed");
                      welcomechannel = client.settings.get(member.guild.id, "welcome.channel");

                      if (welcomechannel) {
                        _context10.next = 8;
                        break;
                      }

                      return _context10.abrupt("return", console.log("WELCOME - (fn-msg_autoimg) - NO SETTINGS FOR WELCOME CHANNEL FOUND".italic.yellow));

                    case 8:
                      _context10.next = 10;
                      return regeneratorRuntime.awrap(client.channels.fetch(welcomechannel));

                    case 10:
                      channel = _context10.sent;

                      if (channel) {
                        _context10.next = 13;
                        break;
                      }

                      return _context10.abrupt("return", console.log("WELCOME - (fn-msg_autoimg) - CHANNEL NOT FOUND".italic.yellow));

                    case 13:
                      //define the welcome embed
                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).addField("\u200B", invitedstring).setTitle("**Welcome to ".concat(member.guild.name, "!**")).setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", "".concat(member.user)));
                      _context10.prev = 14;
                      //member roles add on welcome every single role
                      canvas = Canvas.createCanvas(1772, 633); //make it "2D"

                      ctx = canvas.getContext('2d');

                      if (!(client.settings.get(member.guild.id, "welcome.background") !== "transparent")) {
                        _context10.next = 29;
                        break;
                      }

                      _context10.prev = 18;
                      _context10.next = 21;
                      return regeneratorRuntime.awrap(Canvas.loadImage(client.settings.get(member.guild.id, "welcome.background")));

                    case 21:
                      bgimg = _context10.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
                      _context10.next = 27;
                      break;

                    case 25:
                      _context10.prev = 25;
                      _context10.t0 = _context10["catch"](18);

                    case 27:
                      _context10.next = 42;
                      break;

                    case 29:
                      _context10.prev = 29;

                      if (!(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined)) {
                        _context10.next = 32;
                        break;
                      }

                      return _context10.abrupt("return");

                    case 32:
                      _context10.next = 34;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.guild.iconURL({
                        format: "png"
                      })));

                    case 34:
                      img = _context10.sent;
                      ctx.globalAlpha = 0.3; //draw the guildicon

                      ctx.drawImage(img, 1772 - 633, 0, 633, 633);
                      ctx.globalAlpha = 1;
                      _context10.next = 42;
                      break;

                    case 40:
                      _context10.prev = 40;
                      _context10.t1 = _context10["catch"](29);

                    case 42:
                      if (!client.settings.get(member.guild.id, "welcome.frame")) {
                        _context10.next = 72;
                        break;
                      }

                      framecolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
                      if (framecolor == "WHITE") framecolor = "#FFFFF9";

                      if (!(client.settings.get(member.guild.id, "welcome.discriminator") && client.settings.get(member.guild.id, "welcome.servername"))) {
                        _context10.next = 51;
                        break;
                      }

                      _context10.next = 48;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome3frame.png")));

                    case 48:
                      background = _context10.sent;
                      _context10.next = 66;
                      break;

                    case 51:
                      if (!client.settings.get(member.guild.id, "welcome.discriminator")) {
                        _context10.next = 57;
                        break;
                      }

                      _context10.next = 54;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_unten.png")));

                    case 54:
                      background = _context10.sent;
                      _context10.next = 66;
                      break;

                    case 57:
                      if (!client.settings.get(member.guild.id, "welcome.servername")) {
                        _context10.next = 63;
                        break;
                      }

                      _context10.next = 60;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_oben.png")));

                    case 60:
                      background = _context10.sent;
                      _context10.next = 66;
                      break;

                    case 63:
                      _context10.next = 65;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1frame.png")));

                    case 65:
                      background = _context10.sent;

                    case 66:
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                      if (!client.settings.get(member.guild.id, "welcome.pb")) {
                        _context10.next = 72;
                        break;
                      }

                      _context10.next = 70;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1framepb.png")));

                    case 70:
                      background = _context10.sent;
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    case 72:
                      fillcolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
                      if (fillcolor == "WHITE") framecolor = "#FFFFF9";
                      ctx.fillStyle = fillcolor.toLowerCase(); //set the first text string 

                      textString3 = "".concat(member.user.username); //if the text is too big then smaller the text

                      if (textString3.length >= 14) {
                        ctx.font = 'bold 100px Genta';
                        ctx.fillText(textString3, 720, canvas.height / 2);
                      } //else dont do it
                      else {
                          ctx.font = 'bold 150px Genta';
                          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                        }

                      ctx.font = 'bold 50px Genta'; //define the Discriminator Tag

                      if (client.settings.get(member.guild.id, "welcome.discriminator")) {
                        ctx.fillText("#".concat(member.user.discriminator), 750, canvas.height / 2 + 125);
                      } //define the Member count


                      if (client.settings.get(member.guild.id, "welcome.membercount")) {
                        ctx.fillText("Member #".concat(member.guild.memberCount), 750, canvas.height / 2 + 200);
                      } //get the Guild Name


                      if (client.settings.get(member.guild.id, "welcome.servername")) {
                        ctx.fillText("".concat(member.guild.name), 700, canvas.height / 2 - 150);
                      }

                      if (!client.settings.get(member.guild.id, "welcome.pb")) {
                        _context10.next = 90;
                        break;
                      }

                      //create a circular "mask"
                      ctx.beginPath();
                      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img

                      ctx.closePath();
                      ctx.clip(); //define the user avatar

                      _context10.next = 88;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.user.displayAvatarURL({
                        format: 'png'
                      })));

                    case 88:
                      avatar = _context10.sent;
                      //draw the avatar
                      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

                    case 90:
                      _context10.t2 = Discord.MessageAttachment;
                      _context10.next = 93;
                      return regeneratorRuntime.awrap(canvas.toBuffer());

                    case 93:
                      _context10.t3 = _context10.sent;
                      attachment = new _context10.t2(_context10.t3, 'welcome-image.png');
                      //define the welcome embed
                      welcomeembed.setImage("attachment://welcome-image.png");
                      welcomeembed.attachFiles(attachment);
                      console.log("WELCOME - (fn-msg_autoimg) - SEND MESSAGE".italic.yellow); //send the welcome embed to there

                      channel.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 516 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });
                      _context10.next = 105;
                      break;

                    case 101:
                      _context10.prev = 101;
                      _context10.t4 = _context10["catch"](14);
                      console.log(_context10.t4);
                      channel.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 516 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });

                    case 105:
                      _context10.next = 110;
                      break;

                    case 107:
                      _context10.prev = 107;
                      _context10.t5 = _context10["catch"](0);
                      console.log("FASDASDAASFASD\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + _context10.t5);

                    case 110:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, null, null, [[0, 107], [14, 101], [18, 25], [29, 40]]);
            };

            dm_msg_autoimg = function _ref5(member) {
              var es, welcomeembed, canvas, ctx, bgimg, img, background, framecolor, fillcolors, textString3, avatar, attachment;
              return regeneratorRuntime.async(function dm_msg_autoimg$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.prev = 0;

                      if (member.guild) {
                        _context9.next = 3;
                        break;
                      }

                      return _context9.abrupt("return");

                    case 3:
                      es = client.settings.get(member.guild.id, "embed"); //define the welcome embed

                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**Welcome to ".concat(member.guild.name, "!**")).addField("\u200B", invitedstring).setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", "".concat(member.user))); //member roles add on welcome every single role

                      canvas = Canvas.createCanvas(1772, 633); //make it "2D"

                      ctx = canvas.getContext('2d');

                      if (!(client.settings.get(member.guild.id, "welcome.backgrounddm") !== "transparent")) {
                        _context9.next = 19;
                        break;
                      }

                      _context9.prev = 8;
                      _context9.next = 11;
                      return regeneratorRuntime.awrap(Canvas.loadImage(client.settings.get(member.guild.id, "welcome.backgrounddm")));

                    case 11:
                      bgimg = _context9.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
                      _context9.next = 17;
                      break;

                    case 15:
                      _context9.prev = 15;
                      _context9.t0 = _context9["catch"](8);

                    case 17:
                      _context9.next = 32;
                      break;

                    case 19:
                      _context9.prev = 19;

                      if (!(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined)) {
                        _context9.next = 22;
                        break;
                      }

                      return _context9.abrupt("return");

                    case 22:
                      _context9.next = 24;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.guild.iconURL({
                        format: "png"
                      })));

                    case 24:
                      img = _context9.sent;
                      ctx.globalAlpha = 0.3; //draw the guildicon

                      ctx.drawImage(img, 1772 - 633, 0, 633, 633);
                      ctx.globalAlpha = 1;
                      _context9.next = 32;
                      break;

                    case 30:
                      _context9.prev = 30;
                      _context9.t1 = _context9["catch"](19);

                    case 32:
                      if (!client.settings.get(member.guild.id, "welcome.framedm")) {
                        _context9.next = 62;
                        break;
                      }

                      framecolor = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
                      if (framecolor == "WHITE") framecolor = "#FFFFF9";

                      if (!(client.settings.get(member.guild.id, "welcome.discriminatordm") && client.settings.get(member.guild.id, "welcome.servernamedm"))) {
                        _context9.next = 41;
                        break;
                      }

                      _context9.next = 38;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome3frame.png")));

                    case 38:
                      background = _context9.sent;
                      _context9.next = 56;
                      break;

                    case 41:
                      if (!client.settings.get(member.guild.id, "welcome.discriminatordm")) {
                        _context9.next = 47;
                        break;
                      }

                      _context9.next = 44;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_unten.png")));

                    case 44:
                      background = _context9.sent;
                      _context9.next = 56;
                      break;

                    case 47:
                      if (!client.settings.get(member.guild.id, "welcome.servernamedm")) {
                        _context9.next = 53;
                        break;
                      }

                      _context9.next = 50;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_oben.png")));

                    case 50:
                      background = _context9.sent;
                      _context9.next = 56;
                      break;

                    case 53:
                      _context9.next = 55;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1frame.png")));

                    case 55:
                      background = _context9.sent;

                    case 56:
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                      if (!client.settings.get(member.guild.id, "welcome.pbdm")) {
                        _context9.next = 62;
                        break;
                      }

                      _context9.next = 60;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1framepb.png")));

                    case 60:
                      background = _context9.sent;
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    case 62:
                      fillcolors = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
                      if (fillcolors == "WHITE") framecolor = "#FFFFF9";
                      ctx.fillStyle = fillcolors.toLowerCase(); //set the first text string 

                      textString3 = "".concat(member.user.username); //if the text is too big then smaller the text

                      if (textString3.length >= 14) {
                        ctx.font = 'bold 100px Genta';
                        ctx.fillText(textString3, 720, canvas.height / 2);
                      } //else dont do it
                      else {
                          ctx.font = 'bold 150px Genta';
                          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                        }

                      ctx.font = 'bold 50px Genta'; //define the Discriminator Tag

                      if (client.settings.get(member.guild.id, "welcome.discriminatordm")) {
                        ctx.fillText("#".concat(member.user.discriminator), 750, canvas.height / 2 + 125);
                      } //define the Member count


                      if (client.settings.get(member.guild.id, "welcome.membercountdm")) {
                        ctx.fillText("Member #".concat(member.guild.memberCount), 750, canvas.height / 2 + 200);
                      } //get the Guild Name


                      if (client.settings.get(member.guild.id, "welcome.servernamedm")) {
                        ctx.fillText("".concat(member.guild.name), 700, canvas.height / 2 - 150);
                      }

                      if (!client.settings.get(member.guild.id, "welcome.pbdm")) {
                        _context9.next = 80;
                        break;
                      }

                      //create a circular "mask"
                      ctx.beginPath();
                      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img

                      ctx.closePath();
                      ctx.clip(); //define the user avatar

                      _context9.next = 78;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.user.displayAvatarURL({
                        format: 'png'
                      })));

                    case 78:
                      avatar = _context9.sent;
                      //draw the avatar
                      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

                    case 80:
                      //get it as a discord attachment
                      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png'); //define the welcome embed

                      welcomeembed.setImage("attachment://welcome-image.png");
                      welcomeembed.attachFiles(attachment); //send the welcome embed to there

                      member.user.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 395 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      }); //member roles add on welcome every single role

                      _context9.next = 88;
                      break;

                    case 86:
                      _context9.prev = 86;
                      _context9.t2 = _context9["catch"](0);

                    case 88:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, null, null, [[0, 86], [8, 15], [19, 30]]);
            };

            msg_withimg = function _ref4(member) {
              var es, welcomechannel, channel, welcomeembed;
              return regeneratorRuntime.async(function msg_withimg$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (member.guild) {
                        _context8.next = 2;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed");
                      welcomechannel = client.settings.get(member.guild.id, "welcome.channel");

                      if (welcomechannel) {
                        _context8.next = 6;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 6:
                      _context8.next = 8;
                      return regeneratorRuntime.awrap(client.channels.fetch(welcomechannel));

                    case 8:
                      channel = _context8.sent;

                      if (channel) {
                        _context8.next = 11;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 11:
                      //define the welcome embed
                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**Welcome to ".concat(member.guild.name, "!**")).setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", "".concat(member.user))).setImage(client.settings.get(member.guild.id, "welcome.custom")).addField("\u200B", invitedstring); //send the welcome embed to there

                      channel.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 284 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });

                    case 13:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            };

            dm_msg_withimg = function _ref3(member) {
              var es, welcomeembed;
              return regeneratorRuntime.async(function dm_msg_withimg$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (member.guild) {
                        _context7.next = 2;
                        break;
                      }

                      return _context7.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed"); //define the welcome embed

                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**Welcome to ".concat(member.guild.name, "!**")).setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", "".concat(member.user))).setImage(client.settings.get(member.guild.id, "welcome.customdm")).addField("\u200B", invitedstring); //send the welcome embed to there

                      member.user.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 264 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            };

            dm_msg_withoutimg = function _ref2(member) {
              var es, welcomeembed;
              return regeneratorRuntime.async(function dm_msg_withoutimg$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (member.guild) {
                        _context6.next = 2;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed"); //define the welcome embed

                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**Welcome to ".concat(member.guild.name, "!**")).setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", "".concat(member.user))).addField("\u200B", invitedstring); //send the welcome embed to there

                      member.user.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 249 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });

                    case 5:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            };

            msg_withoutimg = function _ref(member) {
              var es, welcomechannel, channel, welcomeembed;
              return regeneratorRuntime.async(function msg_withoutimg$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (member.guild) {
                        _context5.next = 2;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed");
                      welcomechannel = client.settings.get(member.guild.id, "welcome.channel");

                      if (welcomechannel) {
                        _context5.next = 6;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 6:
                      _context5.next = 8;
                      return regeneratorRuntime.awrap(client.channels.fetch(welcomechannel));

                    case 8:
                      channel = _context5.sent;

                      if (channel) {
                        _context5.next = 11;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 11:
                      //define the welcome embed
                      welcomeembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**Welcome to ".concat(member.guild.name, "!**")).setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", "".concat(member.user))).addField("\u200B", invitedstring); //send the welcome embed to there

                      channel.send({
                        content: "<@".concat(member.user.id, ">"),
                        embed: welcomeembed
                      })["catch"](function (e) {
                        return console.log("\n\n\n\n\n\nwelcome.js | Line 237 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
                      });

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            };

            _context11.prev = 6;
            invitesBefore = client.invites[member.guild.id];
            _context11.next = 10;
            return regeneratorRuntime.awrap(getInviteCounts(member.guild));

          case 10:
            invitesAfter = _context11.sent;
            _context11.t0 = regeneratorRuntime.keys(invitesAfter);

          case 12:
            if ((_context11.t1 = _context11.t0()).done) {
              _context11.next = 26;
              break;
            }

            inviter = _context11.t1.value;
            _context11.prev = 14;

            if (!(invitesBefore[inviter] === invitesAfter[inviter] - 1)) {
              _context11.next = 19;
              break;
            }

            ts = "".concat(inviter, " `(").concat(invitesAfter[inviter], " invites)`");
            client.invites[member.guild.id] = invitesAfter;
            return _context11.abrupt("break", 26);

          case 19:
            _context11.next = 24;
            break;

          case 21:
            _context11.prev = 21;
            _context11.t2 = _context11["catch"](14);
            ts = "Could not find who invited him";

          case 24:
            _context11.next = 12;
            break;

          case 26:
            _context11.next = 31;
            break;

          case 28:
            _context11.prev = 28;
            _context11.t3 = _context11["catch"](6);
            ts = "Could not find who invited him";

          case 31:
            invitedstring = "> Invited by: **".concat(ts, "**").substr(0, 1024);
            welcome = client.settings.get(member.guild.id, "welcome");

            if (welcome && welcome.channel !== "nochannel") {
              if (welcome.image) {
                if (welcome.dm) {
                  if (welcome.customdm === "no") dm_msg_autoimg(member);else dm_msg_withimg(member);
                }

                if (welcome.custom === "no") msg_autoimg(member);else msg_withimg(member);
              } else {
                if (welcome.dm) {
                  dm_msg_withoutimg(member);
                }

                msg_withoutimg(member);
              }
            }

          case 34:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[6, 28], [14, 21]]);
  }

  function add_roles(member) {
    var roles = client.settings.get(member.guild.id, "welcome.roles");

    if (roles.length > 0) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = roles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var role = _step2.value;

          try {
            member.roles.add(role)["catch"](function (e) {
              return console.log("\n\n\n\n\n\nROLES ROLES This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n");
            });
          } catch (_unused13) {}
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
  }
};