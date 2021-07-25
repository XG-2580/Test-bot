const config = require('config.json');
var ee = require('./base-system/');
const fetch = require('node-fetch');
const {messageEmbed} = require('discord.js');
module.exports = {
    name: "coliru",
    category: "⌨️ Programming",
    aliases: [""],
    cooldown: 5,
    usage: "coliru <code>",
    description: "Compile Code",
    run: async (client,message, args, user, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        try {
            const possiblecommands = {
                cpp: "g++ main.cpp -pthread -pedantic -Wall -Wextra && ./a.out",
                c: "g++ main.cpp -pthread -pedantic -Wall -Wextra && ./a.out",
                ruby: "ruby main.cpp",
                rb: "ruby main.cpp",
                lua: "lua main.cpp",
                python: "python main.cpp",
                py: "python main.cpp",
                haskell: "runhaskell main.cpp",
                hs: "runhaskell main.cpp",
                bash: "bash main.cpp",
                sh: "sh main.cpp",
                shell: "sh main.cpp"
            };

            const { lang, code } = getCodeBlock(args.join(" "));

            function getCodeBlock(txt) {
                const match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
                if (!match) return { lang:null, code: txt };
                if (match[1] && !match[2]) return { lang: null, code: match[1]};
                return { lang: match[1], code: match[2]};
            };

            if (!lang || !code)
                return message.channel.send({embed: new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(`You didn't provide a valid code`)
                    .setDescription(`Usage:\n${prefix}coliru` + "\\`\\`\\`lang\nCode\n\`\`\`\nCodeBlock language will be used to determine how to compile the code.")
                });
                const cmd = possiblecommands[lang];
                const src = code;
                const res = await fetch("http://coliru.stacked-crooked.com/compile", {
                    method: "POST",
                    body: JSON.stringify({ cmd, src })
                }).then((res) => res.text());
                
                async function post(message, { cmd, src }) {
                    const id = await fetch("http://coliru.stacked-crooked.com/share", {
                        method: "POST",
                        body: JSON.stringify({ cmd, src })
                    }).then((res) => res.text());
                    return message.channel.send(`**Output too long. View the results here:**\n> https://coliru.stacked-crooked.com/a/${id}`);
                }
            if (res.length < 1990) return message.channel.send(res, { code: lang });
			return post(message, { cmd, src });
	
        }catch (e) {
		    console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
			    .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
			    .setTitle(`An error occurred`)
			    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``));
            }
    }
}