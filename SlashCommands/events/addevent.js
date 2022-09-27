const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
} = require("discord-modals");

module.exports = {
  name: "addevent",
  description: "MOD ONLY",
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.followUp(
        "You need `[MANAGE_GUILD]` permission to use this command"
      );
    }

    const modal = new Modal()
      .setCustomId("addevent")
      .setTitle(`Enter the info below`)
      .addComponents(
        new TextInputComponent()
          .setCustomId("name")
          .setLabel("Name")
          .setStyle("SHORT")
          .setPlaceholder("WPlease enter the event name")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("host")
          .setLabel("Host")
          .setStyle("SHORT")
          .setPlaceholder("Please enter the event host")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("desc")
          .setLabel("Description")
          .setStyle("SHORT")
          .setPlaceholder("Please enter the event description")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("class")
          .setLabel("Classes")
          .setStyle("SHORT")
          .setPlaceholder("Please enter the event classes eg: (6, 7, 8)")
          .setRequired(true),
        new TextInputComponent()
          .setCustomId("sub")
          .setLabel("Sub Events")
          .setStyle("LONG")
          .setPlaceholder("Sub events in format - name:desc , name:desc")
          .setRequired(true),
      );
    interaction.showModal(modal);
  },
};
