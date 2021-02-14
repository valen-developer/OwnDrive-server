import { Router } from "express";
import { ChangePasswordController } from "../controllers/user/chagePassword.controller";
import { getContainer } from "../dic/container";
import { userControllerDependecies } from "../dic/controller-injectors/usercontroller.injector";

export const userRouter: Router = Router();

const container = getContainer();

const changePasswordController: ChangePasswordController = container.get(
  userControllerDependecies.ChangePasswordController
);

userRouter.patch("/password", (req, res) => {
  changePasswordController.run(req, res);
});
