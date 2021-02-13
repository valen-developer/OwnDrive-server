import { IOC } from "dic-ioc";
import { NodeMailer } from "../../context/shared/infrastructure/NodeMailer.mailer";
import { controllerInjector } from "./controllers.injector";
import { repositoriesInjector } from "./repositories.injector";

export enum generalDependencies {
  NodeMailer = "NodeMailer",
}

export const getContainer = () => {
  const container = new IOC();

  container.setService(generalDependencies.NodeMailer, () => new NodeMailer());

  repositoriesInjector(container);
  controllerInjector(container);

  return container;
};
