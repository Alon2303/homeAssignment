const { getOnlineServer } = require("./src/servers.service");

getOnlineServer()
  .then((res) => console.log(res))
  .catch((err) => {
    throw new Error(err);
  });
