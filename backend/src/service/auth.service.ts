import { Request, Response } from "express";
import { Repository } from "typeorm";
import { checkPassword, hashPassword } from "../lib/password";
import {
  setFingerprintCookieAndSignJwt,
  FINGERPRINT_COOKIE_NAME,
} from "../lib/setFingerprintCookieAndSignJwt";
import { generateJwt, sha256 } from "../lib/jwt";
import { uuidv4 } from "../lib/auth";
import { User } from "../entity/User";
const crypto = require("crypto");

export class AuthService {
  constructor(private readonly userRepository: Repository<User>) {}

  async protected() {
    return {
      message: "You are successfully authenticated to this route!",
    };
  }

  async register(req: Request, res: Response) {
    const { firstName, lastName, username, email, password } = req.body;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = await hashPassword(password);
    user.profilePicUrl = "https://localhost:3000/my-pic.png";

    const jwt = this.issueJwt(res, user);
    const refreshToken = this.generateRefreshToken(user);

    try {
      await this.userRepository.save(user);
    } catch (err) {
      console.log("/auth/register endpoint error", err);
      return { message: "Error signing up" };
    }

    return {
      message: "User created successfully",
      jwt,
      refreshToken,
      userId: user.id,
    };
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    return this.userRepository
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return { success: false, message: "User not found" };
        }

        return checkPassword(password, user.password).then((isValid) => {
          if (isValid) {
            const jwt = this.issueJwt(res, user);
            const refreshToken = this.generateRefreshToken(user);

            return this.userRepository.save(user).then(() => {
              return {
                success: true,
                message: "User login successfully",
                jwt,
                refreshToken,
              };
            });
          } else {
            return { success: false, message: "Wrong password" };
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return { success: false, message: "Error logging in" };
      });
  }

  async refreshJwt(req: Request) {
    const { refreshToken, fingerprintHash } = req.body.input;

    const fingerprintCookie = req.cookies[FINGERPRINT_COOKIE_NAME];
    console.log({ fingerprintCookie });
    if (!fingerprintCookie)
      return { success: false, message: "Unable to refresh JWT token" };

    // Compute a SHA256 hash of the received fingerprint in cookie in order to compare
    // it to the fingerprint hash stored in the token
    const fingerprintCookieHash = sha256(fingerprintCookie);
    console.log({ fingerprintCookie, fingerprintCookieHash, fingerprintHash });

    if (fingerprintHash != fingerprintCookieHash) {
      return { success: false, message: "Unable to refresh JWT token" };
    }

    return this.userRepository
      .findOne({ where: { refreshToken } })
      .then((user) => {
        if (!user) {
          return { success: false, message: "User not found" };
        }

        this.generateRefreshToken(user);
        const jwt = generateJwt({
          expiresIn: "5m",
          allowedRoles: ["user"],
          defaultRole: "user",
          otherClaims: {
            "X-User-Id": String(user.id),
            // TODO: why not hashing fingerprint
          },
        });
        return { success: true, jwt };
      })
      .catch((err) => {
        console.log(err);
        return { success: false, message: "Error issuing jwt token refresh" };
      });
  }

  generateRefreshToken(user: User) {
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1 hour
    return refreshToken;
  }

  issueJwt(res: Response, user: User) {
    // Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");

    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, user);
    return jwt;
  }
}
