import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AboutDto } from './dto/about.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //get profile when logged in
  async fetchProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    delete user.emailtoken;
    delete user.password;

    return {
      data: user,
      message: 'Profile fetched successfully',
    };
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
