"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["ROLE: ", "\nROLENAME: ", "\nROLEID: ", "\nHEXCOLOR: ", "\nPOSITION: ", ""], ["ROLE: ", "\\nROLENAME: ", "\\nROLEID: ", "\\nHEXCOLOR: ", "\\nPOSITION: ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["ROLE: ", "\nROLENAME: ", "\nROLEID: ", "\nHEXCOLOR: ", "\nPOSITION: ", ""], ["ROLE: ", "\\nROLENAME: ", "\\nROLEID: ", "\\nHEXCOLOR: ", "\\nPOSITION: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Discord = require("discord.js");

var fs = require("fs");

module.exports = function (c) {
  try {
    c.on("channelCreate", function (channel) {
      try {
        send_log(c, channel.guild, "GREEN", "Channel CREATED", "ChannelNAME: `".concat(channel.name, "`\nChannelID: `").concat(channel.id, "`\nChannelTYPE: `").concat(channel.type, "`"));
      } catch (_unused) {}
    });
    c.on("channelDelete", function (channel) {
      try {
        send_log(c, channel.guild, "RED", "Channel DELETED", "ChannelNAME: `".concat(channel.name, "`\nChannelID: `").concat(channel.id, "`\nChannelTYPE: `").concat(channel.type, "`"));
      } catch (_unused2) {}
    });
    c.on("channelPinsUpdate", function (channel, time) {
      try {
        send_log(c, channel.guild, "YELLOW", "Channel PINS UPDATE", "ChannelNAME: `".concat(channel.name, "`\nChannelID: `").concat(channel.id, "`\nPinned at `").concat(time, "`"), "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png");
      } catch (_unused3) {}
    });
    c.on("channelUpdate", function (oldChannel, newChannel) {
      try {
        var newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";
        var guildChannel = newChannel.guild;
        if (!guildChannel || !guildChannel.available) return;
        var types = {
          text: "Text Channel",
          voice: "Voice Channel",
          "null": "No Type",
          news: "News Channel",
          store: "Store Channel",
          category: "Category"
        };

        if (oldChannel.name != newChannel.name) {
          send_log(c, oldChannel.guild, "YELLOW", "Channel UPDATED - NAME", "ChannelNAME: `".concat(oldChannel.name, "`\nChannelID: `").concat(oldChannel.id, "`\n\n") + "ChannelNAME: `".concat(newChannel.name, "`\nChannelID: `").concat(newChannel.id, "`"));
        } else if (oldChannel.type != newChannel.type) {
          send_log(c, oldChannel.guild, "YELLOW", "Channel UPDATED - TYPE", "ChannelNAME: `".concat(oldChannel.name, "`\nChannelID: `").concat(oldChannel.id, "`\nChannelTYPE: `").concat(types[oldChannel.type], "`\n\n") + "ChannelNAME: `".concat(newChannel.name, "`\nChannelID: `").concat(newChannel.id, "`\nChannelTYPE: `").concat(types[newChannel.type], "`"));
        } else if (oldChannel.topic != newChannel.topic) {
          send_log(c, oldChannel.guild, "YELLOW", "Channel UPDATED - TOPIC", "ChannelNAME: `".concat(oldChannel.name, "`\nChannelID: `").concat(oldChannel.id, "`\nChannelTOPIC: `").concat(oldChannel.topic, "`\n\n") + "ChannelNAME: `".concat(newChannel.name, "`\nChannelID: `").concat(newChannel.id, "`\nChannelTOPIC: `").concat(newChannel.topic, "`"));
        }
      } catch (_unused4) {}
    });
    c.on("emojiCreate", function (emoji) {
      try {
        send_log(c, emoji.guild, "GREEN", "EMOJI CREATED", "EMOJI: ".concat(emoji, "\nEMOJINAME: ").concat(emoji.name, "\nEMOJIID: ").concat(emoji.id, "\nEMOJIURL: ").concat(emoji.url));
      } catch (_unused5) {}
    });
    c.on("emojiDelete", function (emoji) {
      try {
        send_log(c, emoji.guild, "RED", "EMOJI DELETED", "EMOJI: ".concat(emoji, "\nEMOJINAME: ").concat(emoji.name, "\nEMOJIID: ").concat(emoji.id, "\nEMOJIURL: ").concat(emoji.url));
      } catch (_unused6) {}
    });
    c.on("emojiUpdate", function (oldEmoji, newEmoji) {
      try {
        if (oldEmoji.name !== newEmoji.name) {
          send_log(c, oldEmoji.guild, "ORANGE", "EMOJI NAME CHANGED", "__Emoji: ".concat(newEmoji, "__ \n\n**Before:** `").concat(oldEmoji.name, "`\n**After:** `").concat(newEmoji.name, "`\n**Emoji ID:** `").concat(newEmoji.id, "`"));
        }
      } catch (_unused7) {}
    });
    c.on("guildBanAdd", function (guild, user) {
      try {
        send_log(c, guild, "RED", "USER BANNED", "User: ".concat(user, " (`").concat(user.id, "`)\n`").concat(user.tag, "`"), member.user.displayAvatarURL({
          dynamic: true
        }));
      } catch (_unused8) {}
    });
    c.on("guildBanRemove", function (guild, user) {
      try {
        send_log(c, guild, "YELLOW", "USER UNBANNED", "User: ".concat(user, " (`").concat(user.id, "`)\n`").concat(user.tag, "`"), member.user.displayAvatarURL({
          dynamic: true
        }));
      } catch (_unused9) {}
    });
    c.on("guildMemberAdd", function (member) {
      try {
        send_log(member.guild, c, "GREEN", "MEMBER JOINED", "Member: ".concat(member.user, " (`").concat(member.user.id, "`)\n`").concat(member.user.tag, "`"), member.user.displayAvatarURL({
          dynamic: true
        }));
      } catch (_unused10) {}
    });
    c.on("guildMemberRemove", function (member) {
      try {
        send_log(c, member.guild, "RED", "MEMBER LEFT", "Member: ".concat(member.user, " (`").concat(member.user.id, "`)\n`").concat(member.user.tag, "`"), member.user.displayAvatarURL({
          dynamic: true
        }));
      } catch (_unused11) {}
    });
    c.on("guildMembersChunk", function (members, guild) {
      try {
        send_log(guild, c, "RED", "MEMBER CHUNK / RAID - " + members.length + " Members", members.map(function (user, index) {
          return "".concat(index, ") - ").concat(user, " - ").concat(user.tag, " - `").concat(user.id, "`");
        }));
      } catch (_unused12) {}
    });
    c.on("guildMemberUpdate", function (oldMember, newMember) {
      try {
        var options = {};

        if (options[newMember.guild.id]) {
          options = options[newMember.guild.id];
        } // Add default empty list


        if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([]);
        if (typeof options.trackroles === "undefined") options.trackroles = true;
        var oldMemberRoles = oldMember.roles.cache.keyArray();
        var newMemberRoles = newMember.roles.cache.keyArray();
        var oldRoles = oldMemberRoles.filter(function (x) {
          return !options.excludedroles.includes(x);
        }).filter(function (x) {
          return !newMemberRoles.includes(x);
        });
        var newRoles = newMemberRoles.filter(function (x) {
          return !options.excludedroles.includes(x);
        }).filter(function (x) {
          return !oldMemberRoles.includes(x);
        });
        var rolechanged = newRoles.length || oldRoles.length;

        if (rolechanged) {
          var roleadded = "";

          if (newRoles.length > 0) {
            for (var i = 0; i < newRoles.length; i++) {
              if (i > 0) roleadded += ", ";
              roleadded += "<@&".concat(newRoles[i], ">");
            }
          }

          var roleremoved = "";

          if (oldRoles.length > 0) {
            for (var _i = 0; _i < oldRoles.length; _i++) {
              if (_i > 0) roleremoved += ", ";
              roleremoved += "<@&".concat(oldRoles[_i], ">");
            }
          }

          var text = "".concat(roleremoved ? "\u274C ROLE REMOVED: \n".concat(roleremoved) : "").concat(roleadded ? "\u2705 ROLE ADDED:\n".concat(roleadded) : "");
          send_log(c, oldMember.guild, "".concat(roleadded ? "GREEN" : "RED"), "Member ROLES Changed", "Member: ".concat(newMember.user, "\nUser: `").concat(oldMember.user.tag, "`\n\n").concat(text));
        }
      } catch (_unused13) {}
    });
    c.on("messageDelete", function (message) {
      try {
        if (!message) return;
        if (message.author && message.author.bot) return;
        if (message.channel.type !== "text") return;
        send_log(c, message.guild, "ORANGE", "Message Deleted", "\n**Author : ** <@".concat(message.author.id, "> - *").concat(message.author.tag, "*\n**Date : ** ").concat(message.createdAt, "\n**Channel : ** <#").concat(message.channel.id, "> - *").concat(message.channel.name, "*\n\n**Deleted Message : **\n```\n").concat(message.content.replace(/`/g, "'"), "\n```\n\n**Attachment URL : **\n").concat(message.attachments.map(function (x) {
          return x.proxyURL;
        }), "\n\n"));
      } catch (_unused14) {}
    });
    c.on("messageDeleteBulk", function (messages) {
      try {
        send_log(c, messages.guild, "RED", messages.length + "  Message Deleted BULK", "\n          $ {\n            messages.length\n          }\n          Messages delete in: $ {\n            messages.channel\n          }\n          ");
      } catch (_unused15) {}
    });
    c.on("messageUpdate", function (oldMessage, newMessage) {
      try {
        if (oldMessage.author && oldMessage.author.bot) return;
        if (newMessage.author && newMessage.author.bot) return;
        if (oldMessage.channel.type !== "text") return;
        if (newMessage.channel.type !== "text") return;
        if (oldMessage.content === newMessage.content) return;
        send_log(c, oldMessage.guild, "YELLOW", "Message UPDATED", " **\n          Author: ** <@".concat(newMessage.member.user.id, "> - *").concat(newMessage.member.user.tag, "*\n          **\n          Date: **").concat(newMessage.createdAt, "**\n          Channel: **<#").concat(newMessage.channel.id, "> - *").concat(newMessage.channel.name, "*\n\n          **\n          Orignal Message: ** ```\n").concat(oldMessage.content ? oldMessage.content.replace(/`/g, "'") : "UNKNOWN CONTENT", "\n```\n**Updated Message : **\n```\n").concat(newMessage.content ? newMessage.content.replace(/`/g, "'") : "UNKNOWN CONTENT", "\n```"));
      } catch (_unused16) {}
    });
    c.on("roleCreate", function (role) {
      try {
        send_log(c, role.guild, "GREEN", "ROLE CREATED"(_templateObject(), role, role.name, role.id, role.hexColor, role.position));
      } catch (_unused17) {}
    });
    c.on("roleDelete", function (role) {
      try {
        send_log(c, role.guild, "RED", "ROLE DELETED"(_templateObject2(), role, role.name, role.id, role.hexColor, role.position));
      } catch (_unused18) {}
    });
    c.on("roleUpdate", function (oldRole, newRole) {
      try {
        var _perms;

        var perms = (_perms = {
          "1": "CREATE_INSTANT_INVITE",
          "2": "KICK_MEMBERS",
          "4": "BAN_MEMBERS",
          "8": "ADMINISTRATOR",
          "16": "MANAGE_CHANNELS",
          "32": "MANAGE_GUILD",
          "64": "ADD_REACTIONS",
          "128": "VIEW_AUDIT_LOG",
          "256": "PRIORITY_SPEAKER",
          "1024": "VIEW_CHANNEL"
        }, _defineProperty(_perms, "1024", "READ_MESSAGES"), _defineProperty(_perms, "2048", "SEND_MESSAGES"), _defineProperty(_perms, "4096", "SEND_TTS_MESSAGES"), _defineProperty(_perms, "8192", "MANAGE_MESSAGES"), _defineProperty(_perms, "16384", "EMBED_LINKS"), _defineProperty(_perms, "32768", "ATTACH_FILES"), _defineProperty(_perms, "65536", "READ_MESSAGE_HISTORY"), _defineProperty(_perms, "131072", "MENTION_EVERYONE"), _defineProperty(_perms, "262144", "EXTERNAL_EMOJIS"), _defineProperty(_perms, "262144", "USE_EXTERNAL_EMOJIS"), _defineProperty(_perms, "1048576", "CONNECT"), _defineProperty(_perms, "2097152", "SPEAK"), _defineProperty(_perms, "4194304", "MUTE_MEMBERS"), _defineProperty(_perms, "8388608", "DEAFEN_MEMBERS"), _defineProperty(_perms, "16777216", "MOVE_MEMBERS"), _defineProperty(_perms, "33554432", "USE_VAD"), _defineProperty(_perms, "67108864", "CHANGE_NICKNAME"), _defineProperty(_perms, "134217728", "MANAGE_NICKNAMES"), _defineProperty(_perms, "268435456", "MANAGE_ROLES"), _defineProperty(_perms, "268435456", "MANAGE_ROLES_OR_PERMISSIONS"), _defineProperty(_perms, "536870912", "MANAGE_WEBHOOKS"), _defineProperty(_perms, "1073741824 ", "MANAGE_EMOJIS"), _defineProperty(_perms, "CREATE_INSTANT_INVITE", "CREATE_INSTANT_INVITE"), _defineProperty(_perms, "KICK_MEMBERS", "KICK_MEMBERS"), _defineProperty(_perms, "BAN_MEMBERS", "BAN_MEMBERS"), _defineProperty(_perms, "ADMINISTRATOR", "ADMINISTRATOR"), _defineProperty(_perms, "MANAGE_CHANNELS", "MANAGE_CHANNELS"), _defineProperty(_perms, "MANAGE_GUILD", "MANAGE_GUILD"), _defineProperty(_perms, "ADD_REACTIONS", "ADD_REACTIONS"), _defineProperty(_perms, "VIEW_AUDIT_LOG", "VIEW_AUDIT_LOG"), _defineProperty(_perms, "PRIORITY_SPEAKER", "PRIORITY_SPEAKER"), _defineProperty(_perms, "VIEW_CHANNEL", "VIEW_CHANNEL"), _defineProperty(_perms, "READ_MESSAGES", "READ_MESSAGES"), _defineProperty(_perms, "SEND_MESSAGES", "SEND_MESSAGES"), _defineProperty(_perms, "SEND_TTS_MESSAGES", "SEND_TTS_MESSAGES"), _defineProperty(_perms, "MANAGE_MESSAGES", "MANAGE_MESSAGES"), _defineProperty(_perms, "EMBED_LINKS", "EMBED_LINKS"), _defineProperty(_perms, "ATTACH_FILES", "ATTACH_FILES"), _defineProperty(_perms, "READ_MESSAGE_HISTORY", "READ_MESSAGE_HISTORY"), _defineProperty(_perms, "MENTION_EVERYONE", "MENTION_EVERYONE"), _defineProperty(_perms, "EXTERNAL_EMOJIS", "EXTERNAL_EMOJIS"), _defineProperty(_perms, "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_EMOJIS"), _defineProperty(_perms, "CONNECT", "CONNECT"), _defineProperty(_perms, "SPEAK", "SPEAK"), _defineProperty(_perms, "MUTE_MEMBERS", "MUTE_MEMBERS"), _defineProperty(_perms, "DEAFEN_MEMBERS", "DEAFEN_MEMBERS"), _defineProperty(_perms, "MOVE_MEMBERS", "MOVE_MEMBERS"), _defineProperty(_perms, "USE_VAD", "USE_VAD"), _defineProperty(_perms, "CHANGE_NICKNAME", "CHANGE_NICKNAME"), _defineProperty(_perms, "MANAGE_NICKNAMES", "MANAGE_NICKNAMES"), _defineProperty(_perms, "MANAGE_ROLES", "MANAGE_ROLES"), _defineProperty(_perms, "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_ROLES_OR_PERMISSIONS"), _defineProperty(_perms, "MANAGE_WEBHOOKS", "MANAGE_WEBHOOKS"), _defineProperty(_perms, "MANAGE_EMOJIS", "MANAGE_EMOJIS"), _perms);

        if (oldRole.name !== newRole.name) {
          send_log(c, oldRole.guild, "ORANGE", "ROLE NAME CHANGED", "__ROLE: ".concat(oldRole, "__ \n\n**Before:** `").concat(oldRole.name, "`\n**After:** `").concat(newRole.name, "`\n**Role ID:** `").concat(newRole.id, "`\n"));
        } else if (oldRole.color !== newRole.color) {
          send_log(c, oldRole.guild, "ORANGE", "ROLE COLOR CHANGED", "__ROLE: ".concat(newRole, "__ \n\n**Before:** `").concat(oldRole.color.toString(16), "`\n            **After:** `").concat(newRole.color.toString(16), "`\n            **ROLE ID:** `").concat(newRole.id, "`"));
        } else {
          /*send_log(c,
            oldRole.guild,
            "RED",
            "ROLE PERMISSIONS CHANGED",
            `__ROLE: ${newRole}__ \n
          **THE PERMISSIONS CHANGED PLEASE CHECK!!!**
          OLD PERMISSIONS: ${oldRole.permissions.bitfield}
          NEW PERMISSIONS: ${newRole.permissions.bitfield}
          **Role ID:** \`${newRole.id}\``)*/
        }
      } catch (_unused19) {}
    });
    c.on("userUpdate", function (oldUser, newUser) {
      try {
        if (oldUser.username !== newUser.username) {
          send_log(newUser.guild, c, "BLACK", "Member Username Changed", "Member: ".concat(newUser, "\nOld Username: `").concat(oldUser.username, "`\nNew Username: `").concat(newUser.username, "` "));
        }
      } catch (_unused20) {}
    });
  } catch (e) {}
};

function send_log(c, guild, color, title, description, thumb) {
  var createandsavewebhook, LogEmbed, loggersettings, logger, hook;
  return regeneratorRuntime.async(function send_log$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          createandsavewebhook = function createandsavewebhook() {
            /*
             * Create a new webhook
             * The Webhooks ID and token can be found in the URL, when you request that URL, or in the response body.
             * https://discord.com/api/webhooks/12345678910/T0kEn0fw3Bh00K
             *                                  ^^^^^^^^^^  ^^^^^^^^^^^^
             *                                  Webhook ID  Webhook Token
             */

            /*
              logger: {
                "channel": "no",
                "webhook_id": "",
                "webhook_token": ""
              },
               */
            c.settings.get(guild.id, "logger");
            logger.createWebhook(guild.name, {
              avatar: guild.iconURL({
                format: "png"
              })
            }).then(function (webhook) {
              webhook.send({
                username: guild.name,
                avatarURL: guild.iconURL({
                  format: "png"
                }),
                embeds: [LogEmbed]
              })["catch"](function (e) {
                return console.log("This is to prevent a crash");
              });

              try {
                c.settings.set(guild.id, webhook.id, "logger.webhook_id");
                c.settings.set(guild.id, webhook.token, "logger.webhook_token");
              } catch (e) {}
            });
          };

          //CREATE THE EMBED
          LogEmbed = new Discord.MessageEmbed().setColor(color ? color : "BLACK").setDescription(description ? description.substr(0, 2048) : "\u200B").setTitle(title ? title.substr(0, 256) : "\u200B").setTimestamp().setThumbnail(thumb ? thumb : guild.iconURL({
            format: "png"
          })).setFooter(guild.name + " | powered by: Limsathya", guild.iconURL({
            format: "png"
          })); //GET THE CHANNEL

          loggersettings = c.settings.get(guild.id, "logger");

          if (!(loggersettings.channel === "no")) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(c.channels.fetch(loggersettings.channel));

        case 8:
          logger = _context.sent;

          if (logger) {
            _context.next = 11;
            break;
          }

          throw new SyntaxError("CHANNEL NOT FOUND");

        case 11:
          _context.prev = 11;

          if (loggersettings.webhook_id) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", createandsavewebhook());

        case 14:
          _context.prev = 14;
          hook = new Discord.WebhookClient(loggersettings.webhook_id, loggersettings.webhook_token);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](14);
          return _context.abrupt("return", createandsavewebhook());

        case 21:
          if (hook) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", createandsavewebhook());

        case 23:
          hook.send({
            username: guild.name,
            avatarURL: guild.iconURL({
              format: "png"
            }),
            embeds: [LogEmbed]
          })["catch"](function (e) {
            return createandsavewebhook();
          });
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](11);
          return _context.abrupt("return", createandsavewebhook());

        case 29:
          _context.next = 33;
          break;

        case 31:
          _context.prev = 31;
          _context.t2 = _context["catch"](0);

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 31], [11, 26], [14, 18]]);
}