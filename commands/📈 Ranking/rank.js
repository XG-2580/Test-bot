//Here the command starts
const config = require("../.config.json")
var ee = require("../../base-system/embed.json")
module.exports = {
	//definition
	name: "rank", //the name of the command 
	category: "📈 Ranking", //the category this will be listed at, for the help cmd
	aliases: [""], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "rank [@User]", //this is for the help command for EACH cmd
  	description: "Shows the Rank of a User", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {

	}
}
//-CODED-BY-XG#2846-//