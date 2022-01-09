import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionSchema } from '@sp/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Account,AccountSchema } from 'src/schemas/account.schema';
import { User, UserSchema } from '@sp/schemas';
import { UsersModule } from '../user/user.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema },{ name: Account.name, schema: AccountSchema },{ name: User.name, schema: UserSchema }]), UsersModule  ],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}