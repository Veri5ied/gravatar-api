import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactItemDTO } from './dto/create-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(userId: string, createContactDto: ContactItemDTO) {
    const contactData = createContactDto.contact.map((el) => ({
      ...el,
      userId,
    }));

    await this.prisma.contact.createMany({
      data: contactData,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Contact created successfully',
      data: contactData,
    };
  }

  async getContacts(userId: string) {
    return await this.prisma.contact.findMany({
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

  async deleteContact(contactId: string) {
    await this.prisma.contact.delete({
      where: {
        id: contactId,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Contact deleted successfully',
    };
  }

  async updateContact(contactId: string, contactDto: UpdateContactDTO) {
    const contact = await this.prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        ...contactDto,
      },
    });

    delete contact.userId;

    return {
      statusCode: HttpStatus.OK,
      message: 'Contact updated successfully',
      contact,
    };
  }
}
