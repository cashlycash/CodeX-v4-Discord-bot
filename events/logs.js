const client = require("../index");

const { MessageEmbed } = require("discord.js");

client.on("messageContentEdited", (message, oldContent, newContent) => {
  if (message.author.bot) return;
  const LogChannel = client.channels.cache.get("1009775419563720704"); 
  const MessageEdited = new MessageEmbed()
    .setTitle("Message Edited")
    .setColor("#2F3136")
    .setDescription(
      `Message Edited from \n${oldContent} \nto \n${newContent}\nAuthor - ${message.author.tag}`
    )
    .setURL(`https://discord.com/channels/1004104875522666578/${message.channel.id}/${message.id}`)

  return LogChannel.send({
    embeds: [MessageEdited],
  });
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  const LogChannel = client.channels.cache.get("1009775419563720704"); 
  const MessageEdited = new MessageEmbed()
    .setTitle("Message Deleted")
    .setColor("#2F3136")
    .setDescription(
      `Message deleted \n${message.content}\nAuthor - \`${message.author.tag}\``
    )
    .setURL(`https://discord.com/channels/1004104875522666578/${message.channel.id}/${message.id}`)

  return LogChannel.send({
    embeds: [MessageEdited],
  });
});