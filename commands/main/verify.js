const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
  name: "br",
  run: (client, message, args) => {
    if (!owners.includes(message.author.id)) {
      return message.channel.send("Limited To The Bot Owner Only!");
    }
    const emb = new MessageEmbed()
      .setTitle("Event roles")
      .setColor("#6600ff")
      .setDescription(
        "Click the button bellow to according to the event you want to recive information about"
      );

    let buttons = [];

    args.forEach((a) => {
      const r = message.guild.roles.cache.get(a);
      buttons.push(
        new MessageButton()
          .setLabel(r.name)
          .setCustomId(`br:${r.id}`)
          .setStyle("PRIMARY")
      );
    });

    let rows = [];
    let start = 0;

    for (let i = 0; i < Math.ceil(buttons.length / 5); i++) {
      rows.push(
        new MessageActionRow().addComponents(buttons.slice(start, start + 5))
      );
      start += 5;
    }

    message.channel.send({ embeds: [emb], components: rows });
    message.delete();
  },
};
