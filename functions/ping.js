const client = require("../index.js")
const {
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
	MessageEmbed
} = require('discord.js');

function ping(message){
	var color = "#ffffff"
		var status = null
		var main_let = Date.now() - message.createdTimestamp
		main_let += Math.round(client.ws.ping)
		if (main_let > 0) {
			color = "90ee90"
			status = "VERY GOOD"
		}
		if (main_let > 100) {
			color = "#006400"
			status = "GOOD"
		}
		if (main_let > 150) {
			color = "#ffff00"
			status = "NORMAL"
		}
		if (main_let > 200) {
			color = "#ff0000"
			status = "BAD"
		}
		if (main_let > 250) {
			color = "#8b0000"
			status = "VERY BAD"
		}
		const emb = new MessageEmbed()
			.setTitle("Latency!")
			.setDescription(`All the Latency is listed below`)
			.addField("Bot Latency", `${Date.now() - message.createdTimestamp}ms`)
			.addField("API Latency", `${Math.round(client.ws.ping)}ms`)
			.addField("Overall", `${main_let}ms which is ${status}`)
			.setColor(color)
		const btn = new MessageActionRow()
			.setComponents(
				new MessageButton()
					.setCustomId("ping_reload")
					.setStyle("DANGER")
					.setLabel("Refresh")
					.setEmoji("914944293695782942")
			)
		return { embeds: [emb], components: [btn] }
}

module.exports = ping