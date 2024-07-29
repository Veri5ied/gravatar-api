import { Injectable } from '@nestjs/common';
import { ErrorResponse, Resend } from 'resend';

interface CreateEmailResponse {
  id: string;
}

@Injectable()
export class MailerService {
  constructor() {}
  resend = new Resend(process.env.RESEND_API_KEY);
  async dispatchEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<CreateEmailResponse | ErrorResponse> {
    const { data, error } = await this.resend.emails.send({
      from: 'Alvin <hey@keyer.co>',
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      return error as ErrorResponse;
    }

    return data as CreateEmailResponse;
  }
}
