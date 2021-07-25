"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require("moment");

module.exports = {
  name: "membercount",
  aliases: ["members"],
  category: "🔰 Info",
  description: "Shows how many Members there are in this Server",
  usage: "membercount",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(message.guild.members.fetch());

          case 4:
            message.channel.send(new Discord.MessageEmbed().setAuthor("Member Count Information About: " + message.guild.name, message.guild.iconURL({
              dynamic: true
            }), "discord.gg/sakshyam").setColor(es.color).addField("<a:un_arrow1:863017195004887060> Total USERS", "😀 \`" + message.guild.memberCount + "\`", true).addField("<a:un_arrow1:863017195004887060> Total HUMANS", "👤 \`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot;
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> Total BOTS", "🤖 \`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot;
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> ONLINE", "🟢 \`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status != "offline";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> ONLINE", "🟢 \`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot && member.presence.status != "offline";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> ONLINE", "🟢 \`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot && member.presence.status != "offline";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> IDLE", "🟠 \`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status == "idle";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> IDLE", "🟠 \`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot && member.presence.status == "idle";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> IDLE", "🟠 \`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot && member.presence.status == "idle";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> DND", "🔴 \`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status == "dnd";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> DND", "🔴 \`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot && member.presence.status == "dnd";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> DND", "🔴 \`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot && member.presence.status == "dnd";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(function (member) {
              return member.presence.status == "offline";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(function (member) {
              return !member.user.bot && member.presence.status == "offline";
            }).size + "\`", true).addField("<a:un_arrow1:863017195004887060> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(function (member) {
              return member.user.bot && member.presence.status == "offline";
            }).size + "\`", true).setTimestamp());
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 7]]);
  }
};