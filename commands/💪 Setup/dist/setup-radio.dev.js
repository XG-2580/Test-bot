"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var Discord = require("discord.js");

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var radios = require("../../base-system/radiostations.json");

var playermanager = require("../../handlers/playermanager");

var _require2 = require("../../handlers/functions"),
    stations = _require2.stations,
    databasing = _require2.databasing;

module.exports = {
  name: "setup-radio",
  category: "💪 Setup",
  aliases: ["setupradio", "setup-waitingroom", "setupwaitingroom", "radio-setup", "radiosetup", "waitingroom-setup", "waitingroomsetup"],
  cooldown: 10,
  usage: "setup-radio <RadioStation Num.>   -->    while beeing in a radio station",
  description: "Manage the Waitingroom System / 24/7 Radio System",
  memberpermissions: ["ADMINISTRATOR"],
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, adminroles, channel, player, volume, args2, song, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            adminroles = client.settings.get(message.guild.id, "adminroles"); //get the channel instance from the Member

            channel = message.member.voice.channel; //if the member is not in a channel, return

            if (channel) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setTitle("You need to join a voice channel.")));

          case 6:
            //get the player instance
            player = client.manager.players.get(message.guild.id); //if there is a player and they are not in the same channel, return Error

            if (!(player && player.state === "CONNECTED")) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(player.destroy());

          case 10:
            if (args[0]) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", stations(client, config.prefix, message));

          case 12:
            if (!isNaN(args[0])) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("Not a valid radio station").setDescription("Please use a Number between `1` and `183`")));

          case 14:
            if (!(Number(args[1]) > 150 || Number(args[1]) < 1)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("Volume Number out of Range").setDescription("Please use a Number between `1` and `150`")));

          case 16:
            //if its not a number for volume, set it to 50
            if (isNaN(args[1])) {
              volume = 50;
            } //otherwise set it to the args
            else {
                volume = args[1];
              } //define args 2 of each single input


            if (!(Number([args[0]]) > 0 && Number(args[0]) <= 10)) {
              _context.next = 21;
              break;
            }

            args2 = radios.EU.United_Kingdom[Number(args[0]) - 1].split(" ");
            _context.next = 86;
            break;

          case 21:
            if (!(Number([args[0]]) > 10 && Number(args[0]) <= 20)) {
              _context.next = 25;
              break;
            }

            args2 = radios.EU.Austria[Number(args[0]) - 10 - 1].split(" ");
            _context.next = 86;
            break;

          case 25:
            if (!(Number([args[0]]) > 20 && Number(args[0]) <= 30)) {
              _context.next = 29;
              break;
            }

            args2 = radios.EU.Belgium[Number(args[0]) - 20 - 1].split(" ");
            _context.next = 86;
            break;

          case 29:
            if (!(Number([args[0]]) > 30 && Number(args[0]) <= 40)) {
              _context.next = 33;
              break;
            }

            args2 = radios.EU.Bosnia[Number(args[0]) - 30 - 1].split(" ");
            _context.next = 86;
            break;

          case 33:
            if (!(Number([args[0]]) > 40 && Number(args[0]) <= 50)) {
              _context.next = 37;
              break;
            }

            args2 = radios.EU.Czech[Number(args[0]) - 40 - 1].split(" ");
            _context.next = 86;
            break;

          case 37:
            if (!(Number([args[0]]) > 50 && Number(args[0]) <= 60)) {
              _context.next = 41;
              break;
            }

            args2 = radios.EU.Denmark[Number(args[0]) - 50 - 1].split(" ");
            _context.next = 86;
            break;

          case 41:
            if (!(Number([args[0]]) > 60 && Number(args[0]) <= 70)) {
              _context.next = 45;
              break;
            }

            args2 = radios.EU.Germany[Number(args[0]) - 60 - 1].split(" ");
            _context.next = 86;
            break;

          case 45:
            if (!(Number([args[0]]) > 70 && Number(args[0]) <= 80)) {
              _context.next = 49;
              break;
            }

            args2 = radios.EU.Hungary[Number(args[0]) - 70 - 1].split(" ");
            _context.next = 86;
            break;

          case 49:
            if (!(Number([args[0]]) > 80 && Number(args[0]) <= 90)) {
              _context.next = 53;
              break;
            }

            args2 = radios.EU.Ireland[Number(args[0]) - 80 - 1].split(" ");
            _context.next = 86;
            break;

          case 53:
            if (!(Number([args[0]]) > 90 && Number(args[0]) <= 100)) {
              _context.next = 57;
              break;
            }

            args2 = radios.EU.Italy[Number(args[0]) - 90 - 1].split(" ");
            _context.next = 86;
            break;

          case 57:
            if (!(Number([args[0]]) > 100 && Number(args[0]) <= 110)) {
              _context.next = 61;
              break;
            }

            args2 = radios.EU.Luxembourg[Number(args[0]) - 100 - 1].split(" ");
            _context.next = 86;
            break;

          case 61:
            if (!(Number([args[0]]) > 110 && Number(args[0]) <= 120)) {
              _context.next = 65;
              break;
            }

            args2 = radios.EU.Romania[Number(args[0]) - 110 - 1].split(" ");
            _context.next = 86;
            break;

          case 65:
            if (!(Number([args[0]]) > 120 && Number(args[0]) <= 130)) {
              _context.next = 69;
              break;
            }

            args2 = radios.EU.Serbia[Number(args[0]) - 120 - 1].split(" ");
            _context.next = 86;
            break;

          case 69:
            if (!(Number([args[0]]) > 130 && Number(args[0]) <= 140)) {
              _context.next = 73;
              break;
            }

            args2 = radios.EU.Spain[Number(args[0]) - 130 - 1].split(" ");
            _context.next = 86;
            break;

          case 73:
            if (!(Number([args[0]]) > 140 && Number(args[0]) <= 150)) {
              _context.next = 77;
              break;
            }

            args2 = radios.EU.Sweden[Number(args[0]) - 140 - 1].split(" ");
            _context.next = 86;
            break;

          case 77:
            if (!(Number([args[0]]) > 150 && Number(args[0]) <= 160)) {
              _context.next = 81;
              break;
            }

            args2 = radios.EU.Ukraine[Number(args[0]) - 150 - 1].split(" ");
            _context.next = 86;
            break;

          case 81:
            if (!(Number([args[0]]) > 160 && Number(args[0]) <= 183)) {
              _context.next = 85;
              break;
            }

            args2 = radios.OTHERS.request[Number(args[0]) - 160 - 1].split(" "); //if not found send an error

            _context.next = 86;
            break;

          case 85:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(client.user.username, es.footericon).setTitle("Radio Station not found").setDescription("Please use a Station between `1` and `183`")));

          case 86:
            //get song information of it
            song = {
              title: args2[0].replace("-", " "),
              url: args2[1]
            }; //define an embed

            embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Searching: ".concat(emoji.msg.search) + song.title);

            try {
              embed.setURL(song.url);
            } catch (_unused) {} //send the message of the searching <a:Playing_Audio:859459305152708630> <a:Playing_Audio:859459305152708630> 


            message.reply(new Discord.MessageEmbed().setTitle("<a:Playing_Audio:859459305152708630> Setup Complete for Radio Station:  " + song.title).setColor("#7fafe3").setDescription("Bound to Channel: `".concat(channel.name, "`")).setURL(song.url).setFooter(client.user.username, es.footericon));
            client.settings.set(message.guild.id, channel.id, "channel");
            client.settings.set(message.guild.id, song.url, "song");
            client.settings.set(message.guild.id, volume, "volume"); //play the radio but make the URL to an array ;) like that: [ `urlhere` ]

            playermanager(client, message, Array(client.settings.get(message.guild.id, "song")), "song:radioraw", channel, message.guild);
            _context.next = 100;
            break;

          case 96:
            _context.prev = 96;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Something went Wrong").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 100:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 96]]);
  }
};