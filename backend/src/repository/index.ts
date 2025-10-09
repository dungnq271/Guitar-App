import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { GuitarService } from "../service/guitar.service";

export const userService = new UserService(AppDataSource.getRepository(User));
export const authService = new AuthService(AppDataSource.getRepository(User));
export const guitarService = new GuitarService();
