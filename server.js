const express = require("express");
const server = express();
server.use(express.json());

const users = [];

server.get("/", (req, res) => {
  res.json({ api: "running..." });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!(user.name && user.bio)) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  try {
    users.push(user);
  } catch {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }

  res.status(201).json(users);
});

server.get("/api/users", (req, res) => {
  try {
    res.json(users);
  } catch {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

server.get("/api/users/:id", (req, res) => {});
server.delete("/api/users/:id", (req, res) => {});
server.patch("/api/users/:id", (req, res) => {});

const port = 3000;
server.listen(port, () => {
  console.log(`listening on ${port}...`);
});
