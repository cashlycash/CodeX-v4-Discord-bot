const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../index");
const db = require("quick.db");

client.on("guildMemberAdd", async (member) => {

    const welcome = new MessageEmbed()
      .setColor("#3cff00")
      .setTimestamp()
      .setTitle(`${member.user.username}, Welcome to ${member.guild.name}!`)
      .setDescription(
        `Collect roles from <#${client.config.verify.channels.eventroles}> to get access to respective event updates. Incase of any queries use <#${client.config.verify.channels.ticket}>.`
      )
      .setThumbnail(await member.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: `We hope you have a good time at ${member.guild.name}`,
        iconURL: member.guild.iconURL({ dynamic: true }),
      });

    client.channels.cache
      .get(client.config.verify.channel)
      .send({ content: `<@!${member.user.id}>`, embeds: [welcome] });

    var count = member.guild.members.cache;
    const no = count.filter((member) => !member.user.bot).size;
    client.channels.cache
      .get(client.config.count.channel)
      .setName(client.config.count.format.replace(`:no:`, no));
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
  db.delete(`join_${member.user.id}`);

  var count = member.guild.members.cache;
  const no = count.size;
  client.channels.cache
    .get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`, no));
});
