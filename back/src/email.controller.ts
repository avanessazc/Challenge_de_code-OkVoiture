import { Controller, Get, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('email')
export class EmailController {
  constructor(private mailService: MailerService) {}

  @Get('plain-text-mail')
  plainTextEmail(@Query('toemail') toemail) {
    this.mailService
      .sendMail({
        to: toemail,
        from: process.env.FROM_EMAIL,
        subject: 'Verifying email OkVoiture Challenge',
        text: 'Welcome to OKVoiture. You have just registered a car! :)',
      })
      .then(() => {
        console.log('Email sent!');
        return 'success';
      })
      .catch((error) => {
        console.log(
          'Error while sending error email.',
          error,
          'HttpExceptionFilter',
        );
      });

    
  }
}
