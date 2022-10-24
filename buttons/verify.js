const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
} = require("discord-modals");

module.exports = {
  id: "verify",
  run: (client, interaction) => {
    const modal = new Modal()
      .setCustomId("verify")
      .setTitle(`Enter the info below`)
      .addComponents(
        new TextInputComponent()
          .setCustomId("id")
          .setLabel("Code")
          .setStyle("SHORT")
          .setPlaceholder("Enter your school access code which is recieved during registeration")
          .setRequired(true)
      );
    interaction.showModal(modal);
  },
};
