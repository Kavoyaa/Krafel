// Ignore this, just something I use to host bot using replit + uptimerobot

const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("bot online yay :D")
})

function webserver() {
  server.listen(3000, () => {
    console.log("[LOGS] Bot Online.")
  })
}

module.exports = webserver