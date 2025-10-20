import handleGetRepository from '../utils/handleGetRepository';
import { User } from '../entities/User.postgres';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { GuitarService } from '../service/guitar.service';

const userRepository = handleGetRepository(User);
export const userService = new UserService(userRepository);
export const authService = new AuthService(userRepository);
export const guitarService = new GuitarService();
