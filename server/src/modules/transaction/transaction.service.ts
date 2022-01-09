import { Injectable } from '@nestjs/common';
import { Transaction, TransactionDocument, User } from '@sp/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EphemeralKeyInfo } from 'tls';
import { UserService } from '../user/user.service';
import { Account, AccountDocument } from 'src/schemas/account.schema';

@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
   @InjectModel(Account.name) private accountModel: Model<AccountDocument>, private userservice: UserService ){}


  listTransactions(accountId : string){
    return this.transactionModel.find({accountId: accountId}).exec();
  }

  getReply(){
    return "hii";
  }

  async findByuser(enteretdemail: any): Promise<Account>{
  
    return this.accountModel.findOne({userId : enteretdemail.email}).exec();
  }
  


   async transaction(email: any ,toemail:any , amount: number) {
    const user = await this.userservice.findByemail(email);
    const touser = await this.userservice.findByemail(toemail);

    


    



  }
}
