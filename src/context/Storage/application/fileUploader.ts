import { FileArray, UploadedFile } from "express-fileupload";

import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

import path from "path";
import fs from "fs";
import { FileRepository } from "../domain/intrefaces/FileRepository.interface";

export class FileUploaderExpress {
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
