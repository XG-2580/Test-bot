"use strict";

var weather = require("weather-js");

var _require = require("discord.js"),
    Client = _require.Client,
    Collection = _require.Collection,
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var path = require("path");

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  useage: "".concat(path.parse(__filename).name, "<C/F><Location>"),
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, degree;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");

            if (client.settings.get(message.guild.id, "FUN")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("THIS COMMAND IS CURRENTLY DISABLED").setDescription("An Admin can enable it with: `".concat(prefix, "setup-commands`"))));

          case 3:
            if (args[0]) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", message.channel.send("Wrong Format try:`".concat(config.prefix, "weather<C/F><Location>`")));

          case 5:
            if (!(args[0].toLowerCase() === "c" || args[0].toLowerCase() === "f")) {
              _context.next = 9;
              break;
            }

            degree = args[0].toUpperCase();
            _context.next = 10;
            break;

          case 9:
            return _context.abrupt("return", message.channel.send("Enter a valid degree type (C | F)."));

          case 10:
            if (args[1]) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", message.channel.send("Enter a location to search for."));

          case 12:
            weather.find({
              search: args[1],
              degreeType: degree
            }, function (e, result) {
              if (e) return console.log(String(e.stack).red);

              try {
                var embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Weather").setThumbnail(result[0].current.imageUrl).setDescription("Showing weather data for ".concat(result[0].location.name)).addField("**Temp:**", "".concat(result[0].current.temperature, "\xB0").concat(result[0].location.degreetype), true).addField("**Weather:**", "".concat(result[0].current.skytext), true).addField("**Day:**", "".concat(result[0].current.shortday), true).addField("**Feels like:**", "".concat(result[0].current.feelslike, "\xB0").concat(result[0].location.degreetype), true).addField("**Humidity:**", "".concat(result[0].current.humidity, "%"), true).addField("**Wind:**", "".concat(result[0].current.winddisplay), true);
                message.channel.send(embed);
              } catch (e) {
                console.log(String(e.stack).bgRed);
                return message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(e)).substr(0, 2000), "```")));
              }
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};