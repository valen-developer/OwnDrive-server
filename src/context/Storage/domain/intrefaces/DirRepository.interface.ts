export interface DirRepository {
  createDir(pathTo: string, name: string): boolean;
  deleteDir(pathTo: string): void;
  deleteFile(pathTo: string): void;
  exists(pathTo: string): boolean;
  list(pathTo: string): any;
}
