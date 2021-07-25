"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    edit_msg = _require2.edit_msg,
    send_roster = _require2.send_roster,
    send_roster2 = _require2.send_roster2,
    send_roster3 = _require2.send_roster3,
    edit_msg2 = _require2.edit_msg2,
    edit_msg3 = _require2.edit_msg3;

module.exports = {
  name: "setup-roster",
  category: "💪 Setup",
  aliases: ["setuproster", "roster-setup", "rostersetup"],
  cooldown: 5,
  usage: "setup-roster --> Follow Steps",
  description: "Manage 3 different Roster Systems",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thedb, rostercount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, roleid, role;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles");
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            thedb = client.roster;
            rostercount = 1;
            _context.next = 10;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Manage the **first** Roster System\n\n2\uFE0F\u20E3 **==** Manage the **second** Roster System\n\n3\uFE0F\u20E3 **==** Manage the **third** Roster System\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)));

          case 10:
            tempmsg = _context.sent;
            _context.prev = 11;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](11);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 20:
            _context.next = 22;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") thedb = client.roster;else if (reaction.emoji.name === "2️⃣") thedb = client.roster2;else if (reaction.emoji.name === "3️⃣") thedb = client.roster3;else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 22:
            if (!timeouterror) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 24:
            if (thedb == client.roster2) rostercount = 2;
            if (thedb == client.roster3) rostercount = 3;
            _context.next = 28;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What do you want to do? | Roster: `".concat(thedb.get(message.guild.id, "rostertitle"), "` (`").concat(rostercount, ". Roster`)").substr(0, 256)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Define the **Channel** of where the **new** Roster should be\n\n2\uFE0F\u20E3 **==** **Add** a Role which should be listed\n\n3\uFE0F\u20E3 **==** **Remove** a Role from the listed ones\n\n4\uFE0F\u20E3 **==** **Show** all Roles, which are beeing listed\n\n5\uFE0F\u20E3 **==** Change the **TYPE** of the Design of the ROSTER\n\n6\uFE0F\u20E3 **==** Edit the **EMOJI / TEXT** Infront of **each** Listed-Roster-Member\n\n7\uFE0F\u20E3 **==** Set the **Roster Title** of the Roster\n\n8\uFE0F\u20E3 **==** ".concat(thedb.get(message.guild.id, "inline") ? "Disable Multiple Roster Rows (Inline Fields)" : "Enable Mulitple Roster Rows (Inline Fields)", "\n\n9\uFE0F\u20E3 **==** ").concat(thedb.get(message.guild.id, "showallroles") ? "Disable that i show all Role Members and cut them off!" : "Enable that i show all Role Members, instead of cutting of", "\n\n\u2620\uFE0F **== Reset** all `ROSTER ").concat(rostercount, "` SETTINGS\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 28:
            tempmsg = _context.sent;
            _context.prev = 29;
            //client.roster3.get(guild.id, "rosteremoji")
            tempmsg.react("4️⃣");
            tempmsg.react("5️⃣");
            tempmsg.react("6️⃣");
            tempmsg.react("7️⃣");
            tempmsg.react("8️⃣");
            tempmsg.react("9️⃣");
            tempmsg.react("☠️");
            _context.next = 42;
            break;

          case 39:
            _context.prev = 39;
            _context.t1 = _context["catch"](29);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 42:
            _context.next = 44;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "channel";else if (reaction.emoji.name === "2️⃣") temptype = "addrole";else if (reaction.emoji.name === "3️⃣") temptype = "removerole";else if (reaction.emoji.name === "4️⃣") temptype = "viewroles";else if (reaction.emoji.name === "5️⃣") temptype = "type";else if (reaction.emoji.name === "6️⃣") temptype = "emoji";else if (reaction.emoji.name === "7️⃣") temptype = "title";else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline";else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline";else if (reaction.emoji.name === "9️⃣") temptype = "showallroles";else if (reaction.emoji.name === "☠️") temptype = "reset";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 44:
            if (!timeouterror) {
              _context.next = 46;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 46:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 49;
            _iterator = thedb.get(message.guild.id, "rosterroles")[Symbol.iterator]();

          case 51:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 65;
              break;
            }

            roleid = _step.value;
            _context.prev = 53;
            role = message.guild.roles.cache.get(roleid);

            if (!(!role || role == null)) {
              _context.next = 57;
              break;
            }

            throw "NOT A RIGHT ROLE";

          case 57:
            _context.next = 62;
            break;

          case 59:
            _context.prev = 59;
            _context.t2 = _context["catch"](53);
            thedb.remove(message.guild.id, roleid, "rosterroles");

          case 62:
            _iteratorNormalCompletion = true;
            _context.next = 51;
            break;

          case 65:
            _context.next = 71;
            break;

          case 67:
            _context.prev = 67;
            _context.t3 = _context["catch"](49);
            _didIteratorError = true;
            _iteratorError = _context.t3;

          case 71:
            _context.prev = 71;
            _context.prev = 72;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 74:
            _context.prev = 74;

            if (!_didIteratorError) {
              _context.next = 77;
              break;
            }

            throw _iteratorError;

          case 77:
            return _context.finish(74);

          case 78:
            return _context.finish(71);

          case 79:
            if (!(temptype === "channel")) {
              _context.next = 89;
              break;
            }

            _context.next = 82;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 82:
            tempmsg = _context.sent;
            _context.next = 85;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var channel = message.mentions.channels.filter(function (ch) {
                return ch.guild.id == message.guild.id;
              }).first();

              if (channel) {
                try {
                  thedb.set(message.guild.id, channel.id, "rosterchannel");
                  if (thedb == client.roster) send_roster(client, message.guild);
                  if (thedb == client.roster2) send_roster2(client, message.guild);
                  if (thedb == client.roster3) send_roster3(client, message.guild);
                  return message.reply(new Discord.MessageEmbed().setTitle("The Roster is now locked to: `".concat(channel.name, "`. It is updating automatically!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 85:
            if (!timeouterror) {
              _context.next = 87;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 87:
            _context.next = 169;
            break;

          case 89:
            if (!(temptype === "addrole")) {
              _context.next = 99;
              break;
            }

            _context.next = 92;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
            }));

          case 92:
            tempmsg = _context.sent;
            _context.next = 95;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (role) {
                var rosteroles = thedb.get(message.guild.id, "rosterroles");
                if (rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is already registered as an Admin Role")).setColor(es.wrongcolor).setDescription("Remove it with: `".concat(prefix, "setup-roster`")).setFooter(es.footertext, es.footericon));

                try {
                  thedb.push(message.guild.id, role.id, "rosterroles");
                  if (thedb == client.roster) edit_msg(client, message.guild);
                  if (thedb == client.roster2) edit_msg2(client, message.guild);
                  if (thedb == client.roster3) edit_msg3(client, message.guild);
                  return message.reply(new Discord.MessageEmbed().setTitle("Added the Role: `".concat(role.name, "`")).setDescription("It will update in less then **5 Minutes**, *If it did not update yet*").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 95:
            if (!timeouterror) {
              _context.next = 97;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 97:
            _context.next = 169;
            break;

          case 99:
            if (!(temptype === "removerole")) {
              _context.next = 109;
              break;
            }

            _context.next = 102;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Role do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Role now!").setFooter(es.footertext, es.footericon)
            }));

          case 102:
            tempmsg = _context.sent;
            _context.next = 105;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var role = message.mentions.roles.filter(function (role) {
                return role.guild.id == message.guild.id;
              }).first();

              if (role) {
                var rosteroles = thedb.get(message.guild.id, "rosterroles");
                if (!rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | The role: `".concat(role.name, "` is not registered as an Admin Role yet!")).setColor(es.wrongcolor).setDescription("Remove it with: `".concat(prefix, "setup-roster`")).setFooter(es.footertext, es.footericon));

                try {
                  thedb.remove(message.guild.id, role.id, "rosterroles");
                  if (thedb == client.roster) edit_msg(client, message.guild);
                  if (thedb == client.roster2) edit_msg2(client, message.guild);
                  if (thedb == client.roster3) edit_msg3(client, message.guild);
                  return message.reply(new Discord.MessageEmbed().setTitle("Removed the Role: `".concat(role.name, "`")).setDescription("It will update in less then **5 Minutes**, *If it did not update yet*").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 105:
            if (!timeouterror) {
              _context.next = 107;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 107:
            _context.next = 169;
            break;

          case 109:
            if (!(temptype === "viewroles")) {
              _context.next = 115;
              break;
            }

            _context.next = 112;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Those Roles will be listed in the Roster Embed:").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("<@&".concat(thedb.get(message.guild.id, "rosterroles").join(">\n<@&"), ">")).setFooter(es.footertext, es.footericon)
            }));

          case 112:
            tempmsg = _context.sent;
            _context.next = 169;
            break;

          case 115:
            if (!(temptype === "type")) {
              _context.next = 125;
              break;
            }

            _context.next = 118;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What Type do you wanna use??").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** First Type Example: \n> <@".concat(message.author.id, "> | `").concat(message.author.tag, "`\n\n2\uFE0F\u20E3 **==** Second Type Example: \n> <@").concat(message.author.id, ">\n\n3\uFE0F\u20E3 **==** Third Type Example: \n> **").concat(message.author.tag, "**\n\n4\uFE0F\u20E3 **==** Fourth Type Example: \n> **").concat(message.author.username, "**\n\n5\uFE0F\u20E3 **==** Fifth Type Example: \n> <@").concat(message.author.id, "> | `").concat(message.author.id, "`\n\n6\uFE0F\u20E3 **==** Sixth Type Example: \n> <@").concat(message.author.id, "> | **").concat(message.author.username, "**\n\n7\uFE0F\u20E3 **==** Seventh Type Example: \n> <@").concat(message.author.id, "> | **").concat(message.author.tag, "**\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)
            }));

          case 118:
            tempmsg = _context.sent;
            _context.next = 121;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);

              if (reaction.emoji.name === "1️⃣") {
                thedb.set(message.guild.id, "1", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "2️⃣") {
                thedb.set(message.guild.id, "2", "rosterstyle");
                if (thedb == client.roster) edit_msg(client, message.guild);
                if (thedb == client.roster2) edit_msg2(client, message.guild);
                if (thedb == client.roster3) edit_msg3(client, message.guild);
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "3️⃣") {
                thedb.set(message.guild.id, "3", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "4️⃣") {
                thedb.set(message.guild.id, "4", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "5️⃣") {
                thedb.set(message.guild.id, "5", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "6️⃣") {
                thedb.set(message.guild.id, "6", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else if (reaction.emoji.name === "7️⃣") {
                thedb.set(message.guild.id, "7", "rosterstyle");
                return message.reply(new Discord.MessageEmbed().setTitle("SUCCESS! | Changed the ROSTER TYPE!").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*".substr(0, 2000)).setFooter(es.footertext, es.footericon));
              } else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 121:
            if (!timeouterror) {
              _context.next = 123;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 123:
            _context.next = 169;
            break;

          case 125:
            if (!(temptype === "emoji")) {
              _context.next = 135;
              break;
            }

            _context.next = 128;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Emoji / Text do You wanna use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note, that the Maximum lenght is `5`!\n\nEnter the TEXT / EMOJI now!\nType `noemoji` for no Emoji").setFooter(es.footertext, es.footericon)
            }));

          case 128:
            tempmsg = _context.sent;
            _context.next = 131;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var msg = collected.first().content;

              if (msg) {
                if (msg.toLowerCase() == "noemoji") {
                  thedb.set(message.guild.id, "", "rosteremoji");
                  if (thedb == client.roster) edit_msg(client, message.guild);
                  if (thedb == client.roster2) edit_msg2(client, message.guild);
                  if (thedb == client.roster3) edit_msg3(client, message.guild);
                  return message.reply(new Discord.MessageEmbed().setTitle("The Roster will now add ".concat(msg, " to each Listed Member!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nExample: \n<@").concat(message.author.id, "> | `").concat(message.author.tag, "`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                  return;
                }

                try {
                  if (msg.includes(":")) {
                    thedb.set(message.guild.id, msg, "rosteremoji");
                    if (thedb == client.roster) edit_msg(client, message.guild);
                    if (thedb == client.roster2) edit_msg2(client, message.guild);
                    if (thedb == client.roster3) edit_msg3(client, message.guild);
                    return message.reply(new Discord.MessageEmbed().setTitle("The Roster will now add ".concat(msg, " to each Listed Member!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nExample: \n").concat(msg, " <@").concat(message.author.id, "> | `").concat(message.author.tag, "`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                  } else {
                    thedb.set(message.guild.id, msg.substr(0, 5), "rosteremoji");
                    if (thedb == client.roster) edit_msg(client, message.guild);
                    if (thedb == client.roster2) edit_msg2(client, message.guild);
                    if (thedb == client.roster3) edit_msg3(client, message.guild);
                    return message.reply(new Discord.MessageEmbed().setTitle("The Roster will now add ".concat(msg.substr(0, 5), " to each Listed Member!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nExample: \n").concat(msg.substr(0, 5), " <@").concat(message.author.id, "> | `").concat(message.author.tag, "`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                  }
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't add a valid message";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 131:
            if (!timeouterror) {
              _context.next = 133;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 133:
            _context.next = 169;
            break;

          case 135:
            if (!(temptype === "title")) {
              _context.next = 145;
              break;
            }

            _context.next = 138;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Title should your Roster have?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note, that the Maximum lenght is `256`!\n\nEnter the TEXT now!").setFooter(es.footertext, es.footericon)
            }));

          case 138:
            tempmsg = _context.sent;
            _context.next = 141;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var msg = collected.first().content;

              if (msg) {
                try {
                  thedb.set(message.guild.id, msg.substr(0, 256), "rostertitle");
                  if (thedb == client.roster) edit_msg(client, message.guild);
                  if (thedb == client.roster2) edit_msg2(client, message.guild);
                  if (thedb == client.roster3) edit_msg3(client, message.guild);
                  return message.reply(new Discord.MessageEmbed().setTitle("The Roster will now add ".concat(msg.substr(0, 256), " to each Listed Member!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              } else {
                throw "you didn't add a valid message";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 141:
            if (!timeouterror) {
              _context.next = 143;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 143:
            _context.next = 169;
            break;

          case 145:
            if (!(temptype === "toggleinline")) {
              _context.next = 153;
              break;
            }

            thedb.set(message.guild.id, !thedb.get(message.guild.id, "inline"), "inline");
            if (thedb == client.roster) edit_msg(client, message.guild);
            if (thedb == client.roster2) edit_msg2(client, message.guild);
            if (thedb == client.roster3) edit_msg3(client, message.guild);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Roster will now ".concat(thedb.get(message.guild.id, "inline") ? "" : "__**not**__", " have multiple lines!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 153:
            if (!(temptype === "showallroles")) {
              _context.next = 161;
              break;
            }

            thedb.set(message.guild.id, !thedb.get(message.guild.id, "showallroles"), "showallroles");
            if (thedb == client.roster) edit_msg(client, message.guild);
            if (thedb == client.roster2) edit_msg2(client, message.guild);
            if (thedb == client.roster3) edit_msg3(client, message.guild);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Roster will now ".concat(thedb.get(message.guild.id, "showallroles") ? "" : "__**not**__ ", "cut of if there are too many Members (20+) who have the Role!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("To add Roles to the Roster type: `".concat(prefix, "setup-roster`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 161:
            if (!(temptype === "reset")) {
              _context.next = 168;
              break;
            }

            _context.next = 164;
            return regeneratorRuntime.awrap(thedb["delete"](message.guild.id));

          case 164:
            thedb.ensure(message.guild.id, {
              rosterchannel: "notvalid",
              rosteremoji: "➤",
              showallroles: false,
              rostermessage: "",
              rostertitle: "Roster",
              rosterstyle: "1",
              rosterroles: [],
              inline: false
            });
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("Resetted ".concat(rostercount, " Roster!")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Re-set-it-up with: `".concat(prefix, "setup-roster`").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 168:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 169:
            _context.next = 175;
            break;

          case 171:
            _context.prev = 171;
            _context.t4 = _context["catch"](1);
            console.log(String(_context.t4.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t4)).substr(0, 2000), "```"))));

          case 175:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 171], [11, 17], [29, 39], [49, 67, 71, 79], [53, 59], [72,, 74, 78]]);
  }
};