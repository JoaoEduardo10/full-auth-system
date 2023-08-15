import { Request, Response } from "express";
import { PrismaUserPasswordRecoveryRepository } from "../../repositories/user-recovery/user-recovery";
import { UserPasswordRecoveryRepository } from "../../controllers/user-recovery/user-recovery";

class UserPasswordRecoveryRouter {
  async recovery(req: Request, res: Response) {
    const prismaUserPasswordRcoveryRepository =
      new PrismaUserPasswordRecoveryRepository();
    const userPasswordRecoveryController = new UserPasswordRecoveryRepository(
      prismaUserPasswordRcoveryRepository
    );

    const { statusCode } = await userPasswordRecoveryController.handle(req);

    res.sendStatus(statusCode);
  }
}

export { UserPasswordRecoveryRouter };
