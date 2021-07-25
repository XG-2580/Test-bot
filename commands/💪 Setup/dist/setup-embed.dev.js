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
  name: "setup-embed",
  category: "💪 Setup",
  aliases: ["setupembed", "embed-setup", "embedsetup"],
  cooldown: 5,
  usage: "setup-embed  -->  Follow Steps",
  description: "Change the Look of your Embeds (Color, Image, Thumbnail, ...)",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, timeouterror, filter, temptype, tempmsg;
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
            return regeneratorRuntime.awrap(message.channel.send(new Discord.MessageEmbed().setTitle("What do you want to do?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("1\uFE0F\u20E3 **==** Change the **Color** of the Embeds\n\n2\uFE0F\u20E3 **==** Change the **Image** of the Embeds\n\n3\uFE0F\u20E3 **==** Change the **Footer Text** of the Embeds\n\n4\uFE0F\u20E3 **==** ".concat(es.thumb ? "**Disable** the Thumbnail for Embeds" : "**Enable** the Thumbnail for Embeds", "\n\n\n\n*React with the Right Emoji according to the Right action*")).setFooter(es.footertext, es.footericon)));

          case 8:
            tempmsg = _context.sent;
            _context.prev = 9;
            tempmsg.react("1️⃣");
            tempmsg.react("2️⃣");
            tempmsg.react("3️⃣");
            tempmsg.react("4️⃣");
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Missing Permissions to add Reactions").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```").substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var reaction = collected.first();
              reaction.users.remove(message.author.id);
              if (reaction.emoji.name === "1️⃣") temptype = "color";else if (reaction.emoji.name === "2️⃣") temptype = "image";else if (reaction.emoji.name === "3️⃣") temptype = "footertext";else if (reaction.emoji.name === "4️⃣") temptype = "thumb";else throw "You reacted with a wrong emoji";
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 21:
            if (!timeouterror) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 23:
            if (!(temptype == "color")) {
              _context.next = 33;
              break;
            }

            _context.next = 26;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What Color do you want?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Send it now!\n\nMake sure to use a valid **HEX CODE** forexample: **`#ffee22`** __with__ the `#`").setFooter(es.footertext, es.footericon)
            }));

          case 26:
            tempmsg = _context.sent;
            _context.next = 29;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var color = collected.first().content;
              if (!color) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Please add a valid COLOR").setColor(es.wrongcolor).setDescription("Note that a HEX COLOR looks like that: `#ffee22`").setFooter(es.footertext, es.footericon));
              if (color.length != 7 && !color.includes("#")) return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Please add a valid COLOR").setColor(es.wrongcolor).setDescription("Note that a HEX COLOR looks like that: `#ffee22`").setFooter(es.footertext, es.footericon));

              try {
                client.settings.set(message.guild.id, color, "embed.color");
                es = client.settings.get(message.guild.id, "embed");
                return message.reply(new Discord.MessageEmbed().setTitle("The new Embed Color is: `".concat(es.color, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
              } catch (e) {
                return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 29:
            if (!timeouterror) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 31:
            _context.next = 66;
            break;

          case 33:
            if (!(temptype == "image")) {
              _context.next = 43;
              break;
            }

            _context.next = 36;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("Which Image do you want to use?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that you may not delete this image from where ever the source is from! A Link is appreciated").setFooter(es.footertext, es.footericon)
            }));

          case 36:
            tempmsg = _context.sent;
            _context.next = 39;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var url = collected.first().content;

              function attachIsImage(msgAttach) {
                url = msgAttach.url; //True if this url is a png image.

                return url.indexOf("png", url.length - "png".length
                /*or 3*/
                ) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length
                /*or 3*/
                ) !== -1 || url.indexOf("jpg", url.length - "jpg".length
                /*or 3*/
                ) !== -1;
              }

              if (collected.first().attachments.size > 0) {
                if (collected.first().attachments.every(attachIsImage)) {
                  try {
                    client.settings.set(message.guild.id, url, "embed.footericon");
                    es = client.settings.get(message.guild.id, "embed");
                    return message.reply(new Discord.MessageEmbed().setTitle("The new Embed Image is: `".concat(es.link, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                  }
                } else {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Please add a valid IMAGE-LINK").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
                }
              } else if (!url.includes("http") && !(url.toLowerCase().includes("png") || url.toLowerCase().includes("gif") || url.toLowerCase().includes("jpg"))) {
                return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Please add a valid IMAGE-LINK").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon));
              } else {
                try {
                  client.settings.set(message.guild.id, url, "embed.footericon");
                  es = client.settings.get(message.guild.id, "embed");
                  return message.reply(new Discord.MessageEmbed().setTitle("The new Embed Image is: `".concat(es.link, "`")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon));
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
                }
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 39:
            if (!timeouterror) {
              _context.next = 41;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 41:
            _context.next = 66;
            break;

          case 43:
            if (!(temptype == "footertext")) {
              _context.next = 53;
              break;
            }

            _context.next = 46;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new Discord.MessageEmbed().setTitle("What should be your new Footer Text?").setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription("Note that it's the Text that's very small and at the bottom of an Embed\n\nEnter the Text now!").setFooter(es.footertext, es.footericon)
            }));

          case 46:
            tempmsg = _context.sent;
            _context.next = 49;
            return regeneratorRuntime.awrap(tempmsg.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: 90000,
              errors: ["time"]
            }).then(function (collected) {
              var text = collected.first().content;

              try {
                client.settings.set(message.guild.id, text, "embed.footertext");
                es = client.settings.get(message.guild.id, "embed");
                return message.reply(new Discord.MessageEmbed().setTitle("The new Embed Footer Text is:".substr(0, 256)).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setDescription(es.footertext).setFooter(es.footertext, es.footericon));
              } catch (e) {
                return message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon));
              }
            })["catch"](function (e) {
              timeouterror = e;
            }));

          case 49:
            if (!timeouterror) {
              _context.next = 51;
              break;
            }

            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Your Time ran out").setColor(es.wrongcolor).setDescription("Cancelled the Operation!".substr(0, 2000)).setFooter(es.footertext, es.footericon)));

          case 51:
            _context.next = 66;
            break;

          case 53:
            if (!(temptype == "thumb")) {
              _context.next = 65;
              break;
            }

            _context.prev = 54;
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "embed.thumb"), "embed.thumb");
            es = client.settings.get(message.guild.id, "embed");
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("The Thumbnail is now ".concat(es.thumb ? "enabled" : "disabled")).setDescription("".concat(es.thumb ? "I will now add Thumbnails to each Embed Message" : "I will now **not** add a Thumbnail to Embed Messages")).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)));

          case 60:
            _context.prev = 60;
            _context.t1 = _context["catch"](54);
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | Something went wrong, please contact: `XG#2846`").setColor(es.wrongcolor).setDescription("```".concat(String(JSON.stringify(_context.t1)).substr(0, 2000), "```")).setFooter(es.footertext, es.footericon)));

          case 63:
            _context.next = 66;
            break;

          case 65:
            return _context.abrupt("return", message.reply(new Discord.MessageEmbed().setTitle("ERROR | PLEASE CONTACT `XG#2846`").setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)));

          case 66:
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t2 = _context["catch"](1);
            console.log(String(_context.t2.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t2)).substr(0, 2000), "```"))));

          case 72:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 68], [9, 16], [54, 60]]);
  }
};