import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async create(user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);
    if (!savedUser) {
      throw new NotFoundException('User could not be created');
    }
    savedUser.password = '';
    return savedUser;
  }
  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
