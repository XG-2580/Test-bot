"use strict";

var _require = require("erela.js"),
    Manager = _require.Manager,
    Spotify = require("erela.js-spotify"),
    Deezer = require("erela.js-deezer"),
    config = require("../.config.json"),
    clientID = config.spotify.clientID,
    clientSecret = config.spotify.clientSecret;

module.exports = function (client) {
  if (!clientID || !clientSecret) {
    client.manager = new Manager({
      nodes: config.clientsettings.nodes,
      plugins: [new Deezer()],
      send: function send(id, payload) {
        var guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      }
    });
  } else {
    client.manager = new Manager({
      nodes: config.clientsettings.nodes,
      plugins: [new Spotify({
        clientID: clientID,
        //get a clientid from there: https://developer.spotify.com/dashboard
        clientSecret: clientSecret
      }), new Deezer()],
      send: function send(id, payload) {
        var guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      }
    });
  } //require the other events


  require("./node_events")(client);

  require("./client_events")(client);

  require("./events")(client);
};
/**
 * @INFO
 * Bot Coded by XG#2846 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://Limsathya
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */