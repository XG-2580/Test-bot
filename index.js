const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const fs = require("fs");
const Emoji = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Made by XG!')
});

app.listen(3000, () => {
  console.log('Client online!');
});


const client = new Discord.Client({

  fetchAllMembers: false,

  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  presence: {
    afk: false,
    activity: {
      name: `${require("./botconfig/config.json").status.text}`.replace("{prefix}", require("./botconfig/config.json").prefix), 
      type: require("./botconfig/config.json").status.type, 
    },
    status: "online"
  }
});

client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;



const Meme = require("memer-api");
client.memer = new Meme("rwYx7KVLEhC");


client.adenabled = true;
client.statusad = {
  name: `xg help`,
  type: "PLAYING", 
  url: "https://xg-bot.netlify.app/"
};
client.spacedot = "・";
client.textad = "xg help";


//Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);

function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requirehandlers();

function requireallhandlers(){
  client.allhandlers = Array(
    "apply", "apply2", "apply3", "apply4", "apply5",
    "ticket", "ticket2", "ticket3", "ticket4", "ticket5",
    "roster", "roster2", "roster3",
    "welcome", "leave",
    "jointocreate", "logger", "reactionrole", "ranking",
    "antidiscord", "antilinks","anticaps", "blacklist", "keyword",
    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat"
  )
  client.allhandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requireallhandlers();


 client.login(process.env.TOKEN);

module.exports.requirehandlers = requirehandlers;
module.exports.requiresociallogs = requiresociallogs;
module.exports.requireallhandlers = requireallhandlers;