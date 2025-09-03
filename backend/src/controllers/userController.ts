import { Request, Response, NextFunction } from "express";
import pool from "../controllers/database_controller";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password, email } = req.body;
  try {
    const insertUser =
      "INSERT INTO users (username, password, email, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *";
    const result = await pool.query(insertUser, [username, password, email]);
    const createdUser = result.rows[0];
    return res.json(createdUser);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await pool.query("SELECT id, username, email FROM users");
    const users = result.rows;
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const selectUser = "SELECT * FROM users WHERE username=$1";
    const result = await pool.query(selectUser, [username]);
    const user = result.rows[0];
    return res.json(user);
  } catch (err) {
    next(err);
  }
};
