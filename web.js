const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");
const { request } = require("undici");

async function keepAlive(client) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", async (req, res) => {
    try {
      const { body } = await request(req.query.url);
      res.send(await body.text());
    } catch (e) {
      res.send(e);
    }
  });

  app.post("/tokeninfo", async (req, res) => {
    try {
      const c = req.body;
      const code = await db.get(`ccode_${c.name.replaceAll(' ', "")}${c.email.replaceAll(' ','')}${c.phone.replaceAll(' ','')}`);
      if (code) {
        res.send({ status: "ok", code: code });
      } else {
        res.send({ status: "error", error: `Invalid Credentials` });
      }
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({ status: "error", error: e.toString() }));
    }
  });

  app.post("/codex", async (req, res) => {
    try {
      const code = Math.floor(Math.random() * 90000) + 10000;
      const c = req.body;
      var parts = [];
      c.events.forEach((event) => {
        event.part.forEach((p) => {
          const co = `${p.name.toLowerCase()} & ${p.email} & ${p.class}`;
          if (!parts.includes(co)) {
            parts.push(co);
          }
        });
      });
      const emb = new MessageEmbed()
        .setTitle(`School Registeration`)
        .setDescription(
          `**Number of participating events**- \`${c.events.length}\`\n**Number of participants**- \`${parts.length}\``
        )
        .addFields([
          {
            name: "School",
            value: `Name - \`${c.school.name}\`\nAddr - \`${c.school.addr}\``,
          },
          {
            name: "Events",
            value: c.events
              .map(
                (p, i) =>
                  `\`${i + 1}.\` __${p.name}__\n> ${p.part
                    .map((p) => `${p.name} (${p.mail}) [${p.class}ᵗʰ]`)
                    .join("\n> ")}`
              )
              .join("\n"),
          },
          {
            name: "Teacher",
            value: `Name : \`${c.teacher.name}\`\nEmail : \`${c.teacher.email}\`\nPhone : \`${c.teacher.phone}\``,
            inline: true,
          },
          {
            name: "Discord CODE",
            value: `\`${code}\``,
            inline: true,
          },
        ])
        .setColor("BLURPLE");

      client.channels.cache.get(client.config.codex4.reg).send({
        embeds: [emb],
      });

      db.set(`code_${code}`, parts.length);
      db.set(`school_${code}`, c.school.name);
      db.set(
        `ccode_${c.school.name.replaceAll(' ', "")}${c.teacher.email.replaceAll(' ', "")}${c.teacher.phone.replaceAll(' ', "")}`,
        code
      );

      res.send(JSON.stringify({ status: "ok", code: code }));
    } catch (e) {
      res.send(JSON.stringify({ status: "error", error: e.toString() }));
    }
  });

  var port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`App listening on http://localhost:${port}/`)
  );
}

module.exports = keepAlive;
