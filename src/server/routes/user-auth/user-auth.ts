import { Router } from "express";
import { CreateUserRouter } from "../../usecase/create-user/create-user";
import { CreateUserAuthMiddlware } from "../../middlewares/user-auth/create-user";
import { UserAuthenticationRouter } from "../../usecase/user-authentication/user-authentication";
import { UserAuthenticationMiddleware } from "../../middlewares/user-auth/authentication-user";

const userAuth = Router();

const createUserRouter = new CreateUserRouter();
const createUserAuthMiddlware = new CreateUserAuthMiddlware();

userAuth.post(
  "/user",
  createUserAuthMiddlware.middleware,
  createUserRouter.create
);

const userAuthenticationRouter = new UserAuthenticationRouter();
const userAuthenticationMiddleware = new UserAuthenticationMiddleware();

userAuth.get(
  "/user/validator/:userId",
  userAuthenticationMiddleware.middleware,
  userAuthenticationRouter.authentication
);

export { userAuth };
