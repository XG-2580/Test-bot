const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
module.exports = {
  name: `loopqueue`,
  category: `🎶 Music`,
  aliases: [`repeatqueue`, `lq`, `rq`, `loopqu`, `repeatqu`],
  description: `Repeats the Queue`,
  usage: `loopqueue`,
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
      //define the Embed
      const embed = new MessageEmbed()
        .setTitle(`${emoji.msg.repeat_mode} Changed Queue loop to: ${player.queueRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      //If trackrepeat was active add informational message + disable it
      if (player.trackRepeat) {
        embed.setDescription(`And **Song** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setTrackRepeat(false);
      }
      //change Queue Mode
      player.setQueueRepeat(!player.queueRepeat);
      //Send Success Message
      return message.channel.send(embed);
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


