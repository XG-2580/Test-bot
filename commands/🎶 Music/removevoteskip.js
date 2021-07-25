const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
module.exports = {
  name: `removevoteskip`,
  category: `🎶 Music`,
  aliases: [`rvs`, `removeskip`, `removevs`, `votestop`, `stopvote`],
  description: `Removes your Vote of the VoteSkip!`,
  usage: `removevoteskip`,
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
    try{
      //Check if there is a Dj Setup
      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {
        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;

        voteamount = Math.ceil(channelmembersize / 3);

        if (player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, false)
          player.set(`votes`, String(Number(player.get(`votes`)) - 1));
          return message.channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`Removed your Vote!`)
            .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`You havn't voted yet!!`)
            .setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`Cannot remove your Vote!`)
          .setDescription(`Because ther is no DJ-Role Setup created yet, create it by typing \`${prefix}adddj @DJ-Setup\``)
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

