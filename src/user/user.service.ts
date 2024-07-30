import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

    return user;
  }
}
