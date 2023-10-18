const {
	MessageEmbed,
	MessageButton,
	MessageSelectMenu,
	MessageActionRow
} = require('discord.js');

const db = require(`quick.db`)

module.exports = {
  name: "subevents",
  description: "subevents of CODEx v4.0",
  run: async (client, interaction) => {
    
		const events = db.get('events')
		const emb = new MessageEmbed()
			.setTitle('Events -')
			.setDescription('Please browse thru the events and click on any to get more details about it')
			.setColor('BLUE')

		const row = new MessageActionRow()
			.setComponents(
				new MessageSelectMenu()
					.setCustomId('events')
					.setPlaceholder('Click to browse')
					.addOptions(
						events.map((event, index) => {
							return {
								label: event.name,
								description: `Class - ${event.clas}`,
								value: index.toString(),
							}
						})
					)
			)

		interaction.followUp({ embeds: [emb], components: [row] })
  }
}