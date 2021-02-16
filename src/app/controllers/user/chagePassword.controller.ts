import { Request, Response } from "express";

import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { UserPassword } from "../../../context/Users/domain/valueObjects/password.valueObject";

import { UpdateUser } from "../../../context/Users/application/updateUser";

import { Crypt } from "../../../context/shared/domain/interfaces/crypt.interface";
import { Controller } from "../controller.interface";
import { Http4xxException } from "../../../context/shared/domain/exceptions/Http4xx.exception";
import { getContainer } from "../../dic/container";
import { repositories } from "../../dic/repositories.injector";
import { utilsDependencies } from "../../dic/utils.injector";
import { useCasesDependencies } from "../../dic/useCases.injector";

export class ChangePasswordController implements Controller {
  public async run(req: Request, res: Response) {
    const password = req.body.password;
    const uuid = req.body.uuid;

    try {
      const container = getContainer();
      const crypt = container.get(utilsDependencies.BCRYPT);

      this.verifyPassword(password);

      const updater = container.get(useCasesDependencies.UpdateUser);
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
