import request from 'supertest';
import express from 'express';
import { authUser } from '../controllers/userController.js'; 
import User from '../models/userModel.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const app = express();
app.use(express.json());
app.post('/auth', authUser);

let mockUser;

const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");


describe("Authentication", () => {
  it("should return 401 if user not found", async () => {
    const body = {
      email: 'fakeemail@gmail.com',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue(null);
    const response = await request(app).post("/auth").send(body);
    expect(response.status).toBe(401);
  });

  it("should return 401 if password is incorrect", async () => {
    const body = {
      email : 'osiima@gledj.cdu',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({
      _id: '1234567',
      email :'ouds@gmail.com',
      password: '12345678',
      matchPassword: jest.fn().mockResolvedValue(false)
    });
    const response = await request(app).post("/auth").send(body);
    expect(response.status).toBe(401);
  });

  it("should login successfully", async () => {
    const body = {
      email : 'osiima@gledj.cdu',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({
      _id: '1234567',
      name: 'Test User',
      email :'ouds@gmail.com',
      isAdmin: false,
      password: '12345678',
      matchPassword: jest.fn().mockResolvedValue(true)
    });
    jwt.sign.mockReturnValue("mockedToken");
    const response = await request(app).post("/auth").send(body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: '1234567',
      name: 'Test User',
      email: 'ouds@gmail.com',
      isAdmin: false,
    });
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toContain('jwt=mockedToken');
  });
});