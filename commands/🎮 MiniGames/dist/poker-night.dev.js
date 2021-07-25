"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    MessageAttachment = _require.MessageAttachment;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fetch = require("node-fetch");

module.exports = {
  name: "poker-night",
  aliases: ["pokernight", "poker"],
  category: "🎮 MiniGames",
  description: "Generate a poker-night link to play poker with your friends. (through discord)",
  usage: "poker-night --> Click on the Link | YOU HAVE TO BE IN A VOICE CHANNEL!",

  /*
  755827207812677713 Poker Night
  773336526917861400 Betrayal.io
  832012586023256104 Chess
  773336526917861400 End-Game
  755600276941176913 YouTube Together
  814288819477020702 Fishington.io
  */
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, channel, nochannel;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MINIGAMES")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;
            channel = message.member.voice.channel;

            if (channel) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Error | Please join a Voice Channel first")));

          case 7:
            if (channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) {
              _context.next = 10;
              break;
            }

            nochannel = new MessageEmbed().setDescription("I need `CREATE_INSTANT_INVITE` permission!").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
            return _context.abrupt("return", message.channel.send(nochannel));

          case 10:
            fetch("https://discord.com/api/v8/channels/".concat(channel.id, "/invites"), {
              method: "POST",
              body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755827207812677713",
                // poker night
                target_type: 2,
                temporary: false,
                validate: null
              }),
              headers: {
                "Authorization": "Bot ".concat(config.token),
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              return res.json();
            }).then(function (invite) {
              if (!invite.code) {
                return message.channel.send(new MessageEmbed().setDescription("Cannot start the youtube together, please retry").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
              }

              message.channel.send("Click on the Link to start the GAME:\n> https://discord.com/invite/".concat(invite.code));
            });
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 13]]);
  }
};