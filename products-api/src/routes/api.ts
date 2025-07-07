import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Guitar } from "../models/guitar";
import guitars from "./example-guitars";

const router = Router();

const guitarValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

router.post("/", guitarValidationRules, (req: Request, res: Response) => {
  const guitar: Guitar = {
    id: guitars.length + 1,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    price: req.body.price,
  };

  guitars.push(guitar);
  res.status(201).json(guitar);
});

router.get("/guitars", (req: Request, res: Response) => {
  res.json(
    guitars.map((guitar) => ({
      ...guitar,
      image: `${req.protocol}://${req.get("host")}${guitar.image}`,
    })),
  );
});

router.get("/:id", guitarValidationRules, (req: Request, res: Response) => {
  const guitar = guitars.find((t) => t.id === parseInt(req.params.id));

  if (!guitar) {
    // res.status(404).send("Guitar not found");
    // res.status(404).json({});
    res.status(404).send({ error: "Guitar not found" });
  } else {
    res.json(guitar);
  }
});

router.put("/:id", guitarValidationRules, (req: Request, res: Response) => {
  const guitar = guitars.find((t) => t.id === parseInt(req.params.id));

  if (!guitar) {
    res.status(404).send({ error: "Guitar not found" });
  } else {
    guitar.name = req.body.name || guitar.name;
    guitar.description = req.body.description || guitar.description;
    guitar.price = req.body.completed || guitar.price;

    res.json(guitar);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = guitars.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send({ error: "Guitar not found" });
  } else {
    guitars.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
