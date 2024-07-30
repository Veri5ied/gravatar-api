import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { WalletsModule } from './wallets/wallets.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    HealthModule,
    AuthModule,
    CloudinaryModule,
    WalletsModule,
    AccountsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, CloudinaryService],
})
export class AppModule {}
