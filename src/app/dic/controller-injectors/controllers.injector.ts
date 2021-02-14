import { IOC } from "dic-ioc";

import { utilsDependencies, utilsInjector } from "../utils.injector";
import { repositories } from "../repositories.injector";

import { SigninController } from "../../controllers/auth/Singin.controller";
import { SingupController } from "../../controllers/auth/SingUp.controller";
import { authControllersInjector } from "./authcontroller.injector";

export enum controllers {
  SingupController = "SignupController",
  SigninController = "SinginController",
}

export const controllerInjector = (container: IOC) => {
  authControllersInjector(container);
};
