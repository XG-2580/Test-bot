const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
const songoftheday = require(`../../base-system/songoftheday.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `playsongoftheday`,
  category: `🎶 Music`,
  aliases: [`psongoftheday`],
  description: `Plays the Song of the Day`,
  usage: `playsongoftheday`,
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
      //play the SONG from YOUTUBE
      playermanager(client, message, Array(songoftheday.track.url), `song:youtube`);
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

