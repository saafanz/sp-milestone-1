import { Injectable } from '@nestjs/common';
import { Account } from 'src/schemas/account.schema';
import { AccountDocument } from 'src/schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
  // TODO: Define your Transaction Service Logic
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>){}


  listAccounts(userId : string){
    return this.accountModel.find({userId: userId}).exec();
  }
}