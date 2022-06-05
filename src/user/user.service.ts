import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserByIdNumber(id_number: string): Promise<User>{
    return this.userRepository.findOne({where: {id_number}});
  }

  async getUserByEmail(email: string): Promise<User>{
    return await this.userRepository.findOne({where: {email}});
  }

  async create(body: object){
    if (body['password'] !== body['passwordConfirmation']){
      throw new BadRequestException('password and passwordConfirmation are different');
    }

    const newUser = this.userRepository.create(body);
    const errors = await validate(newUser); 
    
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt)

    if (errors.length > 0) {
      return errors;
    } else {
      return this.userRepository.save(newUser);
    }  
  }

}