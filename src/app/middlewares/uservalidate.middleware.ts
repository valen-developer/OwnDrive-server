import { NextFunction, Request, Response } from "express";
import { UserFinder } from "../../context/Users/application/findUser";
import { UserRepository } from "../../context/Users/domain/userRepository.interface";
import { getContainer } from "../dic/container";
import { repositories } from "../dic/repositories.injector";
import { Middleware } from "./middleware.interface";

export class UserValidatedMiddleware implements Middleware {
  public async run(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const uuid = req.body.uuid;

    try {
      if (!uuid)
        return res.status(400).json({ ok: false, error: "not uuid obtained" });

      const container = getContainer();
      const userRepository = container.get(repositories.UserRepository);

      const userFinder = new UserFinder(userRepository);
      const userDB = await userFinder.byUuid(uuid);

      if (!userDB.validated)
        return res
          .status(401)
          .json({ ok: false, error: "user don´t activated" });

      next();
    } catch (error) {
      let statusCode = 500;
      if (error.statusCode) statusCode = error.statusCode;

      res.status(statusCode).json({ ok: false, error: error.message });
    }
  }
}
