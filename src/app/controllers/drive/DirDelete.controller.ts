import { Request, Response } from "express";
import { DirDraft } from "../../../context/Storage/application/dirDraft";
import { Controller } from "../controller.interface";

import path from "path";
import { storage } from "../../config/storage";

export class DirDeleteController implements Controller {
  public run(req: Request, res: Response): void {
    const pathTo = req.body.path;
    const email = req.body.email;

    try {
      const dirDraft = new DirDraft();

      dirDraft.delete(path.join(storage.path, email, pathTo));

      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.json({
        error: error.message,
      });
    }
  }
}
