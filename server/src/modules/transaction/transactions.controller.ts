import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionController {
  // TODO: Define your Transaction Endpoints
  constructor(private transactionService: TransactionService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get('/:accountId')
  async getTransactions(@Param() params){
    return await this.transactionService.listTransactions(params.accountId);
  }

  @Get('hi')
  reply(){
    return this.transactionService.getReply();
  }

   
  @Get('findAccount')
  findAccount(@Body() req: any):any{
    return this.transactionService.findByuser(req);
  }
}
