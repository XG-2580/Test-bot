"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require(".config.json");

var ee = require("../base-system/embed.json");

var _require2 = require("../handlers/functions"),
    format = _require2.format,
    databasing = _require2.databasing,
    escapeRegex = _require2.escapeRegex,
    delay = _require2.delay;

var playermanager = require("../handlers/playermanager");

module.exports = function _callee(client, message) {
  var db, channel, player, prefixRegex, _message$content$matc, _message$content$matc2, matchedPrefix, args, cmd, command, now, timestamps, cooldownAmount, expirationTime, timeLeft;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (message.author.id === client.user.id) {
            try {
              if (message) message["delete"]({
                timeout: 4000
              })["catch"](function (e) {
                return console.log("Couldn't delete msg, this is for preventing a bug".gray);
              });
            } catch (_unused) {
              /* */
            }
          } else {
            try {
              if (message) message["delete"]({
                timeout: 4000
              })["catch"](function (e) {
                return console.log("Couldn't delete msg, this is for preventing a bug".gray);
              });
            } catch (_unused2) {
              /* */
            }
          }

          if (!message.author.bot) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          // if the message  author is a bot, return aka ignore the inputs
          //getting the Database Data
          db = client.setups.get(message.guild.id); //getting the Voice Channel Data of the Message Member

          channel = message.member.voice.channel; //if not in a Voice Channel return!

          if (channel) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel.")));

        case 8:
          //get the lavalink erela.js player information
          player = client.manager.players.get(message.guild.id); //if there is a player and the user is not in the same channel as the Bot return information message

          if (!(player && channel.id !== player.voiceChannel)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("I am already playing somewhere else!").setDescription("You can listen to me in: `".concat(message.guild.channels.cache.get(player.VoiceChannel).name, "`"))));

        case 11:
          if (!(channel.id !== db.voicechannel)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in the: `".concat(message.guild.channels.cache.get(db.voicechannel).name, "` VoiceChannel"))));

        case 13:
          //get the prefix regex system
          prefixRegex = new RegExp("^(<@!?".concat(client.user.id, ">|").concat(escapeRegex(config.prefix), ")\\s*")); //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
          //if there is no prefix attached to that message, then search a song on youtueb

          if (prefixRegex.test(message.content)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", playermanager(client, message, message.content.trim().split(/ +/), "song:youtube"));

        case 16:
          //if there is a attached prefix try executing a cmd!
          _message$content$matc = message.content.match(prefixRegex), _message$content$matc2 = _slicedToArray(_message$content$matc, 2), matchedPrefix = _message$content$matc2[1]; //now define the right prefix either ping or not ping

          args = message.content.slice(matchedPrefix.length).trim().split(/ +/); //create the arguments with sliceing of of the rightprefix length

          cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1

          if (!(cmd.length === 0)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("\u274C Unkown command, try: **`".concat(config.prefix, "help`**")).setDescription("To play Music simply type `".concat(config.prefix, "play <Title / Url>`\n\nYou can also just type the song name / url into the channel and I'll search for it!"))));

        case 21:
          command = client.commands.get(cmd); //get the command from the collection

          if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias

          if (!command) {
            _context.next = 45;
            break;
          }

          if (!client.cooldowns.has(command.name)) {
            //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
          }

          now = Date.now(); //get the current time

          timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands

          cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^

          if (!timestamps.has(message.author.id)) {
            _context.next = 33;
            break;
          }

          //if the user is on cooldown
          expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again

          if (!(now < expirationTime)) {
            _context.next = 33;
            break;
          }

          //if he is still on cooldonw
          timeLeft = (expirationTime - now) / 1000; //get the lefttime

          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("\u274C Please wait ".concat(timeLeft.toFixed(1), " more second(s) before reusing the `").concat(command.name, "` command."))));

        case 33:
          timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown

          setTimeout(function () {
            return timestamps["delete"](message.author.id);
          }, cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again

          _context.prev = 35;
          client.stats.inc(message.guild.id, "commands"); //counting our Database stats for SERVER

          client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL
          //run the command with the parameters:  client, message, args, user, text, prefix,

          command.run(client, message, args, message.member, args.join(" "), config.prefix);
          _context.next = 45;
          break;

        case 41:
          _context.prev = 41;
          _context.t0 = _context["catch"](35);
          console.log(String(_context.t0.stack).red);
          return _context.abrupt("return", message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ Something went wrong while, running the: `" + command.name + "` command").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

        case 45:
          _context.next = 50;
          break;

        case 47:
          _context.prev = 47;
          _context.t1 = _context["catch"](0);
          console.log(String(_context.t1.stack).bgRed);

        case 50:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 47], [35, 41]]);
};