import { IOC } from "dic-ioc";
import { Bcrypt } from "../../context/shared/infrastructure/bcrypt.crypt";
import { JSONWEBTOKEN } from "../../context/shared/infrastructure/jsonwebtoken.jwt";
import { NodeMailer } from "../../context/shared/infrastructure/NodeMailer.mailer";

export enum utilsDependencies {
  NodeMailer = "NodeMailer",
  JSONWEBTOKEN = "JSONWEBTOKEN",
  BCRYPT = "BCRYPT",
}

export const utilsInjector = (container: IOC) => {
  container.setService(utilsDependencies.NodeMailer, () => new NodeMailer());

  container.setService(utilsDependencies.BCRYPT, () => new Bcrypt());

  container.setService(
    utilsDependencies.JSONWEBTOKEN,
    () => new JSONWEBTOKEN()
  );
};
