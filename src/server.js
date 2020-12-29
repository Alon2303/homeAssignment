const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const { MIN_STATUS_VALUE, MAX_STATUS_VALUE } = require("./config/config");

const setServerState = async () => {
  const status = Math.floor(
    Math.random() * (MAX_STATUS_VALUE - MIN_STATUS_VALUE) + MIN_STATUS_VALUE
  );
  return status >= 200 && status < 300;
};

const getServerAvailability = async (server) => {
  try {
    const available = await setServerState();
    return {
      ...server,
      available,
    };
  } catch (error) {
    throw new Error(error);
  }
};

app.get("/onlineServer", async (req, res) => {
  try {
    const { serverObject } = req.query;
    const server = await getServerAvailability(JSON.parse(serverObject));
    res.send(server);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT);
