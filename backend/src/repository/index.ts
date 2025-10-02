import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/userService";

export const userService = new UserService(AppDataSource.getRepository(User));
