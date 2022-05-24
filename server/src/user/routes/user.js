import { Router } from "express";

import {
  userSignInValidator,
  userSignupValidator,
} from "../validator/index.js";
import { isAuth, login, signUp } from "../controllers/user.js";
import { isAuthenticated } from "../../middleware/auth.js";

const userRouter = Router();

userRouter.post("/login", userSignInValidator, login);

userRouter.get("/me", isAuthenticated, isAuth);

userRouter.post("/signup", userSignupValidator, signUp);

export default userRouter;
