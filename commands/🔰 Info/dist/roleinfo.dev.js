"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require('moment');

var _require2 = require("../../handlers/functions"),
    GetRole = _require2.GetRole;

module.exports = {
  name: "roleinfo",
  aliases: ["rinfo"],
  category: "🔰 Info",
  description: "Get information about a role",
  usage: "roleinfo [@Role/Id/Name]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, role, embeduserinfo;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (!args[0]) {
              _context.next = 16;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(GetRole(message, args));

          case 6:
            role = _context.sent;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            if (_context.t0) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", message.reply("UNABLE TO FIND THE ROLE"));

          case 13:
            return _context.abrupt("return", message.reply(_context.t0));

          case 14:
            _context.next = 17;
            break;

          case 16:
            return _context.abrupt("return", message.reply("Please retry but add a Role/Rolename/Roleid"));

          case 17:
            if (!role || role == null || role.id == null || !role.id) message.reply("Could not find the ROLE"); //create the EMBED

            embeduserinfo = new MessageEmbed();
            embeduserinfo.setThumbnail(message.guild.iconURL({
              dynamic: true,
              size: 512
            }));
            embeduserinfo.setAuthor("Information about:   " + role.name, message.guild.iconURL({
              dynamic: true
            }), "https://discord.gg/FQGXbypRf8");
            embeduserinfo.addField('** Name:**', "`".concat(role.name, "`"), true);
            embeduserinfo.addField('** ID:**', "`".concat(role.id, "`"), true);
            embeduserinfo.addField('** Color:**', "`".concat(role.hexColor, "`"), true);
            embeduserinfo.addField('** Date Created:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true);
            embeduserinfo.addField('** Position:**', "`".concat(role.rawPosition, "`"), true);
            embeduserinfo.addField('** MemberCount:**', "`".concat(role.members.size, " Members have it`"), true);
            embeduserinfo.addField('** Hoisted:**', "`".concat(role.hoist ? "✔️" : "❌", "`"), true);
            embeduserinfo.addField('** Mentionable:**', "`".concat(role.mentionable ? "✔️" : "❌", "`"), true);
            embeduserinfo.addField('** Permissions:**', "".concat(role.permissions.toArray().map(function (p) {
              return "`".concat(p, "`");
            }).join(", ")));
            embeduserinfo.setColor(role.hexColor);
            embeduserinfo.setFooter(es.footertext, es.footericon); //send the EMBED

            message.channel.send(embeduserinfo);
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](1);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 35], [3, 9]]);
  }
};