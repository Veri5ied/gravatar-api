import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWalletDto, WalletItemDto } from './dto/wallet.dto';

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

  async updateWallet(walletId: string, walletDto: UpdateWalletDto) {
    const wallet = await this.prisma.wallets.update({
      where: {
        id: walletId,
      },
      data: {
        ...walletDto,
      },
    });

    delete wallet.userId;
    return {
      data: wallet,
      message: 'Wallet updated successfully',
    };
  }

  async deleteWallet(walletId: string) {
    await this.prisma.wallets.delete({
      where: {
        id: walletId,
      },
    });

    return {
      message: 'Wallet deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
