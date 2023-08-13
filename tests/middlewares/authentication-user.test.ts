/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @jest-environment ./tests/prisma-environment-jest
 */

import { prisma } from "../../src/database/prisma";
import { serverTest } from "../jest.setup";

describe("authentication-user", () => {
  const user = {
    id: "",
  };

  beforeEach(async () => {
    const user_prisma = await prisma.user.create({
      data: {
        email: "aaa@gmail.com",
        name: "test",
        password: "test",
        status: "authenticated",
      },
    });

    user.id = user_prisma.id;
  });

  afterEach(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should return a server response with invalid id with status code 404", async () => {
    const { body, statusCode } = await serverTest.get("/user/validator/1423");

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "id inválido!" });
  });

  it("should redirect the user if they try to authenticate again", async () => {
    const { redirect, body, statusCode } = await serverTest.get(
      `/user/validator/${user.id}`
    );

    expect(statusCode).toBe(302);
    expect(redirect).toEqual(true);
  });
});
