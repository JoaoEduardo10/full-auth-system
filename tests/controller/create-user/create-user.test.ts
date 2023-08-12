import { CreateUserController } from "../../../src/server/controllers/create-user/create-user";
import { ApiRequest } from "../../../src/server/controllers/protocols";
import { CreateUserInMemoryRepository } from "../../repositories/create-user/create-user-in-memory";

const mockUserApiRequest: ApiRequest = {
  user: {
    displayName: "test123",
    email: "test@gmail.com",
  },
};

const mockBodyApiRequest: ApiRequest = {
  body: {
    email: "test@gmail.com",
    name: "test",
    password: "123",
  },
};

describe("create-user", () => {
  it("should return the database users with status code 201", async () => {
    const createUserInMemoryRepository = new CreateUserInMemoryRepository();

    const controller = new CreateUserController(createUserInMemoryRepository);

    const { body, statusCode, token } = await controller.handle(
      mockUserApiRequest
    );

    expect(body.id).toBeTruthy();
    expect(body.email).toBe(mockUserApiRequest.user.email);
    expect(body.name).toBe(mockUserApiRequest.user.displayName);
    expect(body.status).toEqual("authenticated");
    expect(statusCode).toBe(201);
    expect(token).toBeTruthy();
  });

  it(" should return a user created from the database if it is via body with status code 201", async () => {
    const createUserInMemoryRepository = new CreateUserInMemoryRepository();

    const controller = new CreateUserController(createUserInMemoryRepository);

    const { body, statusCode, token } = await controller.handle(
      mockBodyApiRequest
    );

    expect(body.id).toBeTruthy();
    expect(body.email).toBe(mockBodyApiRequest.body?.email);
    expect(body.name).toBe(mockBodyApiRequest.body?.name);
    expect(body.status).toBe("notAuthenticated");
    expect(statusCode).toBe(201);
    expect(token).toBeUndefined();
  });
});
