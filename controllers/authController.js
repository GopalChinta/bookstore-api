// controllers/authController.js
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersPath = path.join(__dirname, "../data/users.json");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersPath, "utf-8"));

    const existing = users.find((u) => u.email === email);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), email, password: hashedPassword };
    users.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersPath, "utf-8"));

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
