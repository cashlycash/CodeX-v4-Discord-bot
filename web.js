const express = require("express")
const app = express()
const { request } = require('undici');

async function keepAlive(client) {

  app.get('/', async (req, res) => {
    try {
      const { body } = await request(req.query.url);
      res.send( await body.text() )
    } catch (e) {
      res.send(e)
    }
  })

  app.listen("8080", () => console.log(`App listening`));
}

module.exports = keepAlive