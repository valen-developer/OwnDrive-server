import { FileArray } from "express-fileupload";

import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { FileRepository } from "../../domain/intrefaces/FileRepository.interface";

export class FileUploader {
  private fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  public async upload(
    files: FileArray | undefined,
    pathToSave: string
  ): Promise<void> {
    if (!files) throw new Http4xxException("no files to upload", 400);

    this.fileRepository.upload(files, pathToSave);
  }
}
