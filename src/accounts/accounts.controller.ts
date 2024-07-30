import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/accounts')
@UseGuards(AuthGuard('jwt'))
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @Post()
  async createAccounts(
    @GetUser() user: User,
    @Body() createAccountsDto: CreateAccountDto,
  ) {
    const { id } = user;
    return await this.accountService.createAccounts(id, createAccountsDto);
  }

  @Get()
  async getAccounts(@GetUser() { id }: User) {
    return await this.accountService.getAccounts(id);
  }
}
