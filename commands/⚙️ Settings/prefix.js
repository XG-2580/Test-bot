const { MessageEmbed } = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
module.exports = {
    name: `prefix`,
    aliases: [`changeprefix`],
    category: `⚙️ Settings`,
    description: `Let's you change the Prefix of the BOT`,
    usage: `prefix <NEW PREFIX>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
    
    
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Please provide a new prefix!`)
        .setDescription(`Current prefix: \`${prefix}\``)
      );
    
    if (args[1])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`The Prefix Can\'t have two spaces`)
      );
    
    if (args[0].length > 5)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`The Prefix Can\'t be Longer Then \`5\``)
      );
    
    client.settings.set(message.guild.id, args[0], `prefix`);
    
    return message.channel.send(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`Set New Prefix To **\`${args[0]}\`**`)
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