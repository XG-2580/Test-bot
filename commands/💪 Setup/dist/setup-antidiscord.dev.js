"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing;

module.exports = {
  name: "setup-antidiscord",
  category: "💪 Setup",
  aliases: ["setupantidiscord", "setup-mod", "setupmod", "antidiscord-setup", "antidiscordsetup"],
  cooldown: 5,
  usage: "setup-antidiscord  -->  Follow the Steps",
  description: "Enable/Disable anti Discord Link advertisements",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg, thesettings;
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
            _context.next = 8;
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **== ** ".concat(client.settings.get(message.guild.id, "antidiscord").enabled ? "**\`❌ Disable\`** Anti Discord Links" : "**\`✔️ Enable\`** Anti Discord Links", "\n\n2\uFE0F\u20E3 **== Add** White listed **Channels**\n\n3\uFE0F\u20E3 **== Remove** White listed **Channels**\n\n\uD83D\uDCD1 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("📑");
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "toggle";else if (reaction.emoji.name === "2️⃣") temptype = "add";else if (reaction.emoji.name === "3️⃣") temptype = "remove";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 21:
            if (!timeouterror) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 23:
            if (!(temptype == "toggle")) {
              _context.next = 34;
              break;
            }

            _context.prev = 24;
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "antidiscord.enabled"), "antidiscord.enabled");
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("".concat(client.settings.get(message.guild.id, "antidiscord").enabled ? "**Enabled** antidiscords" : "**Disabled** Anti Discord Links")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat(client.settings.get(message.guild.id, "antidiscord").enabled ? "**I will now prevent Users to send** Discord Links" : "Everyone can send Discord Links!").substr(0, 2048)).setFooter(es.footertext, es.footericon)
            }));

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](24);
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
            }));

          case 32:
            _context.next = 60;
            break;

          case 34:
            if (!(temptype == "add")) {
              _context.next = 44;
              break;
            }

            _context.next = 37;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna add to the Whitelist?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 37:
            tempmsg = _context.sent;
            _context.next = 40;
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
                var antisettings = client.settings.get(message.guild.id, "antidiscord.whitelistedchannels");
                if (antisettings.includes(channel.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The Channel: `".concat(channel.name, "` is already added to the Anti Discord Links Whitelist")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.push(message.guild.id, channel.id, "antidiscord.whitelistedchannels");
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now registered as an Whitelisted Anti Discord Links Channel")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Every single Channel:\n<#".concat(client.settings.get(message.guild.id, "antidiscord.whitelistedchannels").join(">\n<#"), ">\nis not a checked by the Anti Discord Links System").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 40:
            if (!timeouterror) {
              _context.next = 42;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 42:
            _context.next = 60;
            break;

          case 44:
            if (!(temptype == "remove")) {
              _context.next = 54;
              break;
            }

            _context.next = 47;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Channel do you wanna remove to the Whitelist?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please Ping the Channel now!").setFooter(es.footertext, es.footericon)
            }));

          case 47:
            tempmsg = _context.sent;
            _context.next = 50;
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
                var antisettings = client.settings.get(message.guild.id, "antidiscord.whitelistedchannels");
                if (!antisettings.includes(channel.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The Channel: `".concat(channel.name, "` is not added to the Anti Discord Links Whitelist yet")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  client.settings.remove(message.guild.id, channel.id, "antidiscord.whitelistedchannels");
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("The Channel: `".concat(channel.name, "` is now **NOT** registered as an Whitelisted Anti Discord Links Channel anymore")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Every single Channel:\n<#".concat(client.settings.get(message.guild.id, "antidiscord.whitelistedchannels").join(">\n<#"), ">\nis not a checked by the Anti Discord Links System").substr(0, 2048)).setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Channel";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 50:
            if (!timeouterror) {
              _context.next = 52;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 52:
            _context.next = 60;
            break;

          case 54:
            if (!(temptype == "thesettings")) {
              _context.next = 59;
              break;
            }

            thesettings = client.settings.get(message.guild.id, "antidiscord");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("\uD83D\uDCD1 Settings of the Anti Discord Ad-Link System").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("**Enabled:** ".concat(thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>", "\n          \n**Witelisted Channels:** ").concat(thesettings.whitelistedchannels.length > 0 ? "<#".concat(thesettings.whitelistedchannels.join("> | <#"), ">") : "No Channels Whitelisted!", "\n\n**Information:** *Anti Discord are not enabled in Tickets from THIS BOT*").substr(0, 2048)).setFooter(es.footertext, es.footericon)));

          case 59:
            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 60:
            _context.next = 66;
            break;

          case 62:
            _context.prev = 62;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))
            }));

          case 66:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 62], [9, 16], [24, 29]]);
  }
};