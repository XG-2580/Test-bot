const {
    MessageEmbed,
    MessageAttachment
  } = require("discord.js");
  const config = require("../.config.json");
  var ee = require("../../base-system/embed.json");
  const emoji = require(`../../base-system/emoji.json`);
  const fetch = require("node-fetch");
  module.exports = {
    name: "chess",
    category: "🎮 MiniGames",
    description: "Generate a chess.io Link to play a game of chess with your friends (through discord)",
    usage: "chess --> Click on the Link | YOU HAVE TO BE IN A VOICE CHANNEL!",
    /*
755827207812677713 Poker Night
773336526917861400 Betrayal.io
832012586023256104 Chess
773336526917861400 End-Game
755600276941176913 YouTube Together
814288819477020702 Fishington.io
    */
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
      try {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("Error | Please join a Voice Channel first")
        );
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) {
          const nochannel = new MessageEmbed()
          .setDescription(`I need \`CREATE_INSTANT_INVITE\` permission!`)
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          return message.channel.send(nochannel);
        }
  
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "832012586023256104", // chess
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) {
                  return message.channel.send(new MessageEmbed()
                  .setDescription(`Cannot start the chess, please retry`)
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon));
                }

                message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(`An error occurred`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            );
        }
    }
  }