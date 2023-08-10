import { User } from "@prisma/client";
import { IUserAuthenticationRepository } from "./protocols";
import { prisma } from "../../../database/prisma";
import { Not_Fould } from "../../errors/api-errors";

export class PrismaUserAuthenticationRepository
  implements IUserAuthenticationRepository
{
  private User: typeof prisma.user;

  constructor() {
    this.User = prisma.user;
  }

  async authentication({ id }: { id: string }): Promise<User> {
    const user = await this.User.update({
      where: { id },
      data: { status: "authenticated" },
    });

    if (!user) {
      throw new Not_Fould(
        "Error no banco. Não foi possibel altenticar o usuário."
      );
    }

    return user;
  }
}
