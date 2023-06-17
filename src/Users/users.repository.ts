import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class UserReposotory {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async finOneUser(usersFilterQuery: FilterQuery<User>): Promise<User> {
    const find = await this.userModel.findById(usersFilterQuery);
    // console.log('find: ', find);
    return find;
  }

  // async findCarByColor(carFilterQuery: FilterQuery<User>): Promise<User>{
  //     return this.userModel.findCarByColor(carFilterQuery);

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    usersFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(usersFilterQuery, user);
  }

  async findCarsByColor(color: [string]) {
    return await this.userModel.aggregate([
      {
        $unwind: '$ownerCar',
      },
      {
        $match: {
          'ownerCar.color': { $in: color },
        },
      },
      {
        $project: {
          _id: false,
          ownerCar: true,
        },
      },
    ]);
  }

  async findCarsByOwnerAge(minAge: number): Promise<UserDocument[]> {
    return await this.userModel.aggregate([
      {
        $match: {
          age: { $gte: minAge },
        },
      },
      {
        $unwind: '$ownerCar',
      },
      {
        $project: {
          name: true,
          age: true,
          ownerCar: true,
        },
      },
    ]);
  }

  // async findBigCarsByRoadTheyPassed(
  //   width: number,
  //   carType: string,
  // ): Promise<UserDocument[] | any> {
  //   return await this.userModel.aggregate([
  //     {
  //       $unwind: '$ownerCar',
  //     },
  //     {
  //       $match: {
  //         'ownerCar.type': carType,
  //       },
  //     },
  //     // {
  //     //   $project: {
  //     //     _id: false,
  //     //     ownerCar: true,
  //     //   },
  //     // },
  //     {
  //       $lookup: {
  //         from: 'nodes',
  //         localField: 'ownerCar.id',
  //         foreignField: 'car',
  //         as: 'nodes_car',
  //       },
  //     },
  //   ]);

  //   // const road = await this.roadModel.findById('6487331947a04b0955401ecf');
  //   const node = await this.nodeModel.findById('6482e6833b3bcd7d0f8e458d');

  //   return node;
  //   // return node.get('location');
  // }
  // // async standardizeRoads() {
  // //   const roads = await this.roadModel.find();
  // //   for (const road of roads) {
  // //     await this.roadModel.findByIdAndUpdate(road._id.toString(), {
  // //       $set: {
  // //         // temp: road.geom,
  // //         geom: this.toMultiLineStringObject(road.temp),
  // //       },
  // //       $unset: {
  // //         // geom: true,
  // //         temp: true,
  // //       },
  // //     });
  // //   }
  // //   return roads;
  // // }

  // // async standardizeTollStations() {
  // //   const tollStations = await this.tollStationModel.find({});

  // //   for (const tollStation of tollStations) {
  // //     await this.tollStationModel.findByIdAndUpdate(
  // //       tollStation._id.toString(),
  // //       {
  // //         $set: {
  // //           // temp: tollStation.location,
  // //           location: this.toPointObject(tollStation.temp),
  // //         },
  // //         $unset: {
  // //           // location: true,
  // //           temp: true,
  // //         },
  // //       },
  // //     );
  // //   }
  // // }

  // // async standardizeNodes() {
  // //   const nodes = await this.nodeModel.find({});

  // //   for (const node of nodes) {
  // //     await this.nodeModel.findByIdAndUpdate(node._id.toString(), {
  // //       $set: {
  // //         // temp: node.get('location'),
  // //         // location: this.toPointObject(node.get('temp')),
  // //         // temp: node.get('date'),
  // //         date: new Date(node.get('temp')),
  // //       },
  // //       $unset: {
  // //         // location: true,
  // //         // date: true,
  // //         temp: true,
  // //       },
  // //     });
  // //   }
  // // }

  // toMultiLineStringObject(multiLineString: string): turf.MultiLineString {
  //   const coords = multiLineString
  //     .split('MULTILINESTRING ')[1]
  //     .slice(2, -2)
  //     .split(', ')
  //     .map((value) => value.split(' ').map((value) => parseFloat(value)));

  //   return turf.geometry('MultiLineString', [coords]) as turf.MultiLineString;
  // }

  // toPointObject(point: string): turf.Point {
  //   const coord = point
  //     .split('POINT ')[1]
  //     .slice(1, -1)
  //     .split(' ')
  //     .map((value) => parseFloat(value));

  //   return turf.geometry('Point', coord) as turf.Point;
  // }
}
