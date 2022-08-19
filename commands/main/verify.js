const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
	name: "verify",
	run: (client, message, args) => {
		if (!owners.includes(message.author.id)) {
			return message.channel.send("Limited To The Bot Owner Only!")
		}
    const emb = new MessageEmbed()
      .setTitle('Verify')
      .setColor('#6600ff')
      .setDescription('Click the button bellow to verify and get access to the rest of the server')

    const btn = new MessageActionRow()
      .setComponents(
        new MessageButton()  
          .setLabel('Verify')
          .setCustomId('verify')
          .setStyle('SUCCESS')
      )
    message.channel.send({ embeds: [emb], components: [btn] })
		message.delete()
	}
}
