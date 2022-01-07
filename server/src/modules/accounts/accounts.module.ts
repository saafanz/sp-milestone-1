import { Module } from '@nestjs/common';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { Account } from 'src/schemas/account.schema';
import { AccountSchema } from 'src/schemas/account.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema },])],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}