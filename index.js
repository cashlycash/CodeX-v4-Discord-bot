const { Client, Collection } = require("discord.js");
const Nuggies = require("nuggies");
const discordModals = require("discord-modals");
const logs = require("discord-logs");

require("dotenv").config();

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
  partials: ["CHANNEL"],
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
  },
});

process.on("unhandledRejection", (error) => {
  console.log(error);
});

discordModals(client);
logs(client, {
  debug: false,
});
Nuggies.handleInteractions(client);

client.ctbully = [];
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.btns = new Collection();
client.config = require("./config.json");

require("./handler")(client);

module.exports = client;

client.login(process.env.token);
