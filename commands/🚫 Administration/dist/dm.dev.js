"use strict";

var _require = require("assert"),
    fail = _require.fail;

var _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var ms = require("ms");

var _require3 = require("../../handlers/functions"),
    databasing = _require3.databasing,
    delay = _require3.delay;

var _require4 = require("../💪 Setup/setup-twitter"),
    memberpermissions = _require4.memberpermissions;

module.exports = {
  name: "dm",
  category: "🚫 Administration",
  aliases: ["dm"],
  cooldown: 2,
  usage: "dm <@User/@Role> <MESSAGE>",
  description: "Allows you to DM a USER or every USER of a ROLE",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, member, role, members, failed, succeeded, seconds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _member, failedd, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (message.member.hasPermission("ADMINISTRATOR")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be a Server Administrator")));

          case 4:
            member = message.mentions.members.filter(function (member) {
              return member.guild.id == message.guild.id;
            }).first();
            role = message.mentions.roles.filter(function (role) {
              return role.guild.id == message.guild.id;
            }).first();

            if (!member) {
              _context.next = 13;
              break;
            }

            if (args[1]) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a Text").setDescription("Usage: `".concat(prefix, "dm <@USER/@ROLE> <Your Text>`"))));

          case 9:
            message["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is a catch to prevent crash");
            });

            try {
              member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Message from: ".concat(message.author.username), message.author.displayAvatarURL({
                dynamic: true
              }), "https://discord.gg/FQGXbypRf8").setDescription(args.slice(1).join(" ").substr(0, 2048)));
              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Successfully Dmed ".concat(member.user.username)));
            } catch (_unused) {
              message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Unable to Dm this User, this is probably because he either blocked me or turned his Dms off!"));
            }

            _context.next = 68;
            break;

          case 13:
            if (!role) {
              _context.next = 67;
              break;
            }

            _context.next = 16;
            return regeneratorRuntime.awrap(message.guild.members.fetch());

          case 16:
            if (args[1]) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You didn't provide a Text").setDescription("Usage: `".concat(prefix, "dm <@USER/@ROLE> <Your Text>`"))));

          case 18:
            members = message.guild.members.cache.filter(function (member) {
              return member.roles.cache.has(role.id) && !member.user.bot;
            }).array();
            failed = [];
            succeeded = [];
            message["delete"]()["catch"](function (e) {
              return console.log("Couldn't delete msg, this is a catch to prevent crash");
            });

            if (!(!members || members == null || members.length == null || members.length == 0)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Found no Members!").setDescription("Most of the Times this means, no one has this ROLE! But you can retry..")));

          case 24:
            seconds = Number(members.length) * 1500;
            _context.next = 27;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Dming ".concat(members.length, " Members..."), "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4").setDescription("This will take ".concat(ms(seconds, {
              "long": true
            }), " in ideal conditions. Please be patient."))));

          case 27:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 30;
            _iterator = members[Symbol.iterator]();

          case 32:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 49;
              break;
            }

            _member = _step.value;
            _context.prev = 34;
            failedd = false;
            _context.next = 38;
            return regeneratorRuntime.awrap(_member.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("Message from: ".concat(message.author.username), message.author.displayAvatarURL({
              dynamic: true
            }), "https://discord.gg/FQGXbypRf8").setDescription(args.slice(1).join(" ").substr(0, 2048)))["catch"](function (e) {
              failedd = true;
            }));

          case 38:
            if (failedd) {
              failed.push(_member.user.tag);
            } else {
              succeeded.push(_member.user.tag);
            }

            _context.next = 44;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context["catch"](34);
            failed.push(_member.user.tag);

          case 44:
            _context.next = 46;
            return regeneratorRuntime.awrap(delay(1500));

          case 46:
            _iteratorNormalCompletion = true;
            _context.next = 32;
            break;

          case 49:
            _context.next = 55;
            break;

          case 51:
            _context.prev = 51;
            _context.t1 = _context["catch"](30);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 55:
            _context.prev = 55;
            _context.prev = 56;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 58:
            _context.prev = 58;

            if (!_didIteratorError) {
              _context.next = 61;
              break;
            }

            throw _iteratorError;

          case 61:
            return _context.finish(58);

          case 62:
            return _context.finish(55);

          case 63:
            _context.next = 65;
            return regeneratorRuntime.awrap(message.channel.send({
              content: "<@".concat(message.author.id, ">"),
              embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("SUCCESS, send a Dm to `".concat(succeeded.length, "` / `").concat(failed.length + succeeded.length, "` Members")).setDescription(failed.length > 0 ? "**FAILED MEMBERS:**\n> ".concat(failed.map(function (r) {
                return "`".concat(r, "`");
              }).join("\n")).substr(0, 2048) : "**FAILED MEMBERS:**\n> No one Failed").addField("\u200B", "*If a Member is Failed it probably is because he either blocked me or turned his Dms off*")
            }));

          case 65:
            _context.next = 68;
            break;

          case 67:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You need to ping a ROLE or a MEMBER").setDescription("Useage: ".concat(prefix, "dm <@USER/@ROLE> <TEXT>"))));

          case 68:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 79;
              break;
            }

            _context.prev = 69;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 73;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 73:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 79;
            break;

          case 76:
            _context.prev = 76;
            _context.t2 = _context["catch"](69);
            console.log(_context.t2);

          case 79:
            _context.next = 85;
            break;

          case 81:
            _context.prev = 81;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(_context.t3).substr(0, 2048), "```"))));

          case 85:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 81], [30, 51, 55, 63], [34, 41], [56,, 58, 62], [69, 76]]);
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