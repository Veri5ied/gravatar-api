import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAccountDto } from './dto/update-account.dto';

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

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') accountId: string,
    @Body() updatedAccount: UpdateAccountDto,
  ) {
    return await this.accountService.updateAccounts(accountId, updatedAccount);
  }

  @Get()
  async getAccounts(@GetUser() { id }: User) {
    return await this.accountService.getAccounts(id);
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    return await this.accountService.deleteAccount(id);
  }
}
