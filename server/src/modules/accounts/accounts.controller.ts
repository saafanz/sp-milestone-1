import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class AccountController {
  // TODO: Define your Transaction Endpoints
  constructor(private accountService: AccountService) {}

 // @UseGuards(AuthGuard('jwt'))
  @Get('findAcc')
  async getTransactions(@Body() req:any){
    return await this.accountService.listAccounts(req.email);
  }
}