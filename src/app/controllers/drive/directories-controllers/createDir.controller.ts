import { Request, Response } from "express";
import path from "path";

import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { storage } from "../../../config/storage";

import { Controller } from "../../controller.interface";

import { DirCreator } from "../../../../context/Storage/application/dirs/dirCreator";

export class CreateDirController implements Controller {
  public run(req: Request, res: Response): void {
    const dirPath = req.body.path;
    const newDirName = req.body.name;
    const email = req.body.email;

    try {
      const container = getContainer();
      const dirCreator: DirCreator = container.get(
        storageUseCasesDependencies.DirCreator
      );

      dirCreator.createDir(path.join(storage.path, email, dirPath), newDirName);

      res.status(201).json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
