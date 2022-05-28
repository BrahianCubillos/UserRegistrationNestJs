import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id_number: number): Promise<User>{
    return await this.userRepository.findOne({where: {id_number}});
  }

  async create(body: any): Promise<User[]>{
    const newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

}