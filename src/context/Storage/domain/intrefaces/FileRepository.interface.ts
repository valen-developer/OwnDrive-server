export interface FileRepository {
  upload(file: any, path: string): void;
  delete(path: string): void;
  exists(path: string): boolean;
}
