import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email } = req.body;

  // TODO: is there a way to optimize this?
  userRepository
    .findOne({ where: { username } })
    .then((user) => {
      if (user) {
        res.status(404).json({ message: "Username already existed!" });
        return Promise.reject("Username already existed!");
      } else {
        return userRepository.findOne({ where: { email } });
      }
    })
    .then((user) => {
      if (user) {
        res.status(404).json({ message: "Email already existed!" });
        return Promise.reject("Email already existed!");
      } else {
        next();
      }
    })
    .catch(next);
};
