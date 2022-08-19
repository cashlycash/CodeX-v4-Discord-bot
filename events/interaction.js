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

const Canvas = require("canvas");
const { registerFont, createCanvas } = require("canvas");
const fs = require("fs");
registerFont("./fonts/CAL.ttf", { family: "college" });
const { MessageAttachment } = require("discord.js");

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

    var count = member.guild.members.cache;
    const canvas = Canvas.createCanvas(1772, 633);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(`./welcome.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var textString3 = `${member.user.username}`;
    if (textString3.length >= 14) {
      ctx.font = "bold 100px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2);
    } else {
      ctx.font = "bold 150px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2);
    }
    var textString2 = `#${member.user.discriminator}`;
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 40);
    var textString4 = `Member #${
      count.filter((member) => !member.user.bot).size
    }`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    var textString4 = `${member.guild.name}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 700, canvas.height / 2 - 150);
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    const welcome = new MessageEmbed()
      .setColor("#3cff00")
      .setTimestamp()
      .setTitle(`Welcome to ${member.guild.name}!`)
      .setDescription(`Hi <@${member.user.id}>!, ENJOY YOUR STAY HERE!!`)
      .setFooter({
        text: "Welcome!",
        iconURL: member.guild.iconURL({ dynamic: true }),
      })
      .setImage("attachment://welcome-image.png");

    client.channels.cache
      .get(client.config.join.channel)
      .send({ embeds: [welcome], files: [attachment] });

    const ids = client.config.join.roles;
    ids.forEach((id) => {
      member.roles.add(id);
    });

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