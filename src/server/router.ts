import { Router } from "express";
import { googleRouter } from "./routes/google-auth/google-auth";
import { userAuth } from "./routes/user-auth/user-auth";
import { loginUser } from "./routes/login/login-user";

const router = Router();

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>clique aque</a>");
});

router.use("/", googleRouter);
router.use("/", userAuth);
router.use("/", loginUser);

export { router };
