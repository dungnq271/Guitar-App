import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { checkPassword, hashPassword } from "../lib/password";
import { setFingerprintCookieAndSignJwt } from "../lib/setFingerprintCookieAndSignJwt";
import { uuidv4 } from "../lib/auth";
const crypto = require("crypto");
import * as cache from "memory-cache";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async protected() {
    return {
      message: "You are successfully authenticated to this route!",
    };
  }

  async register(req: Request, res: Response) {
    const { firstName, lastName, username, email, password } = req.body;

    const refreshToken = uuidv4();

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = await hashPassword(password);
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour
    user.profilePicUrl = "https://localhost:3000/my-pic.png";

    // Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");

    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, user);

    try {
      await this.userRepository.save(user);
    } catch (err) {
      console.log("/auth/register endpoint error", err);
      return { message: "Error signing up" };
    }

    return {
      message: "User created successfully",
      jwt,
      refreshToken: refreshToken,
    };
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
