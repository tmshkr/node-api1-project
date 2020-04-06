const express = require("express");
const server = express();
server.use(express.json());

const users = [];

server.get("/", (req, res) => {
  res.json({ api: "running..." });
});

server.post("/api/users", (req, res) => {});
server.get("/api/users", (req, res) => {});
server.get("/api/users/:id", (req, res) => {});
server.delete("/api/users/:id", (req, res) => {});
server.patch("/api/users/:id", (req, res) => {});

const port = 3000;
server.listen(port, () => {
  console.log(`listening on ${port}...`);
});
