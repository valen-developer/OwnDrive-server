import { Router } from "express";
import { ChangePasswordController } from "../controllers/user/chagePassword.controller";
import { UploadUserImageController } from "../controllers/user/uploadImage.controller";
import { getContainer } from "../dic/container";
import {
  userControllerDependecies,
  usersControllerinjector,
} from "../dic/controller-injectors/usercontroller.injector";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";

export const userRouter: Router = Router();

const container = getContainer();

//Middlewares
const validateTokenMiddleware = new ValidateTokenMiddleware();

//Controllers
const changePasswordController: ChangePasswordController = container.get(
  userControllerDependecies.ChangePasswordController
);

const uploadUserImageController: UploadUserImageController = container.get(
  userControllerDependecies.UploadUserImageController
);

userRouter.patch(
  "/password",
  [validateTokenMiddleware.run],
  (req: any, res: any) => {
    changePasswordController.run(req, res);
  }
);

userRouter.post(
  "/image",
  [validateTokenMiddleware.run],
  (req: any, res: any) => {
    uploadUserImageController.run(req, res);
  }
);
