import { Router } from "express";

import { CreateDirController } from "../controllers/drive/directories-controllers/createDir.controller";
import { DirDeleteController } from "../controllers/drive/directories-controllers/DirDelete.controller";
import { GetFilesAndDirsController } from "../controllers/drive/directories-controllers/listFilesAndDirs.controller";
import { FileDraftController } from "../controllers/drive/files-controllers/fileDraft.controller";
import { FileUploadController } from "../controllers/drive/files-controllers/fileUpload.controller";

export const driveRouter = Router();

const createDirController = new CreateDirController();
const getFilesAndDirsController = new GetFilesAndDirsController();
const dirDeleteController = new DirDeleteController();

//Files controllers
const fileUploadController = new FileUploadController();
const fileDraftController = new FileDraftController();

driveRouter.get("/", getFilesAndDirsController.run);
driveRouter.post("/", createDirController.run);
driveRouter.delete("/", dirDeleteController.run);

//Files
driveRouter.post("/file", fileUploadController.run);
driveRouter.delete("/file", fileDraftController.run);
