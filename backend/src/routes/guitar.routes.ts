import { Router } from "express";
import {
  addGuitar,
  deleteGuitar,
  getGuitar,
  listGuitars,
  updateGuitar,
} from "../controller/GuitarController";

const router = Router();

router.post("/", addGuitar);
router.get("/list", listGuitars);
router.get("/:id", getGuitar);
router.put("/:id", updateGuitar);
router.delete("/:id", deleteGuitar);

export { router as guitarRouter };
