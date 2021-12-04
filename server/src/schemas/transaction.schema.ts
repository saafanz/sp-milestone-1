import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';
import * as mongoose from 'mongoose'
import { User } from '.';
export type TransactionDocument = Transaction & Document;
import { UserSchema } from '.';

/*
  The @Schema() decorator marks a class as a schema definition. 
  It maps the User class to a MongoDB collection of the same name, 
  but with an additional “s” at the end - so the final mongo collection
  name will be users.

  For additional info, visit: https://docs.nestjs.com/techniques/mongodb
*/
@Schema()
export class Transaction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true})
  to: string;

  @Prop({ required: true })
  amount: number;

  @Prop({required: true})
  type: string;


}