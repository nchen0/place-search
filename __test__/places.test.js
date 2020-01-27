import server from "../index";
import request from "supertest";
import axios from "axios";
axios.defaults.adapter = require("axios/lib/adapters/http");

describe("unit tests on endpoint", () => {
  afterAll(async () => {
    await server.close();
  });

  test("An empty request body should return a status code of 400", async () => {
    const response = await request(server).get("/places");
    expect(response.status).toEqual(400);
  });

  test("A non-empty body should return non-empty array of results", async () => {
    const response = await request(server)
      .get("/places")
      .send({
        latitude: -33.8599358,
        longitude: 151.2090295,
        customerName: "Chase"
      });
    expect(response.body.results.length).toEqual(8);
  });

  test("A request body including number of requests as 1 should return just 1 result", async () => {
    const response = await request(server)
      .get("/places")
      .send({
        latitude: -33.8599358,
        longitude: 151.2090295,
        customerName: "Chase",
        number: 1
      });
    expect(response.body.results.length).toEqual(1);
  });

  test("A request body with Citibank as customer name should return a name of Citibank in the result", async () => {
    const response = await request(server)
      .get("/places")
      .send({
        latitude: -33.8599358,
        longitude: 151.2090295,
        customerName: "Citibank"
      });
    expect(response.body.results[0].name).toEqual("Citibank");
  });
});
