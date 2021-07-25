"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require('moment');

var _require2 = require("../../handlers/functions"),
    GetUser = _require2.GetUser,
    GetGlobalUser = _require2.GetGlobalUser;

var flags = {
  DISCORD_EMPLOYEE: 'Discord Employee',
  DISCORD_PARTNER: 'Discord Partner',
  BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
  BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
  HYPESQUAD_EVENTS: 'HypeSquad Events',
  HOUSE_BRAVERY: 'House of Bravery',
  HOUSE_BRILLIANCE: 'House of Brilliance',
  HOUSE_BALANCE: 'House of Balance',
  EARLY_SUPPORTER: 'Early Supporter',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: 'Verified Bot',
  VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

function trimArray(arr) {
  var maxLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;

  if (arr.array().length > maxLen) {
    var len = arr.array().length - maxLen;
    arr = arr.array().sort(function (a, b) {
      return b.rawPosition - a.rawPosition;
    }).slice(0, maxLen);
    arr.map(function (role) {
      return "<@&".concat(role.id, ">");
    });
    arr.push("".concat(len, " more..."));
  }

  return arr.join(", ");
}

var statuses = {
  "online": "🟢",
  "idle": "🟠",
  "dnd": "🔴",
  "offline": "⚫️"
};
module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER] [global/guild]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user, member, roles, userFlags, activity, embeduserinfo, userstatus, _emoji, _userFlags, _activity, _embeduserinfo, _emoji2;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (!args[0]) {
              _context.next = 23;
              break;
            }

            _context.prev = 3;

            if (!(args[1] && args[1].toLowerCase() == "global")) {
              _context.next = 11;
              break;
            }

            args.pop();
            _context.next = 8;
            return regeneratorRuntime.awrap(GetGlobalUser(message, args));

          case 8:
            user = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(GetUser(message, args));

          case 13:
            user = _context.sent;

          case 14:
            _context.next = 21;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);

            if (_context.t0) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", message.reply("UNABLE TO FIND THE USER"));

          case 20:
            return _context.abrupt("return", message.reply(_context.t0));

          case 21:
            _context.next = 24;
            break;

          case 23:
            user = message.author;

          case 24:
            if (!(!user || user == null || user.id == null || !user.id)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", message.reply("Could Not Find The USER"));

          case 26:
            try {
              member = message.guild.members.cache.get(user.id);
              roles = member.roles;
              userFlags = member.user.flags.toArray();
              activity = member.user.presence.activities[0]; //create the EMBED

              embeduserinfo = new MessageEmbed();
              embeduserinfo.setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 512
              }));
              embeduserinfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({
                dynamic: true
              }), "https://discord.gg/sakshyam");
              embeduserinfo.addField('**<:dot:863291467879153716> Username:**', "<@".concat(member.user.id, ">\n`").concat(member.user.tag, "`"), true);
              embeduserinfo.addField('**<:dot:863291467879153716> ID:**', "`".concat(member.id, "`"), true);
              embeduserinfo.addField('**<:dot:863291467879153716> Avatar:**', "[`Link to avatar`](".concat(member.user.displayAvatarURL({
                format: "png"
              }), ")"), true);
              embeduserinfo.addField('**<:dot:863291467879153716> Date Join DC:**', "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true);
              embeduserinfo.addField('**<:dot:863291467879153716> Date Join Guild:**', "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", true);
              embeduserinfo.addField('**<:dot:863291467879153716> Flags:**', "`".concat(userFlags.length ? userFlags.map(function (flag) {
                return flags[flag];
              }).join(', ') : 'None', "`"), true);
              embeduserinfo.addField('**<:dot:863291467879153716> Status:**', "`".concat(statuses[member.user.presence.status], " ").concat(member.user.presence.status, "`"), true);
              embeduserinfo.addField('**<:dot:863291467879153716> Highest Role:**', "".concat(member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest), true);
              embeduserinfo.addField('**<:dot:863291467879153716> Is a Bot:**', "`".concat(member.user.bot ? "✔️" : "❌", "`"), true);
              userstatus = "Not Having An Activity";

              if (activity) {
                if (activity.type === "CUSTOM_STATUS") {
                  _emoji = "".concat(activity.emoji ? activity.emoji.id ? "<".concat(activity.emoji.animated ? "a" : "", ":").concat(activity.emoji.name, ":").concat(activity.emoji.id, ">") : activity.emoji.name : "");
                  userstatus = "".concat(_emoji, " `").concat(activity.state || 'Not Having An Acitivty.', "`");
                } else {
                  userstatus = "`".concat(activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1), " ").concat(activity.name, "`");
                }
              }

              embeduserinfo.addField('**<:dot:863291467879153716> Activity:**', "".concat(userstatus));
              embeduserinfo.addField('**<:dot:863291467879153716> Permissions:**', "".concat(message.member.permissions.toArray().map(function (p) {
                return "`".concat(p, "`");
              }).join(", ")));
              embeduserinfo.addField("<:dot:863291467879153716> [".concat(roles.cache.size, "] Roles: "), roles.cache.size < 25 ? roles.cache.array().sort(function (a, b) {
                return b.rawPosition - a.rawPosition;
              }).map(function (role) {
                return "<@&".concat(role.id, ">");
              }).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None');
              embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
              embeduserinfo.setFooter(es.footertext, es.footericon); //send the EMBED

              message.channel.send(embeduserinfo);
            } catch (_unused) {
              _userFlags = user.flags.toArray();
              _activity = user.presence.activities[0]; //create the EMBED

              _embeduserinfo = new MessageEmbed();

              _embeduserinfo.setThumbnail(user.displayAvatarURL({
                dynamic: true,
                size: 512
              }));

              _embeduserinfo.setAuthor("Information about:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({
                dynamic: true
              }), "https://discord.gg/FQGXbypRf8");

              _embeduserinfo.addField('** Username:**', "<@".concat(user.id, ">\n`").concat(user.tag, "`"), true);

              _embeduserinfo.addField('** ID:**', "`".concat(user.id, "`"), true);

              _embeduserinfo.addField('** Avatar:**', "[`Link to avatar`](".concat(user.displayAvatarURL({
                format: "png"
              }), ")"), true);

              _embeduserinfo.addField('** Flags:**', "`".concat(_userFlags.length ? _userFlags.map(function (flag) {
                return flags[flag];
              }).join(', ') : 'None', "`"), true);

              _embeduserinfo.addField('** Status:**', "`".concat(statuses[user.presence.status], " ").concat(user.presence.status, "`"), true);

              _embeduserinfo.addField('** Is a Bot:**', "`".concat(user.bot ? "✔️" : "❌", "`"), true);

              userstatus = "Not having an activity";

              if (_activity) {
                if (_activity.type === "CUSTOM_STATUS") {
                  _emoji2 = "".concat(_activity.emoji ? _activity.emoji.id ? "<".concat(_activity.emoji.animated ? "a" : "", ":").concat(_activity.emoji.name, ":").concat(_activity.emoji.id, ">") : _activity.emoji.name : "");
                  userstatus = "".concat(_emoji2, " `").concat(_activity.state || 'Not having an acitivty.', "`");
                } else {
                  userstatus = "`".concat(_activity.type.toLowerCase().charAt(0).toUpperCase() + _activity.type.toLowerCase().slice(1), " ").concat(_activity.name, "`");
                }
              }

              _embeduserinfo.addField('** Activity:**', "".concat(userstatus));

              _embeduserinfo.addField('** Permissions:**', "".concat(message.member.permissions.toArray().map(function (p) {
                return "`".concat(p, "`");
              }).join(", ")));

              _embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);

              _embeduserinfo.setFooter(es.footertext, es.footericon); //send the EMBED


              message.channel.send(_embeduserinfo);
            }

            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 29], [3, 16]]);
  }
};