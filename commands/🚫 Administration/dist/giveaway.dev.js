"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ms = require("ms");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "giveaway",
  aliases: ["g"],
  category: "🚫 Administration",
  description: "Giveaway manager",
  usage: "giveaway <start/end/reroll/edit/delete/list>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, cmdroles, cmdrole, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, r, originalowner, filter, giveawayChannel, collected, channel, giveawayDuration, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, a, giveawayNumberWinners, giveawayPrize, giveaway, _giveaway, messageID, _giveawayPrize, _messageID, onServer, embed, i, invite, CH, allGiveaways, _embed, _i, _invite;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            adminroles = client.settings.get(message.guild.id, "adminroles");
            cmdroles = client.settings.get(message.guild.id, "cmdadminroles.giveaway");
            cmdrole = [];

            if (!(cmdroles.length > 0)) {
              _context.next = 24;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;

            for (_iterator = cmdroles[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              r = _step.value;

              if (message.guild.roles.cache.get(r)) {
                cmdrole.push(" | <@&".concat(r, ">"));
              } else if (message.guild.members.cache.get(r)) {
                cmdrole.push(" | <@".concat(r, ">"));
              } else {
                console.log("F");
                console.log(r);
                client.settings.remove(message.guild.id, r, "cmdadminroles.giveaway");
              }
            }

            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 16:
            _context.prev = 16;
            _context.prev = 17;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 19:
            _context.prev = 19;

            if (!_didIteratorError) {
              _context.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context.finish(19);

          case 23:
            return _context.finish(16);

          case 24:
            if (!(message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return cmdroles.includes(r.id);
            }) && !cmdroles.includes(message.author.id) && message.member.roles.cache.array() && !message.member.roles.cache.some(function (r) {
              return adminroles.includes(r.id);
            }) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("".concat(adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(function (role) {
              return "<@&".concat(role, ">");
            }).join(" | ") + cmdrole.join("") : "No Admin Roles Setupped yet! Do it with: `".concat(prefix, "setup-admin`")))));

          case 26:
            if (args[0]) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("PLEASE USE A VALID PARAMETER!").setDescription("`".concat(prefix, "giveaway start` -- *Starts a giveaway (follow the Steps)*\n\n`").concat(prefix, "giveaway end <Giveaway_Id>` -- *Ends a Giveaway*\n\n`").concat(prefix, "giveaway edit <Giveaway_Id> <PRIZE>` -- *Edits a Giveaway's Prize*\n\n`").concat(prefix, "giveaway reroll <Giveaway_Id>` -- *Rerolls an ended Giveaway*\n\n`").concat(prefix, "giveaway list <server/all>` -- *Lists all global / Server based Giveaways*"))
            })["catch"](function (e) {
              return console.log(e.stack.toString().red);
            }));

          case 28:
            originalowner = message.author.id;

            if (!(args[0].toLowerCase() === "start")) {
              _context.next = 121;
              break;
            }

            filter = function filter(m) {
              return m.author.id == originalowner;
            };

            _context.next = 33;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("In Which Cannel should the Giveaway start?").setDescription("*Ping it with: `#Channel`*")
            }));

          case 33:
            console.log("WAIT FOR COLLECTION");
            _context.prev = 34;
            _context.next = 37;
            return regeneratorRuntime.awrap(message.channel.awaitMessages(function (m) {
              return m.author.id == originalowner;
            }, {
              max: 1,
              time: 60e3,
              errors: ['time']
            }));

          case 37:
            collected = _context.sent;
            channel = collected.first().mentions.channels.filter(function (ch) {
              return ch.guild.id == message.guild.id;
            }).first() || message.guild.channels.cache.get(collected.first().content);

            if (channel) {
              _context.next = 41;
              break;
            }

            throw "nomention";

          case 41:
            giveawayChannel = channel;
            _context.next = 50;
            break;

          case 44:
            _context.prev = 44;
            _context.t1 = _context["catch"](34);
            console.log(_context.t1);

            if (!(_context.t1 = "nomention")) {
              _context.next = 49;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not mention a valid Channel!").setDescription("*Cancelled*")
            }));

          case 49:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your Time Ran out!").setDescription("*Cancelled*")
            }));

          case 50:
            _context.next = 52;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("For how long should the Giveaway last?").setDescription("**Example:**\n> `23h + 30m + 27s`")
            }));

          case 52:
            _context.prev = 52;
            _context.next = 55;
            return regeneratorRuntime.awrap(message.channel.awaitMessages(function (m) {
              return m.author.id == originalowner;
            }, {
              max: 1,
              time: 60e3,
              errors: ['time']
            }));

          case 55:
            collected = _context.sent;
            gargs = collected.first().content.split("+");
            giveawayDuration = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 61;

            for (_iterator2 = gargs[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              a = _step2.value;
              giveawayDuration += ms(a.split(" ").join(""));
            }

            _context.next = 69;
            break;

          case 65:
            _context.prev = 65;
            _context.t2 = _context["catch"](61);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t2;

          case 69:
            _context.prev = 69;
            _context.prev = 70;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 72:
            _context.prev = 72;

            if (!_didIteratorError2) {
              _context.next = 75;
              break;
            }

            throw _iteratorError2;

          case 75:
            return _context.finish(72);

          case 76:
            return _context.finish(69);

          case 77:
            if (!(!giveawayDuration || isNaN(giveawayDuration))) {
              _context.next = 79;
              break;
            }

            throw "notime";

          case 79:
            _context.next = 87;
            break;

          case 81:
            _context.prev = 81;
            _context.t3 = _context["catch"](52);
            console.log(_context.t3);

            if (!(_context.t3 = "notime")) {
              _context.next = 86;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not enter a valid time Format").setDescription("*Cancelled*\n**Example:**\n> `23h 30m 27s`")
            }));

          case 86:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your Time Ran out!").setDescription("*Cancelled*")
            }));

          case 87:
            _context.next = 89;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("How Many Winners should the Giveaway have?").setDescription("**Example:**\n> `2`")
            }));

          case 89:
            _context.prev = 89;
            _context.next = 92;
            return regeneratorRuntime.awrap(message.channel.awaitMessages(function (m) {
              return m.author.id == originalowner;
            }, {
              max: 1,
              time: 60e3,
              errors: ['time']
            }));

          case 92:
            collected = _context.sent;
            giveawayNumberWinners = collected.first().content;

            if (!(!giveawayNumberWinners || isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0)) {
              _context.next = 96;
              break;
            }

            throw "nowinners";

          case 96:
            _context.next = 104;
            break;

          case 98:
            _context.prev = 98;
            _context.t4 = _context["catch"](89);
            console.log(_context.t4);

            if (!(_context.t4 = "nowinners")) {
              _context.next = 103;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You did not enter a valid Winners Count").setDescription("*Cancelled*\n**Example:**\n> `2`")
            }));

          case 103:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your Time Ran out!").setDescription("*Cancelled*")
            }));

          case 104:
            _context.next = 106;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("What should be the Giveaway Prize?").setDescription("**Example:**\n> `1 x Nitro`")
            }));

          case 106:
            _context.prev = 106;
            _context.next = 109;
            return regeneratorRuntime.awrap(message.channel.awaitMessages(function (m) {
              return m.author.id == originalowner;
            }, {
              max: 1,
              time: 60e3,
              errors: ['time']
            }));

          case 109:
            collected = _context.sent;
            giveawayPrize = collected.first().content;
            _context.next = 117;
            break;

          case 113:
            _context.prev = 113;
            _context.t5 = _context["catch"](106);
            console.log(_context.t5);
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Your Time Ran out!").setDescription("*Cancelled*")
            }));

          case 117:
            client.giveawaysManager.start(giveawayChannel, {
              time: giveawayDuration,
              prize: "<a:Gift:853993605868683285> ".concat(giveawayPrize, " <a:Gift:853993605868683285>"),
              winnerCount: giveawayNumberWinners,
              hostedBy: message.author,
              embedColorEnd: es.wrongcolor,
              embedColor: es.color,
              messages: {
                giveaway: '🎉 **A GIVEAWAY Started** 🎉',
                giveawayEnded: '🎉 **The GIVEAWAY Ended** 🎉',
                timeRemaining: 'Time remaining: **{duration}**!',
                inviteToParticipate: '*React with 🎉 to participate!*',
                winMessage: ':tada: **Congratulations,** {winners} :tada:\n\n> You won **{prize}**!\n\n**Jump to it:**\n> {messageURL}',
                embedFooter: 'Ends at: ',
                noWinner: 'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {user}',
                winners: giveawayNumberWinners == 1 ? 'Winner' : "Winners",
                before_winners: "",
                endedAt: 'Ended at',
                units: {
                  seconds: 'Seconds',
                  minutes: 'Minutes',
                  hours: 'Hours',
                  days: 'Days',
                  pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2

                }
              }
            });
            message.reply("**Started the Giveaway in:** ".concat(giveawayChannel, "!")); // And the giveaway has started!

            _context.next = 206;
            break;

          case 121:
            if (!(args[0].toLowerCase() === "end")) {
              _context.next = 131;
              break;
            }

            args.shift();

            if (args[0]) {
              _context.next = 125;
              break;
            }

            return _context.abrupt("return", message.channel.send("You have to specify a valid message ID! Usage: `".concat(prefix, "giveaway end <ID>`")));

          case 125:
            giveaway = client.giveawaysManager.giveaways.find(function (g) {
              return g.prize === args.join(' ');
            }) || client.giveawaysManager.giveaways.find(function (g) {
              return g.messageID === args[0];
            });

            if (giveaway) {
              _context.next = 128;
              break;
            }

            return _context.abrupt("return", message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.'));

          case 128:
            client.giveawaysManager.edit(giveaway.messageID, {
              setEndTimestamp: Date.now()
            }).then(function () {
              message.channel.send('Giveaway will end in less than ' + client.giveawaysManager.options.updateCountdownEvery / 1000 + ' seconds...');
            })["catch"](function (e) {
              if (e.startsWith("Giveaway with message ID ".concat(giveaway.messageID, " is already ended."))) {
                message.channel.send('This giveaway is already ended!');
              } else {
                console.error(e);
                message.channel.send('An error occured...');
              }
            });
            _context.next = 206;
            break;

          case 131:
            if (!(args[0].toLowerCase() === "reroll")) {
              _context.next = 141;
              break;
            }

            args.shift();

            if (args[0]) {
              _context.next = 135;
              break;
            }

            return _context.abrupt("return", message.channel.send("You have to specify a valid message ID! Usage: `".concat(prefix, "giveaway edit <ID>`")));

          case 135:
            _giveaway = client.giveawaysManager.giveaways.find(function (g) {
              return g.prize === args.join(' ');
            }) || client.giveawaysManager.giveaways.find(function (g) {
              return g.messageID === args[0];
            });

            if (_giveaway) {
              _context.next = 138;
              break;
            }

            return _context.abrupt("return", message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.'));

          case 138:
            client.giveawaysManager.reroll(_giveaway.messageID, {
              winnerCount: !isNan(args[1]) ? Number(args[1]) : 1
            }).then(function () {
              message.channel.send('**Giveaway rerolled!**');
            })["catch"](function (e) {
              if (e.startsWith("Giveaway with message ID ".concat(_giveaway.messageID, " is not ended."))) {
                message.channel.send('**This giveaway is not ended!**');
              } else {
                console.error(e);
                message.channel.send('**An error occured...**```' + String(e.message).substr(0, 1900) + "```");
              }
            });
            _context.next = 206;
            break;

          case 141:
            if (!(args[0].toLowerCase() === "edit")) {
              _context.next = 152;
              break;
            }

            args.shift();
            messageID = args[0];

            if (messageID) {
              _context.next = 146;
              break;
            }

            return _context.abrupt("return", message.channel.send("**You have to specify a valid messageID! Usage: `".concat(prefix, "giveaway edit <ID> <PRIZE>`**")));

          case 146:
            _giveawayPrize = args.slice(1).join(' ');

            if (_giveawayPrize) {
              _context.next = 149;
              break;
            }

            return _context.abrupt("return", message.channel.send("**You have to specify a valid prize! Usage: `".concat(prefix, "giveaway edit <ID> <PRIZE>`**")));

          case 149:
            client.giveawaysManager.edit(messageID, {
              newWinnerCount: 3,
              newPrize: _giveawayPrize,
              addTime: 5000
            }).then(function () {
              // here, we can calculate the time after which we are sure that the lib will update the giveaway
              var numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
              message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.**');
            })["catch"](function (err) {
              message.channel.send('**No giveaway found for ' + messageID + ', please check and try again**');
            });
            _context.next = 206;
            break;

          case 152:
            if (!(args[0].toLowerCase() === "delete")) {
              _context.next = 160;
              break;
            }

            args.shift();
            _messageID = args[0];

            if (_messageID) {
              _context.next = 157;
              break;
            }

            return _context.abrupt("return", message.channel.send("Y**ou have to specify a valid messageID! Usage: `".concat(prefix, "giveaway delete <ID>`**")));

          case 157:
            client.giveawaysManager["delete"](_messageID).then(function () {
              message.channel.send('**Success! Giveaway deleted!**');
            })["catch"](function (err) {
              message.channel.send('**No giveaway found for ' + _messageID + ', please check and try again**');
            });
            _context.next = 206;
            break;

          case 160:
            if (!(args[0].toLowerCase() === "list")) {
              _context.next = 205;
              break;
            }

            args.shift();

            if (args[0]) {
              _context.next = 164;
              break;
            }

            return _context.abrupt("return", message.reply("**You did not enter a valid Parameter! Usage: `".concat(prefix, "giveaway list <all/server>`**")));

          case 164:
            if (!(args[0].toLowerCase() === "server")) {
              _context.next = 184;
              break;
            }

            onServer = client.giveawaysManager.giveaways.filter(function (g) {
              return g.guildID === message.guild.id && !g.ended;
            });
            embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("All not ended Giveaways!");
            buffer = "";
            i = 0;

          case 169:
            if (!(i < onServer.length)) {
              _context.next = 180;
              break;
            }

            _context.next = 172;
            return regeneratorRuntime.awrap(client.guilds.cache.get(onServer[i].guildID).channels.cache.first().createInvite());

          case 172:
            invite = _context.sent;
            _context.next = 175;
            return regeneratorRuntime.awrap(client.guilds.cache.get(onServer.guildID).messages.fetch(onServer.messageID));

          case 175:
            CH = _context.sent;
            buffer += "**>>** Prize: `".concat(onServer[i].prize, "` | Duration: `").concat(ms(new Date() - onServer[0].startAt), "`\n | [`JUMP TO IT`](https://discord.com/channels/").concat(onServer.guildID, "/").concat(onServer.channelID, "/").concat(onServer.messageID, ")\n");

          case 177:
            i++;
            _context.next = 169;
            break;

          case 180:
            embed.setDescription(buffer ? buffer : "No Giveaways");
            message.channel.send(embed);
            _context.next = 203;
            break;

          case 184:
            allGiveaways = client.giveawaysManager.giveaways.filter(function (g) {
              return !g.ended;
            }); // [ {Giveaway}, {Giveaway} ]

            _embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("All GLOBALLY not ended Giveaways!");
            buffer = "";
            _i = 0;

          case 188:
            if (!(_i < allGiveaways.length)) {
              _context.next = 201;
              break;
            }

            _context.prev = 189;
            _context.next = 192;
            return regeneratorRuntime.awrap(client.guilds.cache.get(allGiveaways[_i].guildID).channels.cache.first().createInvite());

          case 192:
            _invite = _context.sent;
            buffer += "**>>** Guild: [`".concat(client.guilds.cache.get(allGiveaways[_i].guildID).name, "`](").concat(_invite, ") | Prize: `").concat(allGiveaways[_i].prize, "` | Duration: `").concat(ms(new Date() - allGiveaways[_i].startAt), "` | [`JUMP TO IT`](https://discord.com/channels/").concat(allGiveaways[_i].guildID, "/").concat(allGiveaways[_i].channelID, "/").concat(allGiveaways[_i].messageID, ")\n\n");
            _context.next = 198;
            break;

          case 196:
            _context.prev = 196;
            _context.t6 = _context["catch"](189);

          case 198:
            _i++;
            _context.next = 188;
            break;

          case 201:
            _embed.setDescription(buffer ? buffer : "No Giveaways");

            message.channel.send(_embed);

          case 203:
            _context.next = 206;
            break;

          case 205:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("PLEASE USE A VALID PARAMETER!").setDescription("`".concat(prefix, "giveaway start` -- *Starts a giveaway (follow the Steps)*\n\n`").concat(prefix, "giveaway end <Giveaway_Id>` -- *Ends a Giveaway*\n\n`").concat(prefix, "giveaway edit <Giveaway_Id> <PRIZE>` -- *Edits a Giveaway's Prize*\n\n`").concat(prefix, "giveaway reroll <Giveaway_Id>` -- *Rerolls an ended Giveaway*\n\n`").concat(prefix, "giveaway list <server/all>` -- *Lists all global / Server based Giveaways*"))
            })["catch"](function (e) {
              return console.log(e.stack.toString().red);
            }));

          case 206:
            if (!(client.settings.get(message.guild.id, "adminlog") != "no")) {
              _context.next = 217;
              break;
            }

            _context.prev = 207;
            channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, "adminlog"));

            if (channel) {
              _context.next = 211;
              break;
            }

            return _context.abrupt("return", client.settings.set(message.guild.id, "no", "adminlog"));

          case 211:
            channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setAuthor("".concat(require("path").parse(__filename).name, " | ").concat(message.author.tag), message.author.displayAvatarURL({
              dynamic: true
            })).setDescription("```".concat(String(message.content).substr(0, 2000), "```")).addField("Executed in: ", "<#".concat(message.channel.id, "> `").concat(message.channel.name, "`")).addField("Executed by: ", "<@".concat(message.author.id, "> (").concat(message.author.tag, ")\n`").concat(message.author.tag, "`")).setTimestamp().setFooter("ID: " + message.author.id));
            _context.next = 217;
            break;

          case 214:
            _context.prev = 214;
            _context.t7 = _context["catch"](207);
            console.log(_context.t7);

          case 217:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[8, 12, 16, 24], [17,, 19, 23], [34, 44], [52, 81], [61, 65, 69, 77], [70,, 72, 76], [89, 98], [106, 113], [189, 196], [207, 214]]);
  }
};

function delay(delayInms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(2);
    }, delayInms);
  });
}