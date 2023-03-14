import { Controller, Get, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('email')
export class EmailController {
  constructor(private mailService: MailerService) {}

  @Get('plain-text-mail')
  plainTextEmail(@Query('toemail') toemail) {
    const url = `http://localhost:8080/hola`;
    this.mailService
      .sendMail({
        to: toemail,
        from: process.env.FROM_EMAIL,
        subject: 'Confirm email OkVoiture Challenge',
        html: ` <h1>Welcome to OKVoiture!</h1>
                <p>Please click to confirm your email:</p>
                <a href="${url}">${url}</a>`,
      })
      .then(() => {
        console.log('Email sent!');
      })
      .catch((error) => {
        console.log('Error while sending error email.', error);
      });
  }
}
