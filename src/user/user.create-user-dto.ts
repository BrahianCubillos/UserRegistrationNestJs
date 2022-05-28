import { IsNumber, IsString, Min, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { allowedNodeEnvironmentFlags } from 'process';
import { match } from 'assert';

export class CreateUserDto {
  /*private _password: string;

  get password() {
    return this._password;
  }

  @Allow()
  set password(value) {
    if (isValidEmpty(value))
      throw new BadRequestException('The password must not be empty');
    if (!isValidLength(value))
      throw new BadRequestException('The password must be at least 7 characters');
    if (!isValidNumber(value))
      throw new BadRequestException('In the password the second character must be a number');
    if (!isValidCapital(value))
      throw new BadRequestException('In the password the third character must be capital');
    if (!isValidCharacter(value))
      throw new BadRequestException('The password must have one special characters');
    //this._password = value;
  }*/

  @IsNumber()
  @Min(1000000000)
  @IsNotEmpty()
  id_number: number;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @IsNotEmpty()
  @Matches(/.\d{1}.*/, { message: 'In the password the second character must be a number' })
  @Matches(/..[A-Z]{1}.*/, { message: 'In the password the third character must be capital' })
  @Matches(/[^\d\w\s]/, { message: 'The password must have one special characters' })
  password: string;

  @IsNumber()
  @Min(3000000000)
  @IsNotEmpty()
  phone_number: number;
}


const isValidEmpty =  (temporalVariable: string): boolean => {
  let isOk: boolean;
  temporalVariable.length < 1 ? isOk = true : isOk = false;
  return isOk;
}

const isValidLength = (temporalVariable: string): boolean => {
  let isOk: boolean;
  temporalVariable.length >= 7 ? isOk = true : isOk = false;
  return isOk;
}

const isValidCapital = (temporalVariable: string): boolean => {
  let isOk: boolean;
  temporalVariable.charAt(2).toUpperCase() == temporalVariable.charAt(2) ? isOk = true : isOk = false;
  return isOk;
}

const isValidNumber = (temporalVariable: string): boolean => {
  let isOk: boolean;
  const isNumber: any = temporalVariable[1];
  !isNaN(isNumber) ? isOk = true : isOk = false;
  return isOk;
}

const isValidCharacter = (temporalVariable: string): boolean => {
  let isOk: boolean;
  temporalVariable.match(/[^a-zA-Z0-9\s]/) != null ? isOk = true : isOk = false;
  return isOk;
}

const isValidPassword = (password: string): boolean => {
  return isValidLength(password) && isValidCapital(password) && isValidNumber(password) && isValidCharacter(password);
}