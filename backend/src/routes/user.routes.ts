import { Router } from "express";
import { UserController } from "../controller/UserController";
import passport = require("passport");

const router = Router();

router.get("/users", UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.register);
router.post("/update/:id", UserController.updateUser);
router.post("/delete/:id", UserController.deleteUser);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  UserController.protected,
);

export { router as userRouter };
