const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playtop`,
  category: `🎶 Music`,
  aliases: [`ptop`, `pt`],
  description: `Adds a song with the given name/url on the top of the queue`,
  usage: `playtop <link/query>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!args[0]) 
    return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<833101993668771842> You need to give me a URL or a Search term.`)
        );
    return playermanager(client, message, args, `playtop:youtube`);
  }
};
/**
 * @INFO
 * Bot Coded by XG#2846
 * @INFO
 * Work for XG | https://xg-bot.netlify.app/
 * @INFO
 * Please mention XG#2846, when using this Code!
 * @INFO
 */
