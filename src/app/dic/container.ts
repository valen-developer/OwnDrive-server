import { IOC } from "dic-ioc";
import { repositoriesInjector } from "./repositories.injector";
import { usesCasesInjector } from "./useCases.injector";
import { utilsInjector } from "./utils.injector";

export const getContainer = () => {
  const container = new IOC();

  utilsInjector(container);
  repositoriesInjector(container);
  usesCasesInjector(container);

  return container;
};
