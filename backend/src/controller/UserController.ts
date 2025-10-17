import { Request, Response } from "express";
import { userService, authService } from "../repository";

export class UserController {
  static async protected(req: Request, res: Response) {
    await authService.protected(res);
  }

  static async register(req: Request, res: Response) {
    await authService.register(req, res);
  }

  static async login(req: Request, res: Response) {
    await authService.login(req, res);
  }

  static async refreshToken(req: Request, res: Response) {
    await authService.refreshJwt(req, res);
  }

  static async getUsers(res: Response) {
    await userService.getUsers(res);
  }

  static async getProfile(req: Request, res: Response) {
    await userService.getProfile(req, res);
  }

  static async updateUser(req: Request, res: Response) {
    await userService.updateUser(req, res);
  }

  static async deleteUser(req: Request, res: Response) {
    await userService.deleteUser(req, res);
  }
}
