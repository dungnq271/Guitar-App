import fs = require('fs');
import path = require('path');
import { loadEnv } from '../lib/loadEnv';

loadEnv();

const pathToKey = path.join(__dirname, '..', '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

type EnvConfig = {
  PORT: number;
  NODE_ENV: string;

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;

  JWT_SECRET: string;
};

type ENV = Partial<EnvConfig> & {
  [K in keyof EnvConfig]: EnvConfig[K] | undefined;
};

const getConfig = (): ENV => ({
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,

  POSTGRES_HOST: process.env.POSTGRES_HOST || '5000',
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 80,
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_DB: process.env.POSTGRES_DB || 'postgres',

  REDIS_HOST: process.env.REDIS_HOST || '',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

  JWT_SECRET: process.env.jwtSecret || PRIV_KEY,
});

const getSanitizedConfig = (config: ENV): EnvConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as EnvConfig;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
