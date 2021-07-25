const { MessageEmbed } = require("discord.js");
const config = require("../.config.json");
var ee = require("../../base-system/embed.json");
const emoji = require("../../base-system/emoji.json");
module.exports = {
    name: "togglerequestonly",
    aliases: ["togglerequest", "tro"],
    category: "⚙️ Settings",
    description: "Toggles if u are allowed to use MUSIC and FILTER Comamnds in different channels too! Default: true == Not allowed",
    usage: "togglerequestonly",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `requestonly`), `requestonly`);
      
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${client.settings.get(message.guild.id, `requestonly`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Request Only`)
        .setDescription(`You are now ${client.settings.get(message.guild.id, `requestonly`) ? `` : `not`} allowed to use Commands in different Channels`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(es.footertext, es.footericon)
            .setTitle(`An error occurred`)
            .setDescription(`${e.message}`)
        );
    }
  }
};

