import fs from "fs";
import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

export class FileDraft {
  public delete(path: string): void {
    if (!fs.existsSync(path)) throw new Http4xxException("file not exits", 400);

    fs.unlinkSync(path);
  }
}
