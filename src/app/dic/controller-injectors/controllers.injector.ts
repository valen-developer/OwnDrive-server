import { IOC } from "dic-ioc";
import { authControllersInjector } from "./authcontroller.injector";
import { usersControllerinjector } from "./usercontroller.injector";

//TODO
export enum controllers {
  SingupController = "SignupController",
  SigninController = "SinginController",
}

export const controllerInjector = (container: IOC) => {
  authControllersInjector(container);
  usersControllerinjector(container);
};
