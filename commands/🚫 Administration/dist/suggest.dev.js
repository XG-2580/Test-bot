"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    delay = _require2.delay,
    databasing = _require2.databasing;

module.exports = {
  name: "suggest",
  aliases: ["suggestion", "feedback"],
  category: "\uD83D\uDEAB Administration",
  description: "Approves, Denies or even Maybies a Suggestion from your SETUP!",
  usage: "suggest <approve/deny/maybe> <Suggestion_id> [REASON]",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, approvetext, denytext, maybetext, feedbackchannel, reason, channel, targetMessage, oldEmbed, color, statustext, embed, channel2send;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.suggest");
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
                client.settings.remove(message.guild.id, r, "cmdadminroles.suggest");
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
            approvetext = client.settings.get(message.guild.id, "suggest.approvemsg");
            denytext = client.settings.get(message.guild.id, "suggest.denymsg");
            maybetext = client.settings.get(message.guild.id, "suggest.maybemsg");
            feedbackchannel = client.settings.get(message.guild.id, "suggest.channel");
            reason = "No reason";

            if (args[0]) {
              _context.next = 34;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("You did not add the method!").setDescription("Useage: `".concat(prefix, "suggest <approve/deny/maybe> <suggest_id> [REASON]`"))));

          case 34:
            if (args[1]) {
              _context.next = 36;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("You did not add the Suggestion ID!").setDescription("Useage: `".concat(prefix, "suggest <approve/deny/maybe> <suggest_id> [REASON]`"))));

          case 36:
            if (!(args[1].length !== 18)) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("It seems that the suggestion doesnt exist!").setDescription("Useage: `".concat(prefix, "suggest <approve/deny/maybe> <suggest_id> [REASON]`"))));

          case 38:
            if (!args[2]) reason = "No reason";else reason = args.slice(2).join(" "); //finde feedbackchannel

            channel = message.guild.channels.cache.get(feedbackchannel);

            if (channel) {
              _context.next = 42;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("Could not find the Suggestions Channel!").setDescription("Set it up with: `".concat(prefix, "setup-suggestions`"))));

          case 42:
            _context.next = 44;
            return regeneratorRuntime.awrap(channel.messages.fetch(args[1]));

          case 44:
            targetMessage = _context.sent;

            if (targetMessage) {
              _context.next = 47;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("Could not find the Suggestion!")));

          case 47:
            //altes embed
            oldEmbed = targetMessage.embeds[0];

            if (oldEmbed) {
              _context.next = 50;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("Could not find the Suggestion!")));

          case 50:
            _context.t1 = args[0];
            _context.next = _context.t1 === "approve" ? 53 : _context.t1 === "deny" ? 58 : _context.t1 === "maybe" ? 63 : 68;
            break;

          case 53:
            color = "GREEN";
            statustext = "".concat(approvetext, "\n\n**Reason:**\n ").concat(reason);
            _context.next = 57;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor("GREEN").setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("**\u2705 | Suggestion got `approved`!**").setDescription("".concat(channel))));

          case 57:
            return _context.abrupt("break", 70);

          case 58:
            color = "RED";
            statustext = "".concat(denytext, "\n\n**Reason:**\n ").concat(reason);
            _context.next = 62;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor("RED").setThumbnail(es.thumb ? es.footericon : "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png").setTitle("**\u2705 | Suggestion got `declined`!**").setDescription("".concat(channel))));

          case 62:
            return _context.abrupt("break", 70);

          case 63:
            color = "ORANGE";
            statustext = "".concat(maybetext, "\n\n**Reason:**\n ").concat(reason);
            _context.next = 67;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor("#ff712e").setTitle("**\u2705 | Suggestion got `maybed`!**").setDescription("".concat(channel))));

          case 67:
            return _context.abrupt("break", 70);

          case 68:
            message.reply("Please add a method:  `approve` / `deny` / `maybe`");
            return _context.abrupt("break", 70);

          case 70:
            embed = new MessageEmbed().setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL).setDescription(oldEmbed.description).setColor(color).setFooter('Want to suggest something? Simply type it in this channel', "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/light-bulb_1f4a1.png");

            if (oldEmbed.fields.length === 2) {
              embed.addFields(oldEmbed.fields[0], {
                name: 'Status',
                value: statustext
              });
            } else {
              embed.addFields({
                name: 'Status',
                value: statustext
              });
            }

            targetMessage.edit({
              embed: embed
            });

            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 84;
              break;
            }

            _context.prev = 74;
            channel2send = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel2send) {
              _context.next = 78;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 78:
            channel2send.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 84;
            break;

          case 81:
            _context.prev = 81;
            _context.t2 = _context["catch"](74);
            console.log(_context.t2);

          case 84:
            _context.next = 90;
            break;

          case 86:
            _context.prev = 86;
            _context.t3 = _context["catch"](1);
            console.log(String(_context.t3.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t3)).substr(0, 2000), "```"))));

          case 90:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 86], [9, 13, 17, 25], [18,, 20, 24], [74, 81]]);
  }
};