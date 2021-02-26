import { Request, Response } from "express";

import { resetPasswordTemplate } from "../../templates/mail-templates/reset-password.template";
import { generateRandomPassword } from "../../utils/randomPasswordGenerator";
import { errorReponseHandler } from "../../utils/errorResponseHandler";
import { enviroment } from "../../config/enviroment";
import { storage } from "../../config/storage";

import { IOC } from "dic-ioc";
import { getContainer } from "../../dic/container";
import { utilsDependencies } from "../../dic/utils.injector";
import { userUseCaseDependencies } from "../../dic/userUseCases.injector";
import { storageUseCasesDependencies } from "../../dic/storageUseCases.injector";

import { NullValueException } from "../../../context/shared/domain/exceptions/NullValue.exception";
import { Controller } from "../controller.interface";

import { Mailer } from "../../../context/shared/domain/interfaces/mail.interface";

import { DirCreator } from "../../../context/Storage/application/dirs/dirCreator";

export class SingupController implements Controller {
  public async run(req: Request, res: Response) {
    const body = req.body;

    const randomPassword = generateRandomPassword();

    try {
      const container: IOC = getContainer();

      //Create User
      const userCreator = container.get(userUseCaseDependencies.UserCreator);
      await userCreator.create({
        uuid: body.uuid,
        name: body.name,
        password: randomPassword,
        email: body.email,
        image: null,
        validated: false,
      });

      //Create Dir
      const dirCreator: DirCreator = container.get(
        storageUseCasesDependencies.DirCreator
      );
      dirCreator.createDir(storage.path, body.email);

      //Send Email
      const mailer: Mailer = container.get(utilsDependencies.NodeMailer);
      await this.sendPassword(mailer, body.email, body.name, randomPassword);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      errorReponseHandler(error, res);
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
