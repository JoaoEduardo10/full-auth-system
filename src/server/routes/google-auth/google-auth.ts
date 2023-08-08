/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler, Router } from "express";
import passport from "passport";
import { Not_Fould } from "../../errors/api-errors";
import { userGoogleRouter } from "../../usecase/create-user-google/create-user-google";
import { googleAuthMiddleware } from "../../middlewares/google-auth/google-auth-middleware";

const googleRouter = Router();

const islogged: RequestHandler = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

googleRouter.get(
  "/auth/google/success",
  islogged,
  googleAuthMiddleware,
  userGoogleRouter
);

googleRouter.get("/auth/google/failures", (_req, _res) => {
  throw new Not_Fould("Errro no servido");
});

googleRouter.get("/logout", (req, res, next) => {
  req.logout(req.user as any, (err) => {
    if (err) return next(err);

    req.session.destroy((error) => {
      if (error) console.log(error.message);
    });
    return res.redirect("/");
  });
});

export { googleRouter };
