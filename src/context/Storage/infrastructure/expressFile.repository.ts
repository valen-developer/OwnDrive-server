import fs from "fs";
import path from "path";
import { UploadedFile } from "express-fileupload";

import { FileRepository } from "../domain/intrefaces/FileRepository.interface";

export class ExpressFileRepository implements FileRepository {
  public delete(path: string): void {
    fs.unlinkSync(path);
  }

  public exists(path: string): boolean {
    return fs.existsSync(path);
  }

  public upload(files: any, pathTo: string): void {
    const keys = Object.keys(files);

    keys.forEach(async (key) => {
      const file: UploadedFile | UploadedFile[] = files[key];
      if (file instanceof Array)
        file.forEach(async (f: UploadedFile) => {
          f.name = this.changeNameIfExist(path.join(pathTo, f.name));
          await f.mv(f.name);
        });

      if (!(file instanceof Array)) {
        file.name = this.changeNameIfExist(path.join(pathTo, file.name));
        await file.mv(file.name);
      }
    });
  }

  private changeNameIfExist(pathTo: string): string {
    let round = 1;

    while (fs.existsSync(pathTo)) {
      pathTo = this.setCopyName(pathTo, round);
      round++;
    }

    return pathTo;
  }

  private setCopyName(pathTo: string, round: number): string {
    let pathaux = "";

    const foldersNames = pathTo.split("/");
    const fileName = foldersNames[foldersNames.length - 1];

    const fileNameParts = fileName.split(".");
    const extension = fileNameParts[fileNameParts.length - 1];

    foldersNames.forEach((part: any, index: any) => {
      if (index !== foldersNames.length - 1) pathaux += `/${part}`;
      else {
        fileNameParts.forEach((p, i) => {
          if (i === 0) pathaux += "/";
          if (i !== fileNameParts.length - 1) pathaux += p;
        });
      }
    });

    pathaux += `_copy(${round}).${extension}`;
    return pathaux;
  }
}
