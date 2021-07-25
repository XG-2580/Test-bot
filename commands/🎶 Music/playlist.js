const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playlist`,
  category: `🎶 Music`,
  aliases: [`pl`],
  description: `Plays a playlist from youtube`,
  usage: `playlist <URL>`,
  cooldown: 10,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try{
      
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`You need to give me a URL or a search term.`)
        );
      //play the playlist
      playermanager(client, message, args, `playlist`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`An error occurred`)
      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
  );
    }
  }
};

