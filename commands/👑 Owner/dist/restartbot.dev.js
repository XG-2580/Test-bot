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
  name: "restartbot",
  category: "👑 Owner",
  aliases: ["botrestart"],
  cooldown: 5,
  usage: "restartbot",
  description: "Restarts the Bot, if it's not working as intended or so..",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (!(message.author.id != "645715831753408548")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("**You are not allowed to run this Command**").setDescription("***Only <@645715831753408548> is allowed to execute this Command, this is to prevent Rate Limits, if you need a Bot restart Contact him (`NotMichx#6969`)***")));

          case 3:
            _context.prev = 3;
            message.reply("RESTARTING BOT .... please stand by... if the Bot is not restarting then DM: `NotMichx#6969`");

            require("child_process").exec("pm2 restart index.js CLANBOT_".concat(process.cwd().split(require("path").sep).pop()), function (error, stdout, stderr) {
              if (error) {
                console.error("exec error: ".concat(error));
                message.reply("SOMETHING WENT WRONG, CONTACT THE OWNER PLEASE! `NotMichx#6969`");
                return;
              }

              message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!");
            });

            message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!");
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