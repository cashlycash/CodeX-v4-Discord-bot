const ms = require('ms');

module.exports = {
  name: "brr",
  UserPerms: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const pps = message.mentions.members;
    const array = pps.toJSON();
    const unlucky = array[Math.floor(Math.random() * array.length)];
    unlucky.timeout(ms("5m"), "roulette")
    message.reply(`> **<@!${unlucky.user.id}>** got \`UNLUCKY\` and muted for 5m :rofl:`)
  },
};
