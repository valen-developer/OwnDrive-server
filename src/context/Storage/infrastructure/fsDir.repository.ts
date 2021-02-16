import fs from "fs";
import path from "path";

import { DirRepository } from "../domain/intrefaces/DirRepository.interface";

export class FSDirRepository implements DirRepository {
  public createDir(pathTo: string, name: string): boolean {
    const fullPath = path.join(pathTo, name);

    return this.createFullPath(fullPath);
  }

  public list(pathFrom: string) {
    const dirs = fs
      .readdirSync(pathFrom)
      .map((name) => path.join(pathFrom, name))
      .filter(this.isDirectory);

    const files = fs
      .readdirSync(pathFrom)
      .map((name) => path.join(pathFrom, name))
      .filter(this.isNotDirectory);

    return {
      dirs: this.getStats(dirs, "directory"),
      files: this.getStats(files, "file"),
    };
  }

  public deleteDir(pathTo: string): void {
    //TODO: deprecated
    fs.rmdirSync(pathTo, { recursive: true });
  }

  public deleteFile(pathTo: string): void {
    fs.unlinkSync(pathTo);
  }

  public exists(path: string): boolean {
    return fs.existsSync(path);
  }

  private getStats(data: string[], type: string): any {
    const stats: any = [];

    data.forEach((d) => {
      const stat: fs.Stats = fs.statSync(d);

      stats.push({
        name: this.normalizeNames(d),
        size: this.setSizeFormat(stat.size),
        type,
      });
    });

    return stats;
  }

  private setSizeFormat(bytes: number): string {
    const toKiloByte = 1 / 1000;
    const toMegaByte = toKiloByte / 1000;
    const toGigaByte = toMegaByte / 1000;

    if (bytes * toMegaByte > 1) return `${(bytes * toMegaByte).toFixed(2)} MB`;
    if (bytes * toKiloByte > 1) return `${(bytes * toKiloByte).toFixed(2)} KB`;
    if (bytes * toGigaByte > 1) return `${(bytes * toGigaByte).toFixed(2)} GB`;

    return `${bytes} Bytes`;
  }

  private isNotDirectory(source: string): boolean {
    return !fs.lstatSync(source).isDirectory();
  }

  private isDirectory(source: string): boolean {
    return fs.lstatSync(source).isDirectory();
  }

  private normalizeNames(name: string): string {
    const splited = name.split("/");

    return splited[splited.length - 1];
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
