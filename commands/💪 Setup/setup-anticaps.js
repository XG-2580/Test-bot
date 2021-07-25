var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../.config.json`);
var ee = require(`../../base-system/embed.json`);
var emoji = require(`../../base-system/emoji.json`);
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-anticaps",
  category: "💪 Setup",
  aliases: ["setupanticaps", "setup-caps", "setupcaps", "anticaps-setup", "anticapssetup"],
  cooldown: 5,
  usage: "setup-anticaps  -->  Follow the Steps",
  description: "Enable + Change the maximum Percent of UPPERCASE (caps) inside of a Message",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==  \`✔️ Enable\` + Set** the maximum amount of CAPS in a message\n\n2️⃣ **== \`❌ Disable\`** the Anti Caps System\n\n📑 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
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
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "disable"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });


      if (temptype == "set") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("To activate the Anticaps System, enter the percent amount of how much caps in a message is allowed")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Send the amount now! (recommendet: \`60%\`)`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message.content) {
              var userpercent = Number(message.content.trim().replace("%", "").split(" ")[0]);
              if(userpercent > 100 || userpercent < 0) 
                return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle("ERROR | Percent out of Range!")
                    .setColor(es.wrongcolor)
                    .setDescription(`It must be between \`0%\` and \`100%\``)
                    .setFooter(es.footertext, es.footericon)
                  }); 
              try {
                client.settings.set(message.guild.id, userpercent, "anticaps.percent");
                client.settings.set(message.guild.id, true, "anticaps.enabled");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(`The Anticaps system is now enabled!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`If a non Admin User types a message with more then ${userpercent}% amount of CAPS his message will be deleted + he will be "warned" (no warn system warn but yeah)`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                console.log(e)
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle("ERROR | Something went wrong, please contact: `XG#2846`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle("ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
      } else if (temptype == "disable") {
        try {
          client.settings.set(message.guild.id, false, "anticaps.enabled");
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(`The AntiCaps System is now **disabled**`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`To enabled it type \`${prefix}setup-anticaps\``.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          });
        } catch (e) {
          console.log(e)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle("ERROR | Something went wrong, please contact: `XG#2846`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          });
        }
      
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `anticaps`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`📑 Settings of the Anti Caps System`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`**Enabled:** ${thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>"}
          
**Percentage, of Message allowed to be in caps:** \`${thesettings.percent} %\``.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      } else {
        return message.reply({embed: new Discord.MessageEmbed()
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

