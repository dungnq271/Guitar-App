import { generateJWT, sha256 } from "./jwt";
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
      secure: config.nodeEnv === "production",
    }),
  );

  return generateJWT({
    allowedRoles: ["user"],
    defaultRole: "user",
    expiresIn: "5m",
    otherClaims: {
      sub: String(user.id),
      "X-User-Fingerprint": sha256(fingerprint),
    },
  });
}
