import { generateJwt, sha256 } from "./jwt";
import { serialize } from "cookie";
import { Response } from "express";
import { User } from "../entity/User";
import config from "../config/config";

export const FINGERPRINT_COOKIE_NAME = "__User-Fgp";
export const FINGERPRINT_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export function setFingerprintCookieAndSignJwt(
  fingerprint: string,
  res: Response,
  user: User,
) {
  res.setHeader(
    "Set-Cookie",
    serialize(FINGERPRINT_COOKIE_NAME, fingerprint, {
      path: "/",
      maxAge: FINGERPRINT_COOKIE_MAX_AGE,
      httpOnly: true,
      // https://stackoverflow.com/questions/59990864/what-is-the-difference-between-samesite-lax-and-samesite-strict
      sameSite: "strict",
      secure: config.nodeEnv === "production",
    }),
  );

  return generateJwt({
    allowedRoles: ["user"],
    defaultRole: "user",
    expiresIn: "5m",
    otherClaims: {
      "X-User-Id": String(user.id),
      "X-User-Fingerprint": sha256(fingerprint),
    },
  });
}
