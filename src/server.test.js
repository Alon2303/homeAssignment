const {
  getOnlineServer,
  getServerAvailability,
  getServerStatus,
} = require("./servers.service");
const servers = require("./config/servers.json");
const axios = require("axios");

jest.mock("axios");

describe("Server functinality tests", () => {
  it("should get back an object with attribute availability set to true | false", async () => {
    //INIT
    let res;
    //TEST
    res = await getServerAvailability();

    //ASSERT
    expect(res.available).toBeDefined();
  });

  it("should fail no servers online", async () => {
    //INIT
    const res = {
      data: Promise.resolve({
        url: "http://server7.com",
        priority: 6,
        available: false,
      }),
    };

    axios.get.mockResolvedValue(res);
    //TEST + ASSERT

    await expect(getOnlineServer()).rejects.toThrow();
  });

  it("should succeed one server online", async () => {
    //INIT
    const res = {
      data: Promise.resolve({
        url: "http://server7.com",
        priority: 6,
        available: true,
      }),
    };

    axios.get.mockResolvedValue(res);
    //TEST + ASSERT
    const onlineServerMessage = await getOnlineServer();
    expect(onlineServerMessage).toEqual(
      "Server http://server7.com is available and has the lowest priority"
    );
  });
});
