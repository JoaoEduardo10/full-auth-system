import { PrismaCreateUserRepository } from "../../src/server/repositories/create-user";

describe("PrismaCreateUser", () => {
  it("should create a user", async () => {
    const prismaCreateUserRepository = new PrismaCreateUserRepository();

    const user = await prismaCreateUserRepository.create({
      email: "test@gmail.com",
      name: "test",
      status: "authenticated",
      password: "test1234",
    });

    expect(user).toBeTruthy();
    expect(typeof user.id).toBe("string");
  });

  it("should throw an error for not creating the user", async () => {
    try {
      const prismaCreateUserRepository = new PrismaCreateUserRepository();

      jest
        .spyOn(prismaCreateUserRepository["User"], "create")
        .mockReturnValue(null as any);

      const user = await prismaCreateUserRepository.create({
        email: "testaa@gmail.com",
        name: "test",
        status: "authenticated",
        password: "test1234",
      });

      expect(user).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();
      expect((error as Error).message).toEqual(
        "Error no banco ao tentar criar o usuario!"
      );
    }
  });
});
