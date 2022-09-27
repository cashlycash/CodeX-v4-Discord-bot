const ping = require("../../functions/ping.js")

module.exports = {
	name: 'ping',
	aliases: ["p"],
	description: 'See the bot latency',
	run: async (client, message, args) => {
		message.reply(ping(message))
	}
}