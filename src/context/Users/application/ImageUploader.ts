import { UploadedFile, FileArray } from "express-fileupload";
import path from "path";

import { ImageUploader } from "../domain/interfaces/fileUploader.interface";

import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { storage } from "../../../app/config/storage";

export class ImageUploaderExpress implements ImageUploader {
  public async upload(
    files: FileArray | undefined,
    email: string
  ): Promise<string> {
    if (!files?.image) throw new Http4xxException("not image to upload", 400);

    const image: UploadedFile = this.setImageToUpload(files.image);

    const imageNameParts = image.name.split(".");
    const ext = this.checkImageExtension(imageNameParts);

    const pathToSave = path.join(storage.path, email, `image.${ext}`);

    await image.mv(pathToSave);

    return pathToSave;
  }

  private setImageToUpload(files: UploadedFile | UploadedFile[]): UploadedFile {
    if (files instanceof Array) return files[0];

    return files;
  }

  private checkImageExtension(parts: string[]): string {
    const validExtensions = ["jpg", "jpeg", "png"];

    const ext = parts[parts.length - 1];

    const isValid = validExtensions.includes(ext);

    if (!isValid)
      throw new Http4xxException(
        "image extension not valid [jpg, jpeg, png]",
        400
      );

    return ext;
  }
}
