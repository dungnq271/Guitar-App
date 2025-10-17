import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import * as cache from "memory-cache";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async getUsers(res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const users = await this.userRepository.find();

      cache.put("data", users, 6000);
      res.status(200).json({
        success: true,
        data: users,
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    console.log(req.params);
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    res.status(200).json({ success: true, user });
  }

  async updateUser(req: Request, res: Response) {
    let user = req.user as User;
    user = { ...user, ...req.body };
    await this.userRepository.save(user);
    res.status(200).json({ success: true, message: "updated", user });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(user);
    res.status(200).json({ success: true, message: "ok" });
  }
}
