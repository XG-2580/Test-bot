"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

module.exports = {
  name: "removedj",
  aliases: ["deletedj"],
  category: "\u2699\uFE0F Settings",
  description: "Let's you DELETE a DJ ROLE",
  usage: "removedj @ROLE",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, role, leftb, i;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            role = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first();

            if (role) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Please add a Role via ping, @role!")));

          case 5:
            _context.prev = 5;
            message.guild.roles.cache.get(role.id);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("It seems that the Role does not exist in this Server!")));

          case 12:
            if (client.settings.get(message.guild.id, "djroles").includes(role.id)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("This Role is already a DJ-ROLE!")));

          case 14:
            client.settings.remove(message.guild.id, role.id, "djroles");
            leftb = "";
            if (client.settings.get(message.guild.id, "djroles").join("") === "") leftb = "no Dj Roles, aka All Users are Djs";else for (i = 0; i < client.settings.get(message.guild.id, "djroles").length; i++) {
              leftb += "<@&" + client.settings.get(message.guild.id, "djroles")[i] + "> | ";
            }
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Removed the DJ ROLE `".concat(role.name, "`")).setDescription("All left Dj Roles:\n> ".concat(leftb.substr(0, leftb.length - 3)))));

          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 20], [5, 9]]);
  }
};