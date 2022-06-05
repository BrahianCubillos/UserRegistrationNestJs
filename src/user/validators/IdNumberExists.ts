import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@ValidatorConstraint({ name: 'IdNumberExists', async: true })
@Injectable() 

export class IdNumberExists implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    protected readonly userRepository: Repository<User>
  ) {}

  async validate(id_number: string) {
    const user = await this.userRepository.findOne({
      where: {
        id_number,
      },
    });
    return !user;
  }

  defaultMessage(args: ValidationArguments){
    return 'id_number $value already exists';
  }
}