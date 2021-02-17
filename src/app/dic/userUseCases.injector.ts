import { IOC } from "dic-ioc";
import { UserFinder } from "../../context/Users/application/findUser";

import { Signin } from "../../context/Users/application/signinUser";
import { UpdateUser } from "../../context/Users/application/updateUser";
import { UserCreator } from "../../context/Users/application/userCreator";

import { repositories } from "./repositories.injector";
import { utilsDependencies } from "./utils.injector";

export enum userUseCaseDependencies {
  Signin = "Signin",
  UserCreator = "UserCreator",
  UpdateUser = "UpdateUser",
  FindUser = "FindUser",
}

export const userUserCasesInjector = (container: IOC) => {
  container.setService(
    userUseCaseDependencies.Signin,
    (c) =>
      new Signin(
        c.get(repositories.MongoUserRepository),
        c.get(utilsDependencies.BCRYPT)
      )
  );

  container.setService(
    userUseCaseDependencies.UserCreator,
    (c) => new UserCreator(c.get(repositories.MongoUserRepository))
  );

  container.setService(
    userUseCaseDependencies.UpdateUser,
    (c) => new UpdateUser(c.get(repositories.MongoUserRepository))
  );

  container.setService(
    userUseCaseDependencies.FindUser,
    (c) => new UserFinder(c.get(repositories.MongoUserRepository))
  );
};
