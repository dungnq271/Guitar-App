import dotenv = require("dotenv");
import fs = require("fs");
import path = require("path");

dotenv.config();

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

interface Config {
  port: number;
  nodeEnv: string;

  postgresHost: string;
  postgresPort: number;
  postgresUser: string;
  postgresPassword: string;
  postgresDB: string;

  redisHost: string;
  redisPort: number;
  redisPassword: string;

  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  postgresHost: process.env.POSTGRES_HOST || "5000",
  postgresPort: Number(process.env.POSTGRES_PORT) || 80,
  postgresUser: process.env.POSTGRES_USER || "postgres",
  postgresPassword: process.env.POSTGRES_PASSWORD || "postgres",
  postgresDB: process.env.POSTGRES_DB || "postgres",

  redisHost: process.env.REDIS_HOST || "",
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisPassword: process.env.REDIS_PASSWORD || "",

  jwtSecret: process.env.jwtSecret || PRIV_KEY,
};

export default config;
