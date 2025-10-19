const request = require("supertest");
const app = require("../../app");
import { TestHelper } from "../dbInstanceHelper";
import { User } from "../../entity/User";

describe("User Controller", () => {
  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
  });

  afterAll(() => {
    TestHelper.instance.teardownTestDB();
  });

  describe("Get an user profile", () => {
    it("should return user not found ", async () => {
      const res = await request(app).post("/user/1");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("User not found");
    });
  });

  describe("Register an user with different password", () => {
    const userInfoPartial = {
      firstName: "dung",
      lastName: "nguyen",
      username: "dung271",
      email: "dungnguyen2712000@gmail.com",
    };

    it("should register successfully ", async () => {
      const res = await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send({
          ...userInfoPartial,
          password: "Abc@12345678",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body).toHaveProperty("jwt");
      expect(res.body).toHaveProperty("refreshToken");
    });

    it("should return validation error about password containing no special character ", async () => {
      const res = await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send({
          ...userInfoPartial,
          password: "Abc@123",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Validation failed");
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toHaveProperty("password");
      expect(res.body.errors.password[0]).toBe(
        "Password must be at least 8 characters long",
      );
    });
  });

  describe("Register an user with different email", () => {
    const userInfoPartial = {
      firstName: "dung",
      lastName: "nguyen",
      username: "leonard",
      password: "Abc@12345678",
    };

    it("should return validation error of invalid email ", async () => {
      const res = await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send({
          ...userInfoPartial,
          email: "dungnguyen2712001",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Validation failed");
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toHaveProperty("email");
      expect(res.body.errors.email[0]).toBe(
        "Please provide a valid email address",
      );
    });

    it("should register successfully ", async () => {
      const res = await request(app)
        .post("/auth/register")
        .set("content-type", "application/json")
        .send({
          ...userInfoPartial,
          email: "dungnguyen2712019@gmail.com",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body).toHaveProperty("jwt");
      expect(res.body).toHaveProperty("refreshToken");
    });
  });
});
