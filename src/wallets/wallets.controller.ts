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
import { WalletsService } from './wallets.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UpdateWalletDto, WalletItemDto } from './dto/wallet.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/wallets')
@UseGuards(AuthGuard('jwt'))
export class WalletsController {
  constructor(private walletService: WalletsService) {}

  @Post('')
  async createWalletAccount(
    @GetUser() { id }: User,
    @Body() walletDto: WalletItemDto,
  ) {
    return await this.walletService.createWallet(id, walletDto);
  }

  @Get('')
  async getWalletAccounts(@GetUser() { id }: User) {
    return await this.walletService.getWallets(id);
  }

  @Patch(':id')
  async updateWalletAccount(
    @Param('id') id: string,
    @Body() walletDto: UpdateWalletDto,
  ) {
    return await this.walletService.updateWallet(id, walletDto);
  }

  @Delete(':id')
  async deleteWallet(@Param('id') id: string) {
    return await this.walletService.deleteWallet(id);
  }
}
