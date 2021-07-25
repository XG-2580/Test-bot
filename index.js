const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const fs = require("fs");
const Emoji = require("./base-system/emoji.json")
const config = require('./config.json');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Client ON')
});

app.listen(3000, () => {
  console.log('24/7 Bot started!');
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
      name: `${require('config.json').status.text}`.replace("{prefix}", require('config.json').prefix), 
      type: require('config.json').status.type, 
      url: require('config.json').status.url
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
  name: `-help`,
  type: "PLAYING", 
  url: "https://xg-bot.netlify.app/"
};
client.spacedot = "・";
client.textad = "-help";


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

function requiresociallogs(){
  client.socialhandlers = Array(
    "twitterfeed", /*"twitterfeed2",*/ "livelog", "youtube", "tiktok"
  );
  client.socialhandlers.forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); }catch (e){ console.log(e) }
  })
}requiresociallogs();

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


 client.login(config.token);

module.exports.requirehandlers = requirehandlers;
module.exports.requiresociallogs = requiresociallogs;
module.exports.requireallhandlers = requireallhandlers;