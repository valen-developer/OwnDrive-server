import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import smtpTransport from "nodemailer-smtp-transport";

import { Mailer } from "../domain/interfaces/mail.interface";

import { enviroment } from "../../../app/config/enviroment";

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

    const resp = await this.transporter.sendMail(mailOptions).catch((err) => {
      console.log(err);
    });
  }
}
