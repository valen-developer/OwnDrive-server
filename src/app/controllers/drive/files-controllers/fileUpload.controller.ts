import { Response, Request } from "express";
import { FileUploaderExpress } from "../../../../context/Storage/application/fileUploader";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { Controller } from "../../controller.interface";

import path from "path";
import { storage } from "../../../config/storage";

export class FileUploadController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const files = req.files;
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const fileUploader = new FileUploaderExpress();
      await fileUploader.upload(files, path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
