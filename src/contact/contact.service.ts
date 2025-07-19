import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async create(dto: CreateContactDto) {
    const contact = this.contactRepo.create(dto);
    await this.contactRepo.save(contact);
    return { success: true, data: contact };
  }

  async findAll() {
    const list = await this.contactRepo.find();
    return { success: true, data: list };
  }

  async findOne(id: number) {
    const contact = await this.contactRepo.findOneBy({ id });
    if (!contact) throw new NotFoundException('Contact not found');
    return { success: true, data: contact };
  }

  async update(id: number, dto: UpdateContactDto) {
    const contact = await this.contactRepo.findOneBy({ id });
    if (!contact) throw new NotFoundException('Contact not found');
    const updated = this.contactRepo.merge(contact, dto);
    await this.contactRepo.save(updated);
    return { success: true, data: updated };
  }

  async remove(id: number) {
    const contact = await this.contactRepo.findOneBy({ id });
    if (!contact) throw new NotFoundException('Contact not found');
    await this.contactRepo.remove(contact);
    return { success: true, message: 'Contact deleted' };
  }
}
