import { Repository, EntityManager } from "typeorm";
import { User } from "../entity/User";

/**
 * Repository for User entity
 */
export class UserRepository {
  private readonly repository: Repository<User>;

  public constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  public async remove(user: User): Promise<User> {
    return this.repository.remove(user);
  }

  public getManager(): EntityManager {
    return this.repository.manager;
  }
}
