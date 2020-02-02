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
  it("should insert project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const res = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      })
      .expect(200);

    expect(res.body.name).toEqual("Test Project");
  });

  it("should retrive message to fill name while inserting project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const res = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(400);

    expect(res.body.errors[0].msg).toEqual("Name is required");
  });

  it("should retrive Unauthorized while inserting project with wrong token", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456789"
      });

    await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      })
      .expect(401);
  });

  it("should delete project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const res = await request(app)
      .delete(`/projects/${projectResponse.body._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(200);

    expect(res.body.msg).toEqual("Project removed");
  });

  it("should return unauthorized while deleting project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    await request(app)
      .delete(`/projects/${projectResponse.body._id}`)
      .set("Authorization", `Bearer teste`)
      .send()
      .expect(401);
  });

  it("should return not found while deleting project that doesn´t exist", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const res = await request(app)
      .delete(`/projects/123`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(404);

    expect(res.body.errors[0].msg).toEqual("Project not found");
  });

  it("should update project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const res = await request(app)
      .put(`/projects/${projectResponse.body._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "new name"
      })
      .expect(200);

    expect(res.body.name).toEqual("new name");
  });

  it("should return message to fill name while updating project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const res = await request(app)
      .put(`/projects/${projectResponse.body._id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Name is required");
  });

  it("should return unauthorized while updating project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    await request(app)
      .put(`/projects/${projectResponse.body._id}`)
      .set("Authorization", `Bearer 123`)
      .send({
        name: "new name"
      })
      .expect(401);
  });

  it("should update project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const res = await request(app)
      .put(`/projects/123`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "new name"
      })
      .expect(404);

    expect(res.body.errors[0].msg).toEqual("Project not found");
  });

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

  it("should return Unauthorized getting user projects", async () => {
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

  it("should add task to project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const res = await request(app)
      .post(`/projects/${projectResponse.body._id}/tasks`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        description: "test task"
      })
      .expect(200);

    expect(res.body.tasks[0].description).toEqual("test task");
  });

  it("should remove task from project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const taskResponse = await request(app)
      .post(`/projects/${projectResponse.body._id}/tasks`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        description: "test task"
      });

    await request(app)
      .delete(
        `/projects/${projectResponse.body._id}/tasks/${taskResponse.body.tasks[0]._id}`
      )
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send()
      .expect(200);
  });

  it("should return unauthorized while removing task from project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const taskResponse = await request(app)
      .post(`/projects/${projectResponse.body._id}/tasks`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        description: "test task"
      });

    await request(app)
      .delete(
        `/projects/${projectResponse.body._id}/tasks/${taskResponse.body._id}`
      )
      .set("Authorization", `Bearer 123`)
      .send()
      .expect(401);
  });

  it("should update task from project", async () => {
    const loginResponse = await request(app)
      .post("/users/login")
      .send({
        email: "user@gmail.com",
        password: "123456"
      });

    const projectResponse = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        name: "Test Project"
      });

    const taskResponse = await request(app)
      .post(`/projects/${projectResponse.body._id}/tasks`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        description: "test task"
      });

    const res = await request(app)
      .patch(
        `/projects/${projectResponse.body._id}/tasks/${taskResponse.body.tasks[0]._id}`
      )
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        description: "new desc",
        completed: true
      })
      .expect(200);

    expect(res.body.tasks[0].description).toEqual("new desc");
    expect(res.body.tasks[0].completed).toEqual(true);
  });
});

afterAll(async done => {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  done();
});
