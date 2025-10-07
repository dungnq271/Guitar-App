import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();

userRouter.get("/all", UserController.getUsers);
userRouter.post("/update/:id", UserController.updateUser);
userRouter.post("/delete/:id", UserController.deleteUser);

export default userRouter;
