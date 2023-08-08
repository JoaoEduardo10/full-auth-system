/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../../interface/interfaceDTO";
import { Bad_Request } from "../../errors/api-errors";
import validator from "validator";
import { prisma } from "../../../database/prisma";

export class CreateUserAuthMiddlware {
  async middleware(
    req: Request<{}, {}, UserDTO>,
    _res: Response,
    next: NextFunction
  ) {
    const { email, name, password } = req.body;

    if (!email) {
      throw new Bad_Request("Adicione um email!");
    }

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Bad_Request("Formato de email invalido!");
    }

    const isUser = await prisma.user.findFirst({ where: { email } });

    if (isUser) {
      throw new Bad_Request("Email já existente!");
    }

    if (!name) {
      throw new Bad_Request("Adicione um name!");
    }

    if (!password) {
      throw new Bad_Request("Adicione um password");
    }

    next();
  }
}
