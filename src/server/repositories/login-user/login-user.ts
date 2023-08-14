import { User } from "@prisma/client";
import { ILoginUserRepository, LoginUserDTO } from "./protocols";
import { prisma } from "../../../database/prisma";
import { Internal_Server_Error } from "../../errors/api-errors";

class PrismaLoginUserRepository implements ILoginUserRepository {
  private User: typeof prisma.user;

  constructor() {
    this.User = prisma.user;
  }

  async login(loginUser: LoginUserDTO): Promise<User> {
    const { email } = loginUser;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Internal_Server_Error(
        "Erro no servidor. Não foi possivel buscar o usuário"
      );
    }

    return user;
  }
}

export { PrismaLoginUserRepository };
