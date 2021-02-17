import { Request, Response } from "express";
import path from "path";

import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { storage } from "../../../config/storage";

import { Controller } from "../../controller.interface";

import { DirCreator } from "../../../../context/Storage/application/dirs/dirCreator";
import { Http4xxException } from "../../../../context/shared/domain/exceptions/Http4xx.exception";

export class CreateDirController implements Controller {
  public run(req: Request, res: Response): void {
    const dirPath = req.body.path;
    const newDirName = req.body.name;
    const email = req.body.email;

    try {
      this.checkArgs([dirPath, newDirName, email]);

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

  private checkArgs(args: string[]): void {
    args.forEach((arg) => {
      if (arg === undefined)
        throw new Http4xxException(`invalid path to create dir`, 400);
    });
  }
}
