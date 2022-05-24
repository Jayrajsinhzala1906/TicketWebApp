import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    if (user.password === req.body.password) {
      const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ error: "password is incorrect" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: "username or password is must be required" });
  }
};

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: "All Field must be required" });
  }
};

export const isAuth = async (req, res) => {
  return res.status(200).json(req.user);
};
