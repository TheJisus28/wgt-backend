// test/api/v1/services/user.services.test.js

import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import { userService } from "../../../../api/v1/services/user.service.js";
import { userRepository } from "../../../../api/v1/repository/user.repository.js";
import {
  ConflictError,
  ValidationError,
} from "../../../../api/v1/errors/custom.errors.js";

describe("User Service", () => {
  let userRepositoryStub;

  beforeEach(() => {
    userRepositoryStub = sinon.stub(userRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a new user", async () => {
    userRepositoryStub.getUserByEmail.resolves(null); // No user found
    userRepositoryStub.createUser.resolves({ user_id: 1, role_id: 1 }); // New user created
    sinon.stub(bcrypt, "hash").resolves("hashedpassword"); // Mocking bcrypt hash

    const token = await userService.registerUser({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });

    expect(userRepositoryStub.getUserByEmail.calledOnce).to.be.true;
    expect(userRepositoryStub.createUser.calledOnce).to.be.true;
    expect(token).to.exist; // Token should be created
  });

  it("should throw ConflictError when email already exists", async () => {
    userRepositoryStub.getUserByEmail.resolves({ user_id: 1 }); // User exists

    try {
      await userService.registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      });
      throw new Error("Expected ConflictError not thrown");
    } catch (error) {
      expect(error).to.be.instanceOf(ConflictError);
      expect(error.message).to.equal("Email is already in use");
    }
  });

  it("should login a user", async () => {
    const user = { user_id: 1, role_id: 1, password: "hashedpassword" };
    userRepositoryStub.getUserByEmail.resolves(user); // User found
    sinon.stub(bcrypt, "compare").resolves(true); // Password match

    const token = await userService.loginUser({
      email: "test@example.com",
      password: "password",
    });
    expect(token).to.exist; // Token should be created
  });

  it("should throw ValidationError when login fails", async () => {
    userRepositoryStub.getUserByEmail.resolves(null); // User not found

    try {
      await userService.loginUser({
        email: "test@example.com",
        password: "wrongpassword",
      });
      throw new Error("Expected ValidationError not thrown");
    } catch (error) {
      expect(error).to.be.instanceOf(ValidationError);
      expect(error.message).to.equal("Invalid email or password");
    }
  });

  it("should get all users", async () => {
    userRepositoryStub.getAllUsers.resolves([
      { user_id: 1, username: "testuser", email: "test@example.com" },
    ]);

    const result = await userService.getAllUsers();
    expect(result.ok).to.be.true;
    expect(result.users).to.be.an("array").that.is.not.empty;
  });
});
