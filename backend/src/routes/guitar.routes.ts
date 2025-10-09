import { Router } from "express";
import { GuitarController } from "../controller/GuitarController";
import { validateGuitarId } from "../middlewares/validateGuitar";

const guitarRouter = Router();

guitarRouter.get("/list", GuitarController.listGuitars);
guitarRouter.get("/:id", validateGuitarId, GuitarController.getGuitar);
guitarRouter.post(
  "/update/:id",
  validateGuitarId,
  GuitarController.updateGuitar,
);
guitarRouter.post(
  "/delete/:id",
  validateGuitarId,
  GuitarController.deleteGuitar,
);

export default guitarRouter;
