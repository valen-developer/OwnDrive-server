import { Request, Response } from "express";

import { Controller } from "../controller.interface";
import { resetPasswordTemplate } from "../../templates/mail-templates/reset-password.template";
import { enviroment } from "../../config/enviroment";
import { generateRandomPassword } from "../../utils/randomPasswordGenerator";

import { Mailer } from "../../../context/shared/domain/interfaces/mail.interface";
import { UserCreator } from "../../../context/Users/application/userCreator";

import { NullValueException } from "../../../context/shared/domain/exceptions/NullValue.exception";
import { storage } from "../../config/storage";
import { getContainer } from "../../dic/container";
import { repositories } from "../../dic/repositories.injector";
import { utilsDependencies } from "../../dic/utils.injector";
import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { IOC } from "dic-ioc";
import { DirCreator } from "../../../context/Storage/application/dirCreator";
import { useCasesDependencies } from "../../dic/userUseCases.injector";

export class SingupController implements Controller {
  public async run(req: Request, res: Response) {
    const body = req.body;

    const randomPassword = generateRandomPassword();

    try {
      const dirCreator: DirCreator = new DirCreator();
      const container: IOC = getContainer();
      const mailer: Mailer = container.get(utilsDependencies.NodeMailer);

      await this.sendPassword(mailer, body.email, body.name, randomPassword);

      const userCreator = container.get(useCasesDependencies.UserCreator);
      await userCreator.create({
        uuid: body.uuid,
        name: body.name,
        password: randomPassword,
        email: body.email,
        image: null,
        validated: false,
      });

      dirCreator.createDir(storage.path, body.email);

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
    mailer: Mailer,
    email: string,
    name: string,
    randomPassword: string
  ): Promise<void> {
    if (!(email && name)) throw new NullValueException("name and email", 400);

    await mailer.send(
      email,
      enviroment.mailer.auth.user,
      "OWN DRIVE - YOUR PASSWORD",
      resetPasswordTemplate(name, randomPassword)
    );
  }
}
