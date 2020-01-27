const server = require("../index");
const request = require("supertest");
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

describe("unit tests on endpoint", () => {
  afterAll(async () => {
    await server.close();
  });

  test(`index exists`, () => {
    expect("Hello").toEqual("Hello");
  });

  test("Status Code should be 200", async () => {
    const response = await request(server).get("/places");
    expect(response.status).toEqual(200);
  });

  test("An empty request should be an empty array of results", async () => {
    const response = await request(server).get("/places");
    expect(response.body.results.length).toEqual(0);
  });
});
