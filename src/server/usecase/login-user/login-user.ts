import { Request, Response } from "express";
import { PrismaLoginUserRepository } from "../../repositories/login-user/login-user";
import { LoginUserController } from "../../controllers/login-user/login-user";

class LoginUserRouter {
  async login(req: Request, res: Response) {
    const prismaLoginUserRepository = new PrismaLoginUserRepository();
    const loginUserController = new LoginUserController(
      prismaLoginUserRepository
    );

    const { body, statusCode, token } = await loginUserController.handle(req);

    res.status(statusCode).json({ data: { token, user: body } });
  }
}

export { LoginUserRouter };
