"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var fetch = require('node-fetch');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "resetsettings",
  category: "👑 Owner",
  aliases: ["resetallsettings", "hardreset"],
  cooldown: 5,
  usage: "resetsettings",
  description: "Reset (delete) All settings",
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
            message.channel.send("Do you really wanna reset all the settings? reply with `yes`").then(function (msg) {
              msg.channel.awaitMessages(function (m) {
                return m.author.id == message.author.id;
              }, {
                max: 1,
                time: 30e3,
                errors: ["time"]
              }).then(function (collected) {
                if (collected.first().content.toLowerCase() == "yes") {
                  client.youtube_log["delete"](message.guild.id);
                  client.premium["delete"](message.guild.id);
                  client.stats["delete"](message.guild.id);
                  client.settings["delete"](message.guild.id);
                  client.jtcsettings["delete"](message.guild.id);
                  client.jtcsettings2["delete"](message.guild.id);
                  client.jtcsettings3["delete"](message.guild.id);
                  client.jointocreatemap["delete"](message.guild.id);
                  client.setups["delete"](message.guild.id);
                  client.queuesaves["delete"](message.guild.id);
                  client.modActions["delete"](message.guild.id);
                  client.userProfiles["delete"](message.guild.id);
                  client.apply["delete"](message.guild.id);
                  client.apply2["delete"](message.guild.id);
                  client.apply3["delete"](message.guild.id);
                  client.apply4["delete"](message.guild.id);
                  client.apply5["delete"](message.guild.id);
                  client.points["delete"](message.guild.id);
                  client.voicepoints["delete"](message.guild.id);
                  client.reactionrole["delete"](message.guild.id);
                  client.roster["delete"](message.guild.id);
                  client.roster2["delete"](message.guild.id);
                  client.roster3["delete"](message.guild.id);
                  client.social_log["delete"](message.guild.id);
                  client.blacklist["delete"](message.guild.id);
                  client.customcommands["delete"](message.guild.id);
                  client.keyword["delete"](message.guild.id);
                  databasing(client, message.guild.id);
                  es = client.settings.get(message.guild.id, "embed");
                  return message.channel.send(new MessageEmbed().setColor(es.color).setFooter(es.footertext, es.footericon).setTitle("Successfully resetted all of the DATA"));
                } else {
                  return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not enter `yes`"));
                }
              });
            });
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