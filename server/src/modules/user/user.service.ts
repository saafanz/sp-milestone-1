import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '@sp/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
    const newItem = new this.userModel(user);
    return await newItem.save();

  }
}
