import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@sp/schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Account,AccountSchema } from 'src/schemas/account.schema';
import { Transaction, TransactionSchema } from '@sp/schemas';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Transaction.name, schema: TransactionSchema },
    { name: Account.name, schema: AccountSchema }
  ])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}