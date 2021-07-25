"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

var _require3 = require("discord-buttons"),
    MessageButton = _require3.MessageButton,
    MessageActionRow = _require3.MessageActionRow; // using discord-buttons but edited!


module.exports = {
  name: "embedbuilder",
  category: "🚫 Administration",
  aliases: ["embedb"],
  cooldown: 2,
  usage: "embedbuilder --> follow Steps",
  description: "Resends a message from u as an Embed\n\n To have forexample no title do that:  embed ++ This is what an Embed without Image Looks like",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, embedToBuild, title, description, footer, footerImage, image, thumbnail, timestamp, color, save, cancel, channel, buttonRow, buttonRow1, buttonRow2, buttonRow3, msg, buttonEvent, channel2send, embedEditing, channel2;

    return regeneratorRuntime.async(function run$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context5.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.embedbuilder");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context5.next = 25;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context5.prev = 9;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.embedbuilder");
              }
            }

            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context5.t0;

          case 17:
            _context5.prev = 17;
            _context5.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context5.prev = 20;

            if (!_didIteratorError) {
              _context5.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context5.finish(20);

          case 24:
            return _context5.finish(17);

          case 25:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context5.next = 27;
              break;
            }

            return _context5.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 27:
            embedToBuild = new MessageEmbed().setAuthor(message.member.user.tag, message.member.user.avatarURL({
              dynamic: true
            }));
            title = new MessageButton().setLabel("Title").setStyle("blurple").setID("buildEmbed_builder_title");
            description = new MessageButton().setLabel("Description").setStyle("blurple").setID("buildEmbed_builder_desc");
            footer = new MessageButton().setLabel("Footer").setStyle("blurple").setID("buildEmbed_builder_footer");
            footerImage = new MessageButton().setLabel("Footer Image").setStyle("blurple").setID("buildEmbed_builder_footerimg");
            image = new MessageButton().setLabel("Image").setStyle("blurple").setID("buildEmbed_builder_img");
            thumbnail = new MessageButton().setLabel("Thumbnail").setStyle("blurple").setID("buildEmbed_builder_thumb");
            timestamp = new MessageButton().setLabel("Timestamp").setStyle("blurple").setID("buildEmbed_builder_timestamp");
            color = new MessageButton().setLabel("Color").setStyle("blurple").setID("buildEmbed_builder_color");
            save = new MessageButton().setLabel("📨 Send").setStyle("green").setID("buildEmbed_save");
            cancel = new MessageButton().setLabel("❌ Cancel").setStyle("red").setID("buildEmbed_cancel");
            channel = new MessageButton().setLabel("💬 Select Channel").setStyle("blurple").setID("buildEmbed_builder_channel");
            buttonRow = new MessageActionRow().addComponent(title).addComponent(description);
            buttonRow1 = new MessageActionRow().addComponent(footer).addComponent(color).addComponent(timestamp);
            buttonRow2 = new MessageActionRow().addComponent(footerImage).addComponent(image).addComponent(thumbnail);
            buttonRow3 = new MessageActionRow().addComponent(save).addComponent(cancel).addComponent(channel);
            _context5.next = 45;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: embedToBuild,
              components: [buttonRow, buttonRow1, buttonRow2, buttonRow3]
            }));

          case 45:
            msg = _context5.sent;

            buttonEvent = function buttonEvent(button) {
              return regeneratorRuntime.async(function buttonEvent$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(button.message.id === msg.id)) {
                        _context.next = 7;
                        break;
                      }

                      if (!(button.clicker.user.id === message.member.id)) {
                        _context.next = 5;
                        break;
                      }

                      embedEditing(button);
                      _context.next = 7;
                      break;

                    case 5:
                      _context.next = 7;
                      return regeneratorRuntime.awrap(button.reply.send("You are not allowed to do that! Only: <@".concat(message.author.id, ">"), true));

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            channel2send = false;
            client.on("clickButton", buttonEvent);

            embedEditing = function embedEditing(button) {
              var id, builderId, noInput, noInputFinal, ifUrl, input, filter, finalInput, messageToDelete;
              return regeneratorRuntime.async(function embedEditing$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(!button.id.startsWith("buildEmbed") && button.message.id == msg.id)) {
                        _context4.next = 2;
                        break;
                      }

                      return _context4.abrupt("return");

                    case 2:
                      _context4.next = 4;
                      return regeneratorRuntime.awrap(button.defer());

                    case 4:
                      id = button.id.split("buildEmbed_")[1];

                      if (!id.startsWith("builder")) {
                        _context4.next = 28;
                        break;
                      }

                      builderId = id.split("builder_")[1];
                      noInput = ["timestamp"];
                      noInputFinal = !noInput.some(function (a) {
                        return a == builderId;
                      });
                      ifUrl = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
                      button.message.edit("Please send me Your Input now!", {
                        components: new MessageActionRow().addComponent(new MessageButton().setLabel("Cancel").setStyle("red").setID("buildEmbed_cancel"))
                      });

                      if (!noInputFinal) {
                        _context4.next = 16;
                        break;
                      }

                      filter = function filter(message) {
                        return regeneratorRuntime.async(function filter$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.abrupt("return", button.clicker.user.id == message.author.id);

                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      };

                      _context4.next = 15;
                      return regeneratorRuntime.awrap(button.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                      })["catch"](function (e) {
                        return client.emit("clickButton", {
                          id: "buildEmbed_cancel",
                          message: button.message,
                          channel: button.channel
                        });
                      }));

                    case 15:
                      input = _context4.sent;

                    case 16:
                      finalInput = input ? input.first() : "";
                      if (builderId == "channel") channel2send = finalInput.mentions.channels.first() || false;
                      if (builderId == "title") embedToBuild.setTitle(finalInput.content);
                      if (builderId == "desc") embedToBuild.setDescription(finalInput.content);
                      if (builderId == "footer") embedToBuild.setFooter(finalInput.content);

                      if (builderId == "color") {
                        if (!/^#[0-9A-F]{6}$/i.test(finalInput.content)) embedToBuild.setColor("RANDOM");else embedToBuild.setColor(finalInput.content);
                      }

                      if (builderId == "footerimg") {
                        if (ifUrl.test(finalInput)) {
                          embedToBuild.setFooter("".concat(embedToBuild.footer ? embedToBuild.footer.text : "\u200B"), finalInput.content);
                        }
                      }

                      if (builderId == "img") {
                        if (ifUrl.test(finalInput)) {
                          embedToBuild.setImage(finalInput.content);
                        }
                      }

                      if (builderId == "thumb") {
                        if (ifUrl.test(finalInput)) {
                          embedToBuild.setThumbnail(finalInput.content);
                        }
                      }

                      if (builderId == "timestamp") embedToBuild.setTimestamp();
                      button.message.edit({
                        embed: embedToBuild,
                        components: [buttonRow, buttonRow1, buttonRow2, buttonRow3]
                      });
                      finalInput["delete"]();

                    case 28:
                      if (!(id == "cancel")) {
                        _context4.next = 33;
                        break;
                      }

                      button.message.edit("Canceling...", {
                        component: null
                      });
                      setTimeout(function _callee() {
                        var message;
                        return regeneratorRuntime.async(function _callee$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return regeneratorRuntime.awrap(button.channel.messages.fetch(button.message.id));

                              case 2:
                                message = _context3.sent;
                                message["delete"]();

                              case 4:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      }, 3000);
                      _context4.next = 33;
                      return regeneratorRuntime.awrap(client.removeListener("clickButton", buttonEvent));

                    case 33:
                      if (!(id == "save")) {
                        _context4.next = 42;
                        break;
                      }

                      _context4.next = 36;
                      return regeneratorRuntime.awrap(button.channel.messages.fetch(button.message.id));

                    case 36:
                      messageToDelete = _context4.sent;
                      messageToDelete["delete"]();
                      embedToBuild = Object.keys(embedToBuild).reduce(function (object, key) {
                        if (key !== "author") {
                          object[key] = embedToBuild[key];
                        }

                        return object;
                      }, {});
                      if (channel2send) channel2send.send({
                        embed: embedToBuild,
                        component: null
                      });else button.channel.send({
                        embed: embedToBuild,
                        component: null
                      });
                      _context4.next = 42;
                      return regeneratorRuntime.awrap(client.removeListener("clickButton", buttonEvent));

                    case 42:
                      setTimeout(function () {
                        button.message.edit({
                          embed: embedToBuild,
                          components: null
                        });
                        client.removeListener("clickButton", buttonEvent);
                      }, 300000);

                    case 43:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            };

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context5.next = 61;
              break;
            }

            _context5.prev = 51;
            channel2 = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel2) {
              _context5.next = 55;
              break;
            }

            return _context5.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 55:
            channel2.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context5.next = 61;
            break;

          case 58:
            _context5.prev = 58;
            _context5.t1 = _context5["catch"](51);
            console.log(_context5.t1);

          case 61:
            _context5.next = 67;
            break;

          case 63:
            _context5.prev = 63;
            _context5.t2 = _context5["catch"](1);
            console.log(String(_context5.t2.stack).bgRed);
            return _context5.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context5.t2.stack, "```"))));

          case 67:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 63], [9, 13, 17, 25], [18,, 20, 24], [51, 58]]);
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