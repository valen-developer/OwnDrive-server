import { Router } from "express";

import { getContainer } from "../dic/container";

import { SingupController } from "../controllers/auth/SingUp.controller";
import { SigninController } from "../controllers/auth/Singin.controller";
import { utilsDependencies } from "../dic/utils.injector";

export const authRouter: Router = Router();

const container = getContainer();

const signupController: SingupController = new SingupController();

const siginController: SigninController = new SigninController();

authRouter.post("/signup", (req, res) => {
  signupController.run(req, res);
});

authRouter.post("/signin", (req, res) => {
  siginController.run(req, res);
});
