import { IOC } from "dic-ioc";

import { SigninController } from "../../controllers/auth/Singin.controller";
import { SingupController } from "../../controllers/auth/SingUp.controller";

import { repositories } from "../repositories.injector";
import { utilsDependencies } from "../utils.injector";
import { controllers } from "./controllers.injector";

export const authControllersInjector = (container: IOC) => {
  container.setService(
    controllers.SingupController,
    (c) =>
      new SingupController(
        c.get(utilsDependencies.NodeMailer),
        c.get(repositories.MongoUserRepository),
        c.get(utilsDependencies.FSDirCreator)
      )
  );

  container.setService(
    controllers.SigninController,
    (c) =>
      new SigninController(
        c.get(repositories.MongoUserRepository),
        c.get(utilsDependencies.BCRYPT),
        c.get(utilsDependencies.JSONWEBTOKEN)
      )
  );
};
