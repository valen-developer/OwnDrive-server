import { Request, Response } from "express";

import { enviroment } from "../../config/enviroment";
import { errorReponseHandler } from "../../utils/errorResponseHandler";

import { getContainer } from "../../dic/container";
import { utilsDependencies } from "../../dic/utils.injector";
import { userUseCaseDependencies } from "../../dic/userUseCases.injector";

import { Controller } from "../controller.interface";

export class SigninController implements Controller {
  public async run(req: Request, res: Response) {
    const body = req.body;

    try {
      const container = getContainer();
      const jwt = container.get(utilsDependencies.JSONWEBTOKEN);

      const singinUser = container.get(userUseCaseDependencies.Signin);
      const user = await singinUser.signin(body.email, body.password);

      res.json({
        ok: true,
        user,
        token: jwt.sign(user, enviroment.token.seed, {
          expiresIn: enviroment.token.expireIn,
        }),
      });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
