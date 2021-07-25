"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    Collection = _require.Collection;

var config = require(".config.json");

var kernelsettings = require("../base-system/settings.json");

var ee = require("../base-system/embed.json");

var _require2 = require("../handlers/functions"),
    databasing = _require2.databasing,
    check_voice_channels = _require2.check_voice_channels,
    check_created_voice_channels = _require2.check_created_voice_channels,
    create_join_to_create_Channel = _require2.create_join_to_create_Channel;

var CronJob = require('cron').CronJob;

module.exports = function (client) {
  client.JobJointocreate = new CronJob('0 * * * * *', function () {
    check_voice_channels(client);
  }, null, true, 'America/Los_Angeles');
  client.JobJointocreate2 = new CronJob('0 * * * * *', function () {
    check_created_voice_channels(client);
  }, null, true, 'America/Los_Angeles');
  client.on("ready", function () {
    check_voice_channels(client);
    check_created_voice_channels(client);
    client.JobJointocreate.start();
    client.JobJointocreate2.start();
    console.log("JOBS STARTED etc.");
  }); //voice state update event to check joining/leaving channels

  client.on("voiceStateUpdate", function (oldState, newState) {
    //LOGS FOR EVERYTHING EXCEPT JOINING / LEAVING / SWITCHING
    if (kernelsettings.voice_log_console) {
      if (!oldState.streaming && newState.streaming) return; //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming" : "not streaming"}`.gray);

      if (oldState.streaming && !newState.streaming) return; //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming)" : "not streaming)"}`.gray);

      if (!oldState.serverDeaf && newState.serverDeaf) return; //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`.gray);

      if (oldState.serverDeaf && !newState.serverDeaf) return; //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`.gray);

      if (!oldState.serverMute && newState.serverMute) return; //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`.gray);

      if (oldState.serverMute && !newState.serverMute) return; //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`.gray);

      if (!oldState.selfDeaf && newState.selfDeaf) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`.gray);

      if (oldState.selfDeaf && !newState.selfDeaf) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`.gray);

      if (!oldState.selfMute && newState.selfMute) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`.gray);

      if (oldState.selfMute && !newState.selfMute) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`.gray);

      if (oldState.sessionID != newState.sessionID) //console.log(`${newState.member.user.tag} sessionID Is now on: ${newState.sessionID}`.gray);
        if (!oldState.selfVideo && newState.selfVideo) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`.gray);

      if (oldState.selfVideo && !newState.selfVideo) return; //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`.gray);
    } // JOINED A CHANNEL


    if (!oldState.channelID && newState.channelID) {
      client.jtcsettings.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: newState.guild.id
      });
      client.jtcsettings2.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: newState.guild.id
      });
      client.jtcsettings3.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: newState.guild.id
      });
      var channels = [];
      channels.push(client.jtcsettings.get(newState.guild.id, "channel"));
      channels.push(client.jtcsettings2.get(newState.guild.id, "channel"));
      channels.push(client.jtcsettings3.get(newState.guild.id, "channel"));

      for (var i = 0; i < channels.length; i++) {
        if (channels[i].length > 0 && channels[i] == newState.channelID) {
          create_join_to_create_Channel(client, newState, i + 1);
          break;
        }
      }

      return;
    } // LEFT A CHANNEL


    if (oldState.channelID && !newState.channelID) {
      client.jtcsettings.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: oldState.guild.id
      });
      client.jtcsettings2.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: oldState.guild.id
      });
      client.jtcsettings3.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: oldState.guild.id
      });
      client.jointocreatemap.ensure("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID), false);

      if (client.jointocreatemap.get("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID))) {
        //CHANNEL DELETE CHECK
        var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID)));

        if (vc.members.size < 1) {
          client.jointocreatemap["delete"]("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID));
          client.jointocreatemap["delete"]("owner_".concat(vc.guild.id, "_").concat(vc.id));
          return vc["delete"]()["catch"](function (e) {
            return console.log("Couldn't delete room");
          });
        } else {
          var perms = vc.permissionOverwrites.map(function (c) {
            return c;
          });
          var owner = false;

          for (var _i = 0; _i < perms.length; _i++) {
            if (perms[_i].allow.toArray().includes("MANAGE_CHANNELS") && perms[_i].id == oldState.member.user.id) owner = true;
          } //if owner left, then pick a random user


          if (owner) {
            var members = vc.members.map(function (member) {
              return member.id;
            });
            var randommemberid = members[Math.floor(Math.random() * members.length)];
            vc.updateOverwrite(randommemberid, {
              CONNECT: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              MANAGE_ROLES: true
            })["catch"](function (e) {
              return console.log(e.message);
            });
            vc.updateOverwrite(oldState.member.user.id, {
              CONNECT: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              MANAGE_ROLES: false
            })["catch"](function (e) {
              return console.log(e.message);
            });

            try {
              var es = client.settings.get(vc.guild.id, "embed");
              client.users.fetch(randommemberid).then(function (user) {
                user.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("The Owner of `".concat(vc.name, "` left, you are now the new one!")).setDescription("You now have access to all `".concat(client.settings.get(vc.guild.id, "prefix"), "voice` Commands!")));
              });
            } catch (_unused) {
              /* */
            }
          }
        }
      }
    } // Switch A CHANNEL


    if (oldState.channelID && newState.channelID) {
      client.jtcsettings.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: newState.guild.id
      });
      client.jtcsettings2.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: newState.guild.id
      });
      client.jtcsettings3.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: newState.guild.id
      });

      if (oldState.channelID !== newState.channelID) {
        var _channels = [];

        _channels.push(client.jtcsettings.get(newState.guild.id, "channel"));

        _channels.push(client.jtcsettings2.get(newState.guild.id, "channel"));

        _channels.push(client.jtcsettings3.get(newState.guild.id, "channel"));

        for (var _i2 = 0; _i2 < _channels.length; _i2++) {
          if (_channels[_i2].length > 2 && _channels[_i2] == newState.channelID) {
            create_join_to_create_Channel(client, newState, _i2 + 1);
            break;
          }
        } //ENSURE THE DB


        client.jointocreatemap.ensure("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID), false); //IF STATEMENT

        if (client.jointocreatemap.get("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID))) {
          var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID)));

          if (vc.members.size < 1) {
            client.jointocreatemap["delete"]("tempvoicechannel_".concat(oldState.guild.id, "_").concat(oldState.channelID));
            client.jointocreatemap["delete"]("owner_".concat(vc.guild.id, "_").concat(vc.id));
            return vc["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete room");
            });
          } else {
            /* */
          }
        }
      }
    }
  });
};