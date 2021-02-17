import { Request, Response } from "express";
import { errorReponseHandler } from "../../utils/errorResponseHandler";
import { Controller } from "../controller.interface";

import { getContainer } from "../../dic/container";
import { userUseCaseDependencies } from "../../dic/userUseCases.injector";
import { UserFinder } from "../../../context/Users/application/findUser";

export class GetProfileImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const uuid = req.body.uuid;

    try {
      const container = getContainer();

      const userFinder: UserFinder = container.get(
        userUseCaseDependencies.FindUser
      );
      const user = await userFinder.byUuid(uuid);

      if (user.image.value) res.sendFile(user.image.value);
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
