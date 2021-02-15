import { IOC } from "dic-ioc";
import { repositoriesInjector } from "./repositories.injector";
import { utilsDependencies, utilsInjector } from "./utils.injector";

export const getContainer = () => {
  const container = new IOC();

  utilsInjector(container);
  repositoriesInjector(container);

  return container;
};
