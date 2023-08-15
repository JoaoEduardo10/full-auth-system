/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../database/prisma";
import { LoginUserDTO } from "../../repositories/login-user/protocols";
import { Bad_Request } from "../../errors/api-errors";
import { comparePassowrd } from "../../utils/bcryptjs";

class LoginUserMiddleware {
  async middlware(
    req: Request<{}, {}, LoginUserDTO>,
    res: Response,
    next: NextFunction
  ) {
    const user_prisma = prisma.user;
    const { email, password } = req.body;

    if (!email) {
      throw new Bad_Request("Adicione um email");
    }

    if (!password) {
      throw new Bad_Request("Adicione um password");
    }

    const user = await user_prisma.findUnique({ where: { email } });

    if (!user) {
      throw new Bad_Request(
        "Dados incorretos, por favor, verifique os dados inseridos e corrija-os"
      );
    }

    const isPassword = await comparePassowrd(password, user.password);

    if (!isPassword) {
      throw new Bad_Request(
        "Dados incorretos, por favor, verifique os dados inseridos e corrija-os"
      );
    }

    const status = user.status;

    if (status == "notAuthenticated") {
      throw new Bad_Request("usuario não validado");
    }

    next();
  }
}

export { LoginUserMiddleware };
