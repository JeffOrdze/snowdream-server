const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST TO CREATE NEW USER

router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter the required fields" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    name,
    username,
    password: hashedPassword,
  };

  try {
    await knex("users").insert(newUser);
    res.status(201).json({ message: "Successfully registered user" });
  } catch (error) {
    res.status(400).json({ message: "Failed registration" });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please enter all required fields" });
  }

  const user = await knex("users").where({ username: username }).first();
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.json({ token });
});

//GET CURRENT USER

router.get("/current", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Please login" });
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    const user = await knex("users").where({ id: decoded.id }).first();
    delete user.password;
    res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid auth token" });
  }
});

module.exports = router;
