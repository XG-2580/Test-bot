const config = require("../.config.json");
var ee = require("../../base-system/embed.json");
const fetch = require("node-fetch");
const { STATUS_CODES } = require("http");
const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name: "npm",
    category: "⌨️ Programming",
    aliases: ["npmpackage", "npmpkg", "nodepackagemanager"],
    cooldown: 5,
    usage: "npm <package>",
    description: "Search the NPM Registry for a package information",
    run: async (client, message, args, user, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed")
		try {
			const pkg = args[0];
			if (!pkg)
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`You didn't provide a NPM-PACKAGE`)
					.setDescription(`Usage: \`${prefix}npm <package>\``)
				});

			const body = await fetch(`https://registry.npmjs.com/${pkg}`)
				.then((res) => {
				if(res.status === 404) throw "No results found.";
				return res.json();
				});
		
			const version = body.versions[body["dist-tags"].latest];
		
			let deps = version.dependencies ? Object.keys(version.dependencies) : null;
			let maintainers = body.maintainers.map((user) => user.name);
		
			if(maintainers.length > 10) {
				const len = maintainers.length - 10;
				maintainers = maintainers.slice(0, 10);
				maintainers.push(`...${len} more.`);
			}
		
			if(deps && deps.length > 10) {
				const len = deps.length - 10;
				deps = deps.slice(0, 10);
				deps.push(`...${len} more.`);
			}
		
			return message.channel.send({ embed: new MessageEmbed()
				.setTitle(`NPM - ${pkg}`)
				.setColor(es.color)
				.setFooter(es.footertext, es.footericon)
				.setURL(`https://npmjs.com/package/${pkg}`)
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
				.setDescription([
				body.description || "No Description.",
				`**Version:** ${body["dist-tags"].latest}`,
				`**License:** ${body.license}`,
				`**Author:** ${body.author ? body.author.name : "Unknown"}`,
				`**Modified:** ${new Date(body.time.modified).toDateString()}`,
				`**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`
				].join("\n")) });
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
			  .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
			  .setTitle(`An error occurred`)
			  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
			);
		  }
	
	}
}