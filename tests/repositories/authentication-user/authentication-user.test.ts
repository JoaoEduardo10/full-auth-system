/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @jest-environment ./tests/prisma-environment-jest
 */

import { prisma } from "../../../src/database/prisma";
import { PrismaUserAuthenticationRepository } from "../../../src/server/repositories/authentication-user/authentication-user";

describe("authentication-user", () => {
  let id: string;

  beforeEach(async () => {
    const user = await prisma.user.create({
      data: {
        email: "test45@gmail.com",
        name: "test",
        password: "123",
      },
    });

    id = user.id;
  });

  afterEach(async () => {
    await prisma.user.delete({ where: { id } });
  });

  it("should update the user's status to authenticated", async () => {
    const prismaUserAuthenticationRepository =
      new PrismaUserAuthenticationRepository();

    const userNotAuthenticate = await prisma.user.findUnique({ where: { id } });

    expect(userNotAuthenticate?.status).toBe("notAuthenticated");

    const userAuthenticated =
      await prismaUserAuthenticationRepository.authentication({
        id,
      });

    expect(userAuthenticated.status).toBe("authenticated");
  });

  it("should not create a user by database error", async () => {
    try {
      const prismaUserAuthenticationRepository =
        new PrismaUserAuthenticationRepository();

      jest
        .spyOn(prismaUserAuthenticationRepository["User"], "update")
        .mockReturnValue(null as any);

      const user = await prismaUserAuthenticationRepository.authentication({
        id,
      });

      expect(user).not.toBeTruthy();
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect((error as Error).message).toEqual(
        "Error no banco. Não foi possibel altenticar o usuário."
      );
    }
  });
});
