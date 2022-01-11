import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, User, UserDocument, UserSchema } from '@sp/schemas';
import { Model } from 'mongoose';
import { Account,AccountDocument } from 'src/schemas/account.schema';
import { TransactionDocument } from '@sp/schemas';
import { IsNotEmpty,isEmpty } from 'class-validator';


@Injectable()
export class UserService {
  userservice: any;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  @InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  /**
   * Returns all users from mongo database
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  listAccounts(userId : string){
    return this.accountModel.find({userId: userId}).exec();
  }


  async findByemail(enteretdemail: any): Promise<User>{
    // let users = this.userModel.find().exec();
  
    return  this.userModel.findOne({email: enteretdemail.email}).clone();
  }

  async findByuser(enteretdemail: any): Promise<Account>{
  
    return this.accountModel.findOne({userId : enteretdemail.email}).exec();
  }

  listTransactions(accountId : string){
    return this.transactionModel.find({accountId: accountId}).exec();
  }
  

  async transaction(email: any ,toemail:any , amount: number) {
    let user =await this.userModel.findOne({email:email}).clone();
    let touser = await this.userModel.findOne({email:toemail}).clone();
    if(!user){
      return"wrong email";
    }
    if(!touser){
      return "wrong to email"
    }else{
      const account = await this.accountModel.findOne({userId : user.email});
      const toaccount = await this.accountModel.findOne({userId : touser.email});
      toaccount.totalAmount+= amount;
      account.totalAmount-= amount;
      toaccount.save();
      account.save();
      new this.transactionModel({
        accountId: account.userId,
        debit: 0,
        credit: 100,
        totalAmount: account.totalAmount,
        date: Date.now().toString(),
        from_or_to: 'to '+ touser.email
      }).save();
      new this.transactionModel({
        accountId: toaccount.userId,
        debit: 0,
        credit:0 ,
        totalAmount: toaccount.totalAmount,
        date: Date.now().toString(),
        from_or_to: 'from '+ user.email
      }).save();

      return account;


    }
  }

  public async receiveTransaction(newExternalTransaction){
    await this.userservice.findByuser(newExternalTransaction.receiverAccountNumber)
    .then( async(account)=>{
      if(!account){
        throw new HttpException({
          status:HttpStatus.BAD_REQUEST,
          error:"account not found"
        }, HttpStatus.BAD_REQUEST)
      }
      else{
        const transaction = new this.transactionModel({
          accountid: newExternalTransaction.receiverAccountNumber,
          from_or_to: 'from an external Bank',
          amount: parseInt(newExternalTransaction.amount),
          date: Date.now().toString()
        });
        return transaction.save();
    }
  }).catch(err =>{
    console.log(err)
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error:"account not found"}
      ,HttpStatus.BAD_REQUEST)

    })

  }

  public async sendTransaction(email:any,receiverAccountNumber:any,amount: any,description: any){
    let user =await this.userModel.findOne({email:email}).clone();
    const account = await this.accountModel.findOne({userId : user.email});
    if(!user){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"user not found"
      }, HttpStatus.BAD_REQUEST)
    }
    if(amount>50){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"Maximum amount of 50 exceeded"
      }, HttpStatus.BAD_REQUEST)
    }
    if(description=isEmpty){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"Amount field is missing"
      }, HttpStatus.BAD_REQUEST)
    }
    if(receiverAccountNumber=isEmpty){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"Amount field is missing"
      }, HttpStatus.BAD_REQUEST)

    }
    if(receiverAccountNumber=isEmpty){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"Receiver id field is missing"
      }, HttpStatus.BAD_REQUEST)
    if(!account.totalAmount>=amount+5){
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:"Amount is not sufficient"
      }, HttpStatus.BAD_REQUEST)
    }
    }else{
    account.totalAmount-=amount; //TRANSACTION FEE DEDUCTED
    new this.transactionModel({
      accountId: account.userId,
      totalAmount: account.totalAmount,
      date:Date.now().toString(),
      from_or_to:receiverAccountNumber,
      credit:0,
      debit:amount}).save();
    account.totalAmount-=5;  //EXTERNAL TRANSACTION FEE
    new this.transactionModel({
      accountId: account.userId,
      totalAmount: account.totalAmount,
      date:Date.now().toString(),
      from_or_to:"external bank fee",
      credit:0,
      debit:5}).save();
  }}

  
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
 

