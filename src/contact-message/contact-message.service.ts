import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactMessageDto) {
    const saved = this.repo.create(dto);
    await this.repo.save(saved);

    if (process.env.FORWARD_MAIL) {
      await this.sendEmail(dto);
    }

    return { success: true, message: 'Message received', data: saved };
  }

  async findAll() {
    const messages = await this.repo.find({ order: { createdAt: 'DESC' } });
    return { success: true, data: messages };
  }

  private async sendEmail(dto: CreateContactMessageDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.example.com',
      port: Number(process.env.MAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.MAIL_USER || 'user@example.com',
        pass: process.env.MAIL_PASS || 'password',
      },
    });

    const to = process.env.FORWARD_MAIL;

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to,
      subject: `New Message: ${dto.subject}`,
      text: `From: ${dto.name} <${dto.email}>\n\n${dto.message}`,
      html: `
        <p><strong>From:</strong> ${dto.name} &lt;${dto.email}&gt;</p>
        <p><strong>Subject:</strong> ${dto.subject}</p>
        <p>${dto.message.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}
