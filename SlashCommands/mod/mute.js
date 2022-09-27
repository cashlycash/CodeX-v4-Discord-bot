const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");

module.exports = {
  ephemeral: true,
  name: "mute",
  description: "MUTE",
  options: [
    {
      type: 3,
      name: "time",
      description: "time",
      type: "STRING",
      required: true,
    },
    {
      name: "user",
      description: "Person whom you want to mute",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Why mute",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.followUp(
        "You need `[MANAGE_GUILD]` permission to use this command"
      );
    }

    const u = interaction.options.getMember("user");
    const r = interaction.options.getString("reason");
    let timeAdded = interaction.options.getString("time");

    const ea = new MessageEmbed()
      .setTitle("You have been muted in CT LMAO")
      .setDescription(
        `**Staff Responsible** - <@!${interaction.user.id}> [${interaction.user.tag}]\n**Reason** - \`${r}\``
      );
    u.timeout(ms(timeAdded), r);
    u.send({ embeds: [ea] });
    interaction.followUp("Done!");
  },
};
