const request = require("supertest");
const app = require("../../app");

describe("GET /guitar/list", () => {
  it("should return a list of guitars ", async () => {
    const res = await request(app).get("/guitar/list");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(6);
  });
});
