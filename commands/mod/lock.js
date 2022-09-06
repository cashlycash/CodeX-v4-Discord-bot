const { MessageEmbed } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
  name: "lock",
  run: async (client, message, args) => {
    if (!owners.includes(message.author.id)) {
      return message.channel.send("Limited To The Bot Owner Only!");
    }

    message.delete();

    if (!args[1]) {
      message.channel.permissionOverwrites.edit("1004107626377904229", {
        SEND_MESSAGES: false,
      });
    }

    message.channel.permissionOverwrites.edit(args[0].slice(3, -1), {
      VIEW_CHANNEL: true,
    });
  },
};
