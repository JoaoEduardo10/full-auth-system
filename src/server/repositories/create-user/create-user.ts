import { PrismaClient, User } from "@prisma/client";
import { UserDTO } from "../../interface/interfaceDTO";
import { ICreateUserRepository } from "./protocols";
import { Not_Fould } from "../../errors/api-errors";
import { prisma } from "../../../database/prisma";

export class PrismaCreateUserRepository implements ICreateUserRepository {
  private User = prisma.user;

  async create(params: UserDTO): Promise<User> {
    const user = await this.User.create({ data: params });

    if (!user) {
      throw new Not_Fould("Error no banco ao tentar criar o usuario!");
    }

    return user;
  }
}
