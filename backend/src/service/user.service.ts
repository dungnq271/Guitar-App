import { Request } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import * as cache from "memory-cache";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async getUsers() {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return {
        data,
      };
    } else {
      console.log("serving from db");
      const users = await this.userRepository.find();

      cache.put("data", users, 6000);
      return {
        success: true,
        data: users,
      };
    }
  }

  async getProfile(req: Request) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return { success: true, user };
  }

  async updateUser(req: Request) {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    user.username = username;
    user.email = email;
    await this.userRepository.save(user);
    return { success: true, message: "udpdate", user };
  }

  async deleteUser(req: Request) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(user);
    return { success: true, message: "ok" };
  }
}
