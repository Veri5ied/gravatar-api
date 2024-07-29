import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async validateAndRegisterUser(@Body() authDto: CreateUserDto) {
    return await this.authService.validateAndRegisterUser(authDto);
  }

  @Post('login')
  async validateAndAuthenticateUser(@Body() authDto: CreateUserDto) {
    return await this.authService.validateAndAuthenticateUser(authDto);
  }

  @Get('verify/token')
  async validateTokenAndSignUser(@Body() token: string, @Body() email: string) {
    return await this.authService.validateTokenAndSignUser(token, email);
  }

  @Post('resend/token') async resendEmailVerificationLink(
    @Body() email: string,
  ) {
    return await this.authService.resendEmailVerificationLink(email);
  }
}
