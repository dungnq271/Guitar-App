import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  postgresHost: string;
  postgresUser: string;
  postgresPassword: string;
  postgresDB: string;
  postgresPort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  postgresHost: process.env.POSTGRES_HOST || "5000",
  postgresUser: process.env.POSTGRES_USER || "postgres",
  postgresPassword: process.env.POSTGRES_PASSWORD || "postgres",
  postgresDB: process.env.POSTGRES_DB || "postgres",
  postgresPort: Number(process.env.POSTGRES_PORT) || 80,
};

export default config;
