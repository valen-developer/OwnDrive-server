import { Router } from "express";
import { ChangePasswordController } from "../controllers/user/chagePassword.controller";
import { UploadUserImageController } from "../controllers/user/uploadImage.controller";
import { getContainer } from "../dic/container";
import {
  userControllerDependecies,
  usersControllerinjector,
} from "../dic/controller-injectors/usercontroller.injector";

export const userRouter: Router = Router();

const container = getContainer();

const changePasswordController: ChangePasswordController = container.get(
  userControllerDependecies.ChangePasswordController
);

const uploadUserImageController: UploadUserImageController = container.get(
  userControllerDependecies.UploadUserImageController
);

userRouter.patch("/password", (req, res) => {
  changePasswordController.run(req, res);
});

userRouter.post("/image", (req, res) => {
  uploadUserImageController.run(req, res);
});
