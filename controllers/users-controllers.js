const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST TO CREATE NEW USER

const signUp = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter the required fields" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    name,
    username,
    password: hashedPassword,
  };

  const uniqueUser = await knex("users").where({ username: username });

  if (uniqueUser.length === 0) {
    try {
      await knex("users").insert(newUser);
      res.status(201).json({ message: "Successfully registered user" });
    } catch (error) {
      res.status(400).json({ message: "Failed registration" });
    }
  } else {
    return res.status(400).json({ message: "User already exists" });
  }
};

//LOGIN

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
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

  return res.status(200).json({ token });
};

//GOOGLE LOGIN

const googleLogin = async (req, res) => {
  const { username, password, name } = req.body;

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    username,
    name,
    password: hashedPassword,
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  const user = await knex("users").where({ username: username }).first();

  if (!user) {
    try {
      await knex("users").insert(newUser);
    } catch {
      return res.status(400).json({ message: "Could not add user" });
    }
  }

  try {
    const googleUser = await knex("users")
      .where({ username: username })
      .first();

    const token = jwt.sign(
      { id: googleUser.id, username: googleUser.username },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    return res.status(201).json(token);
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({ token });
};

//GET CURRENT USER

const currentUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Please login" });
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    const user = await knex("users").where({ id: decoded.id }).first();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "Invalid auth token" });
  }
};

//GET LIST OF MOUNTAINS A USER HAS FAVOURITED

const likedMountains = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ message: "Please login " });
  }

  try {
    const mountains = await knex("mountains")
      .select()
      .join("user_info", "mountains.id", "user_info.mountain_id")
      .where("user_info.users_id", id);
    res.status(201).json(mountains);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Could not retrieve user information" });
  }
};

//ADD MOUNTAIN TO YOUR FAVORITES

const favoriteMountain = async (req, res) => {
  const { mountain_id, users_id } = req.body;

  if (!mountain_id || !users_id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const likeMountain = await knex("user_info").insert(req.body);
    return res.status(201).json(likeMountain);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Error handling your request" });
  }
};

//REMOVE A MOUNTAIN FROM YOUR FAVORITES

const removeMountain = async (req, res) => {
  const { mountain_id, users_id } = req.body;

  if (!mountain_id || !users_id) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const unlikeMountain = await knex("user_info")
      .delete()
      .where({ mountain_id, users_id: mountain_id && users_id });
    return res.status(200).json(unlikeMountain);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Error handling your request" });
  }
};

module.exports = {
  signUp,
  login,
  googleLogin,
  currentUser,
  likedMountains,
  favoriteMountain,
  removeMountain,
};
