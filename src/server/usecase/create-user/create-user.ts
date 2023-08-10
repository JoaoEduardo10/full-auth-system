import { Request, Response } from "express";
import { PrismaCreateUserRepository } from "../../repositories/create-user";
import { CreateUserController } from "../../controllers/create-user/create-user";

export class CreateUserRouter {
  async create(req: Request, res: Response) {
    const prismaCreateUserRepository = new PrismaCreateUserRepository();
    const createUserController = new CreateUserController(
      prismaCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle(req);

    res.status(statusCode).json({ body });
  }
}
