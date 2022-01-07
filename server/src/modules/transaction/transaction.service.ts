import { Injectable } from '@nestjs/common';
import { Transaction, TransactionDocument } from '@sp/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>){}


  listTransactions(accountId : string){
    return this.transactionModel.find({accountId: accountId}).exec();
  }
}
