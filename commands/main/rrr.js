const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Nuggies = require("nuggies");

module.exports = {
  name: "rrr",
  description: "Reaction Roles using buttons",
  UserPerms: ["MANAGE_GUILD"],
  BotPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, Discord) => {

    const roles = args

    const embed = new MessageEmbed()
      .setTitle(args.shift())
      .setDescription(
        "Click on the buttons to get the specific role or vice-versa"
      )
      .setColor("RANDOM")
      .setTimestamp();
    const buttons = [];
    const rows = [];
    for (const id of roles) {
      role = message.guild.roles.cache.get(id)
      const button = new MessageButton()
        .setStyle("PRIMARY")
        .setLabel(role.name)
        .setCustomId(`br:${id}`)
      buttons.push(button);
    }
    for (let i = 0; i < Math.ceil(roles.length / 5); i++) {
      rows.push(new MessageActionRow());
    }
    rows.forEach((row, i) => {
      row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
    });

    message.channel.send({ embeds: [embed], components: rows })
  },
};
