const express = require("express");
const app = express();
const { request } = require("undici");

async function keepAlive(client) {
  app.get("/", async (req, res) => {
    try {
      const { body } = await request(req.query.url);
      res.send(await body.text());
    } catch (e) {
      res.send(e);
    }
  });

  app.listen(process.env.PORT || 3000, () =>
    console.log(`App listening on https://localhost:69420/`)
  );
}

module.exports = keepAlive;
