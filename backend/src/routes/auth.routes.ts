import { Router } from "express";
import passport = require("passport");
import { UserController } from "../controller/UserController";
import { validateRegisterData } from "../middlewares/validateUser";

const authRouter = Router();

authRouter.post("/register", validateRegisterData, UserController.register);
authRouter.post("/login", UserController.login);
authRouter.post("/refresh-token", UserController.refreshToken);
authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  UserController.protected,
);

export default authRouter;
