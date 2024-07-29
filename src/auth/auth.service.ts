import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async validateAndAuthenticateUser({ email, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException('Account not found!');
    const comparepasswords = await argon.verify(user.password, password);
    if (!comparepasswords)
      throw new ForbiddenException('Passwords is incorrect');
    const token = await this.signToken(user.id, user.email);
    return {
      message: 'Authentication was successful',
      statusCode: HttpStatus.OK,
      data: token,
    };
  }

  async validateAndRegisterUser({ email, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user)
      throw new HttpException('Account already exist', HttpStatus.CONFLICT);

    const hashpassowrd = await argon.hash(password);

    const token = await this.jwt.signAsync(
      { email },
      {
        expiresIn: '5m',
        secret: this.config.get('JWT_SECRET'),
      },
    );
    await this.prisma.user.create({
      data: {
        email,
        password: hashpassowrd,
        emailtoken: token,
        active: false,
      },
    });
    //send verification token with resend when implemented
  }

  async validateTokenAndSignUser(token: string, email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    if (!user.emailtoken) throw new NotFoundException('Token not found');

    if (token !== user.emailtoken)
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        active: true,
        emailtoken: null,
      },
    });

    return {
      message: 'User account is verified',
      statusCode: HttpStatus.OK,
      data: await this.signToken(user.id, user.email),
    };
  }

  async resendEmailVerificationLink(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.CONFLICT);
    const token = await this.jwt.signAsync(
      { email },
      {
        expiresIn: '5m',
        secret: this.config.get('JWT_SECRET'),
      },
    );
    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        emailtoken: token,
        active: false,
      },
    });

    //send token with resend when implemented

    return {
      message: 'Email verification sent successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string; statusCode: number }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '72h',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      statusCode: 200,
      access_token: token,
    };
  }
}
