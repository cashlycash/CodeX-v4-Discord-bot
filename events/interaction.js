const client = require("../index.js");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");
const db = require("quick.db");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const fetch = require("node-fetch");

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

    interaction.member.roles.add("1004107626377904229");
    interaction.member.roles.add("1004108479969103965");
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
        `Collect roles from <#1004112957619327126> to get access to respective event updates. Incase of any queries use <#1009473661381652552>.`
      )
      .setThumbnail(await interaction.member.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: `We hope you have a good time at ${member.guild.name}`,
        iconURL: member.guild.iconURL({ dynamic: true }),
      });

    client.channels.cache
      .get(client.config.join.channel)
      .send({ embeds: [welcome] });

    var count = member.guild.members.cache;
    const no = count.filter((member) => !member.user.bot).size;
    client.channels.cache
      .get(client.config.count.channel)
      .setName(client.config.count.format.replace(`:no:`, no));
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const id = interaction.customId.toString();
    if (sid[0] == "buy") {
      const plan = sid[1];
      const price = sid[2];
      const info = sid[3];
      const everyoneRole = interaction.guild.roles.cache.find(
        (r) => r.name == "@everyone"
      );
      const ce = interaction.guild.channels.cache.find(
        (ch) => ch.name == `buy-${interaction.user.id}`
      );
      if (ce) {
        return interaction.reply({
          content: `Please close your existing order (<#${ce.id}>)`,
          ephemeral: true,
        });
      }
      interaction.guild.channels
        .create(`buy-${interaction.user.id}`, {
          topic: `Purchase of <@!${interaction.user.id}>`,
          parent: client.config.ticket.categ,
        })
        .then((c) => {
          c.permissionOverwrites.create(interaction.user.id, {
            VIEW_CHANNEL: true,
          });
          c.permissionOverwrites.create(client.user.id, { VIEW_CHANNEL: true });
          c.permissionOverwrites.create(client.config.ticket.ping, {
            VIEW_CHANNEL: true,
          });
          c.permissionOverwrites.create(everyoneRole.id, {
            VIEW_CHANNEL: false,
          });

          const emb = new MessageEmbed()
            .setTitle(`Hey! ${interaction.user.tag}`)
            .setDescription(
              `**Intrested Plan -** ${plan}\n**Price -** ${price}\n**More Info -** ${info}`
            )
            .setColor("BLURPLE");

          const btn = new MessageActionRow().setComponents(
            new MessageButton()
              .setLabel("Close Purchase")
              .setCustomId("p:c")
              .setStyle("DANGER")
          );

          c.send({
            content: `<@!908554250945183744> | <@${interaction.user.id}>`,
            embeds: [emb],
            components: [btn],
          });
          interaction.reply({
            content: `> **Done!**, Check <#${c.id}>`,
            ephemeral: true,
          });
        });
    }
  }
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "[plans]") {
      const rps = {
        b: {
          name: "Basic",
          price: "5.00$",
        },
        m: {
          name: "Intermediate",
          price: "9.00$",
        },
        a: {
          name: "Advanced",
          price: "13.00$",
        },
        u: {
          name: "Ultimate",
          price: "17.00$",
        },
        e: {
          name: "Extreme",
          price: "20.00$",
        },
        c: {
          name: "Custom",
          price: "Depends on order",
        },
      };
      const option = interaction.values[0];
      const plan = rps[option];
      var c = interaction.message.components;
      c[0].components[0].options.forEach((e) => (e.default = false));
      c[0].components[0].options.find((o) => o.value == option).default = true;
      const desc = c[0].components[0].options.find(
        (o) => o.value == option
      ).description;

      c[1] = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Buy Plan")
          .setCustomId(`buy:${plan.name}:${plan.price}:${desc}`)
          .setStyle("PRIMARY")
      );

      const emb = new MessageEmbed()
        .setTitle(`Plan ${plan.name}`)
        .setDescription(
          `**Price** \`:\` __${plan.price}__\n\`\`\`${desc}\`\`\``
        )
        .addField(
          `Super Startup`,
          `Included feature which descreases your server startup times super low. (Lowest in the market)`
        )
        .setColor("AQUA");
      await interaction.update({
        embeds: [emb],
        components: c,
      });
    }
  }
});