const { 
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");

module.exports = {
  ephemeral: true,
  name: "mute",
  description: "MUTE",
  options: [
    {
      name: "user",
      description: "Person whom you want to mute",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "Why mute",
      type: "STRING",
      required: true
    }
  ],
  run: async (client, interaction) => {
    const u = interaction.options.getMember("user")
    const r = interaction.options.get("reason")
    
    const ea = new MessageEmbed()
    	.setTitle('You have been muted in SPECTRAL.HOST')
    	.setDescription(`**Staff Responsible** - <@!${interaction.user.id}> [${interaction.user.tag}]\n**Reason** - \`${r}\``)
    u.timeout(43200000, r)
    u.send({embeds: [ea]})
    interaction.followUp('Done!')
  },
};