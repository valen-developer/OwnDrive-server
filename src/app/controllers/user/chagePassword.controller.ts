import { Request, Response } from "express";

import { UserRepository } from "../../../context/Users/domain/userRepository.interface";
import { UserPassword } from "../../../context/Users/domain/valueObjects/password.valueObject";

import { UpdateUser } from "../../../context/Users/application/updateUser";

import { Crypt } from "../../../context/shared/domain/interfaces/crypt.interface";
import { Controller } from "../controller.interface";
import { Http4xxException } from "../../../context/shared/domain/exceptions/Http4xx.exception";

export class ChangePasswordController implements Controller {
  private userRepository: UserRepository;
  private crypt: Crypt;

  constructor(userRepository: UserRepository, crypt: Crypt) {
    this.userRepository = userRepository;
    this.crypt = crypt;
  }

  public async run(req: Request, res: Response) {
    const password = req.body.password;
    const uuid = req.body.uuid;

    try {
      this.verifyPassword(password);

      const updater = new UpdateUser(this.userRepository);
      await updater.update(uuid, {
        password: this.crypt.hashSync(password, 10),
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
