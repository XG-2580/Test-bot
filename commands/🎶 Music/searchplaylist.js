const Discord = require(`discord.js`)
const {
    MessageEmbed
} = require(`discord.js`)
const config = require(`../.config.json`)
var ee = require(`../../base-system/embed.json`);
const emoji = require(`../../base-system/emoji.json`);
const playermanager = require(`../../handlers/playermanager`)
const {
    createBar,
    format
} = require(`../../handlers/functions`);
module.exports = {
    name: `searchplaylist`,
    category: `🎶 Music`,
    aliases: [`searchpl`],
    description: `Searches a playlist from youtube`,
    usage: `searchplaylist <Name / URL>`,
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
            //search the song for YOUTUBE
            //playermanager(client, message, args, `searchplaylist:youtube`);
            message.channel.send(`THIS CMD IS NOT FINISHED YET!`)
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

