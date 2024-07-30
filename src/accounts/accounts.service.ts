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
}
