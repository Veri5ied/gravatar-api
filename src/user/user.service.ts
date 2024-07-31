import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AboutDto } from './dto/about.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //get profile when logged in
  async fetchProfile(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          wallets: true,
          accounts: true,
          contacts: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      delete user.emailtoken;
      delete user.password;
      return {
        data: user,
        message: 'User profile loaded',
      };
    } catch (error) {
      throw new HttpException('Unable to fetch profile', HttpStatus.NOT_FOUND);
    }
  }

  //get profile by profileUrl
  async fetchProfileByUrl(url: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          profileUrl: url,
        },
        include: {
          wallets: true,
          accounts: true,
          contacts: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      delete user.emailtoken;
      delete user.password;
      return {
        data: user,
        message: 'User profile loaded',
      };
    } catch (error) {
      throw new HttpException('Unable to fetch profile', HttpStatus.NOT_FOUND);
    }
  }

  //avatar upload
  async userAvatarUpload(id: string, url: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: url,
      },
      select: {
        avatar: true,
      },
    });

    return {
      data: user,
      messsage: 'Avatar uploaded successfully',
    };
  }

  //update about page => [Display Name, About, Pronunciation, Pronouns, Location, Job Title, Company]
  async updateUserAbout(id: string, aboutDto: AboutDto) {
    const about = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...aboutDto,
      },
      select: {
        id: true,
        displayName: true,
        profileUrl: true,
        about: true,
        pronunciation: true,
        pronouns: true,
        location: true,
        jobTitle: true,
        company: true,
        interests: true,
      },
    });

    return {
      message: 'About updated successfully',
      data: about,
    };
  }
}
