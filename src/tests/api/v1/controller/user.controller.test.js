// test/controllers/user.controller.test.js

import { expect } from "chai";
import sinon from "sinon";
import { userController } from "../../../../api/v1/controllers/user.controller.js";
import { userService } from "../../../../api/v1/services/user.service.js";

describe("User Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a new user", async () => {
    req.body = {
      username: "testuser",
      email: "test@example.com",
      password: "password",
    };

    // Stub the userService
    const token = "mockToken";
    sinon.stub(userService, "registerUser").resolves(token);

    await userController.registerUser(req, res, next);

    expect(userService.registerUser.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal({
      ok: true,
      message: "User registered successfully",
      token,
    });
  });

  it("should handle error when registration fails", async () => {
    req.body = {
      username: "testuser",
      email: "test@example.com",
      password: "password",
    };

    // Stub the userService to throw an error
    const error = new Error("Email is already in use");
    sinon.stub(userService, "registerUser").throws(error);

    await userController.registerUser(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(error)).to.be.true;
  });

  it("should login a user", async () => {
    req.body = {
      email: "test@example.com",
      password: "password",
    };

    // Stub the userService
    const token = "mockToken";
    sinon.stub(userService, "loginUser").resolves(token);

    await userController.loginUser(req, res, next);

    expect(userService.loginUser.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal({
      ok: true,
      message: "Login successful",
      token,
    });
  });

  it("should handle error when login fails", async () => {
    req.body = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    // Stub the userService to throw an error
    const error = new Error("Invalid email or password");
    sinon.stub(userService, "loginUser").throws(error);

    await userController.loginUser(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(error)).to.be.true;
  });

  it("should get all users", async () => {
    const users = [
      { user_id: 1, username: "testuser", email: "test@example.com" },
    ];
    sinon.stub(userService, "getAllUsers").resolves(users);

    await userController.getAllUsers(req, res, next);

    expect(userService.getAllUsers.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(users);
  });

  it("should handle error when fetching users fails", async () => {
    // Stub the userService to throw an error
    const error = new Error("Failed to fetch users");
    sinon.stub(userService, "getAllUsers").throws(error);

    await userController.getAllUsers(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(error)).to.be.true;
  });
});
