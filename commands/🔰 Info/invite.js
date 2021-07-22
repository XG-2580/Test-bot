const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://xg-bot.netlify.app")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_public_invite, button_support_dc, button_invite]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting XG Services")
          .addField(`Bot Powered by XG`, `**[Invite Public Bot](https://xg-bot.netlify.app)  •  [Support Server/Get your Own Bot](https://xg-bot.netlify.app)**\n\n[*Invite* **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
          .setFooter("XG Services | powered by XG", "https://media.discordapp.net/attachments/845646789020745738/856873122862727208/standard.gif?width=351&height=45"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}