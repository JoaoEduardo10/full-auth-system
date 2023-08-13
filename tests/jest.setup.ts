import "dotenv/config";
import supertest from "supertest";
import { server } from "../src/server/server";

const serverTest = supertest(server);

export { serverTest };
