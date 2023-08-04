import { User } from "@prisma/client";
import { UserDTO } from "../../../src/server/interface/interfaceDTO";
import { ICreateUserRepository } from "../../../src/server/repositories/protocols";
import { v4 as uuid } from "uuid";

export class CreateUserInMemoryRepository implements ICreateUserRepository {
  async create(user: UserDTO): Promise<User> {
    const status = user.status ?? "notAuthenticated";

    return { ...user, id: uuid(), status };
  }
}
