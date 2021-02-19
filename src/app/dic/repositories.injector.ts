import { IOC } from "dic-ioc";
import { ExpressFileRepository } from "../../context/Storage/infrastructure/expressFile.repository";
import { FSDirRepository } from "../../context/Storage/infrastructure/fsDir.repository";
import { MongoUserRepository } from "../../context/Users/infrastructure/mongoRepository/mongoUserRepository.repository";

export enum repositories {
  UserRepository = "MongoUserRepository",
  DirRepository = "FSDirRepository",
  FileRepository = "ExpressFileRepository",
}

export const repositoriesInjector = (container: IOC) => {
  container.setService(
    repositories.UserRepository,
    () => new MongoUserRepository()
  );

  container.setService(repositories.DirRepository, () => new FSDirRepository());
  container.setService(
    repositories.FileRepository,
    () => new ExpressFileRepository()
  );
};
