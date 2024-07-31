import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletItemDto } from './dto/wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async createWallet(userId: string, walletDto: WalletItemDto) {
    const walletData = walletDto.wallet.map((el) => ({
      ...el,
      userId,
    }));

    await this.prisma.wallets.createMany({
      data: walletData,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Wallet created successfully',
      data: walletData,
    };
  }

  async getWallets(userId: string) {
    return await this.prisma.wallets.findMany({
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
