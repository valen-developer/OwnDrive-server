import { Request, Response } from "express";
import path from "path";

import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { storage } from "../../../config/storage";

import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

import { Controller } from "../../controller.interface";

export class FileDraftController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const container = getContainer();
      const fileDraft = container.get(storageUseCasesDependencies.FileDraft);

      fileDraft.delete(path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
