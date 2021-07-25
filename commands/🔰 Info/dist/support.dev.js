"use strict";

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var config = require("../.config.json");

var ee = require("../../base-system/embed.json");

var emoji = require("../../base-system/emoji.json");

var _require2 = require('discord-buttons'),
    MessageButton = _require2.MessageButton;

module.exports = {
  name: "support",
  category: "🔰 Info",
  usage: "invite",
  description: "Sends you the Support Server Link",
  run: function run(client, message, args, cmduser, text, prefix) {
    var es, button_public_invite, button_support_dc, button_invite, allbuttons;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            es = client.settings.get(message.guild.id, "embed");
            _context.prev = 1;
            button_public_invite = new MessageButton().setStyle('url').setLabel('Invite Public Bot').setURL("discord.gg/sakshyam");
            button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.com/invite/FQGXbypRf8");
            button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL("https://discord.com/api/oauth2/authorize?client_id=".concat(client.user.id, "&permissions=8&scope=bot")); //array of all buttons

            allbuttons = [button_public_invite, button_support_dc, button_invite];
            message.channel.send({
              embed: new MessageEmbed().setColor(ee.color).setTitle(":tickets: You Need Help? **JOIN OUR SUPPORT SERVER**").setDescription("**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=863501489082859542&permissions=8&scope=bot)  \u2022  [WEBSITE](https://topicbotlist.tk/)  \u2022  [Support Server](discord.gg/sakshyam)**").setFooter("Zalgo", "https://imgur.com/jPItIw0.gif").setURL("https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot"),
              buttons: allbuttons
            });
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(String(_context.t0.stack).bgRed);
            return _context.abrupt("return", message.channel.send(new MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("An error occurred").setDescription("```".concat(String(JSON.stringify(_context.t0)).substr(0, 2000), "```"))));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }
};