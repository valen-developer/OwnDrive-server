import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import smtpTransport from "nodemailer-smtp-transport";

import { Mailer } from "../domain/interfaces/mail.interface";

import { enviroment } from "../../../app/config/enviroment";
import { Http4xxException } from "../domain/exceptions/Http4xx.exception";

export class NodeMailer implements Mailer {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        host: enviroment.mailer.host,
        port: enviroment.mailer.port,
        auth: enviroment.mailer.auth,
      })
    );
  }

  public async send(
    to: string,
    from: string,
    subject: string,
    template: string
  ): Promise<void> {
    const mailOptions = {
      from,
      to,
      subject,
      html: template,
    };

    await this.transporter.sendMail(mailOptions).catch((err) => {
      throw new Http4xxException("unable send mail", 500);
    });
  }
}
