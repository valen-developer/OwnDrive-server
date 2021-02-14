import { IOC } from "dic-ioc";
import { controllerInjector } from "./controller-injectors/controllers.injector";
import { repositoriesInjector } from "./repositories.injector";
import { utilsDependencies, utilsInjector } from "./utils.injector";

export const getContainer = () => {
  const container = new IOC();

  utilsInjector(container);
  repositoriesInjector(container);
  controllerInjector(container);

  return container;
};
