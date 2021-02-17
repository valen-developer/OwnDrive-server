import { NextFunction, Request, Response } from "express";
import { Http4xxException } from "../../context/shared/domain/exceptions/Http4xx.exception";
import { JWT } from "../../context/shared/domain/interfaces/jsonwebtoken.interface";
import { enviroment } from "../config/enviroment";
import { getContainer } from "../dic/container";
import { utilsDependencies } from "../dic/utils.injector";
import { errorReponseHandler } from "../utils/errorResponseHandler";
import { Middleware } from "./middleware.interface";

export class ValidateTokenMiddleware implements Middleware {
  public run(req: Request, res: Response, next: NextFunction): any {
    const token = String(req.headers.token).toString();

    try {
      if (!token || token === "undefined")
        return res.status(401).json({ ok: false, error: "invalid token" });

      const container = getContainer();
      const jwt: JWT = container.get(utilsDependencies.JSONWEBTOKEN);

      const isverified = jwt.verify(token, enviroment.token.seed);

      if (!isverified)
        return res.status(401).json({ ok: false, error: "invalid token" });

      next();
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
