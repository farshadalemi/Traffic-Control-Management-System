import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserReposotory } from './users.repository';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { stringify } from 'querystring';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserReposotory) {}

  async getUserById(userId: any): Promise<User> {
    // console.log(userId)
    return await this.usersRepository.finOneUser(userId);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async createUser(
    name: string,
    national_code: number,
    age: number,
    date_of_bitrh: Date,
    total_toll_paid: number,
    ownerCar: any,
  ): Promise<User> {
    return this.usersRepository.create({
      // _id: uuidv4(),
      name,
      national_code,
      age,
      date_of_bitrh,
      total_toll_paid,
      ownerCar,
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return await this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async findCarsByColor(color: [string]){
    return await this.usersRepository.findCarsByColor(color);
  }

  async findCarsByOwnerAge(age: number) {
    return await this.usersRepository.findCarsByOwnerAge(age);
  }

  // async findBigCarsByRoadTheyPassed(width: number, carType: string){
  //   return await this.usersRepository.findBigCarsByRoadTheyPassed(carId);
  // }
}
// function uuidv4(): subscriptionLogsToBeFn {
//   throw new Error('Function not implemented.');
// }
