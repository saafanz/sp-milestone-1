import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, User, UserDocument, UserSchema } from '@sp/schemas';
import { Model } from 'mongoose';
import { Account,AccountDocument } from 'src/schemas/account.schema';
import { TransactionDocument } from '@sp/schemas';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  @InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  /**
   * Returns all users from mongo database
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async findByemail(enteretdemail: any): Promise<User>{
    // let users = this.userModel.find().exec();
  
    return  this.userModel.findOne({email: enteretdemail.email}).clone();
  }



  
  async create(user:User): Promise<User> {
    // get users with the same email
    let userss = await this.userModel.findOne({email: user.email}).exec();
    // if email is unique in database 
    if(!userss){
      // create user object and return true to controller
      const newItem = new this.userModel(user).save();
      let account = await new this.accountModel({
        totalAmount: 100,
        userId: user.email
      }).save();
      new this.transactionModel({
        accountId: account.id,
        debit: 0,
        credit: 100,
        totalAmount: account.totalAmount + 100,
        date: Date.now().toString(),
        name: '$100 deposit'
      }).save();
      return newItem
    }
  }
}
