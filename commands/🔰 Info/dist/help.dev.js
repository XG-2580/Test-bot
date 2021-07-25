"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require("../../handlers/functions"),
    duration = _require2.duration;

var _require3 = require('discord-buttons'),
    MessageButton = _require3.MessageButton,
    MessageActionRow = _require3.MessageActionRow;

module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, allotherembeds, embed, cmd, cat, cuc, items, _embed, category, _items, _embed2, _cmd, button_back, button_home, button_forward, button_dc, button_invite, button_cat_information, button_cat_music, button_cat_settings, button_cat_voice, button_cat_minigames, button_cat_admin, button_cat_nsfw, button_cat_customcommand, buttonRow1, buttonRow2, buttonRow3, buttonRow4, allbuttons, FIRSTEMBED, helpmsg, collector, edited, embeds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e, currentPage, d_button_back, d_button_home, d_button_forward, d_button_dc, d_button_invite, d_button_cat_information, d_button_cat_music, d_button_cat_settings, d_button_cat_voice, d_button_cat_minigames, d_button_cat_admin, d_button_cat_nsfw, d_button_cat_customcommand, d_buttonRow1, d_buttonRow2, d_buttonRow3, d_buttonRow4, alldisabledbuttons;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context2.prev = 1;

            allotherembeds = function allotherembeds() {
              var settings = client.settings.get(message.guild.id);
              var embeds = [];
              var embed0 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\uD83D\uDD30 Information Commands \uD83D\uDD30").setDescription("> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🔰 Info";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.ECONOMY ? "💸 **Economy** | ENABLED" : "💸 **Economy** | DISABLED", "> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "💸 Economy";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.SCHOOL ? "🏫 **School** | ENABLED" : "🏫 **School** | DISABLED", "> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🏫 School Commands";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).setFooter("Page 1 / 9  | Actinium op\nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed0);
              var embed1 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\uD83C\uDFB6 Music Related Commands :notes:").setDescription("\uD83C\uDFB6 **Music**".concat(settings.MUSIC ? " | ENABLED" : " | DISABLED", "\n> ").concat(client.commands.filter(function (cmd) {
                return cmd.category === "🎶 Music";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.MUSIC ? "👀 **Filter** | ENABLED" : "👀 **Filter** | DISABLED", ">>> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "👀 Filter";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.MUSIC ? "⚜️ **Custom Queue(s)** | ENABLED" : "⚜️ **Custom Queue(s)** | DISABLED", "".concat(client.commands.filter(function (cmd) {
                return cmd.category === "⚜️ Custom Queue(s)";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", ")).substr(0, 1024)).setFooter("Page 2 / 9 \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed1);
              var embed2 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\uD83D\uDEAB Administration & Setup Commands \uD83D\uDCAA").setDescription("\uD83D\uDEAB **Admin**\n> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🚫 Administration";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField("💪 **Setup**", ">>> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "💪 Setup";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).setFooter("Page 3 / 9  \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed2);
              var embed3 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\u2699\uFE0F Settings & Owner Commands \uD83D\uDC51").setDescription("\u2699\uFE0F **Settings**\n> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "⚙️ Settings";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField("👑 **Owner**", ">>> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "👑 Owner";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField("⌨️ **Programming**", "".concat(client.commands.filter(function (cmd) {
                return cmd.category === "⌨️ Programming";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", ")).substr(0, 1024)).setFooter("Page 4 / 9  \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed3);
              var embed4 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\uD83C\uDFA4 Voice & Ranking Commands \uD83D\uDCC8").setDescription("\uD83C\uDFA4 **Voice**".concat(settings.VOICE ? " | ENABLED" : " | DISABLED", "\n> ").concat(client.commands.filter(function (cmd) {
                return cmd.category === "🎤 Voice";
              }).map(function (cmd) {
                return "**Command:**\n>>> `".concat(cmd.name, "`\n\n**Usage:**\n ").concat(cmd.usage);
              }))).addField("📈 **Ranking**", ">>> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "📈 Ranking";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.SOUNDBOARD ? "🔊 **Soundboard** | ENABLED" : "🔊 **Soundboard** | DISABLED", "".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🔊 Soundboard";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", ")).substr(0, 1024)).setFooter("Page 5 / 9  \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed4);
              var embed5 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("\uD83C\uDFAE Mini Games & Fun Commands \uD83D\uDD79\uFE0F").setDescription("\uD83D\uDD79\uFE0F **Fun**".concat(settings.FUN ? " | ENABLED" : " | DISABLED", "\n> ").concat(client.commands.filter(function (cmd) {
                return cmd.category === "🕹️ Fun";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).addField(settings.MINIGAMES ? "🎮 **Mini Games** | ENABLED" : "🎮 **Mini Games**| DISABLED", "> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🎮 MiniGames";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).setFooter("Page 6 / 9  \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed5);
              var embed6 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | ENABLED" : "🔞 NSFW Commands 🔞 | DISABLED").setDescription("> ".concat(client.commands.filter(function (cmd) {
                return cmd.category === "🔞 NSFW";
              }).map(function (cmd) {
                return "`".concat(cmd.name, "`");
              }).join(", "))).setFooter("Page 7 / 9  |  Made by: Limsathya\nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              embeds.push(embed6);
              var embed7 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("🦾 Custom Commands").setFooter("Page 8 / 9  \nTo see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());
              var cuc = client.customcommands.get(message.guild.id, "commands");
              if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"];else cuc = cuc.map(function (cmd) {
                return "`".concat(cmd.name, "`");
              });
              var items = cuc;
              embed7.setTitle("\uD83E\uDDBE **Custom Commands [".concat(cuc[0].includes("NO") ? 0 : items.length, "]**"));
              embed7.setDescription(items.join(", "));
              embeds.push(embed7);
              return embeds;
            };

            if (!args[0]) {
              _context2.next = 36;
              break;
            }

            embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
            cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            cat = false;

            if (!args[0].toLowerCase().includes("cust")) {
              _context2.next = 14;
              break;
            }

            cuc = client.customcommands.get(message.guild.id, "commands");
            if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"];else cuc = cuc.map(function (cmd) {
              return "`".concat(cmd.name, "`");
            });
            items = cuc;
            _embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setThumbnail(client.user.displayAvatarURL()).setTitle("\uD83E\uDDBE **Custom Commands [".concat(cuc[0].includes("NO") ? 0 : items.length, "]**")).setDescription(items.join(", ")).setFooter("No custom information for the Custom Commands ;(", client.user.displayAvatarURL());
            message.channel.send(_embed);
            return _context2.abrupt("return");

          case 14:
            cat = false;

            if (!cmd) {
              cat = client.categories.find(function (cat) {
                return cat.toLowerCase().includes(args[0].toLowerCase());
              });
            }

            if (!(!cmd && (!cat || cat == null))) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", message.channel.send(embed.setColor(es.wrongcolor).setDescription("No Information found for command **".concat(args[0].toLowerCase(), "**"))));

          case 20:
            if (!(!cmd && cat)) {
              _context2.next = 26;
              break;
            }

            category = cat;
            _items = client.commands.filter(function (cmd) {
              return cmd.category === category;
            }).map(function (cmd) {
              return "`".concat(cmd.name, "`");
            });
            _embed2 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setThumbnail(client.user.displayAvatarURL()).setTitle("MENU \uD83D\uDD30 **".concat(category.toUpperCase(), " [").concat(_items.length, "]**")).setFooter("To see command Descriptions and Information, type: ".concat(config.prefix, "help [CMD NAME]"), client.user.displayAvatarURL());

            if (category.toLowerCase().includes("custom")) {
              _cmd = client.commands.get(_items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(_items[0].split("`").join("").toLowerCase()));

              try {
                _embed2.setDescription("**".concat(category.toUpperCase(), " [").concat(_items.length, "]**"), "> `".concat(_items[0], "`\n\n**Usage:**\n> `").concat(_cmd.usage, "`"));
              } catch (_unused) {}
            } else {
              _embed2.setDescription("".concat(_items.join(", ")));
            }

            return _context2.abrupt("return", message.channel.send(_embed2));

          case 26:
            if (cmd.name) embed.addField("** Command name**", "`".concat(cmd.name, "`"));
            if (cmd.name) embed.setTitle(" Detailed Information about: `".concat(cmd.name, "`"));
            if (cmd.description) embed.addField("** Description**", "```".concat(cmd.description, "```"));
            if (cmd.aliases) try {
              embed.addField("** Aliases**", "`".concat(cmd.aliases.map(function (a) {
                return "".concat(a);
              }).join("`, `"), "`"));
            } catch (_unused2) {}
            if (cmd.cooldown) embed.addField("** Cooldown**", "```".concat(cmd.cooldown, " Seconds```"));else embed.addField("** Cooldown**", "```3 Seconds```");

            if (cmd.usage) {
              embed.addField("** Usage**", "```".concat(config.prefix).concat(cmd.usage, "```"));
              embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
            }

            if (cmd.useage) {
              embed.addField("** Useage**", "```".concat(config.prefix).concat(cmd.useage, "```"));
              embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
            }

            return _context2.abrupt("return", message.channel.send(embed));

          case 36:
            button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<");
            button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠");
            button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>');
            button_dc = new MessageButton().setStyle('url').setLabel('Get your Own Bot').setURL("https://discord.com/invite/FQGXbypRf8");
            button_invite = new MessageButton().setStyle('url').setLabel('Invite Public Version').setURL("https://clan.Limsathya");
            button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information').setLabel('​Information').setEmoji("🔰");
            button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music').setLabel('​Music Related').setEmoji("🎶");
            button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings').setLabel('​Settings & 👑 Owner & ⌨️Programming').setEmoji("⚙");
            button_cat_voice = new MessageButton().setStyle('blurple').setID('button_cat_voice').setLabel('Voice & 📈 Ranking').setEmoji("🎤");
            button_cat_minigames = new MessageButton().setStyle('blurple').setID('button_cat_minigames').setLabel('​Mini Games & 🕹️ Fun').setEmoji("🎮");
            button_cat_admin = new MessageButton().setStyle('blurple').setID('button_cat_admin').setLabel('Administration & 💪 Setup').setEmoji("🚫");
            button_cat_nsfw = new MessageButton().setStyle('blurple').setID('button_cat_nsfw').setLabel('​NSFW').setEmoji("🔞");
            button_cat_customcommand = new MessageButton().setStyle('blurple').setID('button_cat_customcommand').setLabel('​Custom Commands').setEmoji("🦾"); //array of all buttons

            buttonRow1 = new MessageActionRow().addComponent(button_back).addComponent(button_home).addComponent(button_forward).addComponent(button_dc).addComponent(button_invite);
            buttonRow2 = new MessageActionRow().addComponent(button_cat_information).addComponent(button_cat_music).addComponent(button_cat_settings);
            buttonRow3 = new MessageActionRow().addComponent(button_cat_admin).addComponent(button_cat_voice).addComponent(button_cat_minigames);
            buttonRow4 = new MessageActionRow();
            allbuttons = [buttonRow1, buttonRow2, buttonRow3, buttonRow4]; //define default embed

            FIRSTEMBED = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter("Page Home\n" + client.user.username + " | Made by: Limsathya", client.user.displayAvatarURL()).setTitle("Information about the Limsathya Clan Bot: __**".concat(client.user.username, "**__")).addField(":muscle: **__My Features__**", ">>> **58+ Systems**, like: <:twitter:840255600851812393> **Twitter-** & <:Youtube:840260133686870036> **Youtube-Auto-Poster** \n**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems\n:notes: An advanced <:Spotify:846090652231663647> **Music System** with **Audio Filtering**\n:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)\n:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!").addField(":question: **__How do you use me?__**", ">>> `".concat(prefix, "setup` and react with the Emoji for the right action,\nbut you can also do `").concat(prefix, "setup-SYSTEM` e.g. `").concat(prefix, "setup-welcome`")).addField(":chart_with_upwards_trend: **__STATS:__**", ">>> :gear: **".concat(client.commands.map(function (a) {
              return a;
            }).length, " Commands**\n:file_folder: on **").concat(client.guilds.cache.size, " Guilds**\n\u231A\uFE0F **").concat(duration(client.uptime).map(function (i) {
              return "`".concat(i, "`");
            }).join(", "), " Uptime**\n\uD83D\uDCF6 **`").concat(Math.floor(client.ws.ping), "ms` Ping**")); //Send message with buttons

            _context2.next = 57;
            return regeneratorRuntime.awrap(message.channel.send({
              content: "***Click on the __Buttons__ to swap the Help-Pages***",
              embed: FIRSTEMBED,
              components: allbuttons
            }));

          case 57:
            helpmsg = _context2.sent;
            //create a collector for the thinggy
            collector = helpmsg.createButtonCollector(function (button) {
              return !button.clicker.user.bot;
            }, {
              time: 180e3
            }); //collector for 5 seconds
            //array of all embeds, here simplified just 10 embeds with numbers 0 - 9

            edited = false;
            embeds = [FIRSTEMBED];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 64;

            for (_iterator = allotherembeds()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              e = _step.value;
              embeds.push(e);
            }

            _context2.next = 72;
            break;

          case 68:
            _context2.prev = 68;
            _context2.t0 = _context2["catch"](64);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 72:
            _context2.prev = 72;
            _context2.prev = 73;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 75:
            _context2.prev = 75;

            if (!_didIteratorError) {
              _context2.next = 78;
              break;
            }

            throw _iteratorError;

          case 78:
            return _context2.finish(75);

          case 79:
            return _context2.finish(72);

          case 80:
            currentPage = 0;
            collector.on('collect', function _callee(b) {
              var index;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(b.clicker.user.id !== message.author.id)) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return", b.reply.send(":x: **Only the one who typed ".concat(prefix, "help is allowed to react!**")));

                    case 2:
                      if (!b.id.includes("button_cat_")) {
                        _context.next = 30;
                        break;
                      }

                      //b.reply.send(`***Going to the ${b.id.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
                      //information, music, admin, settings, voice, minigames, nsfw
                      index = 0;
                      _context.t0 = b.id.replace("button_cat_", "");
                      _context.next = _context.t0 === "information" ? 7 : _context.t0 === "music" ? 9 : _context.t0 === "admin" ? 11 : _context.t0 === "settings" ? 13 : _context.t0 === "voice" ? 15 : _context.t0 === "minigames" ? 17 : _context.t0 === "nsfw" ? 19 : _context.t0 === "customcommand" ? 21 : 23;
                      break;

                    case 7:
                      index = 0;
                      return _context.abrupt("break", 23);

                    case 9:
                      index = 1;
                      return _context.abrupt("break", 23);

                    case 11:
                      index = 2;
                      return _context.abrupt("break", 23);

                    case 13:
                      index = 3;
                      return _context.abrupt("break", 23);

                    case 15:
                      index = 4;
                      return _context.abrupt("break", 23);

                    case 17:
                      index = 5;
                      return _context.abrupt("break", 23);

                    case 19:
                      index = 6;
                      return _context.abrupt("break", 23);

                    case 21:
                      index = 7;
                      return _context.abrupt("break", 23);

                    case 23:
                      currentPage = index + 1;
                      _context.next = 26;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 26:
                      _context.next = 28;
                      return regeneratorRuntime.awrap(b.defer());

                    case 28:
                      _context.next = 67;
                      break;

                    case 30:
                      if (!(b.id == "1")) {
                        _context.next = 45;
                        break;
                      }

                      if (!(currentPage !== 0)) {
                        _context.next = 38;
                        break;
                      }

                      _context.next = 34;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 34:
                      _context.next = 36;
                      return regeneratorRuntime.awrap(b.defer());

                    case 36:
                      _context.next = 43;
                      break;

                    case 38:
                      currentPage = embeds.length - 1;
                      _context.next = 41;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 41:
                      _context.next = 43;
                      return regeneratorRuntime.awrap(b.defer());

                    case 43:
                      _context.next = 67;
                      break;

                    case 45:
                      if (!(b.id == "2")) {
                        _context.next = 53;
                        break;
                      }

                      //b.reply.send("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                      currentPage = 0;
                      _context.next = 49;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 49:
                      _context.next = 51;
                      return regeneratorRuntime.awrap(b.defer());

                    case 51:
                      _context.next = 67;
                      break;

                    case 53:
                      if (!(b.id == "3")) {
                        _context.next = 67;
                        break;
                      }

                      if (!(currentPage < embeds.length - 1)) {
                        _context.next = 62;
                        break;
                      }

                      currentPage++;
                      _context.next = 58;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 58:
                      _context.next = 60;
                      return regeneratorRuntime.awrap(b.defer());

                    case 60:
                      _context.next = 67;
                      break;

                    case 62:
                      currentPage = 0;
                      _context.next = 65;
                      return regeneratorRuntime.awrap(helpmsg.edit({
                        embed: embeds[currentPage],
                        components: allbuttons
                      }));

                    case 65:
                      _context.next = 67;
                      return regeneratorRuntime.awrap(b.defer());

                    case 67:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            d_button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<").setDisabled(true);
            d_button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠").setDisabled(true);
            d_button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>').setDisabled(true);
            d_button_dc = new MessageButton().setStyle('url').setLabel('Get your Own Bot').setURL("https://discord.com/invite/FQGXbypRf8");
            d_button_invite = new MessageButton().setStyle('url').setLabel('Invite Public Version').setURL("https://clan.Limsathya");
            d_button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information').setLabel('​Information').setEmoji("🔰").setDisabled(true);
            d_button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music').setLabel('​Music Related').setEmoji("🎶").setDisabled(true);
            d_button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings').setLabel('​Settings & 👑 Owner & ⌨️Programming').setEmoji("⚙").setDisabled(true);
            d_button_cat_voice = new MessageButton().setStyle('blurple').setID('button_cat_voice').setLabel('Voice & 📈 Ranking').setEmoji("🎤").setDisabled(true);
            d_button_cat_minigames = new MessageButton().setStyle('blurple').setID('button_cat_minigames').setLabel('​Mini Games & 🕹️ Fun').setEmoji("🎮").setDisabled(true);
            d_button_cat_admin = new MessageButton().setStyle('blurple').setID('button_cat_admin').setLabel('Administration & 💪 Setup').setEmoji("🚫").setDisabled(true);
            d_button_cat_nsfw = new MessageButton().setStyle('blurple').setID('button_cat_nsfw').setLabel('​NSFW').setEmoji("🔞").setDisabled(true);
            d_button_cat_customcommand = new MessageButton().setStyle('blurple').setID('button_cat_customcommand').setLabel('​Custom Commands').setEmoji("🦾").setDisabled(true);
            d_buttonRow1 = new MessageActionRow().addComponent(d_button_back).addComponent(d_button_home).addComponent(d_button_forward).addComponent(d_button_dc).addComponent(d_button_invite);
            d_buttonRow2 = new MessageActionRow().addComponent(d_button_cat_information).addComponent(d_button_cat_music).addComponent(d_button_cat_settings);
            d_buttonRow3 = new MessageActionRow().addComponent(d_button_cat_admin).addComponent(d_button_cat_voice).addComponent(d_button_cat_minigames);
            d_buttonRow4 = new MessageActionRow().addComponent(d_button_cat_nsfw).addComponent(d_button_cat_customcommand);
            alldisabledbuttons = [d_buttonRow1, d_buttonRow2, d_buttonRow3, d_buttonRow4];
            collector.on('end', function (collected) {
              edited = true;
              helpmsg.edit({
                content: "Time has ended type ".concat(prefix, "help again!"),
                embed: helpmsg.embeds[0],
                components: alldisabledbuttons
              });
            });
            setTimeout(function () {
              if (!edited) helpmsg.edit({
                content: "Time has ended type ".concat(prefix, "help again!"),
                embed: helpmsg.embeds[0],
                components: alldisabledbuttons
              });
            }, 180e3 + 150);

          case 102:
            _context2.next = 108;
            break;

          case 104:
            _context2.prev = 104;
            _context2.t1 = _context2["catch"](1);
            console.log(String(_context2.t1.stack).bgRed);
            return _context2.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context2.t1)).substr(0, 2000), "```"))));

          case 108:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 104], [64, 68, 72, 80], [73,, 75, 79]]);
  }
};