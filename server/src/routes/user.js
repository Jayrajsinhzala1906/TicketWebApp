import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user.password === req.body.password) {
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } else {
    return res.status(401).json({ error: "username or password is incorrect" });
  }
});

userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default userRouter;
