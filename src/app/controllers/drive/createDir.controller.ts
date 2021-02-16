import { Request, Response } from "express";
import { DirCreator } from "../../../context/Storage/application/dirCreator";
import { storage } from "../../config/storage";
import { errorReponseHandler } from "../../utils/errorResponseHandler";
import { Controller } from "../controller.interface";

import path from "path";

export class CreateDirController implements Controller {
  public run(req: Request, res: Response): void {
    const dirPath = req.body.path;
    const newDirName = req.body.name;
    const email = req.body.email;

    try {
      const dirCreator = new DirCreator();
      dirCreator.createDir(path.join(storage.path, email, dirPath), newDirName);

      res.status(201).json({ ok: true });
    } catch (error) {
      console.log(error);
      errorReponseHandler(error, res);
    }
  }
}
