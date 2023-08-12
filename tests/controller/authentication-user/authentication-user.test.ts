import { AuthenticationUserRepositoryInMemory } from "../../repositories/authentication-user/authenication-user-in-memory";
import { UserAuthenticationController } from "../../../src/server/controllers/authentication-user/authentication-user";
import { ApiRequest } from "../../../src/server/controllers/protocols";

const mockReq: ApiRequest = {
  params: {
    userId: "1234",
  },
};

describe("authentication-user", () => {
  it("should return an authenticated user", async () => {
    const authenticattionUserRepositoryInMemory =
      new AuthenticationUserRepositoryInMemory();

    const userAuthenticationController = new UserAuthenticationController(
      authenticattionUserRepositoryInMemory
    );

    const { body, statusCode } = await userAuthenticationController.handle(
      mockReq
    );

    expect(body.status).toBe("authenticated");
    expect(statusCode).toBe(204);
  });

  it("should return an notAuthenticated user", async () => {
    try {
      const authenticattionUserRepositoryInMemory =
        new AuthenticationUserRepositoryInMemory();

      const userAuthenticationController = new UserAuthenticationController(
        authenticattionUserRepositoryInMemory
      );

      mockReq.params.userId = "12345";

      const userDTO_with_statusCode = await userAuthenticationController.handle(
        mockReq
      );

      expect(userDTO_with_statusCode).not.toBeTruthy();
    } catch (error: any) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toEqual("Usuário não autenticado.");
    }
  });
});
