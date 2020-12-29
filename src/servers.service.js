const http = require("http");
const servers = require("./config/servers.json");
const axios = require("axios");

const getServerStatus = async (server) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/onlineServer?serverObject=" +
        JSON.stringify(server)
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
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
    (lowestPriority, priority) => {
      return lowestPriority.value.priority < priority.value.priority
        ? lowestPriority
        : priority;
    }
  );

  const { url } = mostAvailableServer.value;
  return url;
};

module.exports = { getOnlineServer, getServerStatus };
