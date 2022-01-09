import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

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
  date: string;

  @Prop({ required: true })
  from_or_to: string;

  @Prop({ required: true })
  debit: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  accountId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);