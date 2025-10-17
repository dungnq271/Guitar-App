import { redisClient } from "../data-source";
const { RateLimiterRedis } = require("rate-limiter-flexible");

export const maxWrongAttemptsByIPperDay = 100;
export const maxConsecutiveFailsByUsernameAndIP = 10;

export const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_fail_ip_per_day",
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
});

export const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_fail_consecutive_username_and_ip",
  points: maxConsecutiveFailsByUsernameAndIP,
  duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
  blockDuration: 60 * 60 * 24 * 365 * 20, // Block for infinity after consecutive fails
});

export const getUsernameIPkey = (username: string, ip: string) =>
  `${username}_${ip}`;
