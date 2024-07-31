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
import { ContactService } from './contact.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { ContactItemDTO } from './dto/create-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Controller('api/contact')
@UseGuards(AuthGuard('jwt'))
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createContact(
    @GetUser() { id }: User,
    @Body() contactDto: ContactItemDTO,
  ) {
    return await this.contactService.createContact(id, contactDto);
  }

  @Get()
  async getContacts(@GetUser() { id }: User) {
    return this.contactService.getContacts(id);
  }

  @Patch(':id')
  async updateContact(
    @Param('id') id: string,
    @Body() contactDto: UpdateContactDTO,
  ) {
    return await this.contactService.updateContact(id, contactDto);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return await this.contactService.deleteContact(id);
  }
}
