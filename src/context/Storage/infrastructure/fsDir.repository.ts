import fs from "fs";
import path from "path";

import { DirRepository } from "../domain/intrefaces/DirRepository.interface";

export class FSDirRepository implements DirRepository {
  createDir(path: string): void {
    throw new Error("Method not implemented.");
  }
  deleteDir(paht: string): void {
    throw new Error("Method not implemented.");
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

  exists(path: string): boolean {
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
}
