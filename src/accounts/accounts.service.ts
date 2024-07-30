import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async createAccounts(userId: string, createAccountDto: CreateAccountDto) {
    const accountsData = createAccountDto.account.map((accountField) => ({
      ...accountField,
      userId,
    }));

    await this.prisma.accounts.createMany({
      data: accountsData,
    });

    return {
      data: accountsData,
      message: 'Accounts created successfully',
    };
  }

  /*  async updateAccounts(id: string, createAccountDto: CreateAccountDto) {
    const accounts = await this.prisma.accounts.update({
      where: {
        id,
      },
      data: {
        ...createAccountDto,
      },
    });

    return {
      data: accounts,
      message: 'Accounts updated successfully',
    };
  } */
}
