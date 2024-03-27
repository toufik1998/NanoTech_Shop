import request from 'supertest';
import express from 'express';
import { registerUser } from '../controllers/userController.js'; 
import User from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const app = express();
app.use(express.json());
app.use("/", registerUser);

// jest.mock("../models");
const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");

describe("Register", () => {
    
    it("should register successfully", async () => {
      const body = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "Password123",
      };
      mockedUser.findOne = jest.fn().mockResolvedValue(null);
      mockedUser.create = jest.fn().mockResolvedValue({
        _id: '1234567',
        name: "John Doe",
        email: "johndoe@example.com",
        isAdmin: false,
      });
      jwt.sign.mockReturnValue("mockedToken");
      const response = await request(app).post("/api/users").send(body);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        _id: '1234567',
        name: "John Doe",
        email: "johndoe@example.com",
        isAdmin: false,
      });
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('jwt=mockedToken');
    });
    it("should verify that required fields are full", async () => {
        const body = {};
        const response = await request(app).post("/api/users").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid user data");
    }, 10000);
    
    it("should return the email exist", async () => {
        const body = {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "Password123",
        };
        mockedUser.findOne = jest.fn().mockResolvedValue({ _id: "rtyu" });
        const response = await request(app).post("/api/users").send(body);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "User already exists");
    });
});
