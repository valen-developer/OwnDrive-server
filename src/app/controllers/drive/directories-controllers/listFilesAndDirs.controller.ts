import { Request, Response } from "express";
import path from "path";

import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { storage } from "../../../config/storage";

import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

import { Controller } from "../../controller.interface";

import { FilesAndDirsLister } from "../../../../context/Storage/application/files/filesAndDirsLister";

export class GetFilesAndDirsController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const container = getContainer();
      const lister: FilesAndDirsLister = container.get(
        storageUseCasesDependencies.FilesAndDirsLister
      );

      const data = lister.list(path.join(storage.path, email, pathTo));

      res.json({
        ok: true,
        result: data,
      });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
