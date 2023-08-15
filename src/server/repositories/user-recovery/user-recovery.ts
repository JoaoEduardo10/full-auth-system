import { User } from "@prisma/client";
import { IUserPasswordRecoveryRepository, UserRecoveryDTO } from "./protocols";
import { prisma } from "../../../database/prisma";
import { Internal_Server_Error } from "../../errors/api-errors";

class PrismaUserPasswordRecoveryRepository
  implements IUserPasswordRecoveryRepository
{
  private User: typeof prisma.user;

  constructor() {
    this.User = prisma.user;
  }

  async recovery(userRecovery: UserRecoveryDTO): Promise<User> {
    const { password, id } = userRecovery;

    const user = await this.User.update({ where: { id }, data: { password } });

    if (!user) {
      throw new Internal_Server_Error("Error no Banco de dados");
    }

    return user;
  }
}

export { PrismaUserPasswordRecoveryRepository };
