import { readFile } from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import Handlebars from 'handlebars';
import { AuthService } from 'src/auth/auth.service';
import { ENV } from 'src/environment';
import { Judge } from 'src/judging/domain/aggregates/category/judge.entity';

@Injectable()
export class EmailService {
  fromAddress = `info@makeuc.io`;

  welcomeTemplate: HandlebarsTemplateDelegate<{
    name: string;
    link: string;
  }>;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    this.getJudgingEmailTemplate();

    const SENDGRID_API_KEY = this.configService.get(ENV.SENDGRID_API_KEY);
    sgMail.setApiKey(SENDGRID_API_KEY);
  }

  private getJudgingEmailTemplate(): void {
    readFile(`${__dirname}/../../templates/judging.html`, (err, data) => {
      if (err) Logger.error(err);
      if (!data) Logger.error(new Error(`Judging email template not found`));

      this.welcomeTemplate = Handlebars.compile(data.toString());
    });
  }

  private async getJudgingLoginLink(email: string) {
    const { token } = await this.authService.trustedLogin(email);
    return `https://judging.makeuc.io/login?token=${token}`;
  }

  async sendJudgingEmail(judge: Judge): Promise<void> {
    const name = judge.name;
    const link = await this.getJudgingLoginLink(judge.email);

    if (!this.welcomeTemplate) {
      return Logger.error(`Judging email template not found`);
    }

    const msg: sgMail.MailDataRequired = {
      to: judge.email,
      from: this.fromAddress,
      subject: 'MakeUC Judging',
      text: 'Thank you for judging at MakeUC 2021',
      html: this.welcomeTemplate({ name, link }),
    };

    sgMail
      .send(msg)
      .then(() => {
        Logger.log(`Judging email sent to ${judge.email} successfully`);
      })
      .catch((err) => {
        Logger.error(
          `Judging email could not be sent to ${judge.email}: ${err.message}`,
        );
      });
  }
}
