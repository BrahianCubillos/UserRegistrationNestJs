import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.create-user-dto';

@Controller('user')
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]>{
    return await this.userService.findAll();
  }

  @Get(':id_number')
  async findOne(@Param('id_number', ParseIntPipe) id_number: number): Promise<User>{
    return await this.userService.findOne(id_number);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User[]>{
    return await this.userService.create(body);
  }

  /*@Post()
  save(@Res() response: Response){
      response
        .status(HttpStatus.BAD_REQUEST)
        .send("saving " + JSON.stringify(response));
  }*/
}