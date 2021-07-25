"use strict";

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var Discord = require("discord.js");

var Canvas = require("canvas");

Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
}); //Start the module

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

  client.on("guildMemberRemove", function _callee(member) {
    var es;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (member.guild) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            es = client.settings.get(member.guild.id, "embed");

            if (client.invites[member.guild.id]) {
              _context2.next = 6;
              break;
            }

            _context2.next = 6;
            return regeneratorRuntime.awrap(getInviteCounts(member.guild));

          case 6:
            message(member);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });

  function message(member) {
    var invitedstring, invitesBefore, invitesAfter, ts, inviter, leave, msg_withoutimg, dm_msg_withoutimg, dm_msg_withimg, msg_withimg, dm_msg_autoimg, msg_autoimg;
    return regeneratorRuntime.async(function message$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            msg_autoimg = function _ref6(member) {
              var _es2, leavechannel, channel, leaveembed, canvas, ctx, bgimg, img, background, framecolor, fillcolor, textString3, avatar, attachment;

              return regeneratorRuntime.async(function msg_autoimg$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.prev = 0;

                      if (member.guild) {
                        _context8.next = 3;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 3:
                      _es2 = client.settings.get(member.guild.id, "embed");
                      leavechannel = client.settings.get(member.guild.id, "leave.channel");

                      if (leavechannel) {
                        _context8.next = 7;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 7:
                      _context8.next = 9;
                      return regeneratorRuntime.awrap(client.channels.fetch(leavechannel));

                    case 9:
                      channel = _context8.sent;

                      if (channel) {
                        _context8.next = 12;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 12:
                      //define the leave embed
                      leaveembed = new Discord.MessageEmbed().setColor(_es2.color).setThumbnail(_es2.thumb ? _es2.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).addField("\u200B", invitedstring).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", "".concat(member.user))); //member roles add on leave every single role

                      canvas = Canvas.createCanvas(1772, 633); //make it "2D"

                      ctx = canvas.getContext('2d');

                      if (!(client.settings.get(member.guild.id, "leave.background") !== "transparent")) {
                        _context8.next = 27;
                        break;
                      }

                      _context8.prev = 16;
                      _context8.next = 19;
                      return regeneratorRuntime.awrap(Canvas.loadImage(client.settings.get(member.guild.id, "leave.background")));

                    case 19:
                      bgimg = _context8.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
                      _context8.next = 25;
                      break;

                    case 23:
                      _context8.prev = 23;
                      _context8.t0 = _context8["catch"](16);

                    case 25:
                      _context8.next = 40;
                      break;

                    case 27:
                      _context8.prev = 27;

                      if (!(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined)) {
                        _context8.next = 30;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 30:
                      _context8.next = 32;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.guild.iconURL({
                        format: "png"
                      })));

                    case 32:
                      img = _context8.sent;
                      ctx.globalAlpha = 0.3; //draw the guildicon

                      ctx.drawImage(img, 1772 - 633, 0, 633, 633);
                      ctx.globalAlpha = 1;
                      _context8.next = 40;
                      break;

                    case 38:
                      _context8.prev = 38;
                      _context8.t1 = _context8["catch"](27);

                    case 40:
                      if (!client.settings.get(member.guild.id, "leave.frame")) {
                        _context8.next = 70;
                        break;
                      }

                      framecolor = client.settings.get(member.guild.id, "leave.framecolor").toUpperCase();
                      if (framecolor == "WHITE") framecolor = "#FFFFF9";

                      if (!(client.settings.get(member.guild.id, "leave.discriminator") && client.settings.get(member.guild.id, "leave.servername"))) {
                        _context8.next = 49;
                        break;
                      }

                      _context8.next = 46;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome3frame.png")));

                    case 46:
                      background = _context8.sent;
                      _context8.next = 64;
                      break;

                    case 49:
                      if (!client.settings.get(member.guild.id, "leave.discriminator")) {
                        _context8.next = 55;
                        break;
                      }

                      _context8.next = 52;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_unten.png")));

                    case 52:
                      background = _context8.sent;
                      _context8.next = 64;
                      break;

                    case 55:
                      if (!client.settings.get(member.guild.id, "leave.servername")) {
                        _context8.next = 61;
                        break;
                      }

                      _context8.next = 58;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_oben.png")));

                    case 58:
                      background = _context8.sent;
                      _context8.next = 64;
                      break;

                    case 61:
                      _context8.next = 63;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1frame.png")));

                    case 63:
                      background = _context8.sent;

                    case 64:
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                      if (!client.settings.get(member.guild.id, "leave.pb")) {
                        _context8.next = 70;
                        break;
                      }

                      _context8.next = 68;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1framepb.png")));

                    case 68:
                      background = _context8.sent;
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    case 70:
                      fillcolor = client.settings.get(member.guild.id, "leave.framecolor").toUpperCase();
                      if (fillcolor == "WHITE") fillcolor == "#FFFFF9";
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

                      if (client.settings.get(member.guild.id, "leave.discriminator")) {
                        ctx.fillText("#".concat(member.user.discriminator), 750, canvas.height / 2 + 125);
                      } //define the Member count


                      if (client.settings.get(member.guild.id, "leave.membercount")) {
                        ctx.fillText("Member #".concat(member.guild.memberCount), 750, canvas.height / 2 + 200);
                      } //get the Guild Name


                      if (client.settings.get(member.guild.id, "leave.servername")) {
                        ctx.fillText("".concat(member.guild.name), 700, canvas.height / 2 - 150);
                      }

                      if (!client.settings.get(member.guild.id, "leave.pb")) {
                        _context8.next = 88;
                        break;
                      }

                      //create a circular "mask"
                      ctx.beginPath();
                      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img

                      ctx.closePath();
                      ctx.clip(); //define the user avatar

                      _context8.next = 86;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.user.displayAvatarURL({
                        format: 'png'
                      })));

                    case 86:
                      avatar = _context8.sent;
                      //draw the avatar
                      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

                    case 88:
                      //get it as a discord attachment
                      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave-image.png'); //define the leave embed

                      leaveembed.setImage("attachment://leave-image.png");
                      leaveembed.attachFiles(attachment); //send the leave embed to there

                      channel.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      }); //member roles add on leave every single role

                      _context8.next = 97;
                      break;

                    case 94:
                      _context8.prev = 94;
                      _context8.t2 = _context8["catch"](0);
                      console.log(_context8.t2);

                    case 97:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, null, null, [[0, 94], [16, 23], [27, 38]]);
            };

            dm_msg_autoimg = function _ref5(member) {
              var _es, leaveembed, canvas, ctx, bgimg, img, background, framecolor, fillcolors, textString3, avatar, attachment;

              return regeneratorRuntime.async(function dm_msg_autoimg$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.prev = 0;

                      if (member.guild) {
                        _context7.next = 3;
                        break;
                      }

                      return _context7.abrupt("return");

                    case 3:
                      _es = client.settings.get(member.guild.id, "embed"); //define the leave embed

                      leaveembed = new Discord.MessageEmbed().setColor(_es.color).setThumbnail(_es.thumb ? _es.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).addField("\u200B", invitedstring).setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", "".concat(member.user))); //member roles add on leave every single role

                      canvas = Canvas.createCanvas(1772, 633); //make it "2D"

                      ctx = canvas.getContext('2d');

                      if (!(client.settings.get(member.guild.id, "leave.backgrounddm") !== "transparent")) {
                        _context7.next = 19;
                        break;
                      }

                      _context7.prev = 8;
                      _context7.next = 11;
                      return regeneratorRuntime.awrap(Canvas.loadImage(client.settings.get(member.guild.id, "leave.backgrounddm")));

                    case 11:
                      bgimg = _context7.sent;
                      ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
                      _context7.next = 17;
                      break;

                    case 15:
                      _context7.prev = 15;
                      _context7.t0 = _context7["catch"](8);

                    case 17:
                      _context7.next = 32;
                      break;

                    case 19:
                      _context7.prev = 19;

                      if (!(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined)) {
                        _context7.next = 22;
                        break;
                      }

                      return _context7.abrupt("return");

                    case 22:
                      _context7.next = 24;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.guild.iconURL({
                        format: "png"
                      })));

                    case 24:
                      img = _context7.sent;
                      ctx.globalAlpha = 0.3; //draw the guildicon

                      ctx.drawImage(img, 1772 - 633, 0, 633, 633);
                      ctx.globalAlpha = 1;
                      _context7.next = 32;
                      break;

                    case 30:
                      _context7.prev = 30;
                      _context7.t1 = _context7["catch"](19);

                    case 32:
                      if (!client.settings.get(member.guild.id, "leave.framedm")) {
                        _context7.next = 62;
                        break;
                      }

                      framecolor = client.settings.get(member.guild.id, "leave.framecolordm").toUpperCase();
                      if (framecolor == "WHITE") framecolor = "#FFFFF9";

                      if (!(client.settings.get(member.guild.id, "leave.discriminatordm") && client.settings.get(member.guild.id, "leave.servernamedm"))) {
                        _context7.next = 41;
                        break;
                      }

                      _context7.next = 38;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome3frame.png")));

                    case 38:
                      background = _context7.sent;
                      _context7.next = 56;
                      break;

                    case 41:
                      if (!client.settings.get(member.guild.id, "leave.discriminatordm")) {
                        _context7.next = 47;
                        break;
                      }

                      _context7.next = 44;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_unten.png")));

                    case 44:
                      background = _context7.sent;
                      _context7.next = 56;
                      break;

                    case 47:
                      if (!client.settings.get(member.guild.id, "leave.servernamedm")) {
                        _context7.next = 53;
                        break;
                      }

                      _context7.next = 50;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome2frame_oben.png")));

                    case 50:
                      background = _context7.sent;
                      _context7.next = 56;
                      break;

                    case 53:
                      _context7.next = 55;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1frame.png")));

                    case 55:
                      background = _context7.sent;

                    case 56:
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                      if (!client.settings.get(member.guild.id, "leave.pbdm")) {
                        _context7.next = 62;
                        break;
                      }

                      _context7.next = 60;
                      return regeneratorRuntime.awrap(Canvas.loadImage("./assets/welcome/".concat(framecolor, "/welcome1framepb.png")));

                    case 60:
                      background = _context7.sent;
                      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    case 62:
                      fillcolors = client.settings.get(member.guild.id, "leave.framecolordm").toUpperCase();
                      if (fillcolors == "WHITE") fillcolor == "#FFFFF9";
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

                      if (client.settings.get(member.guild.id, "leave.discriminatordm")) {
                        ctx.fillText("#".concat(member.user.discriminator), 750, canvas.height / 2 + 125);
                      } //define the Member count


                      if (client.settings.get(member.guild.id, "leave.membercountdm")) {
                        ctx.fillText("Member #".concat(member.guild.memberCount), 750, canvas.height / 2 + 200);
                      } //get the Guild Name


                      if (client.settings.get(member.guild.id, "leave.servernamedm")) {
                        ctx.fillText("".concat(member.guild.name), 700, canvas.height / 2 - 150);
                      }

                      if (!client.settings.get(member.guild.id, "leave.pbdm")) {
                        _context7.next = 80;
                        break;
                      }

                      //create a circular "mask"
                      ctx.beginPath();
                      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img

                      ctx.closePath();
                      ctx.clip(); //define the user avatar

                      _context7.next = 78;
                      return regeneratorRuntime.awrap(Canvas.loadImage(member.user.displayAvatarURL({
                        format: 'png'
                      })));

                    case 78:
                      avatar = _context7.sent;
                      //draw the avatar
                      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

                    case 80:
                      //get it as a discord attachment
                      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave-image.png'); //define the leave embed

                      leaveembed.setImage("attachment://leave-image.png");
                      leaveembed.attachFiles(attachment); //send the leave embed to there

                      member.user.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      }); //member roles add on leave every single role

                      _context7.next = 88;
                      break;

                    case 86:
                      _context7.prev = 86;
                      _context7.t2 = _context7["catch"](0);

                    case 88:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, null, null, [[0, 86], [8, 15], [19, 30]]);
            };

            msg_withimg = function _ref4(member) {
              var es, leavechannel, channel, leaveembed;
              return regeneratorRuntime.async(function msg_withimg$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (member.guild) {
                        _context6.next = 2;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed");
                      leavechannel = client.settings.get(member.guild.id, "leave.channel");

                      if (leavechannel) {
                        _context6.next = 6;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 6:
                      _context6.next = 8;
                      return regeneratorRuntime.awrap(client.channels.fetch(leavechannel));

                    case 8:
                      channel = _context6.sent;

                      if (channel) {
                        _context6.next = 11;
                        break;
                      }

                      return _context6.abrupt("return");

                    case 11:
                      //define the leave embed
                      leaveembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", "".concat(member.user))).setImage(client.settings.get(member.guild.id, "leave.custom")).addField("\u200B", invitedstring); //send the leave embed to there

                      channel.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      });

                    case 13:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            };

            dm_msg_withimg = function _ref3(member) {
              var leaveembed;
              return regeneratorRuntime.async(function dm_msg_withimg$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      //define the leave embed
                      leaveembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", "".concat(member.user))).setImage(client.settings.get(member.guild.id, "leave.customdm")).addField("\u200B", invitedstring); //send the leave embed to there

                      member.user.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      });

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            };

            dm_msg_withoutimg = function _ref2(member) {
              var leaveembed;
              return regeneratorRuntime.async(function dm_msg_withoutimg$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      //define the leave embed
                      leaveembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", "".concat(member.user))).addField("\u200B", invitedstring); //send the leave embed to there

                      member.user.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      });

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            };

            msg_withoutimg = function _ref(member) {
              var es, leavechannel, channel, leaveembed;
              return regeneratorRuntime.async(function msg_withoutimg$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (member.guild) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return");

                    case 2:
                      es = client.settings.get(member.guild.id, "embed");
                      leavechannel = client.settings.get(member.guild.id, "leave.channel");

                      if (leavechannel) {
                        _context3.next = 6;
                        break;
                      }

                      return _context3.abrupt("return");

                    case 6:
                      _context3.next = 8;
                      return regeneratorRuntime.awrap(client.channels.fetch(leavechannel));

                    case 8:
                      channel = _context3.sent;

                      if (channel) {
                        _context3.next = 11;
                        break;
                      }

                      return _context3.abrupt("return");

                    case 11:
                      //define the leave embed
                      leaveembed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTimestamp().setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({
                        dynamic: true
                      })).setTitle("**".concat(member.user.tag, " left  ").concat(member.guild.name, "**")).setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", "".concat(member.user))).addField("\u200B", invitedstring); //send the leave embed to there

                      channel.send(leaveembed)["catch"](function (e) {
                        return console.log("This catch prevents a crash");
                      });

                    case 13:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            };

            invitesBefore = client.invites[member.guild.id];
            _context9.next = 9;
            return regeneratorRuntime.awrap(getInviteCounts(member.guild));

          case 9:
            invitesAfter = _context9.sent;
            _context9.t0 = regeneratorRuntime.keys(invitesAfter);

          case 11:
            if ((_context9.t1 = _context9.t0()).done) {
              _context9.next = 25;
              break;
            }

            inviter = _context9.t1.value;
            _context9.prev = 13;

            if (!(invitesBefore[inviter] === invitesAfter[inviter] - 1)) {
              _context9.next = 18;
              break;
            }

            ts = "".concat(inviter, " `(").concat(invitesAfter[inviter], " invites)`");
            client.invites[member.guild.id] = invitesAfter;
            return _context9.abrupt("break", 25);

          case 18:
            _context9.next = 23;
            break;

          case 20:
            _context9.prev = 20;
            _context9.t2 = _context9["catch"](13);
            ts = "Could not find who invited him";

          case 23:
            _context9.next = 11;
            break;

          case 25:
            invitedstring = "> Was invited by: **".concat(ts, "**").substr(0, 1024);
            leave = client.settings.get(member.guild.id, "leave");

            if (leave && leave.channel !== "nochannel") {
              if (leave.image) {
                if (leave.dm) {
                  if (leave.customdm === "no") dm_msg_autoimg(member);else dm_msg_withimg(member);
                }

                if (leave.custom === "no") msg_autoimg(member);else msg_withimg(member);
              } else {
                if (leave.dm) {
                  dm_msg_withoutimg(member);
                }

                msg_withoutimg(member);
              }
            }

          case 28:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[13, 20]]);
  }
};