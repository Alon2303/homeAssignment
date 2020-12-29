const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const { getOnlineServers } = require("./src/servers.service");

app.get("/onlineServers", async (req, res) => {
  try {
    const server = await getOnlineServers();
    console.log(server);
    res.send(server);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT);
