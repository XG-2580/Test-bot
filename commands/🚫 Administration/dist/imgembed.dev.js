"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "imgembed",
  category: "🚫 Administration",
  aliases: ["imageembed"],
  cooldown: 2,
  usage: "imgembed <TITLE> ++ <IMAGEURL> ++ <DESCRIPTION>\n\n To have forexample no title do that:  imgembed ++ https://i.imgur.com/sohWhy9.jpg ++ This is what an Embed without Image Looks like",
  description: "Resends a message from u as an Embed with the Option to have an IMAGE",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, userargs, title, image, desc, ee, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.imgembed");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 25;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.imgembed");
              }
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 27:
            if (args[0]) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a Title, nor a Description, nor Image").setDescription("Usage: `".concat(prefix, "embed <TITLE> ++ <IMAGEURL> ++ <DESCRIPTION>`"))));

          case 29:
            userargs = args.join(" ").split("++");
            title = userargs[0];
            image = userargs[1];
            desc = userargs.slice(2).join(" ");
            message["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is a catch to prevent crash");
            });
            message.channel.send({
              embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle(title ? title : "").setImage(image ? image.includes("http") ? image : message.author.displayAvatarURL : message.author.displayAvatarURL).setDescription(desc ? desc : "")
            });
            client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "says");
            ee = "Here is your Command, if you wanna use it again!";

            if (message.content.length > 2000) {
              ee = "Here is your Command";
            }

            if (message.content.length > 2020) {
              ee = "";
            }

            if (client.settings.get(message.author.id, "dm")) message.author.send("".concat(ee, "```").concat(message.content).substr(0, 2040) + "\`\`\`")["catch"](function (e) {
              return console.log("Couldn't Dm Him this log prevents a crash");
            });

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 51;
              break;
            }

            _context.prev = 41;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 45:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 51;
            break;

          case 48:
            _context.prev = 48;
            _context.t1 = _context["catch"](41);
            console.log(_context.t1);

          case 51:
            _context.next = 57;
            break;

          case 53:
            _context.prev = 53;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t2.stack, "```"))));

          case 57:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 53], [9, 13, 17, 25], [18,, 20, 24], [41, 48]]);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */