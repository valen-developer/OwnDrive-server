import { Request, Response } from "express";
import { DirDraft } from "../../../../context/Storage/application/dirDraft";
import { Controller } from "../../controller.interface";

import path from "path";
import { storage } from "../../../config/storage";
import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";

export class DirDeleteController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const container = getContainer();
      const dirDraft: DirDraft = container.get(
        storageUseCasesDependencies.DirDraft
      );

      dirDraft.delete(path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
