const math = require('math-expression-evaluator');
const ms = require("ms");
const moment = require("moment")
const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../.config.json");
var ee = require("../../base-system/embed.json");
const emoji = require(`../../base-system/emoji.json`);
const { MessageButton, MessageActionRow } = require('discord-buttons')
const { Calculator } = require('weky')
module.exports = {
  name: "calculator",
  aliases: ["ti82", "taschenrechner"],
  category: "🏫 School Commands",
  description: "Allows you to use a calculator",
  usage: "calc",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "SCHOOL")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    await Calculator(message)
  }
};