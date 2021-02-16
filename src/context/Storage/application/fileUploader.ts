import { FileArray, UploadedFile } from "express-fileupload";

import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

import path from "path";
import fs from "fs";

export class FileUploaderExpress {
  public async upload(
    files: FileArray | undefined,
    pathToSave: string
  ): Promise<void> {
    if (!files) throw new Http4xxException("no files to upload", 400);

    const keys = Object.keys(files);

    keys.forEach(async (key) => {
      const file: UploadedFile | UploadedFile[] = files[key];
      if (file instanceof Array)
        file.forEach(async (f: UploadedFile) => {
          f.name = this.changeNameIfExist(path.join(pathToSave, f.name));
          await f.mv(f.name);
        });

      if (!(file instanceof Array)) {
        file.name = this.changeNameIfExist(path.join(pathToSave, file.name));
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

    const folders = pathTo.split("/");
    const file = folders[folders.length - 1];

    const parts = file.split(".");
    const ext = parts[parts.length - 1];
    folders.forEach((part: any, index: any) => {
      if (index !== folders.length - 1) {
        pathaux += `/${part}`;
      } else {
        parts.forEach((p, i) => {
          if (i === 0) pathaux += "/";
          if (i !== parts.length - 1) pathaux += p;
        });
      }
    });

    pathaux += `_copy(${round}).${ext}`;
    return pathaux;
  }
}
