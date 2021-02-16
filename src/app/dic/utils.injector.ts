import { IOC } from "dic-ioc";

import { Bcrypt } from "../../context/shared/application/bcrypt.crypt";
import { JSONWEBTOKEN } from "../../context/shared/application/jsonwebtoken.jwt";
import { NodeMailer } from "../../context/shared/infrastructure/NodeMailer.mailer";

export enum utilsDependencies {
  NodeMailer = "NodeMailer",
  JSONWEBTOKEN = "JSONWEBTOKEN",
  BCRYPT = "BCRYPT",
  FSDirCreator = "FSDirCreator",
}

export const utilsInjector = (container: IOC) => {
  container.setService(utilsDependencies.NodeMailer, () => new NodeMailer());

  container.setService(utilsDependencies.BCRYPT, () => new Bcrypt());

  container.setService(
    utilsDependencies.JSONWEBTOKEN,
    () => new JSONWEBTOKEN()
  );
};
