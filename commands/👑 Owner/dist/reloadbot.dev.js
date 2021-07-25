"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    databasing = _require2.databasing,
    isValidURL = _require2.isValidURL,
    delay = _require2.delay;

var fs = require("fs");

module.exports = {
  name: "reloadbot",
  category: "👑 Owner",
  aliases: ["botreloadbot"],
  cooldown: 5,
  usage: "reloadbot",
  description: "Reloads the Bot, All Commands Events, etc.",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, index, tempmsg;
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

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("You are not allowed to run this Command").setDescription("You need to be one of those guys: ".concat(config.ownerIDS.map(function (id) {
              return "<@".concat(id, ">");
            })))));

          case 3:
            _context.prev = 3;
            index = require("../../index");
            _context.next = 7;
            return regeneratorRuntime.awrap(message.channel.send(new MessageEmbed().setColor(es.color).setFooter(es.footertext, es.footericon).setAuthor("Reloading ...", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/FQGXbypRf8").setTitle("> Reloading **`".concat(client.commands.size, " Commands`**\n\n> Reloading **`49 Events`**\n\n> Reloading **`117 Modules/Features`**"))));

          case 7:
            tempmsg = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(client.commands.clear());

          case 10:
            console.log(client.commands); //log that it's empty
            //Delete all files from the cache

            _context.next = 13;
            return regeneratorRuntime.awrap(fs.readdirSync("./commands/").forEach(function (dir) {
              var commands = fs.readdirSync("./commands/".concat(dir, "/")).filter(function (file) {
                return file.endsWith(".js");
              });
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var file = _step.value;

                  try {
                    console.log("SUCCESS :: ../../commands/".concat(dir, "/").concat(file, ".js"));
                    delete require.cache[require.resolve("../../commands/".concat(dir, "/").concat(file, ".js"))];
                  } catch (_unused) {}
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }));

          case 13:
            _context.next = 15;
            return regeneratorRuntime.awrap(delay(1000));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(client.removeAllListeners());

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(delay(1000));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(client.basicshandlers.forEach(function (handler) {
              try {
                delete require.cache[require.resolve("../../handlers/".concat(handler))];
                console.log("SUCCESS :: ../../handlers/".concat(handler));
              } catch (e) {
                console.log(e);
              }
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(client.socialhandlers.forEach(function (handler) {
              try {
                delete require.cache[require.resolve("../../social_log/".concat(handler))];
                console.log("SUCCESS :: ../../social_log/".concat(handler));
              } catch (e) {
                console.log(e);
              }
            }));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(client.allhandlers.forEach(function (handler) {
              try {
                delete require.cache[require.resolve("../../handlers/".concat(handler))];
                console.log("SUCCESS :: ../../handlers/".concat(handler));
              } catch (e) {
                console.log(e);
              }
            }));

          case 25:
            client.Joblivelog.stop();
            client.Joblivelog2.stop();
            client.Jobyoutube.stop();
            client.Jobtwitterfeed.stop();
            client.Jobtiktok.stop();
            client.Jobautonsfw.stop();
            client.Jobroster.stop();
            client.Jobroster2.stop();
            client.Jobroster3.stop();
            client.Jobmembercount.stop();
            client.JobJointocreate.stop();
            client.JobJointocreate2.stop();
            client.Jobdailyfact.stop(); //wait 1 Sec

            _context.next = 40;
            return regeneratorRuntime.awrap(delay(1000));

          case 40:
            //Load the basics, (commands, dbs, events, etc.)
            index.requirehandlers(); //LOAD THE SOCIAL LOGS

            index.requiresociallogs(); //LOAD ALL OTHER HANDLERS

            index.requireallhandlers(); //SEND SUCCESS

            console.log(client.commands.map(function (cmd) {
              return cmd.name;
            }));
            _context.next = 46;
            return regeneratorRuntime.awrap(tempmsg.edit({
              embed: new MessageEmbed().setColor(es.color).setFooter(es.footertext, es.footericon).setAuthor("Successfully Reloaded:", "https://cdn.discordapp.com/emojis/833101995723194437.gif?v=1", "https://discord.gg/FQGXbypRf8").setTitle("> **`".concat(client.commands.size, " Commands`**\n\n> **`49 Events`**\n\n> **`117 Modules/Features`**"))
            }));

          case 46:
            _context.next = 52;
            break;

          case 48:
            _context.prev = 48;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 48]]);
  }
};