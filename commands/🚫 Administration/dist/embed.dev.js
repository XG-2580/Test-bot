"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "embed",
  category: "🚫 Administration",
  aliases: ["embed"],
  cooldown: 2,
  usage: "embed <TITLE> ++ <DESCRIPTION>",
  description: "Resends a message from u as an Embed\n\n To have forexample no title do that:  embed ++ This is what an Embed without Image Looks like",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, attachispng, attachisjpg, attachisgif, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, userargs, title, desc, attachment, name, sendembed, ee, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            attachispng = function attachispng(msgAttach) {
              url = msgAttach.url;
              return url.indexOf("png", url.length - "png".length
              /*or 3*/
              ) !== -1;
            };

            attachisjpg = function attachisjpg(msgAttach) {
              url = msgAttach.url;
              return url.indexOf("jpg", url.length - "jpg".length
              /*or 3*/
              ) !== -1;
            };

            attachisgif = function attachisgif(msgAttach) {
              url = msgAttach.url;
              return url.indexOf("gif", url.length - "gif".length
              /*or 3*/
              ) !== -1;
            };

            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.embed");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 28;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.embed");
              }
            }

            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError) {
              _context.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 30:
            if (args[0]) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You Didn't Provide a Title, Nor a Description").setDescription("Usage: `".concat(prefix, "embed <TITLE> ++ <DESCRIPTION>`"))));

          case 32:
            userargs = args.join(" ").split("++");
            title = userargs[0];
            desc = userargs.slice(1).join(" ");
            attachment = false;
            name = false;

            if (message.attachments.size > 0) {
              if (message.attachments.every(attachispng)) {
                name = "image.png";
                attachment = new MessageAttachment(url, name);
              }

              if (message.attachments.every(attachisjpg)) {
                name = "image.jpg";
                attachment = new MessageAttachment(url, name);
              }

              if (message.attachments.every(attachisgif)) {
                name = "image.gif";
                attachment = new MessageAttachment(url, name);
              }
            }

            message["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is a catch to prevent crash");
            });
            sendembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle(title && desc ? title.substr(0, 256) : "").setDescription(desc ? desc : title ? title.substr(0, 2048) : "");

            if (attachment) {
              sendembed.setImage("attachment://" + name);
              sendembed.attachFiles(attachment);
            }

            message.channel.send({
              embed: sendembed
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
              _context.next = 58;
              break;
            }

            _context.prev = 48;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 52;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 52:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 58;
            break;

          case 55:
            _context.prev = 55;
            _context.t1 = _context["catch"](48);
            console.log(_context.t1);

          case 58:
            _context.next = 64;
            break;

          case 60:
            _context.prev = 60;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(_context.t2.stack, "```"))));

          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 60], [12, 16, 20, 28], [21,, 23, 27], [48, 55]]);
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