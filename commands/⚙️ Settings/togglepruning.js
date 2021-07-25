const { MessageEmbed } = require("discord.js");
const config = require("../.config.json");
var ee = require("../../base-system/embed.json");
const emoji = require("../../base-system/emoji.json");
module.exports = {
    name: "togglepruning",
    aliases: ["toggleprunning", "pruning", "prunning", "toggeldebug", "debug"],
    category: "⚙️ Settings",
    description: "Toggles pruning. If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
    usage: "togglepruning",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `pruning`), `pruning`);
      
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${client.settings.get(message.guild.id, `pruning`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.ERROR} Disabled`} Pruning`)
        .setDescription(`I will now ${client.settings.get(message.guild.id, `pruning`) ? `` : `not`} send a message with Track Information, if I am on "AFK"`)
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

