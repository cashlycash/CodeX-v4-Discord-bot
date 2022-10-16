const client = require("../index.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent } = require("discord-modals");
const ping = require("../functions/ping.js");
const db = require("quick.db");

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
  } else if (se == "addevent") {
    const name = interaction.getTextInputValue("name");
    const host = interaction.getTextInputValue("host");
    const desc = interaction.getTextInputValue("desc");
    const clas = interaction.getTextInputValue("class");
    const sub = interaction.getTextInputValue("sub");
    var info = {
      name: name,
      host: host,
      desc: desc,
      clas: clas,
      sub: sub,
    };
    db.push("events", info);
    interaction.reply(
      `Event added\n\`\`\`Name - ${name}\nHost - ${host}\nDesc - ${desc}\nClass - ${clas}\nSub events - ${sub
        .split(",")
        .map((e) => {
          var r = e.split(":");
          return `${r[0]} - ${r[1]}`;
        })
        .join("\n")}\`\`\``
    );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const id = interaction.customId.toString();
    if (id == "ping_reload") {
      interaction.update(ping(interaction));
    } else if (sid[0] === "event") {
      if (sid[1] === "join") {
        const events = db.get("events");
        const ev = events[sid[2]];
        const eb = new MessageEmbed()
          .setTitle(ev.name)
          .setDescription(`Hosted by - ${ev.host}`)
          .addFields("INFO -", ev.description)
          .setColor("GREEN");

        const modal = new Modal()
          .setCustomId("verify")
          .setTitle(`Enter the info below`)
          .addComponents(
            new TextInputComponent()
              .setCustomId("name")
              .setLabel("Name")
              .setStyle("SHORT")
              .setPlaceholder("Write your name here")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("class")
              .setLabel("Class")
              .setStyle("SHORT")
              .setPlaceholder("Write your class here (eg: 6, 8, 12)")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sec")
              .setLabel("Section")
              .setStyle("SHORT")
              .setPlaceholder("Write your section here (eg: A, B, E)")
              .setRequired(true),
            new TextInputComponent()
              .setCustomId("sch")
              .setLabel("Scholar Number")
              .setStyle("SHORT")
              .setPlaceholder("Write your scholar number here")
              .setRequired(true)
          );

        interaction.showModal(modal);
        interaction.update({ embeds: [eb] });
      }
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customId == "events") {
      const events = db.get("events");
      const ev = events[interaction.values[0]];
      const eb = new MessageEmbed()
        .setTitle(ev.name)
        .setDescription(`Hosted by - ${ev.host}`)
        .addFields([
          { name: "Info -", value: ev.desc },
          { name: "Class -", value: ev.clas },
          {
            name: "Sub events -",
            value: ev.sub
              .split(",")
              .map((e) => {
                var r = e.split(":");
                return `${r[0]} - ${r[1]}`;
              })
              .join("\n"),
          },
        ])
        .setColor("GREEN");

      const row = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("JOIN EVENT")
          .setStyle("SUCCESS")
          .setCustomId(`event:join:${interaction.values[0]}`)
      );

      const or = interaction.message.components[0];

      interaction.update({ embeds: [eb], components: [or, row] });
    }
  }
});
