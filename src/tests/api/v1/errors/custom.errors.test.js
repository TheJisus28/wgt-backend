// test/api/v1/errors/custom.errors.test.js

import { expect } from "chai";
import {
  CustomError,
  ValidationError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} from "../../../../api/v1/errors/custom.errors.js";

describe("Custom Errors", () => {
  it("should create a CustomError with message and status code", () => {
    const error = new CustomError("This is a custom error", 400);
    expect(error.message).to.equal("This is a custom error");
    expect(error.statusCode).to.equal(400);
  });

  it("should return a string representation of CustomError", () => {
    const error = new CustomError("This is a custom error", 400);
    expect(error.toString()).to.include("This is a custom error");
  });

  it("should create a ValidationError with default message", () => {
    const error = new ValidationError();
    expect(error.message).to.equal("Validation Error");
    expect(error.statusCode).to.equal(400);
  });

  it("should create a BadRequestError with default message", () => {
    const error = new BadRequestError();
    expect(error.message).to.equal("Bad Request");
    expect(error.statusCode).to.equal(400);
  });

  it("should create an UnauthorizedError with custom message", () => {
    const error = new UnauthorizedError("Access denied");
    expect(error.message).to.equal("Access denied");
    expect(error.statusCode).to.equal(401);
  });

  it("should create a NotFoundError with default message", () => {
    const error = new NotFoundError();
    expect(error.message).to.equal("Not Found");
    expect(error.statusCode).to.equal(404);
  });

  it("should create a ConflictError with default message", () => {
    const error = new ConflictError();
    expect(error.message).to.equal("Conflict: Resource already exists");
    expect(error.statusCode).to.equal(409);
  });
});
