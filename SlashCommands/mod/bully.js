const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");

const ms = require("ms");

module.exports = {
  name: "bully",
  description: "bully kids",
  options: [
    {
      name: "user",
      description: "Person whom you want to bully",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const whitelist = ["908554250945183744"];

    const user = interaction.options.getMember("user");

    if (user.id == client.user.id || whitelist.inclues(user.id)) {
      const check = client.ctbully.includes(interaction.user.id);
      if (check) {
        client.ctbully.splice(client.ctbully.indexOf(interaction.user.id), 1);
        try {
          await interaction.member.timeout(
            ms("5m"),
            "Trying to bully ct bot or arnav. LMAO"
          );
        } catch {
          return interaction.followUp(
            "Master I don't have permissions to punish you. I am sorry :sob:"
          );
        }
        return interaction.followUp("I warned you! Enjoy the mute :yum:");
      }

      client.ctbully.push(interaction.user.id);
      return interaction.followUp(
        "You do that again and your getting a special treatment from me :wink:"
      );
    }

    const options = [
      "Remember when I asked for your opinion? Me neither.",
      "Your ass must be jealous of all that shit that comes out of your mouth.",
      "I’m really jealous of all the people who have never met you.",
      "Whenever I see your face, I’m reminded that God has a great sense of humor.",
      "Wipe your mouth, there’s a little bit of bullshit around your lips.",
      "I know that everyone is allowed to act stupid once in awhile, but you’re really abusing that privilege.",
      "You and Monday are really similar — nobody likes you.",
      "There are some really dumb people in this world. Thanks for helping me understand that.",
      "Good story bro, but in what part do you shut the fuck up?",
      "I think I might have Alzheimer’s because I can’t remember when was the last time I asked for your opinion.",
      "If ignorance is really a bliss, you must be the happiest person in the world.",
      "Jesus loves you but everyone thinks you’re a jerk.",
      "I would love to insult you but I’m afraid I wouldn’t do as well as nature did.",
      "Your d*ck belongs in your pants, not your personality.",
      "I love the sound you make when you shut up.",
      "The jerk store called, they’re running out of you.",
      "Remember that time you shut the f*ck up? Me neither",
      "I hope one day you choke on all the shit you talk.",
      "It is actually pretty easy not to be a shitty human being. Try it sometime.",
      "I  am returning your nose. I found it in my business.",
      "You’re like a bag of Pampers. Self absorbed and full of shit.",
      "I would tell you to go f*ck yourself but I’m pretty sure you’d be disappointed.",
      "Since you know it all, you should know when to shut the f*ck up.",
      "Yep, no doubt about it, your father should have pulled out earlier.",
      "I swear some men were conceived by anal sex. There is no way being that much of an asshole is natural.",
      "I’m not a proctologist but I sure know an asshole when I see one.",
      "I hear there’s a new app called a sense of humour. Download it bitch or take some from me!",
      "You’re like a plunger, you like bringing up old shit.",
      "Acting like a d*ck won’t make yours any bigger.",
      "I should feel bad about what you are saying but you’re not worth it.",
    ];
    const choice = options[Math.floor(Math.random() * options.length)];
    interaction.followUp({
      content: `** <@!${user.id}> ** \n> ${choice}`,
    });
  },
};