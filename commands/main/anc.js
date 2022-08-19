const { MessageEmbed } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
	name: "anc",
	run: async (client, message, args) => {
		if (!owners.includes(message.author.id)) {
			return message.channel.send("Limited To The Bot Owner Only!")
		}
        var ars = message.content.slice(4).split('<$>')
        const emb =  new MessageEmbed()
        	.setTitle(ars[0])
        	.setDescription(ars[1])
        	.setColor('BLURPLE')
		message.channel.send({embeds: [emb]})
	}
}
