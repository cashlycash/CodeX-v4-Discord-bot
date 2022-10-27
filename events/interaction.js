const client = require("../index.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent } = require("discord-modals");
const ping = require("../functions/ping.js");
const db = require("quick.db");

client.on("modalSubmit", async (interaction) => {
  const s = interaction.customId.split(":");
  const se = interaction.customId;
  interaction.member = interaction.guild.members.cache.get(interaction.user.id);
  if (se == "verify") {
    const code = interaction.getTextInputValue("id");

    if (await db.get(`code_${code}`) > 0) {
      db.add(`code_${code}`, -1);
      db.set(`join_${interaction.user.id}`, code);
    } else {
      return interaction.reply({
        content: 'This token is invalid or has been used maximum times',
        ephemeral: true,
      });
    }

    const school = await db.get(`school_${code}`);

    client.config.verify.roles.forEach((r) => {
      interaction.member.roles.add(r);
    });
    interaction.member.setNickname(`${interaction.user.username} | ${school}`);

    interaction.reply({
      content: "Verified!!",
      ephemeral: true,
    });

    const member = interaction.member;

    const welcome = new MessageEmbed()
      .setColor("#3cff00")
      .setTimestamp()
      .setTitle(`${interaction.user.username} | ${school}, Welcome to ${member.guild.name}!`)
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
  } else if (se == "addevent") {
    const name = interaction.getTextInputValue("name");
    const desc = interaction.getTextInputValue("desc");
    const clas = interaction.getTextInputValue("class");
    var info = {
      name: name,
      desc: desc,
      clas: clas,
    };
    db.push("events", info);
    interaction.reply(
      `Event added\n\`\`\`Name - ${name}\nDesc - ${desc}\nClass - ${clas}\`\`\``
    );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const id = interaction.customId.toString();
    if (id == "ping_reload") {
      interaction.update(ping(interaction));
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId == "events") {
      const events = db.get("events");
      const ev = events[interaction.values[0]];
      const eb = new MessageEmbed()
        .setTitle(ev.name)
        .setDescription(`Sub event of CODEx v4.0 by TeamCodeTech BVN`)
        .addFields([
          { name: "Info -", value: ev.desc },
          { name: "Class -", value: ev.clas }
        ])
        .setColor("GREEN");

      const or = interaction.message.components[0];

      interaction.update({ embeds: [eb], components: [or] });
    }
  }
});
