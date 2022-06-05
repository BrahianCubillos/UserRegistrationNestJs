import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@ValidatorConstraint({ name: 'EmailExists', async: true })
@Injectable() 

export class EmailExists implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    protected readonly userRepository: Repository<User>
  ) {}

  async validate(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return !user;
  }

  defaultMessage(args: ValidationArguments){
    return 'email $value already exists';
  }
}