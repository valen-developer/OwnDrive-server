import { Request, Response } from "express";

import path from "path";
import { FilesAndDirsLister } from "../../../../context/Storage/application/filesAndDirsLister";
import { storage } from "../../../config/storage";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { Controller } from "../../controller.interface";

export class GetFilesAndDirsController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const lister = new FilesAndDirsLister();
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