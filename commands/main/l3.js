const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 's3',
  UserPerms: ["MANAGE_GUILD"],
  run: async (client, message, args, Discord) => {
    if (args.length == 0) {
      return message.reply(`__Format : __\`${client.config.prefix}s3 [he he]\``)
    }
    if (true) {
      args.unshift(" ");
      for (let emoji of args) {
        if (args.indexOf(emoji) % 2 !== 0) {
          message.guild.emojis
            .create(
              `https://cdn.discordapp.com/emojis/${emoji}`,
              args[args.indexOf(emoji) + 1]
            )
            .then((newEmoji) => {
              message.react(newEmoji);
            })
            .catch((err) => {
              message.react("👎");
            });
        }
      }
    }
  }
}