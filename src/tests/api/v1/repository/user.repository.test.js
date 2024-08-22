// test/api/v1/repository/user.repository.test.js

import { expect } from "chai";
import sinon from "sinon";
import { userRepository } from "../../../../api/v1/repository/user.repository.js";
import { db } from "../../../../database/connection.database.js"; // Asegúrate de que esta ruta sea correcta

describe("User Repository", () => {
  let dbStub;

  beforeEach(() => {
    dbStub = sinon.stub(db, "query");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a new user", async () => {
    const newUser = {
      user_id: 1,
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword",
    };
    dbStub
      .withArgs(sinon.match.any, sinon.match.any)
      .returns({ rows: [newUser] });

    const result = await userRepository.createUser({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });
    expect(result).to.deep.equal(newUser);
  });

  it("should get all users", async () => {
    const users = [
      { user_id: 1, username: "testuser", email: "test@example.com" },
    ];
    dbStub.returns({ rows: users });

    const result = await userRepository.getAllUsers();
    expect(result).to.deep.equal(users);
  });

  it("should get a user by ID", async () => {
    const user = {
      user_id: 1,
      username: "testuser",
      email: "test@example.com",
    };
    dbStub.withArgs(sinon.match.any, [1]).returns({ rows: [user] });

    const result = await userRepository.getUserById(1);
    expect(result).to.deep.equal(user);
  });

  it("should get a user by email", async () => {
    const user = {
      user_id: 1,
      username: "testuser",
      email: "test@example.com",
    };
    dbStub
      .withArgs(sinon.match.any, ["test@example.com"])
      .returns({ rows: [user] });

    const result = await userRepository.getUserByEmail("test@example.com");
    expect(result).to.deep.equal(user);
  });

  it("should update a user's username", async () => {
    const updatedUser = {
      user_id: 1,
      username: "newusername",
      email: "test@example.com",
    };
    dbStub
      .withArgs(sinon.match.any, sinon.match.any)
      .returns({ rows: [updatedUser] });

    const result = await userRepository.updateUsername(1, "newusername");
    expect(result).to.deep.equal(updatedUser);
  });

  it("should delete a user", async () => {
    const deletedUser = {
      user_id: 1,
      username: "testuser",
      email: "test@example.com",
    };
    dbStub.withArgs(sinon.match.any, [1]).returns({ rows: [deletedUser] });

    const result = await userRepository.deleteUser(1);
    expect(result).to.deep.equal(deletedUser);
  });
});
