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

    const { statusCode } = await userAuthenticationController.handle(req);

    const url = `${process.env.API_URL}/public/index.html`;

    res.status(statusCode).redirect(url);
  }
}

export { UserAuthenticationRouter };
