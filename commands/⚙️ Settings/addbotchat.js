const { MessageEmbed } = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
module.exports = {
    name: `addbotchat`,
    aliases: [`addbotchannel`],
    category: `⚙️ Settings`,
    description: `Let's you enable a bot only chat where the community is allowed to use commands`,
    usage: `addbotchat <#chat>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      
      let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
      
      if (!channel)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Please add a Channel via ping, for example: #channel!`)
      );
      
      try {
          message.guild.channels.cache.get(channel.id)
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`It seems that the Channel does not exist in this Server!`)
        );
      }
      
      if(client.settings.get(message.guild.id,`botchannel`).includes(channel.id))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`This Channel is alerady in the List!`)
        );
      
      client.settings.push(message.guild.id, channel.id, `botchannel`);
      
      let leftb = ``;
      if(client.settings.get(message.guild.id, `botchannel`).join(``) ===``) leftb = `no Channels, aka all Channels are Bot Channels`
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
        leftb += `<#` +client.settings.get(message.guild.id, `botchannel`)[i] + `> | `
      }
      
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`Added the Bot-Chat \`${channel.name}\``)
        .setDescription(`All Bot Chats:\n> ${leftb.substr(0, leftb.length - 3)}`)
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

