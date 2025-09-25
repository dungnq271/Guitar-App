import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserController {
  static async protected(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = encryptedPassword;
    user.profilePicUrl = "https://localhost:3000/my-pic.png";

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const token = encrypt.issueJWT(user);

    return res
      .status(200)
      .json({ message: "User created successfully", token, user });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    userRepository
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ success: false, msg: "could not find user" });
        }

        // Function defined at bottom of app.js
        const isValid = encrypt.validPassword(user.password, password);

        if (isValid) {
          const tokenObject = encrypt.issueJWT(user);

          res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
          });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "you entered the wrong password" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { username, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.username = username;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user });
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
