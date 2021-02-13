import { Router } from "express";
import { SingupController } from "../controllers/auth/SingUp.controller";
import { getContainer } from "../dic/container";
import { controllers } from "../dic/controllers.injector";
import { authRouter } from "./auth.routes";

export const router: Router = Router();

router.use("", authRouter);

const container = getContainer();

const signupController: SingupController = container.get(
  controllers.SingupController
);

router.post("/signup", (req, resp) => {
  signupController.run(req, resp);
});
