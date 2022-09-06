const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  id: "tkt",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle(`Confirmation`)
      .setDescription(
        "Are you sure you wanna open a ticket? This will send a notification to all the online admins in the discord server and make a new channel just for your conversation with the admins. Please don't instantly close your ticket after making."
      )
      .setColor("BLURPLE");

    const btn = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Continue")
        .setCustomId("tkt:m")
        .setStyle("DANGER")
    );

    interaction.reply({
      embeds: [emb],
      components: [btn],
      ephemeral: true,
    });
  },
};
