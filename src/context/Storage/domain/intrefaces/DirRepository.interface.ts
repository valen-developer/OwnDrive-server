export interface DirRepository {
  createDir(path: string): void;
  deleteDir(paht: string): void;
  exists(path: string): boolean;
  list(path: string): any;
}
