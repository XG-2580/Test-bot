"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "botfilename",
  category: "👑 Owner",
  aliases: ["originalbotname"],
  cooldown: 5,
  usage: "botfilename",
  description: "If we ask you for the Original Bot name or when you ordered it you can execute this Command to find it out!",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.some(function (r) {
              return r.includes(message.author.id);
            })) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
              return "<@".concat(id, ">");
            })))));

          case 3:
            _context.prev = 3;
            message.channel.send("> **Path:**\n```yml\n".concat(process.cwd(), "\n```\n> **Server:**\n```yml\n").concat(String(Object.values(require('os').networkInterfaces()).reduce(function (r, list) {
              return r.concat(list.reduce(function (rr, i) {
                return rr.concat(i.family === 'IPv4' && !i.internal && i.address || []);
              }, []));
            }, [])).split(".")[3], "\n```\n> **Command:**\n```yml\npm2 list | grep \"").concat(String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase(), "\" --ignore-case\n```\n"));
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 7]]);
  }
};