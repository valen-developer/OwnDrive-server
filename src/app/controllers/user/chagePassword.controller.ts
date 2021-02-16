import { Request, Response } from "express";

import { getContainer } from "../../dic/container";
import { utilsDependencies } from "../../dic/utils.injector";
import { userUseCaseDependencies } from "../../dic/userUseCases.injector";

import { UserPassword } from "../../../context/Users/domain/valueObjects/password.valueObject";
import { Http4xxException } from "../../../context/shared/domain/exceptions/Http4xx.exception";

import { Controller } from "../controller.interface";
export class ChangePasswordController implements Controller {
  public async run(req: Request, res: Response) {
    const password = req.body.password;
    const uuid = req.body.uuid;

    try {
      const container = getContainer();
      const crypt = container.get(utilsDependencies.BCRYPT);

      this.verifyPassword(password);

      const updater = container.get(userUseCaseDependencies.UpdateUser);
      await updater.update(uuid, {
        password: crypt.hashSync(password, 10),
        validated: true,
      });

      res.json({
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

  private verifyPassword(password: string): void {
    if (!UserPassword.isValidPassword(password))
      throw new Http4xxException("invalid password", 400);
  }
}
