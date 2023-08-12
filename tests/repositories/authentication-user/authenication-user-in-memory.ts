import { User } from "@prisma/client";
import { IUserAuthenticationRepository } from "../../../src/server/repositories/authentication-user/protocols";

interface IUserDTO {
  email: string;
  id: string;
  name: string;
  password: string;
  status: "authenticated" | "notAuthenticated";
}

export class AuthenticationUserRepositoryInMemory
  implements IUserAuthenticationRepository
{
  private user: IUserDTO;

  constructor() {
    this.user = {
      email: "test123@gmail.com",
      id: "1234",
      name: "test",
      password: "test",
      status: "notAuthenticated",
    };
  }

  private changingUserStatus(id: string) {
    if (id == this.user.id) {
      this.user.status = "authenticated";
      return;
    }
  }

  async authentication({ id }: { id: string }): Promise<User> {
    this.changingUserStatus(id);
    return this.user;
  }
}
