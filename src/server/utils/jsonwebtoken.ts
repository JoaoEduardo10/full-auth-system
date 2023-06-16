import jwt from "jsonwebtoken";
import { Not_Fould } from "../errors/api-errors";

export interface Ijwt {
  email: string;
  name: string;
  id: string | number;
}

export interface IjwtComplete {
  iat: number;
  exp: number;
}

export const createJwt = (data: Ijwt) => {
  const jwtHash = process.env.HASH_JWT as string;

  return jwt.sign(data, jwtHash, { expiresIn: "3h" });
};

export const compareJwt = (token: string): Ijwt & IjwtComplete => {
  const jwtHash = process.env.HASH_JWT as string;

  const varifyToken = jwt.verify(token, jwtHash);

  if (typeof varifyToken === "string") {
    throw new Not_Fould("Token invalido");
  }

  return varifyToken as Ijwt & IjwtComplete;
};
