const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "ping",
	run: async (client, message, args) => {
		const msg = await message.channel.send('Loading data....')
        const emb = new MessageEmbed()	
        	.setTitle('Ping')
        	.setColor('RED')
        	.setDescription(`Total Ping - ${(msg.createdTimestamp - message.createdTimestamp) + Math.round(client.ws.ping)}ms\nServer ping is ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPI ping is ${Math.round(client.ws.ping)}ms`)
    	msg.edit({content: null, embeds: [emb]})
	}
}
