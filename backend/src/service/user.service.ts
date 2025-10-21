import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/User.postgres';

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async getAll(res: Response, next: NextFunction) {
    const users = await this.userRepository.find();
    res.status(200).json({ success: true, users });
  }

  async getProfile(req: Request, res: Response) {
    const { id } = req.params;
    let user = req.user;

    if (user) {
      return res.status(200).json({ success: true, user });
    }

    try {
      user = await this.userRepository.findOne({
        where: { id }
      });
    } catch (err) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  }

  async updateUser(req: Request, res: Response) {
    let user = req.user as User;
    user = { ...user, ...req.body };
    await this.userRepository.save(user);
    res.status(200).json({ success: true, message: 'updated', user });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userRepository.findOne({
      where: { id }
    });
    await this.userRepository.remove(user);
    res.status(200).json({ success: true, message: 'ok' });
  }
}
