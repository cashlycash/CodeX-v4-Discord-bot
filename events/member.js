const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../index");
const db = require("quick.db");

client.on("guildMemberAdd", async (member) => {
  const row = new MessageActionRow().setComponents(
    new MessageButton()
      .setLabel("Verify portal")
      .setStyle("LINK")
      .setURL(client.config.verify.panelurl)
  );
  member.send({
    content:
      "> Please verify yourself to get the full access of the server\n> Click the button below to go the verification portal",
    components: [row],
  });
});

client.on("guildMemberRemove", async (member) => {
  const emb = new MessageEmbed()
    .setTitle(`${member.user.username} Left 😢`)
    .setDescription(`Hope to see them soon`)
    .setColor(`YELLOW`);

  member.guild.channels.cache
    .get(client.config.leave.channel)
    .send({ embeds: [emb] });

  code = await db.get(`join_${member.user.id}`);
  db.add(`code_${code}`, 1);
  db.delete(`join_${interaction.user.id}`);

  var count = member.guild.members.cache;
  const no = count.size;
  client.channels.cache
    .get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`, no));
});
