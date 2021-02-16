import fs from "fs";
import path from "path";
import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

export class DirCreator {
  createDir(pathToSave: string, name: string): void {
    const fullPath = path.join(pathToSave, name);

    const isCreated = this.createFullPath(fullPath);

    if (!isCreated) throw new Http4xxException("dir can´t be created", 500);
  }

  private createFullPath(fullPath: string): boolean {
    let parts = fullPath.split("/");
    let pathToTest = parts[0];

    for (let index = 1; index <= parts.length; index++) {
      if (!fs.existsSync(pathToTest) && pathToTest) {
        fs.mkdirSync(pathToTest);
      }

      pathToTest += `/${parts[index]}`;
    }

    return fs.existsSync(fullPath);
  }
}
