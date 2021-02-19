import { Request, Response } from "express";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { Controller } from "../../controller.interface";

import path from "path";
import { storage } from "../../../config/storage";
import { getContainer } from "../../../dic/container";
import { repositories } from "../../../dic/repositories.injector";
import { FileRepository } from "../../../../context/Storage/domain/intrefaces/FileRepository.interface";
import { Http4xxException } from "../../../../context/shared/domain/exceptions/Http4xx.exception";

export class GetFileController implements Controller {
  public run(req: Request, res: Response): void {
    const pathFrom = req.body.path;
    const email = req.body.email;

    try {
      const container = getContainer();
      const fileRepository: FileRepository = container.get(
        repositories.FileRepository
      );

      const fullPath = path.join(storage.path, email, pathFrom);

      if (!fileRepository.exists(fullPath))
        throw new Http4xxException("file don´t exists", 400);

      res.sendFile(fullPath);
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
