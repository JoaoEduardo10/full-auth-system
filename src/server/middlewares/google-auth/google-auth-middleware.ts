import { RequestHandler } from "express";
import { createJwt } from "../../utils/jsonwebtoken";
import { prisma } from "../../../database/prisma";

export const googleAuthMiddleware: RequestHandler = async (req, res, next) => {
  const user_req = req.user;
  const { email } = user_req as any;

  const isUser = await prisma.user.findFirst({ where: { email } });

  if (isUser) {
    const token = createJwt({
      email: isUser.email,
      id: isUser.id,
      name: isUser.name,
    });

    return res.status(200).json({ token, user: isUser });
  }

  next();
};
