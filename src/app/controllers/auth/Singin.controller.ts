import { Request, Response } from "express";

import { enviroment } from "../../config/enviroment";

import { getContainer } from "../../dic/container";
import { repositories } from "../../dic/repositories.injector";
import { utilsDependencies } from "../../dic/utils.injector";

import { Signin } from "../../../context/Users/application/signinUser";

import { Controller } from "../controller.interface";

export class SigninController implements Controller {
  public async run(req: Request, res: Response) {
    const body = req.body;

    try {
      const container = getContainer();
      const userRepository = container.get(repositories.MongoUserRepository);
      const crypt = container.get(utilsDependencies.BCRYPT);
      const jwt = container.get(utilsDependencies.JSONWEBTOKEN);

      const singinUser = new Signin(userRepository, crypt);
      const user = await singinUser.signin(body.email, body.password);

      res.json({
        ok: true,
        user,
        token: jwt.sign(user, enviroment.token.seed, {
          expiresIn: enviroment.token.expireIn,
        }),
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
}
