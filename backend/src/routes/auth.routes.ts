import { Router } from "express";
import passport = require("passport");
import { UserController } from "../controller/UserController";
import {
  validate,
  validateUsername,
  validateEmail,
  validatePassword,
  checkRegisterDataExist,
} from "../middlewares/validateUser";

const authRouter = Router();

authRouter.post(
  "/register",
  validateUsername,
  validateEmail,
  validatePassword,
  validate,
  checkRegisterDataExist,
  UserController.register,
);
authRouter.post("/login", UserController.login);
authRouter.post("/refresh-token", UserController.refreshToken);
authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  UserController.protected,
);

export default authRouter;
