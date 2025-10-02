import { Router } from "express";
import passport = require("passport");
import { UserController } from "../controller/UserController";
import { validateRegisterData } from "../middlewares/validateUser";

const userRouter = Router();

userRouter.get("/users", UserController.getUsers);
userRouter.post("/register", validateRegisterData, UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/update/:id", UserController.updateUser);
userRouter.post("/delete/:id", UserController.deleteUser);
userRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  UserController.protected,
);

export default userRouter;
