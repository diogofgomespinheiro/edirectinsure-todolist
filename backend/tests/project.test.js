const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Project = require("../models/Project");

beforeAll(async () => {
  await request(app)
    .post("/users/register")
    .send({
      name: "User",
      email: "user@gmail.com",
      password: "123456"
    });
});

describe("Project Tests", () => {
  it("should get user projects", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(200);
  });

  it("should retrive Unauthorized getting user projects", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456789"
      });

    await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(401);
  });
});

afterAll(async done => {
  mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  done();
});
