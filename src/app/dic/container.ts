import { IOC } from "dic-ioc";

export const getContainer = () => {
  const container = new IOC();

  return container;
};
