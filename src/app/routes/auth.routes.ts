import { IOC } from "dic-ioc";
import { Router } from "express";
import { SingupController } from "../controllers/auth/SingUp.controller";
import { getContainer } from "../dic/container";
import { controllers } from "../dic/controllers.injector";
import { repositories } from "../dic/repositories.injector";

export const authRouter: Router = Router();

const container = getContainer();

const signupController: SingupController = container.get(
  controllers.SingupController
);

authRouter.post("signup", (req, res) => {
  signupController.run(req, res);
});
