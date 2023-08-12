import { Request, Response } from "express";
import { PrismaUserAuthenticationRepository } from "../../repositories/authentication-user/authentication-user";
import { UserAuthenticationController } from "../../controllers/authentication-user/authentication-user";

class UserAuthenticationRouter {
  async authentication(req: Request, res: Response) {
    const userAuthenticationRepository =
      new PrismaUserAuthenticationRepository();

    const userAuthenticationController = new UserAuthenticationController(
      userAuthenticationRepository
    );

    const { body, statusCode } = await userAuthenticationController.handle(req);

    res.status(statusCode).json(body);
  }
}

export { UserAuthenticationRouter };
