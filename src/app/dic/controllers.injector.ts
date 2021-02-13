import { IOC } from "dic-ioc";
import { SingupController } from "../controllers/auth/SingUp.controller";
import { generalDependencies } from "./container";
import { repositories } from "./repositories.injector";

export enum controllers {
  SingupController = "SignupController",
}

export const controllerInjector = (container: IOC) => {
  container.setService(
    controllers.SingupController,
    (c) =>
      new SingupController(
        c.get(generalDependencies.NodeMailer),
        c.get(repositories.MongoUserRepository)
      )
  );
};
