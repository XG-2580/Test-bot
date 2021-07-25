"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    getRandomInt = _require2.getRandomInt,
    GetGlobalUser = _require2.GetGlobalUser,
    GetUser = _require2.GetUser;

module.exports = {
  name: "modstats",
  category: "🔰 Info",
  aliases: ["adminstats"],
  usage: "modstats [@USER]",
  description: "Shows the Admin Stats of a Mod/Admin, how many cmds he has executed etc.",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, user;
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

            return _context.abrupt("return", message.reply("Could not find the USER"));

          case 26:
            client.stats.ensure(message.guild.id + user.id, {
              ban: [],
              kick: [],
              mute: [],
              ticket: [],
              says: [],
              warn: []
            });
            message.channel.send({
              embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).addField("Bans [7]", "**`" + client.stats.get(message.guild.id + user.id, "ban").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Bans [30]", "**`" + client.stats.get(message.guild.id + user.id, "ban").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Bans [All]", "**`" + client.stats.get(message.guild.id + user.id, "ban").length + "`**", true).addField("Kicks [7]", "**`" + client.stats.get(message.guild.id + user.id, "kick").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Kicks [30]", "**`" + client.stats.get(message.guild.id + user.id, "kick").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Kicks [All]", "**`" + client.stats.get(message.guild.id + user.id, "kick").length + "`**", true).addField("Mutes [7]", "**`" + client.stats.get(message.guild.id + user.id, "mute").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Mutes [30]", "**`" + client.stats.get(message.guild.id + user.id, "mute").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Mutes [All]", "**`" + client.stats.get(message.guild.id + user.id, "mute").length + "`**", true).addField("Tickets [7]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Tickets [30]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Tickets [All]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").length + "`**", true).addField("Says [7]", "**`" + client.stats.get(message.guild.id + user.id, "says").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Says [30]", "**`" + client.stats.get(message.guild.id + user.id, "says").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Says [All]", "**`" + client.stats.get(message.guild.id + user.id, "says").length + "`**", true).addField("Warns [7]", "**`" + client.stats.get(message.guild.id + user.id, "warn").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 7);
                return date <= Number(item);
              }).length + "`**", true).addField("Warns [30]", "**`" + client.stats.get(message.guild.id + user.id, "warn").filter(function (item) {
                var date = new Date();
                date.setDate(date.getDate() - 30);
                return date <= Number(item);
              }).length + "`**", true).addField("Warns [All]", "**`" + client.stats.get(message.guild.id + user.id, "warn").length + "`**", true).addField("\u200B", "*[] ... Days the amount of Cmds were executed*\n*Says includes embeds too*").setAuthor("The Stats of:  ".concat(user.tag), user.displayAvatarURL({
                dynamic: true,
                size: 512
              }))
            });
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr([], 2000), "```"))));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 30], [3, 16]]);
  }
};