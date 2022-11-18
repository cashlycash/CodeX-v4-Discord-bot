const client = require("../index.js");

client.on("messageCreate", async (message) => {
  const i = await message.content.match(
    /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm
  );
  if (i && !message.member.permissions.has(["ADMINISTRATOR"])) {
    await message.reply("NO DISCORD INVITES PLEASE");
    await message.delete();
    return;
  }
  if (
    message.content.includes('1042993038974271508') || 
    message.content.toLowerCase().replace(' ', '').includes('jamesford')
  ) {
    message.author.send('<@!1042993038974271508>')
    message.delete()
    return;
  }
  if (message.author.bot) return;
  const prefix = client.config.prefix;
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  command = args.shift().toLowerCase();
  cmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
  if (message.content.indexOf(prefix) !== 0) return;
  if (cmd) {
    if (!message.member.permissions.has(cmd.UserPerms || [])) {
      return message.channel.send(
        `You need \`${cmd.UserPerms || []}\` Permissions`
      );
    } else {
      cmd.run(client, message, args, prefix);
    }
  }
});
