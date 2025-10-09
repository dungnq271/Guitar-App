import { Request, Response } from "express";
import { guitarService } from "../repository";

export class GuitarController {
  static async listGuitars(req: Request, res: Response) {
    const data = await guitarService.listGuitars(req);
    return res.status(200).json(data);
  }

  static async getGuitar(req: Request, res: Response) {
    const data = await guitarService.getGuitar(req);
    return res.status(200).json(data);
  }

  static async updateGuitar(req: Request, res: Response) {
    const data = await guitarService.updateGuitar(req);
    return res.status(200).json(data);
  }

  static async deleteGuitar(req: Request, res: Response) {
    const data = await guitarService.deleteGuitar(req);
    return res.status(200).json(data);
  }
}
