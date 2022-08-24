module.exports = {
  name: 'purge',
  aliases: ['clear', 'clean'],
  description: 'Clears the type, amount of message',
  UserPerms: ["MANAGE_MESSAGES"],
  BotPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args, Discord) => {
    message.delete()
    if (!args[0]) {
      return message.reply("Please provide a number or type infinity")
    } else if (args[0].toLowerCase() === "infinity") {
      const c = await message.channel.clone()
      c.setPosition(message.channel.position)
      message.channel.delete()
      c.send("Purged the whole channel")
      return
    } else {
      if (args[0] < 1) return
      var tm = 0
      const ms = parseInt(args[0])
      const l = ms % 100
      var r = (ms / 100) - (l / 100)
      while (r > 0){
        r--
        const rm = await message.channel.messages.fetch({ limit: 100 })
        const rfm = await rm.filter(m => !m.pinned)
        tm += rm.size
        message.channel.bulkDelete(rm)
        setInterval(() => {return;}, 1000)
      }
      await setInterval(() => {return;}, 1000)
      const lms = await message.channel.messages.fetch({ limit: l })
      const lfm = await lms.filter(m => !m.pinned)
      await message.channel.bulkDelete(lfm)
      tm += lfm.size

      await message.channel.send(`**Deleted \`${tm}\` messages**`).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })
    }
  }
}