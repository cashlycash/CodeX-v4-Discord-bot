const Canvas = require("canvas");
const { registerFont, createCanvas } = require("canvas");
const fs = require("fs");
registerFont("./fonts/CAL.ttf", { family: "college" });
const { MessageAttachment } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../index");
const db = require("quick.db");

client.on("guildMemberAdd", async (member) => {
  const row = new MessageActionRow()
      .setComponents(
        new MessageButton() 
          .setLabel('Verify portal')
          .setStyle('LINK')
          .setURL('https://discord.com/channels/1004104875522666578/1004112419410423809/1009463580120326144')
      )
  member.send({
    content: "> Please verify yourself to get the full access of the server\n> Click the button below to go the verification portal",
    components: [row]
  })
});

client.on('guildMemberRemove', async member => {
	const emb = new MessageEmbed()
		.setTitle(`${member.user.username} Left 😢`)
		.setDescription(`Hope to see them soon`)
		.setColor(`YELLOW`)

	member.guild.channels.cache.get(client.config.leave.channel).send({embeds: [emb]})

	var count = member.guild.members.cache
	const no = count.filter(member => !member.user.bot).size
  client.channels.cache.get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`,no))
})