import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]>{
    return await this.userService.findAll()
  }

  @Get('/id_number/:id_number')
  async getUserByIdNumber(id_number: string): Promise<User>{
    return await this.userService.getUserByIdNumber(id_number);
  }

  @Get('/email/:email')
  async getUserByEmail(email: string): Promise<User>{
    return await this.userService.getUserByEmail(email);
  }

  @Post()
  async create(@Body() body: object){
    return await this.userService.create(body);
  }
}