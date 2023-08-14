import { Router } from "express";
import { LoginUserRouter } from "../../usecase/login-user/login-user";
import { LoginUserMiddleware } from "../../middlewares/login-user/login-user";

const loginUser = Router();

const loginUserRouter = new LoginUserRouter();
const loginUserMiddleware = new LoginUserMiddleware();
loginUser.post("/login", loginUserMiddleware.middlware, loginUserRouter.login);

export { loginUser };
