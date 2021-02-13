import { IOC } from "dic-ioc";
import { MongoUserRepository } from "../../context/Users/infrastructure/mongoRepository/mongoUserRepository.repository";

export enum repositories {
  MongoUserRepository = "MongoUserRepository",
}

export const repositoriesInjector = (container: IOC) => {
  container.setService(
    repositories.MongoUserRepository,
    () => new MongoUserRepository()
  );
};
