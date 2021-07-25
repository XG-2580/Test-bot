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
  name: "stopbot",
  category: "👑 Owner",
  aliases: ["botrestart"],
  cooldown: 5,
  usage: "stopbot",
  description: "Stops the Bot, to set it OFFLINE",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (!(message.author.id != "442355791412854784")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("**You are not allowed to run this Command**").setDescription("***Only <@442355791412854784> is allowed to execute this Command, this is to prevent Rate Limits, if you need a Bot restart Contact him (`XG#2846`)***")));

          case 3:
            _context.prev = 3;
            message.reply("Stopping BOT! If you want it back online then DM: `XG#2846`");
            message.channel.send("Please send this Information to him too, if you want the Bot to get back online!:\n\n> **Path:**\n```yml\n".concat(process.cwd(), "\n```\n> **Server:**\n```yml\n").concat(String(Object.values(require('os').networkInterfaces()).reduce(function (r, list) {
              return r.concat(list.reduce(function (rr, i) {
                return rr.concat(i.family === 'IPv4' && !i.internal && i.address || []);
              }, []));
            }, [])).split(".")[3], "\n```\n> **Command:**\n```yml\npm2 list | grep \"").concat(String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase(), "\" --ignore-case\n```\n"));

            require("child_process").exec("pm2 stop index.js CLANBOT_".concat(process.cwd().split(require("path").sep).pop()), function (error, stdout, stderr) {
              if (error) {
                console.error("exec error: ".concat(error));
                message.reply("SOMETHING WENT WRONG, CONTACT THE OWNER PLEASE! `XG#2846`");
                return;
              }
            });

            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 9]]);
  }
};