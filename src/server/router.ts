import { Router } from "express";
import { googleRouter } from "./routes/google-auth/google-auth";
import { userAuth } from "./routes/user-auth/user-auth";
import { loginUser } from "./routes/login/login-user";
import { userRecovery } from "./routes/user-recovery/user-recovery";

const router = Router();

router.use("/", googleRouter);
router.use("/", userAuth);
router.use("/", loginUser);
router.use("/", userRecovery);

export { router };
