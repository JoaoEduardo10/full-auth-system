import { Router } from "express";
import { CreateUserRouter } from "../../usecase/create-user/create-user";
import { CreateUserAuthMiddlware } from "../../middlewares/user-auth/user-auth";

const userAuth = Router();

const createUserRouter = new CreateUserRouter();
const createUserAuthMiddlware = new CreateUserAuthMiddlware();

userAuth.post(
  "/user",
  createUserAuthMiddlware.middleware,
  createUserRouter.create
);

export { userAuth };
