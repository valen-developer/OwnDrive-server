import { storage } from "../../../app/config/storage";

import { DirCreator } from "../domain/interfaces/DirCreator.interface";

import fs from "fs";
import path from "path";

export class FSDirCreator implements DirCreator {
  create(pathToSave: string, name: string): void {
    const fullPath = path.join(pathToSave, name);

    this.createFullPath(fullPath);
  }

  private createFullPath(fullPath: string) {
    let parts = fullPath.split("/");
    let pathToTest = parts[0];

    for (let index = 1; index <= parts.length; index++) {
      if (!fs.existsSync(pathToTest) && pathToTest) {
        fs.mkdirSync(pathToTest);
      }

      pathToTest += `/${parts[index]}`;
    }
  }
}
