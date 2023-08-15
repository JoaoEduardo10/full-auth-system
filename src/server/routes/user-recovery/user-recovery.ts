import { Router } from "express";
import { UserPasswordRecoveryMiddleware } from "../../middlewares/user-recovery/user-recovery";
import { UserPasswordRecoveryRouter } from "../../usecase/user-recovery/user-recovery";

const userRecovery = Router();

const userPassowrdRecoveryMiddleware = new UserPasswordRecoveryMiddleware();
const userPassowrdRecoveryRouter = new UserPasswordRecoveryRouter();

userRecovery.put(
  "/user/recovery/:userId",
  userPassowrdRecoveryMiddleware.middleware,
  userPassowrdRecoveryRouter.recovery
);

export { userRecovery };
