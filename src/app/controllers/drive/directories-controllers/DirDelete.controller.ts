import { Request, Response } from "express";
import path from "path";

import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { storage } from "../../../config/storage";

import { Controller } from "../../controller.interface";

import { DirDraft } from "../../../../context/Storage/application/dirs/dirDraft";
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
