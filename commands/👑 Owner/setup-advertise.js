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
  name: "setup-advertise",
  category: "š advertise",
  aliases: ["setup-advert", "setupadvertise", "setupadvert"],
  cooldown: 5,
  usage: "setup-advertise  -->  Follow the Steps",
  description: "Changes if the Advertisement of BERO-HOST.de Should be there or NOT",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`You are not allowed to run this Command`)
        .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
      });
    try {
      
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({embed: new MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color)
        .setDescription(`1ļøā£ **== ${client.adenabled ? "`ā Disable`" : "`āļø Enable`"} Advertisement**\n\nš **== Show Settings**\n\n**NOTE:**\n> *You can't remove a Owner, which means you need to get in touch with: \`XG#2846\` to do so!*\n*On every Bot Restart, it will be enabled again*\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      })

      try {
        tempmsg.react("1ļøā£")
        tempmsg.react("š")
      } catch (e) {
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1ļøā£") temptype = "toggle"
          else if (reaction.emoji.name === "š") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

        const d2p = (bool) => bool ? "`āļø Enabled`" : "`ā Disabled`"; 

        if (temptype == "toggle") {
          client.adenabled = !client.adenabled;
          return message.reply(new Discord.MessageEmbed()
            .setTitle(`The Bero-Host Advertisement System is now ${d2p(client.adenabled)}!`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        } else if (temptype == "thesettings") {
          
          var embed = new MessageEmbed()
          .setTitle(`š Settings of the Bero-Host Advertisement System`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`It is on: ${d2p(client.adenabled)}\n\n*On every Bot Restart, it will be enabled again*`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
  
          return message.reply({embed: embed});
        } else {
        return message.reply({embed: new MessageEmbed()
          .setTitle("ERROR | PLEASE CONTACT `XG#2846`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      });
    }
  },
};
