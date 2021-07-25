const { MessageEmbed } = require(`discord.js`);
const config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
module.exports = {
  name: `reset`,
  aliases: [`hardreset`],
  category: `⚙️ Settings`,
  description: `Resets / Deletes all of the Setups as well as the prefix!`,
  usage: `reset`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try{
      
      
      if (message.member.guild.owner.id !== message.author.id)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`You don\'t have permission for this Command! *Only the Server-Owner*`)
        );
      
      let themsg = message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`Do you really want to reset all SETTINGS?`)
        .setDescription(`*Reply with:* **__\`yes\`__**`)
      ).then((msg) => {
        
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30 * 1000,
          errors: ['time']
        })
        
        .then(async collected => {
         
          if(collected.first().content.toLowerCase() === `yes`)
          {
            
            client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
            });
            
            client.settings.set(message.guild.id, {
                prefix: config.prefix,
                djroles: [],
                botchannel: [],
            });
            
            return message.channel.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`Resetted everything!`)
              .setDescription(`Prefix is now again: \`${config.prefix}\`\nNo more DJ ROLES, No more Setup, No more Bot Channels`)
            );
          }
          
        }).catch(e => {
          console.log(String(e.stack).yellow)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`CANCELLED CAUSE NOT THE RIGHT WORD / TIME RAN OUT!`)
          );
        })
      });
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

