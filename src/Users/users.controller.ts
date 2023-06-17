import { Controller, Body, Param, Get, Post, Patch } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('userId/:userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    // console.log("Omad to")
    return await this.userService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await  this.userService.createUser(
      createUserDto.name,
      createUserDto.national_code,
      createUserDto.age,
      createUserDto.date_of_bitrh,
      createUserDto.total_toll_paid,
      createUserDto.ownerCar,
    );
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  //http://localhost:3000/users/shalqam
  @Get('/color')
  async findByColor(@Body() Color){
    // console.log(Color)
    const color = Color['color'].split('-')
    // console.log("Omad to")
    return await this.userService.findCarsByColor(color)
  }
  
  @Get('/OwnerAge')
  async findCarsByOwnerAge(@Body() OwnerAge){
    // console.log(OwnerAge)
    return await this.userService.findCarsByOwnerAge(+OwnerAge["age"])
  }

  // @Get('/violation')
  // async findBigCarsByRoadTheyPassed(@Body() Width, carType){
  //   return await this.userService.findBigCarsByRoadTheyPassed()
  // }
}
 