"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed,
    Collection = _require.Collection;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    delay = _require2.delay,
    databasing = _require2.databasing;

module.exports = {
  name: "clearbotmessages",
  aliases: ["clearbotmsgs", "purgebotmessages", "purgebotmsgs", "prune"],
  category: "\uD83D\uDEAB Administration",
  description: "Deletes a amount of messages from the bot in a Channel.",
  usage: "clearbotmessages <Amount of messages>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, messageCollection, channelMessages, tomanymsgs, messagelimit, lastMessageId, msgs, channel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;

            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("I am missing the permission to `MANAGE MESSAGES`!")));

          case 4:
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.clearbotmessages");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 27;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.clearbotmessages");
              }
            }

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 19:
            _context.prev = 19;
            _context.prev = 20;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 22:
            _context.prev = 22;

            if (!_didIteratorError) {
              _context.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context.finish(22);

          case 26:
            return _context.finish(19);

          case 27:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 29:
            messageCollection = new Collection(); //make a new collection

            _context.next = 32;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              //fetch the last 100 messages
              limit: 100
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 32:
            channelMessages = _context.sent;
            //catch any error
            messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
              return msg.author.id == client.user.id;
            })); //add them to the Collection

            tomanymsgs = 1; //some calculation for the messagelimit

            messagelimit = 250 / 100; //devide it by 100 to get a counter

            if (!args[0]) {
              _context.next = 42;
              break;
            }

            if (!(Number(args[0]) > 5000 || Number(args[0]) < 100)) {
              _context.next = 39;
              break;
            }

            return _context.abrupt("return", message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 100)**"));

          case 39:
            if (!isNaN(args[0])) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.reply("**Maximum amount of Messages to be pruned are 5000 (minimum 100)**"));

          case 41:
            messagelimit = Number(args[0]) / 100;

          case 42:
            if (!(channelMessages.size === 100)) {
              _context.next = 53;
              break;
            }

            if (!(tomanymsgs === messagelimit)) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("break", 53);

          case 45:
            //if the counter equals to the limit stop the loop
            tomanymsgs += 1; //add 1 to the counter

            lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above

            _context.next = 49;
            return regeneratorRuntime.awrap(message.channel.messages.fetch({
              limit: 100,
              before: lastMessageId
            })["catch"](function (err) {
              return console.log(err);
            }));

          case 49:
            channelMessages = _context.sent;
            //Fetch again, 100 messages above the already fetched messages
            if (channelMessages) //if its true
              messageCollection = messageCollection.concat(channelMessages.filter(function (msg) {
                return msg.author.id == client.user.id;
              })); //add them to the collection

            _context.next = 42;
            break;

          case 53:
            msgs = messageCollection.array();
            message.channel.bulkDelete(msgs);
            _context.next = 57;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("".concat(emoji.msg.SUCCESS, " ").concat(msgs.length, " messages successfully deleted!"))).then(function (msg) {
              return msg["delete"]({
                timeout: 3000
              });
            }));

          case 57:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 68;
              break;
            }

            _context.prev = 58;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 62;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 62:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 68;
            break;

          case 65:
            _context.prev = 65;
            _context.t1 = _context["catch"](58);
            console.log(_context.t1);

          case 68:
            _context.next = 74;
            break;

          case 70:
            _context.prev = 70;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).red);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 74:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 70], [11, 15, 19, 27], [20,, 22, 26], [58, 65]]);
  }
};