import express from "express";
import "dotenv/config";

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
  res.send("ok");
});

export { server };
