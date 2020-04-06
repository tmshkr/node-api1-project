const express = require("express");
const server = express();
server.use(express.json());

const users = [];

server.get("/", (req, res) => {
  res.json({ api: "running..." });
});

const port = 3000;
server.listen(port, () => {
  console.log(`listening on ${port}...`);
});
