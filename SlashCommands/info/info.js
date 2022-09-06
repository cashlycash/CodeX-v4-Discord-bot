const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  description: "Info about the bot",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle("Bot info")
      .setDescription("Here is some information about me!")
      .addFields(
        {
          name: "Developer",
          value: "Arnav Gupta | 9E (<@!908554250945183744>)",
          inline: true,
        },
        {
          name: "Creation time",
          value: "<t:1659467762:R>",
          inline: true,
        }
      )
      .setColor("BLURPLE")
      .setTimestamp()
      .setFooter({
        text: "Special thanks to Aryan and Samridh to allow Arnav to code this <3",
        iconURL: client.user.avatarURL(),
      });

    const row = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Talk to my daddy")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/channels/1004104875522666578/1009473661381652552"
        )
    );
    interaction.followUp({ embeds: [emb], components: [row] });
  },
};
