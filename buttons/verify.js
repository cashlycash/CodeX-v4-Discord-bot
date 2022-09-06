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
          .setCustomId("name")
          .setLabel("Name")
          .setStyle("SHORT")
          .setPlaceholder("Write your name here")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("class")
          .setLabel("Class")
          .setStyle("SHORT")
          .setPlaceholder("Write your class here (eg: 6, 8, 12)")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sec")
          .setLabel("Section")
          .setStyle("SHORT")
          .setPlaceholder("Write your section here (eg: A, B, E)")
          .setRequired(true)
      );
    interaction.showModal(modal);
  },
};
