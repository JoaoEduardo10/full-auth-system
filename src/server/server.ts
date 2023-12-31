import "express-async-errors";
import express from "express";
import "dotenv/config";
import passport from "passport";
import session from "express-session";
import { router } from "./router";
import { configurePassport } from "../config/passport-config";
import { globalsErrors } from "./middlewares/globals-errors";
import cors from "cors";
import path from "path";

const server = express();

server.use(cors());

server.use(
  "/public",
  express.static(path.join(__dirname, "..", "..", "public"))
);

configurePassport();

server.use(express.json());
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
server.use(globalsErrors);

export { server };
