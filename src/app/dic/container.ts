import { IOC } from "dic-ioc";
import { repositoriesInjector } from "./repositories.injector";
import { storageUsesCasesInjector } from "./storageUseCases.injector";
import { userUserCasesInjector } from "./userUseCases.injector";
import { utilsInjector } from "./utils.injector";

export const getContainer = () => {
  const container = new IOC();

  utilsInjector(container);
  repositoriesInjector(container);
  userUserCasesInjector(container);
  storageUsesCasesInjector(container);

  return container;
};
