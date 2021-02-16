import { IOC } from "dic-ioc";
import { DirDraft } from "../../context/Storage/application/dirDraft";
import { Signin } from "../../context/Users/application/signinUser";
import { UpdateUser } from "../../context/Users/application/updateUser";
import { UserCreator } from "../../context/Users/application/userCreator";
import { repositories } from "./repositories.injector";
import { utilsDependencies } from "./utils.injector";

export enum useCasesDependencies {
  Signin = "Signin",
  UserCreator = "UserCreator",
  UpdateUser = "UpdateUser",
}

export const userUserCasesInjector = (container: IOC) => {
  container.setService(
    useCasesDependencies.Signin,
    (c) =>
      new Signin(
        c.get(repositories.MongoUserRepository),
        c.get(utilsDependencies.BCRYPT)
      )
  );

  container.setService(
    useCasesDependencies.UserCreator,
    (c) => new UserCreator(c.get(repositories.MongoUserRepository))
  );

  container.setService(
    useCasesDependencies.UpdateUser,
    (c) => new UpdateUser(c.get(repositories.MongoUserRepository))
  );
};
