import { Entity, Column, PrimaryColumn } from 'typeorm';
import { 
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  Validate,
  IsNumber
} from 'class-validator';
import { IdNumberExists } from './validators/IdNumberExists'
import { EmailExists } from './validators/EmailExists';
//import { PasswordConfirmation } from './validators/PasswordConfirmation';

@Entity({ name: 'users' })
export class User {

  @PrimaryColumn({ length: 20 })
  @IsNumber()
  @IsNotEmpty()
  @Validate(IdNumberExists)
  id_number: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Validate(EmailExists)
  email: string;

  @Column({ length: 20 })
  @IsString()
  @MinLength(7)
  @IsNotEmpty()
  @Matches(/.\d{1}[A-Z]{1}.*/, { 
    message: 'The password must fulfil the pattern: a2Cas*sa#'
  })
  @Matches(/.*\W.*/, {   
    message: 'The password must have at least one character *$#%&?'
  })
  password: string;

  /*@Validate(PasswordConfirmation, ['password'])
  passwordConfirmation: string;*/

  @Column()
  @IsNumber()
  @IsNotEmpty()
  phone_number: number;
}