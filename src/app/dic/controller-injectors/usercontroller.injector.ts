import { IOC } from "dic-ioc";
import { ChangePasswordController } from "../../controllers/user/chagePassword.controller";
import { UploadUserImageController } from "../../controllers/user/uploadImage.controller";
import { repositories } from "../repositories.injector";
import { utilsDependencies } from "../utils.injector";

export enum userControllerDependecies {
  ChangePasswordController = "ChangePasswordController",
  UploadUserImageController = "UploadUserImageController",
}

export const usersControllerinjector = (container: IOC) => {
  container.setService(
    userControllerDependecies.ChangePasswordController,
    (c) =>
      new ChangePasswordController(
        c.get(repositories.MongoUserRepository),
        c.get(utilsDependencies.BCRYPT)
      )
  );

  container.setService(
    userControllerDependecies.UploadUserImageController,
    (c) =>
      new UploadUserImageController(c.get(repositories.MongoUserRepository))
  );
};
