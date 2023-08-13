/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @jest-environment ./tests/prisma-environment-jest
 */

import { prisma } from "../../../src/database/prisma";
import { serverTest } from "../../jest.setup";

describe("user-authentication", () => {
  let user = {
    id: "",
    email: "",
    password: "",
    status: "",
    name: "",
  };

  beforeEach(async () => {
    const user_prisma = await prisma.user.create({
      data: {
        email: "test66@gmail.com",
        name: "test",
        password: "test",
      },
    });

    user = { ...user_prisma };
  });

  afterEach(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should authenticate the user", async () => {
    const { redirect } = await serverTest.get(`/user/validator/${user.id}`);

    expect(redirect).toBe(true);
  });
});
