import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { ObjectId } from 'mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class Car {
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  // id: ObjectId;

  @Prop()
  id: number;

  @Prop({ defult: 'small' })
  type: string;

  @Prop({})
  color: string;

  @Prop()
  length: number;

  @Prop()
  load_valume: number;
}

@Schema({})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  national_code: number;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({ require: true })
  date_of_bitrh: Date;

  @Prop({
    require: false,
  })
  total_toll_paid: number;

  // @Prop({
  //   type: 'Car',
  //   sparse: true,
  // })
  // ownerCar?: [Car];

  @Prop([Car])
  ownerCar: Car[];
}

export const UserSchema = SchemaFactory.createForClass(User);
