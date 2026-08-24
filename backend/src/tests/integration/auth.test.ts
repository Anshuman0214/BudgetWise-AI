import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createApp } from "../../app.js";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_ACCESS_SECRET = "test-access-secret-at-least-thirty-two-chars";
  process.env.JWT_REFRESH_SECRET = "test-refresh-secret-at-least-thirty-two-chars";
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe("auth integration", () => {
  it("registers and logs in", async () => {
    const app = createApp();
    await request(app).post("/api/v1/auth/register").send({ name: "Asha", email: "asha@example.com", password: "Password123" }).expect(201);
    const login = await request(app).post("/api/v1/auth/login").send({ email: "asha@example.com", password: "Password123" }).expect(200);
    expect(login.body.accessToken).toBeTruthy();
  });
});
