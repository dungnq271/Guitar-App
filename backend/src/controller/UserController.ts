import { Request, Response } from "express";
import { userService, authService } from "../repository";

export class UserController {
  static async protected(req: Request, res: Response) {
    const data = await authService.protected();
    return res.status(200).json(data);
  }

  static async register(req: Request, res: Response) {
    const data = await authService.register(req, res);
    return res.status(200).json(data);
  }

  static async login(req: Request, res: Response) {
    const data = await authService.login(req, res);
    return res.status(200).json(data);
  }

  static async refreshToken(req: Request, res: Response) {
    const data = await authService.refreshJwt(req);
    return res.status(200).json(data);
  }

  static async getUsers(req: Request, res: Response) {
    const data = await userService.getUsers();
    return res.status(200).json(data);
  }

  static async getProfile(req: Request, res: Response) {
    const data = await userService.getProfile(req);
    return res.status(200).json(data);
  }

  static async updateUser(req: Request, res: Response) {
    const data = await userService.updateUser(req);
    return res.status(200).json(data);
  }

  static async deleteUser(req: Request, res: Response) {
    const data = await userService.deleteUser(req);
    return res.status(200).json(data);
  }
}
