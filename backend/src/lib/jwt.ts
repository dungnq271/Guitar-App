const crypto = require("crypto");
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../entity/User";

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

interface GenerateJWTParams {
  allowedRoles: string[];
  defaultRole: string;
  expiresIn?: string;
  otherClaims?: Record<string, string>;
}

export function generateJWT(params: GenerateJWTParams) {
  let expiresIn;
  if (!params.expiresIn) {
    expiresIn = "1h";
  }

  const payload = {
    iat: Date.now(),
    ...params.otherClaims,
  };

  return jwt.sign(payload, config.jwtSecret, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });
}
