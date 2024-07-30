import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

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

  async getAccounts(userId: string) {
    return await this.prisma.accounts.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });
  }

  async updateAccounts(accountId: string, updateAccountDto: UpdateAccountDto) {
    const accounts = updateAccountDto.account;

    await this.prisma.$transaction(
      accounts.map((accountData) =>
        this.prisma.accounts.update({
          where: {
            id: accountId,
          },
          data: {
            name: accountData.name,
            value: accountData.value,
          },
        }),
      ),
    );

    return {
      data: accounts,
      message: 'Accounts updated successfully',
    };
  }

  async deleteAccount(accountId: string) {
    await this.prisma.accounts.delete({
      where: {
        id: accountId,
      },
    });

    return {
      message: 'Account deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
