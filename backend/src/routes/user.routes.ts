import { Router } from "express";
import { UserController } from "../controller/UserController";
import passport = require("passport");

const userRouter = Router();

userRouter.get("/all", UserController.getUsers);
userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile,
);
userRouter.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser,
);
userRouter.post("/delete/:id", UserController.deleteUser);

export default userRouter;
