import fs from "fs";

export class DirDraft {
  delete(path: string): void {
    //TODO: deprecated
    fs.rmdirSync(path, { recursive: true });
  }
}
