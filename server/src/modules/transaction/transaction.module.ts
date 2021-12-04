import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from 'src/schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from 'src/schemas/transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
