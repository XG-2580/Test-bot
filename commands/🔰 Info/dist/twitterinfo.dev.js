"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var moment = require('moment');

var twitconfig = require("../../social_log/twitter.json");

var Twit = require('twit');

module.exports = {
  name: "twitterinfo",
  aliases: ["twitterinfo", "twitteruserinfo", "tuserinfo", "uinfo", "tuser", "twitteruser"],
  category: "🔰 Info",
  description: "Get information about a Twitter User",
  usage: "twitterinfo <TWITTERUSER>",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, T;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            T = new Twit({
              consumer_key: twitconfig.consumer_key,
              consumer_secret: twitconfig.consumer_secret,
              access_token: twitconfig.access_token,
              access_token_secret: twitconfig.access_token_secret,
              timeout_ms: twitconfig.timeout_ms,
              strictSSL: twitconfig.strictSSL
            });
            _context.next = 5;
            return regeneratorRuntime.awrap(T.get('users/search', {
              q: "".concat(args[0]),
              count: 1
            }, function (err, data, response) {
              if (err) return message.reply("UNABLE TO FIND USER");
              var user = data[0];
              if (!user) return message.reply("UNABLE TO FIND USER");
              var embed = new Discord.MessageEmbed().setColor("#".concat(user.profile_background_color)).setThumbnail(user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url).setFooter("ID: ".concat(user.id_str), user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url).addField("Name", "`".concat(user.name, "`"), true).addField("Created at:", "`".concat(moment(user.created_at).format("DD/MM/YYYY"), "`\n`").concat(moment(user.created_at).format("hh:mm:ss"), "`"), true).addField("Followers", "`".concat(user.followers_count, " Followers`"), true).addField("Friends", "`".concat(user.friends_count, " Friends`"), true).addField("Tweets", "`".concat(user.statuses_count, " Tweets`"), true);
              if (user.location) embed.addField("Location", "`".concat(user.location, "`"), true).setTitle("Twitterinformation about: `".concat(user.screen_name, "`")).setURL("https://twitter.com/".concat(user.screen_name));
              if (user.description) embed.setDescription("```".concat(user.description, "```"));
              message.channel.send(embed);
            }));

          case 5:
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("ERROR | An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 11:
            return _context.abrupt("return");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 7]]);
  }
};