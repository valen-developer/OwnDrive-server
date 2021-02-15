import { Router } from "express";

//Controllers
import { ChangePasswordController } from "../controllers/user/chagePassword.controller";
import { UploadUserImageController } from "../controllers/user/uploadImage.controller";

//Middlewares
import { UserValidatedMiddleware } from "../middlewares/uservalidate.middleware";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";

export const userRouter: Router = Router();

//Middlewares
const validateTokenMiddleware = new ValidateTokenMiddleware();
const userValidatedMiddleware = new UserValidatedMiddleware();

//Controllers
const changePasswordController: ChangePasswordController = new ChangePasswordController();

const uploadUserImageController: UploadUserImageController = new UploadUserImageController();

userRouter.patch(
  "/password",
  [validateTokenMiddleware.run],
  (req: any, res: any) => {
    changePasswordController.run(req, res);
  }
);

userRouter.post(
  "/image",
  [validateTokenMiddleware.run, userValidatedMiddleware.run],
  (req: any, res: any) => {
    uploadUserImageController.run(req, res);
  }
);
