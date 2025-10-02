import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async protected() {
    return {
      message: "You are successfully authenticated to this route!",
    };
  }

  async register(req: Request) {
    const { firstName, lastName, username, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = encryptedPassword;
    user.profilePicUrl = "https://localhost:3000/my-pic.png";

    await this.userRepository.save(user);

    const token = encrypt.issueJWT(user);

    return { message: "User created successfully", token, user };
  }

  async login(req: Request) {
    const { email, password } = req.body;

    return this.userRepository
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return { success: false, message: "could not find user" };
        }

        // Function defined at bottom of app.js
        const isValid = encrypt.validPassword(user.password, password);

        if (isValid) {
          const tokenObject = encrypt.issueJWT(user);

          return {
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
          };
        } else {
          return { success: false, message: "you entered the wrong password" };
        }
      })
      .catch((err) => {
        return { success: false, message: err };
      });
  }

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
        data: users,
      };
    }
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
    return { message: "udpdate", user };
  }

  async deleteUser(req: Request) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(user);
    return { message: "ok" };
  }
}
