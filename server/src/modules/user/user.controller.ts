import { Body, Controller, Get, Post, Request, UseGuards, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { createUserDto } from '../auth/dtos/createUser.dto';
import { TransactionDocument, User, UserDocument } from '@sp/schemas';
import { request } from 'express';




@Controller('users')
export class UserController {
  authService: any;
  constructor(private userService: UserService) {}


  @Post('create')
  create(@Body() createUserDto: createUserDto): Promise<User>{
    return  this.userService.create(createUserDto);
  } 

  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  user(@Request() req: any): any {
    return req.user;
  }
  
  @Get('find')
  findByemail(@Body() req: any):any{
    return this.userService.findByemail(req);

  }

  
  //@UseGuards(AuthGuard('jwt'))
  @Get('findAcc')
  async getTransactions(@Body() req:any){
    return await this.userService.listAccounts(req.email);
  }

  @Get('/:accountId')
  async getTransactions1(@Param() params){
    return await this.userService.listTransactions(params.accountId);
  }

  @Get('findAccount')
  findAccount(@Body() req: any):any{
    return this.userService.findByuser(req);
  }
  
  @Post('trans')
  trans(@Body()req:any):any{
    return this.userService.transaction(req.email,req.toemail,req.amount);

  }
  

  /**
   * API endpoint handler returns all users from mongo database
   */
  //@UseGuards(AuthGuard('jwt'))
  @Get('list')
  users(): any {
    return this.userService.findAll();
  }


  @Get('external/transfers')
  public receiveTransaction(@Body() transaction:TransactionDocument){
    return this.userService.receiveTransaction(transaction);
  }

  

  @Post('URL/external/transfers')
  sendTransaction(@Body()req:any):any{
    return this.userService.sendTransaction(req.email,req.toemail,req.description,req.receiverAccountNumber);
  }
}
