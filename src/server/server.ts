import express from "express";
import { AuthGoogle } from "../auth/google-auth";
import "dotenv/config";
import passport from "passport";
import session from "express-session";
import { router } from "./router";

const authGoogle = new AuthGoogle();

const server = express();

server.use(express.json());
authGoogle.auth();
server.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use(router);

export { server };
