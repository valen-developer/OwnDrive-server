import fs from "fs";
import path from "path";
import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

export class FilesAndDirsLister {
  public list(pathFrom: string): any {
    if (!fs.existsSync(pathFrom))
      throw new Http4xxException("path don´t exits", 400);

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

  private getStats(data: any[], type: string): any {
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
