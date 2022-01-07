import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class AccountController {
  // TODO: Define your Transaction Endpoints
  constructor(private accountService: AccountService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  async getTransactions(@Param() params){
    return await this.accountService.listAccounts(params.userId);
  }
}