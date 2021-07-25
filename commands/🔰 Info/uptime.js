const {
  MessageEmbed
} = require("discord.js");
const config = require("../.config.json");
var ee = require("../../base-system/embed.json");
const emoji = require(`../../base-system/emoji.json`);
const {
  duration
} = require("../../handlers/functions")
const moment = require("moment")
module.exports = {
  name: "uptime",
  category: "🔰 Info",
  aliases: [""],
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let date = new Date()
      let timestamp = date.getTime() - Math.floor(client.uptime);
      message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`:white_check_mark: **${client.user.username}** Uptime`)
        .setDescription(`\`\`\`css\n${duration(client.uptime).map(i=> `${i}`).join(", ")}\`\`\``)
        .addField("**Date Launched**",  moment(timestamp).format("LLLL"))
      );
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

