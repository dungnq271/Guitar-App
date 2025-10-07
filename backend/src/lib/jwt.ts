let crypto = require("crypto");
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import type { StringValue } from "ms";

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

interface GenerateJWTParams {
  allowedRoles: string[];
  defaultRole: string;
  expiresIn?: StringValue;
  otherClaims?: Record<string, string>;
}

export function generateJwt(params: GenerateJWTParams) {
  const payload = {
    iat: Date.now(),
    ...params.otherClaims,
  };

  return jwt.sign(payload, config.jwtSecret, {
    algorithm: "RS256",
    expiresIn: params.expiresIn || "1h",
  });
}
