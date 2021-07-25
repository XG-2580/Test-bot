var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
var emoji = require(`../../base-system/emoji.json`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: `cmdreload`,
  category: `👑 Owner`,
  aliases: [`commandreload`],
  description: `Reloads a command`,
  usage: `cmdreload <CMD>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
      );
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${emoji.msg.ERROR}  ERROR | Please include an argument`)
        );
      let reload = false;
      let thecmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      if(thecmd){
        for (let i = 0; i < client.categories.length; i += 1) {
          let dir = client.categories[i];
          try {
            delete require.cache[require.resolve(`../../commands/${dir}/${thecmd.name}.js`)] // usage !reload <name>
            client.commands.delete(thecmd.name)
            const pull = require(`../../commands/${dir}/${thecmd.name}.js`)
            client.commands.set(thecmd.name, pull)
            reload = true;
          } catch {}
        }
      } else {
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`Could not find: \`${args[0]}\``)
        );
      }
      if (reload)
        return message.channel.send(new MessageEmbed()
          .setColor(es.color)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`Reloaded \`${args[0]}\``)
        );
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`Could not reload: \`${args[0]}\``)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};

