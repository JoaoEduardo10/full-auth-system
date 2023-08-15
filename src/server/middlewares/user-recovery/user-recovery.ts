/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../database/prisma";
import { Bad_Request, Not_Fould } from "../../errors/api-errors";

class UserPasswordRecoveryMiddleware {
  async middleware(
    req: Request<{ userId: string }, {}, { password: string }>,
    _res: Response,
    next: NextFunction
  ) {
    const { password } = req.body;
    const { userId } = req.params;
    const user_prisma = prisma.user;

    const user = await user_prisma.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Not_Fould("rota inválida!");
    }

    if (!password) {
      throw new Bad_Request("adicione o password!");
    }

    next();
  }
}

export { UserPasswordRecoveryMiddleware };
