import { Router } from "express";
import { body } from "express-validator";
import {
  addGuitar,
  deleteGuitar,
  getGuitar,
  listGuitars,
  updateGuitar,
} from "../controllers/guitarController";

const router = Router();

const guitarValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

router.post("/", guitarValidationRules, addGuitar);
router.get("/list", listGuitars);
router.get("/:id", guitarValidationRules, getGuitar);
router.put("/:id", guitarValidationRules, updateGuitar);
router.delete("/:id", deleteGuitar);

export default router;
