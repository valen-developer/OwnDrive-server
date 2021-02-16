import { Response, Request } from "express";
import { FileUploader } from "../../../../context/Storage/application/fileUploader";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { Controller } from "../../controller.interface";

import path from "path";
import { storage } from "../../../config/storage";
import { getContainer } from "../../../dic/container";
import { storageUseCasesDependencies } from "../../../dic/storageUseCases.injector";

export class FileUploadController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const files = req.files;
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const container = getContainer();
      const fileUploader: FileUploader = container.get(
        storageUseCasesDependencies.FileUploader
      );

      await fileUploader.upload(files, path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
