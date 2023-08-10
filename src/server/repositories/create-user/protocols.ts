import { User } from "@prisma/client";
import { UserDTO } from "../../interface/interfaceDTO";

export interface ICreateUserRepository {
  create(params: UserDTO): Promise<User>;
}
