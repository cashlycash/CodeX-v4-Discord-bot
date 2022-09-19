const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Nuggies = require("nuggies");

module.exports = {
  name: "rr",
  description: "Reaction Roles using buttons",
  UserPerms: ["MANAGE_GUILD"],
  BotPerms: ["MANAGE_ROLES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, Discord) => {

    const roles = []

    message.channel.send(
      "Send messages in `roleID color label emoji` syntax! Once finished say `done`."
    );

    const filter = (m) => m.author.id == message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      max: Infinity,
    });

    collector.on("collect", async (msg) => {
      if (msg.author.bot) return
      if (!msg.content) return message.channel.send("Invalid syntax");
      if (msg.content.toLowerCase() == "done") return collector.stop("DONE");
      const colors = ["SUCCESS", "PRIMARY", "DANGER", "SECONDARY"];
      if (
        !msg.content.split(" ")[0].match(/[0-9]{18}/g) ||
        !colors.includes(msg.content.split(" ")[1])
      )
        return message.channel.send("Invalid syntax");

      const role = msg.content.split(" ")[0];
      if (!role) return message.channel.send("Invalid role");

      const color = colors.find((color) => color == msg.content.split(" ")[1]);
      if (!color) return message.channel.send("Invalid color");

      const label = msg.content
        .split(" ")
        .slice(2, msg.content.split(" ").length - 1)
        .join(" ");

      const reaction = await msg
        .react(
          msg.content
            .split(" ")
            .slice(msg.content.split(" ").length - 1)
            .join(" ")
        )
        .catch(console.log);

      const final = {
        role,
        color,
        label,
        emoji: reaction ? reaction.emoji.id || reaction.emoji.name : null,
      };
      roles.push(final);
      msg.delete()
    });

    collector.on("end", async (msgs, reason) => {
      if (reason == "DONE") {
        const embed = new MessageEmbed()
          .setTitle(args.join(" "))
          .setDescription(
            "Click on the buttons to get the specific role or vice-versa"
          )
          .setColor("RANDOM")
          .setTimestamp();
        const buttons = [];
        const rows = [];
        for (const buttonObject of roles) {
          const button = new MessageButton()
            .setStyle(buttonObject.color)
            .setLabel(buttonObject.label)
            .setCustomId(`br:${buttonObject.role}`);
          buttonObject.emoji
            ? button.setEmoji(buttonObject.emoji)
            : null;
          buttons.push(button);
        }
        for (let i = 0; i < Math.ceil(roles.length / 5); i++) {
          rows.push(new MessageActionRow());
        }
        rows.forEach((row, i) => {
          row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
        });

        message.channel.send({ embeds: [embed], components: rows })
      }
    });
  },
};
