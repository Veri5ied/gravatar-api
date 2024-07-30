import {
  Body,
  Controller,
  HttpException,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { AboutDto } from './dto/about.dto';

@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  async userAvatarUpload(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    try {
      const { id } = user;
      const res = await this.cloudinaryService.uploadFile(file);
      return await this.userService.userAvatarUpload(id, res.secure_url);
    } catch (error) {
      throw new HttpException('Unable to upload image', error);
    }
  }

  @Patch('about')
  async updateUserAbout(@GetUser() user: User, @Body() aboutDto: AboutDto) {
    const { id } = user;
    return await this.userService.updateUserAbout(id, aboutDto);
  }
}
