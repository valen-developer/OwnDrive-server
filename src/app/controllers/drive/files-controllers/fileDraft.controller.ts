import { Request, Response } from "express";
import { FileDraft } from "../../../../context/Storage/application/fileDraft";
import { errorReponseHandler } from "../../../utils/errorResponseHandler";
import { Controller } from "../../controller.interface";

import path from "path";
import { storage } from "../../../config/storage";

export class FileDraftController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const fileDraft = new FileDraft();
      fileDraft.delete(path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      errorReponseHandler(error, res);
    }
  }
}
