import { RequestHandler } from "express";
import { PrismaCreateUserRepository } from "../repositories/create-user";
import { CreateUserController } from "../controllers/create-user";

export const userGoogleRouter: RequestHandler = async (req, res) => {
  const createUserRepository = new PrismaCreateUserRepository();

  const createUserControler = new CreateUserController(createUserRepository);

  const { body, statusCode, token } = await createUserControler.handle(req);

  res.status(statusCode).json({ user: body, token });
};
