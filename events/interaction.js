const client = require("../index.js");
const { MessageEmbed } = require("discord.js");

client.on("modalSubmit", async (interaction) => {
  const s = interaction.customId.split(":");
  const se = interaction.customId;
  if (se == "verify") {
    const name = interaction.getTextInputValue("name");
    const clas = interaction.getTextInputValue("class");
    const sec = interaction.getTextInputValue("sec");
    if (sec.length > 1) {
      return interaction.reply({
        content: "Please make sure that your section is just 1 character",
        ephemeral: true,
      });
    } else if (parseInt(clas) == NaN) {
      return interaction.reply({
        content: "Please make sure that your class is a number",
        ephemeral: true,
      });
    } else if (parseInt(clas) < 6 || parseInt(clas) > 12) {
      return interaction.reply({
        content:
          "Please make sure that your class is a number between 6 and 12",
        ephemeral: true,
      });
    }

    client.config.verify.roles.forEach((r) => {
      interaction.member.roles.add(r);
    });
    interaction.member.setNickname(`${name} | ${clas}-${sec}`);

    interaction.reply({
      content: "Verified!!",
      ephemeral: true,
    });

    const member = interaction.member;

    const welcome = new MessageEmbed()
      .setColor("#3cff00")
      .setTimestamp()
      .setTitle(`${name} | ${clas}-${sec}, Welcome to ${member.guild.name}!`)
      .setDescription(
        `Collect roles from <#${client.config.verify.channels.eventroles}> to get access to respective event updates. Incase of any queries use <#${client.config.verify.channels.ticket}>.`
      )
      .setThumbnail(await interaction.member.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: `We hope you have a good time at ${member.guild.name}`,
        iconURL: member.guild.iconURL({ dynamic: true }),
      });

    client.channels.cache
      .get(client.config.verify.channel)
      .send({ content: `<@!${interaction.user.id}>`, embeds: [welcome] });

    var count = member.guild.members.cache;
    const no = count.filter((member) => !member.user.bot).size;
    client.channels.cache
      .get(client.config.count.channel)
      .setName(client.config.count.format.replace(`:no:`, no));
  }
});
