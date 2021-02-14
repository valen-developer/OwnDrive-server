import { Request, Response } from "express";
import path from "path";

import { Controller } from "../controller.interface";
import { resetPasswordTemplate } from "../../templates/mail-templates/reset-password.template";
import { enviroment } from "../../config/enviroment";
import { generateRandomPassword } from "../../utils/randomPasswordGenerator";

import { Mailer } from "../../../context/shared/domain/interfaces/mail.interface";
import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { UserCreator } from "../../../context/Users/application/userCreator";

import { NullValueException } from "../../../context/shared/domain/exceptions/NullValue.exception";
import { DirCreator } from "../../../context/Storage/domain/interfaces/DirCreator.interface";
import { storage } from "../../config/storage";

export class SingupController implements Controller {
  private mailer: Mailer;
  private userRepository: UserRepository;
  private dirCreator: DirCreator;

  constructor(
    mailer: Mailer,
    userRepository: UserRepository,
    dirCreator: DirCreator
  ) {
    this.mailer = mailer;
    this.userRepository = userRepository;
    this.dirCreator = dirCreator;
  }

  public async run(req: Request, res: Response) {
    const body = req.body;

    const randomPassword = generateRandomPassword();

    try {
      await this.sendPassword(body.email, body.name, randomPassword);

      const userCreator = new UserCreator(this.userRepository);
      await userCreator.create({
        uuid: body.uuid,
        name: body.name,
        password: randomPassword,
        email: body.email,
        image: null,
        validated: false,
      });

      this.dirCreator.create(storage.path, body.email);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      let statusCode = 500;

      if (error.statusCode) statusCode = error.statusCode;

      res.status(statusCode).json({
        ok: false,
        error: error.message,
      });
    }
  }

  private async sendPassword(
    email: string,
    name: string,
    randomPassword: string
  ): Promise<void> {
    if (!(email && name)) throw new NullValueException("name and email", 400);

    await this.mailer.send(
      email,
      enviroment.mailer.auth.user,
      "OWN DRIVE - YOUR PASSWORD",
      resetPasswordTemplate(name, randomPassword)
    );
  }
}
