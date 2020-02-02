const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("User Tests", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "User",
        email: "user@gmail.com",
        password: "123456"
      })
      .expect(200);
    const user = await User.findById(res.body.user._id);
    expect(user).not.toBeNull();

    expect(res.body).toMatchObject({
      user: {
        name: "User",
        email: "user@gmail.com"
      }
    });
  });

  it("should not register existing user", async () => {
    await request(app)
      .post("/users/register")
      .send({
        name: "User",
        email: "user@gmail.com",
        password: "123456"
      })
      .expect(400);
  });

  it("should login existing user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      })
      .expect(200);
  });

  it("should not login a non existing user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "user2@gmail.com",
        password: "123456"
      })
      .expect(400);
  });

  it("should get user data", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(200);
  });

  it("should retrieve Unauthorized getting user data", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456789"
      });

    await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(401);
  });
});

afterAll(async done => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  done();
});
