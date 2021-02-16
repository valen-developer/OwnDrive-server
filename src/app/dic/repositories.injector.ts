import { IOC } from "dic-ioc";
import { ExpressFileRepository } from "../../context/Storage/infrastructure/expressFile.repository";
import { FSDirRepository } from "../../context/Storage/infrastructure/fsDir.repository";
import { MongoUserRepository } from "../../context/Users/infrastructure/mongoRepository/mongoUserRepository.repository";

export enum repositories {
  MongoUserRepository = "MongoUserRepository",
  FSDirRepository = "FSDirRepository",
  ExpressFileRepository = "ExpressFileRepository",
}

export const repositoriesInjector = (container: IOC) => {
  container.setService(
    repositories.MongoUserRepository,
    () => new MongoUserRepository()
  );

  container.setService(
    repositories.FSDirRepository,
    () => new FSDirRepository()
  );
  container.setService(
    repositories.ExpressFileRepository,
    () => new ExpressFileRepository()
  );
};
