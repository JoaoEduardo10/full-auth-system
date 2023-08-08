import { Router } from "express";
import { googleRouter } from "./routes/google-auth/google-auth";
import { userAuth } from "./routes/user-auth/user-auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>clique aque</a>");
});

router.use("/", googleRouter);
router.use("/", userAuth);

export { router };
