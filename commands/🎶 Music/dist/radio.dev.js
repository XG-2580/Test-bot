"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var radios = require("../../base-system/radiostations.json");

var playermanager = require("../../handlers/playermanager");

var _require2 = require("../../handlers/functions"),
    stations = _require2.stations;

module.exports = {
  name: "radio",
  category: "\uD83C\uDFB6 Music",
  aliases: ["stream"],
  description: "Plays a defined radiostream",
  usage: "radio <1-183>",
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  run: function run(client, message, args, cmduser, text, prefix, player) {
    var es, volume, args2, song, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "MUSIC")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            _context.prev = 3;

            if (args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", stations(client, config.prefix, message));

          case 6:
            if (!isNaN(args[0])) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Not a valid radio station").setDescription("Please use a Number between `1` and `183`")));

          case 8:
            if (!(Number(args[1]) > 150 || Number(args[1]) < 1)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Volume Number out of Range").setDescription("Please use a Number between `1` and `150`")));

          case 10:
            //if its not a number for volume, set it to 50
            if (isNaN(args[1])) {
              volume = 50;
            } //otherwise set it to the args
            else {
                volume = args[1];
              } //define args 2 of each single input


            if (!(Number([args[0]]) > 0 && Number(args[0]) <= 10)) {
              _context.next = 15;
              break;
            }

            args2 = radios.EU.United_Kingdom[Number(args[0]) - 1].split(" ");
            _context.next = 80;
            break;

          case 15:
            if (!(Number([args[0]]) > 10 && Number(args[0]) <= 20)) {
              _context.next = 19;
              break;
            }

            args2 = radios.EU.Austria[Number(args[0]) - 10 - 1].split(" ");
            _context.next = 80;
            break;

          case 19:
            if (!(Number([args[0]]) > 20 && Number(args[0]) <= 30)) {
              _context.next = 23;
              break;
            }

            args2 = radios.EU.Belgium[Number(args[0]) - 20 - 1].split(" ");
            _context.next = 80;
            break;

          case 23:
            if (!(Number([args[0]]) > 30 && Number(args[0]) <= 40)) {
              _context.next = 27;
              break;
            }

            args2 = radios.EU.Bosnia[Number(args[0]) - 30 - 1].split(" ");
            _context.next = 80;
            break;

          case 27:
            if (!(Number([args[0]]) > 40 && Number(args[0]) <= 50)) {
              _context.next = 31;
              break;
            }

            args2 = radios.EU.Czech[Number(args[0]) - 40 - 1].split(" ");
            _context.next = 80;
            break;

          case 31:
            if (!(Number([args[0]]) > 50 && Number(args[0]) <= 60)) {
              _context.next = 35;
              break;
            }

            args2 = radios.EU.Denmark[Number(args[0]) - 50 - 1].split(" ");
            _context.next = 80;
            break;

          case 35:
            if (!(Number([args[0]]) > 60 && Number(args[0]) <= 70)) {
              _context.next = 39;
              break;
            }

            args2 = radios.EU.Germany[Number(args[0]) - 60 - 1].split(" ");
            _context.next = 80;
            break;

          case 39:
            if (!(Number([args[0]]) > 70 && Number(args[0]) <= 80)) {
              _context.next = 43;
              break;
            }

            args2 = radios.EU.Hungary[Number(args[0]) - 70 - 1].split(" ");
            _context.next = 80;
            break;

          case 43:
            if (!(Number([args[0]]) > 80 && Number(args[0]) <= 90)) {
              _context.next = 47;
              break;
            }

            args2 = radios.EU.Ireland[Number(args[0]) - 80 - 1].split(" ");
            _context.next = 80;
            break;

          case 47:
            if (!(Number([args[0]]) > 90 && Number(args[0]) <= 100)) {
              _context.next = 51;
              break;
            }

            args2 = radios.EU.Italy[Number(args[0]) - 90 - 1].split(" ");
            _context.next = 80;
            break;

          case 51:
            if (!(Number([args[0]]) > 100 && Number(args[0]) <= 110)) {
              _context.next = 55;
              break;
            }

            args2 = radios.EU.Luxembourg[Number(args[0]) - 100 - 1].split(" ");
            _context.next = 80;
            break;

          case 55:
            if (!(Number([args[0]]) > 110 && Number(args[0]) <= 120)) {
              _context.next = 59;
              break;
            }

            args2 = radios.EU.Romania[Number(args[0]) - 110 - 1].split(" ");
            _context.next = 80;
            break;

          case 59:
            if (!(Number([args[0]]) > 120 && Number(args[0]) <= 130)) {
              _context.next = 63;
              break;
            }

            args2 = radios.EU.Serbia[Number(args[0]) - 120 - 1].split(" ");
            _context.next = 80;
            break;

          case 63:
            if (!(Number([args[0]]) > 130 && Number(args[0]) <= 140)) {
              _context.next = 67;
              break;
            }

            args2 = radios.EU.Spain[Number(args[0]) - 130 - 1].split(" ");
            _context.next = 80;
            break;

          case 67:
            if (!(Number([args[0]]) > 140 && Number(args[0]) <= 150)) {
              _context.next = 71;
              break;
            }

            args2 = radios.EU.Sweden[Number(args[0]) - 140 - 1].split(" ");
            _context.next = 80;
            break;

          case 71:
            if (!(Number([args[0]]) > 150 && Number(args[0]) <= 160)) {
              _context.next = 75;
              break;
            }

            args2 = radios.EU.Ukraine[Number(args[0]) - 150 - 1].split(" ");
            _context.next = 80;
            break;

          case 75:
            if (!(Number([args[0]]) > 160 && Number(args[0]) <= 183)) {
              _context.next = 79;
              break;
            }

            args2 = radios.OTHERS.request[Number(args[0]) - 160 - 1].split(" "); //if not found send an error

            _context.next = 80;
            break;

          case 79:
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("Radio Station not found").setDescription("Please use a Station between `1` and `183`")));

          case 80:
            //get song information of it
            song = {
              title: args2[0].replace("-", " "),
              url: args2[1]
            }; //define an embed

            embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Searching: ".concat(emoji.msg.search) + song.title);

            try {
              embed.setURL(song.url);
            } catch (_unused) {} //send the message of the searching


            message.channel.send(embed); //play the radio but make the URL to an array ;) like that: [ `urlhere` ]

            playermanager(client, message, Array(song.url), "song:radio");
            _context.next = 91;
            break;

          case 87:
            _context.prev = 87;
            _context.t0 = _context["catch"](3);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 91:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 87]]);
  }
};