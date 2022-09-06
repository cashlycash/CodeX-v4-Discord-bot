/* eslint-disable */

const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "userinfo",
  description: "Retrive the information of a server member.",
  options: [
    {
      name: "member",
      description: "Person whom you want information about",
      type: "USER",
      required: false,
    },
  ],
	run: async (client, interaction) => {
        const member = interaction.options.getMember("member") || interaction.member
        const activities = member.presence?.activities || []

        const focusActivity = activities.find(x => x.assets)
        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
        .setDescription(activities.map((x, i) => `**${x.type}**: \n> \`${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}\``).join("\n"))
        .addField("JoinedAt", `<t:${member.joinedTimestamp.toString().slice(0, -3)}:R>`, true)
        .addField("Account Created At", `<t:${member.user.createdTimestamp.toString().slice(0, -3)}:R>`, true)
        .addField("Common Information", [
            `Real Name: \`${member.displayName}\``,
            `Kewl kid: \`${member.roles.cache.has("1014907026553450557") ? 'Yes' : 'No'}\``,
            `Booster: \`${member.premiumSince ? 'since ' + member.premiumSince.toLocaleString() : 'Nope'}\``
        ].join("\n"))

        return interaction.followUp({ embeds: [embed] })
	},
};