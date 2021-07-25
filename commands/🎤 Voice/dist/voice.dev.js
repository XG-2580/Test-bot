"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

module.exports = {
  name: "voice",
  category: "🎤 Voice",
  aliases: [""],
  cooldown: 5,
  usage: "`voice <CMD_TYPE> [Options]`\n\nValid CMD_TYPES: `lock`, `invite`, `add`, `kick`, `unlock`, `ban`, `unban`, `trust`, `untrust`, `limit`, `bitrate`, `promote`",
  description: "The Voice Commands are there for the JOIN TO CREATE COMMANDS, use them to adjust your hosted channel!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, newargs, _args, cmd, channel, vc, perms, owner, i, _channel, _perms, _owner, _i, _channel2, _perms2, _owner2, _i2, member, _channel3, _perms3, _owner3, _i3, _member, txt, _channel4, _perms4, _owner4, _i4, _member2, _channel5, _perms5, _owner5, _i5, _member3, _channel6, _perms6, _owner6, _i6, _member4, _channel7, _perms7, _owner7, _i7, _member5, _channel8, _perms8, _owner8, _i8, userlimit, _channel9, _perms9, _owner9, _i9, maxbitrate, boosts, _userlimit, _channel10, _perms10, _owner10, _i10, _member6;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "VOICE")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            newargs = message.content.slice(prefix.length).split(/ +/).slice(1);
            _args = newargs;
            cmd = _args.shift().toLowerCase();

            if (!(cmd === "lock")) {
              _context.next = 27;
              break;
            }

            channel = message.member.voice.channel;

            if (channel) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 11:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(channel.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(channel.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(channel.id))) {
              _context.next = 24;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(channel.id)));
            perms = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            owner = false;

            for (i = 0; i < perms.length; i++) {
              if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(channel.id)) === message.author.id) owner = true;

            if (owner) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 21:
            vc.overwritePermissions([{
              id: message.guild.id,
              allow: ['VIEW_CHANNEL'],
              deny: ['CONNECT']
            }]).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("✅ LOCKED your Channel!").setDescription("Noone can join anymore!").setFooter(es.footertext, es.footericon));
            });
            _context.next = 25;
            break;

          case 24:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 25:
            _context.next = 311;
            break;

          case 27:
            if (!(cmd === "unlock")) {
              _context.next = 47;
              break;
            }

            _channel = message.member.voice.channel;

            if (_channel) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 31:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel.id))) {
              _context.next = 44;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel.id)));
            _perms = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner = false;

            for (_i = 0; _i < _perms.length; _i++) {
              if (_perms[_i].id === message.author.id && _perms[_i].allow.toArray().includes("MANAGE_CHANNELS")) _owner = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel.id)) === message.author.id) _owner = true;

            if (_owner) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 41:
            vc.updateOverwrite(message.guild.id, {
              VIEW_CHANNEL: true,
              CONNECT: true
            }).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("✅ UNLOCKED your Channel!").setDescription("Everyone can join now!").setFooter(es.footertext, es.footericon));
            });
            _context.next = 45;
            break;

          case 44:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 45:
            _context.next = 311;
            break;

          case 47:
            if (!(cmd === "kick")) {
              _context.next = 83;
              break;
            }

            _channel2 = message.member.voice.channel;

            if (_channel2) {
              _context.next = 51;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 51:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel2.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel2.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel2.id))) {
              _context.next = 80;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel2.id)));
            _perms2 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner2 = false;

            for (_i2 = 0; _i2 < _perms2.length; _i2++) {
              if (_perms2[_i2].id === message.author.id && _perms2[_i2].allow.toArray().includes("MANAGE_CHANNELS")) _owner2 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel2.id)) === message.author.id) _owner2 = true;

            if (_owner2) {
              _context.next = 61;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 61:
            if (_args[0]) {
              _context.next = 63;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "kick @User`")).setFooter(es.footertext, es.footericon)));

          case 63:
            member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!member || member == null || member == undefined)) {
              _context.next = 66;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "kick @User`")).setFooter(es.footertext, es.footericon)));

          case 66:
            if (member.voice.channel) {
              _context.next = 68;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Your pinged user, is not connected to a Channel").setFooter(es.footertext, es.footericon)));

          case 68:
            if (!(member.voice.channel.id != _channel2.id)) {
              _context.next = 70;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Your pinged user, is not connected in your Channel").setFooter(es.footertext, es.footericon)));

          case 70:
            _context.prev = 70;
            member.voice.kick();
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Kicked ".concat(member.user.tag, " out of your Channel")).setFooter(es.footertext, es.footericon)));

          case 75:
            _context.prev = 75;
            _context.t0 = _context["catch"](70);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("An Error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 78:
            _context.next = 81;
            break;

          case 80:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 81:
            _context.next = 311;
            break;

          case 83:
            if (!["invite", "add"].includes(cmd)) {
              _context.next = 115;
              break;
            }

            _channel3 = message.member.voice.channel;

            if (_channel3) {
              _context.next = 87;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 87:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel3.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel3.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel3.id))) {
              _context.next = 112;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel3.id)));
            _perms3 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner3 = false;

            for (_i3 = 0; _i3 < _perms3.length; _i3++) {
              if (_perms3[_i3].id === message.author.id && _perms3[_i3].allow.toArray().includes("MANAGE_CHANNELS")) _owner3 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel3.id)) === message.author.id) _owner3 = true;

            if (_owner3) {
              _context.next = 97;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 97:
            if (_args[0]) {
              _context.next = 99;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "invite @User [optional Message]`")).setFooter(es.footertext, es.footericon)));

          case 99:
            _member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member || _member == null || _member == undefined)) {
              _context.next = 102;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "invite @User [optional Message]`")).setFooter(es.footertext, es.footericon)));

          case 102:
            txt = _args.slice(1).join(" ");
            _context.prev = 103;

            _channel3.createInvite().then(function (invite) {
              vc.updateOverwrite(_member.user.id, {
                VIEW_CHANNEL: true,
                CONNECT: true
              }).then(function (lol) {
                vc.updateOverwrite(message.author.id, {
                  MANAGE_CHANNELS: true,
                  VIEW_CHANNEL: true,
                  MANAGE_ROLES: true,
                  CONNECT: true
                });

                _member.user.send(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("You got invited to join ".concat(message.author.tag, "'s Voice Channel")).setDescription("[Click here](".concat(invite.url, ") to join **").concat(_channel3.name, "**\n\n").concat(txt ? txt : "").substr(0, 2000)).setFooter(es.footertext, es.footericon))["catch"](function (e) {
                  return message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Error | Couldn't Dm `".concat(_member.user.tag, "`")).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                });
              });
              return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Invited ".concat(_member.user.tag, " to your Channel")).setFooter(es.footertext, es.footericon));
            });

            _context.next = 110;
            break;

          case 107:
            _context.prev = 107;
            _context.t1 = _context["catch"](103);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("An Error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 110:
            _context.next = 113;
            break;

          case 112:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 113:
            _context.next = 311;
            break;

          case 115:
            if (!(cmd === "ban")) {
              _context.next = 141;
              break;
            }

            _channel4 = message.member.voice.channel;

            if (_channel4) {
              _context.next = 119;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 119:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel4.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel4.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel4.id))) {
              _context.next = 138;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel4.id)));
            _perms4 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner4 = false;

            for (_i4 = 0; _i4 < _perms4.length; _i4++) {
              if (_perms4[_i4].id === message.author.id && _perms4[_i4].allow.toArray().includes("MANAGE_CHANNELS")) _owner4 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel4.id)) === message.author.id) _owner4 = true;

            if (_owner4) {
              _context.next = 129;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 129:
            if (_args[0]) {
              _context.next = 131;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "ban @User`")).setFooter(es.footertext, es.footericon)));

          case 131:
            _member2 = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member2 || _member2 == null || _member2 == undefined)) {
              _context.next = 134;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "ban @User`")).setFooter(es.footertext, es.footericon)));

          case 134:
            if (_member2.voice.channel && _member2.voice.channel.id == _channel4.id) try {
              _member2.voice.kick();

              message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Disconnected ".concat(_member2.user.tag, " out of your Channel")).setFooter(es.footertext, es.footericon));
            } catch (e) {
              message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("An Error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
            }
            vc.updateOverwrite(_member2.user.id, {
              VIEW_CHANNEL: true,
              CONNECT: false
            }).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Banned ".concat(_member2.user.tag, " out from your Channel!")).setFooter(es.footertext, es.footericon));
            });
            _context.next = 139;
            break;

          case 138:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 139:
            _context.next = 311;
            break;

          case 141:
            if (!(cmd === "unban")) {
              _context.next = 166;
              break;
            }

            _channel5 = message.member.voice.channel;

            if (_channel5) {
              _context.next = 145;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 145:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel5.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel5.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel5.id))) {
              _context.next = 163;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel5.id)));
            _perms5 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner5 = false;

            for (_i5 = 0; _i5 < _perms5.length; _i5++) {
              if (_perms5[_i5].id === message.author.id && _perms5[_i5].allow.toArray().includes("MANAGE_CHANNELS")) _owner5 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel5.id)) === message.author.id) _owner5 = true;

            if (_owner5) {
              _context.next = 155;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 155:
            if (_args[0]) {
              _context.next = 157;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "unban @User`")).setFooter(es.footertext, es.footericon)));

          case 157:
            _member3 = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member3 || _member3 == null || _member3 == undefined)) {
              _context.next = 160;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "unban @User`")).setFooter(es.footertext, es.footericon)));

          case 160:
            vc.updateOverwrite(_member3.user.id, {
              VIEW_CHANNEL: true,
              CONNECT: true
            }).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Unbanned ".concat(_member3.user.tag, " from your Channel!")).setDescription("He can now join your Channel again!").setFooter(es.footertext, es.footericon));
            });
            _context.next = 164;
            break;

          case 163:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 164:
            _context.next = 311;
            break;

          case 166:
            if (!(cmd === "trust")) {
              _context.next = 191;
              break;
            }

            _channel6 = message.member.voice.channel;

            if (_channel6) {
              _context.next = 170;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 170:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel6.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel6.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel6.id))) {
              _context.next = 188;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel6.id)));
            _perms6 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner6 = false;

            for (_i6 = 0; _i6 < _perms6.length; _i6++) {
              if (_perms6[_i6].id === message.author.id && _perms6[_i6].allow.toArray().includes("MANAGE_CHANNELS")) _owner6 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel6.id)) === message.author.id) _owner6 = true;

            if (_owner6) {
              _context.next = 180;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 180:
            if (_args[0]) {
              _context.next = 182;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "trust @User`")).setFooter(es.footertext, es.footericon)));

          case 182:
            _member4 = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member4 || _member4 == null || _member4 == undefined)) {
              _context.next = 185;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "trust @User`")).setFooter(es.footertext, es.footericon)));

          case 185:
            vc.updateOverwrite(_member4.user.id, {
              VIEW_CHANNEL: true,
              CONNECT: true
            }).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Trusted ".concat(_member4.user.tag, " to your Channel!")).setDescription("He can now join your Channel!").setFooter(es.footertext, es.footericon));
            });
            _context.next = 189;
            break;

          case 188:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 189:
            _context.next = 311;
            break;

          case 191:
            if (!(cmd === "untrust")) {
              _context.next = 216;
              break;
            }

            _channel7 = message.member.voice.channel;

            if (_channel7) {
              _context.next = 195;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 195:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel7.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel7.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel7.id))) {
              _context.next = 213;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel7.id)));
            _perms7 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner7 = false;

            for (_i7 = 0; _i7 < _perms7.length; _i7++) {
              if (_perms7[_i7].id === message.author.id && _perms7[_i7].allow.toArray().includes("MANAGE_CHANNELS")) _owner7 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel7.id)) === message.author.id) _owner7 = true;

            if (_owner7) {
              _context.next = 205;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 205:
            if (_args[0]) {
              _context.next = 207;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "untrust @User`")).setFooter(es.footertext, es.footericon)));

          case 207:
            _member5 = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member5 || _member5 == null || _member5 == undefined)) {
              _context.next = 210;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "untrust @User`")).setFooter(es.footertext, es.footericon)));

          case 210:
            vc.updateOverwrite(_member5.user.id, {
              VIEW_CHANNEL: true,
              CONNECT: false
            }).then(function (lol) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              });
              message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Untrusted ".concat(_member5.user.tag, " from your Channel!")).setDescription("He can now no longer join your Channel!").setFooter(es.footertext, es.footericon));
            });
            _context.next = 214;
            break;

          case 213:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 214:
            _context.next = 311;
            break;

          case 216:
            if (!(cmd === "limit")) {
              _context.next = 243;
              break;
            }

            _channel8 = message.member.voice.channel;

            if (_channel8) {
              _context.next = 220;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 220:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel8.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel8.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel8.id))) {
              _context.next = 240;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel8.id)));
            _perms8 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner8 = false;

            for (_i8 = 0; _i8 < _perms8.length; _i8++) {
              if (_perms8[_i8].id === message.author.id && _perms8[_i8].allow.toArray().includes("MANAGE_CHANNELS")) _owner8 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel8.id)) === message.author.id) _owner8 = true;

            if (_owner8) {
              _context.next = 230;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 230:
            if (_args[0]) {
              _context.next = 232;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You have to include the limit you want to set to")));

          case 232:
            if (!isNaN(_args[0])) {
              _context.next = 234;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You have to include the limit you want to set to | It MUST be a **Numer**")));

          case 234:
            userlimit = Number(_args[0]);

            if (!(userlimit > 99 || userlimit < 0)) {
              _context.next = 237;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your included Number is not in the valid Range (`0` - `99`)")));

          case 237:
            _channel8.setUserLimit(userlimit).then(function (vc) {
              return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Set User-limit to `".concat(vc.userLimit, "`")).setFooter(es.footertext, es.footericon));
            });

            _context.next = 241;
            break;

          case 240:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 241:
            _context.next = 311;
            break;

          case 243:
            if (!(cmd === "bitrate")) {
              _context.next = 275;
              break;
            }

            _channel9 = message.member.voice.channel;

            if (_channel9) {
              _context.next = 247;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 247:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel9.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel9.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel9.id))) {
              _context.next = 272;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel9.id)));
            _perms9 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner9 = false;

            for (_i9 = 0; _i9 < _perms9.length; _i9++) {
              if (_perms9[_i9].id === message.author.id && _perms9[_i9].allow.toArray().includes("MANAGE_CHANNELS")) _owner9 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel9.id)) === message.author.id) _owner9 = true;

            if (_owner9) {
              _context.next = 257;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 257:
            if (_args[0]) {
              _context.next = 259;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You have to include the limit you want to set to")));

          case 259:
            if (!isNaN(_args[0])) {
              _context.next = 261;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You have to include the limit you want to set to | It MUST be a **Numer**")));

          case 261:
            maxbitrate = 96000;
            boosts = message.guild.premiumSubscriptionCount;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            _userlimit = Number(_args[0]);

            if (!(_userlimit > maxbitrate || _userlimit < 8000)) {
              _context.next = 269;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your included Number is not in the valid Range (`8000` - `".concat(maxbitrate, "`)"))));

          case 269:
            _channel9.setBitrate(_userlimit).then(function (vc) {
              return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Set the Bitrate to `".concat(vc.bitrate, "`")).setFooter(es.footertext, es.footericon));
            });

            _context.next = 273;
            break;

          case 272:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 273:
            _context.next = 311;
            break;

          case 275:
            if (!(cmd === "promote")) {
              _context.next = 310;
              break;
            }

            _channel10 = message.member.voice.channel;

            if (_channel10) {
              _context.next = 279;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a VoiceChannel, for this Command").setFooter(es.footertext, es.footericon)));

          case 279:
            client.jointocreatemap.ensure("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel10.id), false);
            client.jointocreatemap.ensure("owner_".concat(message.guild.id, "_").concat(_channel10.id), false);

            if (!client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel10.id))) {
              _context.next = 307;
              break;
            }

            vc = message.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(message.guild.id, "_").concat(_channel10.id)));
            _perms10 = vc.permissionOverwrites.map(function (c) {
              return c;
            });
            _owner10 = false;

            for (_i10 = 0; _i10 < _perms10.length; _i10++) {
              if (_perms10[_i10].id === message.author.id && _perms10[_i10].allow.toArray().includes("MANAGE_CHANNELS")) _owner10 = true;
            }

            if (client.jointocreatemap.get("owner_".concat(message.guild.id, "_").concat(_channel10.id)) === message.author.id) _owner10 = true;

            if (_owner10) {
              _context.next = 289;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be the Owner of the **temp.** VoiceChannel!").setFooter(es.footertext, es.footericon)));

          case 289:
            if (_args[0]) {
              _context.next = 291;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "promote @User`")).setFooter(es.footertext, es.footericon)));

          case 291:
            _member6 = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first() || message.guild.members.cache.get(_args[0]);

            if (!(!_member6 || _member6 == null || _member6 == undefined)) {
              _context.next = 294;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Please add a User via Ping / ID!").setDescription("Useage: `".concat(prefix, "promote @User`")).setFooter(es.footertext, es.footericon)));

          case 294:
            if (_member6.voice.channel) {
              _context.next = 296;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Your pinged user, is not connected to a Channel").setFooter(es.footertext, es.footericon)));

          case 296:
            if (!(_member6.voice.channel.id != _channel10.id)) {
              _context.next = 298;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("Your pinged user, is not connected in your Channel").setFooter(es.footertext, es.footericon)));

          case 298:
            _context.prev = 298;
            vc.updateOverwrite(_member6.user.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            }).then(function (l) {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: false,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: false,
                CONNECT: true
              }).then(function (lol) {
                client.jointocreatemap.set("owner_".concat(vc.guild.id, "_").concat(vc.id), _member6.user.id);
                return message.reply(new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2705 Promoted ".concat(_member6.user.tag, " to the new Owner of your Channel\nRemoved your permissions!")).setFooter(es.footertext, es.footericon));
              });
            });
            _context.next = 305;
            break;

          case 302:
            _context.prev = 302;
            _context.t2 = _context["catch"](298);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("An Error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 305:
            _context.next = 308;
            break;

          case 307:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setColor(es.wrongcolor).setTitle("You have to be in a **temp.** VoiceChannel, for this Command!").setFooter(es.footertext, es.footericon)));

          case 308:
            _context.next = 311;
            break;

          case 310:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Please add a VALID TYPE").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Useage: `".concat(prefix, "voice <CMD_TYPE> [Options]`\nValid CMD_TYPES: `lock`,`invite`,`add`,`kick`,`unlock`,`ban`,`unban`,`trust`,`untrust`,`limit`,`bitrate`,`promote`")).setFooter(es.footertext, es.footericon)));

          case 311:
            _context.next = 317;
            break;

          case 313:
            _context.prev = 313;
            _context.t3 = _context["catch"](3);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t3.stack, "```"))));

          case 317:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 313], [70, 75], [103, 107], [298, 302]]);
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