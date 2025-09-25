import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../config/config";
import { User } from "../entity/User";

export class encrypt {
  static async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static validPassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static issueJWT(user: User) {
    const id = user.id;

    const expiresIn = "1d";

    const payload = {
      sub: id,
      iat: Date.now(),
    };

    const signedToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: expiresIn,
      algorithm: "RS256",
    });

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn,
    };
  }
}
