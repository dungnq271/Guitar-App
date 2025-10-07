import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";

export const userService = new UserService(AppDataSource.getRepository(User));
export const authService = new AuthService(AppDataSource.getRepository(User));
