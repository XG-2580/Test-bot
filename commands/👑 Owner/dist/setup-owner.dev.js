"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var fs = require('fs');

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL;

module.exports = {
  name: "setup-owner",
  category: "👑 Owner",
  aliases: ["setup-owners", "setupowner", "setupowners"],
  cooldown: 5,
  usage: "setup-owner  -->  Follow the Steps",
  description: "Change the Bot Owners",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, timeouterror, filter, temptype, tempmsg, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (config.ownerIDS.some(function (r) {
              return r.includes(message.author.id);
            })) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
                return "<@".concat(id, ">");
              })))
            }));

          case 3:
            _context.prev = 3;
            timeouterror = false;

            filter = function filter(reaction, user) {
              return user.id === message.author.id;
            };

            temptype = "";
            _context.next = 9;
            return regeneratorRuntime.awrap(message.channel.send({
              embed: new MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setDescription("1\uFE0F\u20E3 **== Add Owner**\n\n\uD83D\uDCD1 **== Show Settings**\n\n**NOTE:**\n> *You can't remove a Owner, which means you need to get in touch with: `NotMichx#6969` to do so!*\n\n\n\n*React with the Right Emoji according to the Right action*").setFooter(es.footertext, es.footericon)
            }));

          case 9:
            tempmsg = _context.sent;
            _context.prev = 10;
            tempmsg.react("1️⃣");
            tempmsg.react("📑");
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "add";else if (reaction.emoji.name === "📑") temptype = "thesettings";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 20:
            if (!timeouterror) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(timeouterror)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 22:
            if (!(temptype == "add")) {
              _context.next = 32;
              break;
            }

            _context.next = 25;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which User do you wanna add?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Please User the Role now!").setFooter(es.footertext, es.footericon)
            }));

          case 25:
            tempmsg = _context.sent;
            _context.next = 28;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var message = collected.first();
              var user = message.mentions.users.first();

              if (user) {
                if (config.ownerIDS.includes(user.id)) return message.reply({
                  embed: new Discord.MessageEmbed().setTitle("ERROR | The User: `".concat(user.tag, "` is already registered as an Owner")).setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
                });

                try {
                  var status = config;
                  status.ownerIDS.push(user.id);
                  fs.writeFile('config.json', JSON.stringify(status, null, 3), function (e) {
                    if (e) {
                      console.log(String(e.stack).red);
                      return message.channel.send({
                        embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.wrongcolor).setTitle("".concat(emoji.msg.ERROR, " ERROR Writing the File")).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```"))
                      });
                    }

                    return message.channel.send({
                      embed: new MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setTitle("".concat(emoji.msg.SUCCESS, " Successfully added the User `").concat(user.tag, "`"))
                    });
                  });
                } catch (e) {
                  return message.reply({
                    embed: new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `NotMichx#6969`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role";
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 28:
            if (!timeouterror) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", message.reply({
              embed: new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)
            }));

          case 30:
            _context.next = 38;
            break;

          case 32:
            if (!(temptype == "thesettings")) {
              _context.next = 37;
              break;
            }

            embed = new MessageEmbed().setTitle("\uD83D\uDCD1 All Owners").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("".concat("<@".concat(config.ownerIDS.join(">, <@"), ">")).substr(0, 2048)).setFooter(es.footertext, es.footericon);
            return _context.abrupt("return", message.reply({
              embed: embed
            }));

          case 37:
            return _context.abrupt("return", message.reply({
              embed: new MessageEmbed().setTitle("ERROR | PLEASE CONTACT `NotMichx#6969`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
            }));

          case 38:
            _context.next = 44;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context["catch"](3);
            console.log(String(_context.t1.stack).bgRed);
            return _context.abrupt("return", message.channel.send({
              embed: new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```"))
            }));

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 40], [10, 15]]);
  }
};