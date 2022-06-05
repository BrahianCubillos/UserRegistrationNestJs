import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
  
@ValidatorConstraint({ name: 'PasswordConfirmation', async: false })
@Injectable() 
  
export class PasswordConfirmation implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    protected readonly userRepository: Repository<User>
  ) {}

  validate(password: string, args: ValidationArguments) {
    console.log(password, ' - ', (args.object as any)[args.constraints[0]])
    return password === (args.object as any)[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments){
    return 'password and passwordConfirmation are different';
  }
}