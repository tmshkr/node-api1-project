const express = require("express");
const cors = require("cors");
const server = express();
server.use(express.json());
server.use(cors());

const users = [];
let nextID = 1;

server.get("/", (req, res) => {
  res.json({ api: "running..." });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!(user.name && user.bio)) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  try {
    delete user.id; // in case an id is included with the request
    users.push({ id: nextID++, ...user });
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

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const found = users.find((u) => u.id === Number(id));
    if (!found) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
    res.json(found);
  } catch {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved.",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const index = users.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
  } catch {
    res.status(500).json({
      errorMessage: "The user could not be removed",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!(user.name && user.bio)) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  try {
    const index = users.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
    delete user.id;
    const updatedUser = { ...users[index], ...user };
    users.splice(index, 1, updatedUser);
    res.json(updatedUser);
  } catch {
    res.status(500).json({
      errorMessage: "The user could not be modified.",
    });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`listening on ${port}...`);
});
