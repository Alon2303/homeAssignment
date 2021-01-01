const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const { getServerAvailability } = require("./servers.service");

app.get("/onlineServer", async (req, res) => {
  const { serverObject } = req.query;
  const server = await getServerAvailability(JSON.parse(serverObject));
  res.send(server);
});

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

module.exports = server;
