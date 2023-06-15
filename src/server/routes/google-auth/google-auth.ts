import { RequestHandler, Router } from "express";
import passport from "passport";

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

googleRouter.get("/auth/google/success", islogged, (req, res) => {
  res.send(req.user);
});

googleRouter.get("/auth/google/failures", (req, res) => {
  res.sendStatus(500);
});

googleRouter.get("/logout", (req, res, next) => {
  req.logout(req.user as any, (err) => {
    if (err) return next(err);

    req.session.destroy((error) => {
      if (error) console.log(error.message);
    });
    res.redirect("/");
  });
});

export { googleRouter };
