import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

// TODO: add password validation
export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email } = req.body;

  userRepository
    .findOne({ where: { username } })
    .then((user) => {
      if (user) {
        res
          .status(200)
          .json({ success: false, message: "Username already existed!" });
        return Promise.reject("Username already existed");
        // next("Username already existed");
      } else {
        return userRepository.findOne({ where: { email } });
      }
    })
    .then((user) => {
      if (user) {
        res
          .status(200)
          .json({ success: false, message: "Email already existed!" });
        return Promise.reject("Email already existed");
      } else {
        next();
      }
    })
    .catch(next);
};
