import { Router } from "express";
import { Request, Response } from "express";

const reportRouter = Router();

reportRouter.post("/csp", (req: Request, res: Response) => {
  console.log(req.body.data);
});

export default reportRouter;
