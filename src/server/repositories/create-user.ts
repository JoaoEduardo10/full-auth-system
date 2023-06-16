import { PrismaClient, User } from "@prisma/client";
import { UserDTO } from "../interface/interfaceDTO";
import { ICreateUserRepository } from "./protocols";
import { Not_Fould } from "../errors/api-errors";

export class PrismaCreateUserRepository implements ICreateUserRepository {
  private User = new PrismaClient().user;

  async create(params: UserDTO): Promise<User> {
    const user = await this.User.create({ data: params });

    if (!user) {
      throw new Not_Fould("Error no banco ao tentar criar o usuario!");
    }

    return user;
  }
}
