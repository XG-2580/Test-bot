const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `autoplay`,
  category: `🎶 Music`,
  aliases: [`ap`, `toggleauto`, `toggleautoplay`, `toggleap`],
  description: `Toggles Autoplay on/off`,
  usage: `autoplay`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
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
    try {
      //toggle autoplay
      player.set(`autoplay`, !player.get(`autoplay`))
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${player.get(`autoplay`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Autoplay`)
        .setDescription(`To ${player.get(`autoplay`) ? `disable` : `enable` } it type: \`${prefix}autoplay\``)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );
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

