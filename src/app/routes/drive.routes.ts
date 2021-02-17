import { Router } from "express";

import { CreateDirController } from "../controllers/drive/directories-controllers/createDir.controller";
import { DirDeleteController } from "../controllers/drive/directories-controllers/DirDelete.controller";
import { GetFilesAndDirsController } from "../controllers/drive/directories-controllers/listFilesAndDirs.controller";
import { FileDraftController } from "../controllers/drive/files-controllers/fileDraft.controller";
import { FileUploadController } from "../controllers/drive/files-controllers/fileUpload.controller";
import { GetFileController } from "../controllers/drive/files-controllers/getFile.controller";
import { UserValidatedMiddleware } from "../middlewares/uservalidate.middleware";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";

export const driveRouter = Router();

//Middlewares
const verifyToken = new ValidateTokenMiddleware();
const verifyuser = new UserValidatedMiddleware();

//Dirs Controllers
const createDirController = new CreateDirController();
const getFilesAndDirsController = new GetFilesAndDirsController();
const dirDeleteController = new DirDeleteController();

//Files controllers
const fileUploadController = new FileUploadController();
const fileDraftController = new FileDraftController();
const getFileController = new GetFileController();

//Dirs

driveRouter.get(
  "/",
  [verifyToken.run, verifyuser.run],
  getFilesAndDirsController.run
);
driveRouter.post(
  "/",
  [verifyToken.run, verifyuser.run],
  (req: any, res: any) => {
    createDirController.run(req, res);
  }
);
driveRouter.delete(
  "/",
  [verifyToken.run, verifyuser.run],
  dirDeleteController.run
);

//Files
driveRouter.get(
  "/file",
  [verifyToken.run, verifyuser.run],
  getFileController.run
);
driveRouter.post(
  "/file",
  [verifyToken.run, verifyuser.run],
  fileUploadController.run
);
driveRouter.delete(
  "/file",
  [verifyToken.run, verifyuser.run],
  fileDraftController.run
);
