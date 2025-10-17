import "reflect-metadata";
import { DataSource } from "typeorm";
import { Redis } from "ioredis";
import { User } from "./entity/User";
import config from "./config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.postgresHost,
  port: config.postgresPort,
  username: config.postgresUser,
  password: config.postgresPassword,
  database: config.postgresDB,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [__dirname + "/migration/*.ts"],
  migrationsTableName: "ecm-postgres",
  subscribers: [],
});

export const redisClient = new Redis({
  port: config.redisPort,
  host: config.redisHost,
  password: config.redisPassword,
});
