import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/list", getUsers);
router.post("/getUser", getUser);

export default router;
