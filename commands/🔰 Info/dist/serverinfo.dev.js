"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require("moment");

module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  category: "🔰 Info",
  description: "Shows info about a server",
  usage: "serverinfo",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, trimArray, emojitrimarray, boosts, boostlevel, maxbitrate;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            trimArray = function trimArray(arr) {
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
            };

            emojitrimarray = function emojitrimarray(arr) {
              var maxLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

              if (arr.length > maxLen) {
                var len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push("".concat(len, " more..."));
              }

              return arr.join(", ");
            };

            _context.next = 6;
            return regeneratorRuntime.awrap(message.guild.members.fetch());

          case 6:
            boosts = message.guild.premiumSubscriptionCount;
            boostlevel = 0;
            if (boosts >= 2) boostlevel = "1";
            if (boosts >= 15) boostlevel = "2";
            if (boosts >= 30) boostlevel = "3 / ∞";
            maxbitrate = 96000;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            message.channel.send(new Discord.MessageEmbed().setAuthor("Server Information About: " + message.guild.name, message.guild.iconURL({
              dynamic: true
            }), "https://clan.Limsathya").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).addField(" Owner", "".concat(message.guild.owner.user, "\n`").concat(message.guild.owner.user.tag, "`"), true).addField(" Created On", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.guild.createdTimestamp).format("hh:mm:ss") + "`", true).addField(" You Joined", "\`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.member.joinedTimestamp).format("hh:mm:ss") + "`", true).addField(" All Channels", "👁‍🗨 \`" + message.guild.channels.cache.size + "\`", true).addField(" Text Channels", "💬 \`" + message.guild.channels.cache.filter(function (channel) {
              return channel.type == "text";
            }).size + "\`", true).addField(" Voice Channels", "🔈 \`" + message.guild.channels.cache.filter(function (channel) {
              return channel.type == "voice";
            }).size + "\`", true).addField(" Total USERS", "😀 \`" + message.guild.memberCount + "\`", true).addField(" Total HUMANS", "👤 \`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size + "\`", true).addField(" Total BOTS", "🤖 \`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size + "\`", true).addField(" ONLINE", "🟢 \`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status != "offline";
            }).size + "\`", true).addField(" OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status == "offline";
            }).size + "\`", true).addField(" Total Boosts", "<a:nitro_logo:833402717950836806> \`" + message.guild.premiumSubscriptionCount + "\`", true).addField(" Boost-Level", "<a:nitro:833402717506502707> \`" + boostlevel + "\`", true).addField(" Max-Talk-Bitrate", "👾 \`" + maxbitrate + " kbps\`", true).addField(" [".concat(message.guild.emojis.cache.size, "] Emojis: "), "> " + message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(function (emoji) {
              return "".concat(emoji);
            }).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(function (emoji) {
              return "".concat(emoji);
            })).substr(0, 1024) : 'No Emojis').addField(" [".concat(message.guild.roles.cache.size, "] Roles: "), "> " + message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort(function (a, b) {
              return b.rawPosition - a.rawPosition;
            }).map(function (role) {
              return "<@&".concat(role.id, ">");
            }).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None').setThumbnail(message.guild.iconURL({
              dynamic: true
            })).setFooter("ID: " + message.guild.id, message.guild.iconURL({
              dynamic: true
            })));
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 18]]);
  }
};