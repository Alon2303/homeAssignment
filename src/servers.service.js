const servers = require("./config/servers.json");
const axios = require("axios");
const { REQUEST_TIME_OUT } = require("./config/config");
const { MIN_STATUS_VALUE, MAX_STATUS_VALUE } = require("./config/config");

const getServerStatus = async (server) => {
  const res = await axios.get(
    "http://localhost:3000/onlineServer?serverObject=" + JSON.stringify(server),
    { timeout: REQUEST_TIME_OUT }
  );
  return res.data;
};

const getOnlineServer = async () => {
  const serverStatusCalls = [];
  for (let server of servers) {
    serverStatusCalls.push(await getServerStatus(server));
  }

  const apiCallResults = await Promise.allSettled(serverStatusCalls);
  const availableServers = apiCallResults.filter(
    (response) => response.value.available
  );

  if (!availableServers.length) throw new Error("All servers are offline");

  const mostAvailableServer = availableServers.reduce(
    (lowestPriority, priority) =>
      lowestPriority.value.priority < priority.value.priority
        ? lowestPriority
        : priority
  );

  const { url } = mostAvailableServer.value;
  return "Server " + url + " is available and has the lowest priority";
};

const setServerState = async () => {
  const status = Math.floor(
    Math.random() * (MAX_STATUS_VALUE - MIN_STATUS_VALUE) + MIN_STATUS_VALUE
  );
  return status >= 200 && status < 300;
};

const getServerAvailability = async (server) => {
  const available = await setServerState();
  return {
    ...server,
    available,
  };
};

module.exports = { getOnlineServer, getServerAvailability, getServerStatus };
