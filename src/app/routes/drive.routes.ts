import { Router } from "express";
import { CreateDirController } from "../controllers/drive/createDir.controller";
import { DirDeleteController } from "../controllers/drive/DirDelete.controller";
import { GetFilesAndDirsController } from "../controllers/drive/listFilesAndDirs.controller";

export const driveRouter = Router();

const createDirController = new CreateDirController();
const getFilesAndDirsController = new GetFilesAndDirsController();
const dirDeleteController = new DirDeleteController();

driveRouter.get("/", getFilesAndDirsController.run);
driveRouter.post("/", createDirController.run);
driveRouter.delete("/", dirDeleteController.run);
