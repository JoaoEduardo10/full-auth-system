import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../database/prisma";
import { Not_Fould } from "../../errors/api-errors";

class UserAuthenticationMiddleware {
  async middleware(
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.userId;
    const User = prisma.user;

    const user = await User.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Not_Fould("id inválido!");
    }

    const url = `${process.env.API_URL}/public/index.html`;

    if (user.status !== "notAuthenticated") {
      return res.status(204).redirect(url);
    }

    next();
  }
}

export { UserAuthenticationMiddleware };
