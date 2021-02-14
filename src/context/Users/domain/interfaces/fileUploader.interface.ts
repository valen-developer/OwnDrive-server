export interface ImageUploader {
  upload(file: any, email: string): Promise<string>;
}
