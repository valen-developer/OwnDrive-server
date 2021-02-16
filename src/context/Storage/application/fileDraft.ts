import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { FileRepository } from "../domain/intrefaces/FileRepository.interface";

export class FileDraft {
  private fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  public delete(path: string): void {
    if (!this.fileRepository.exists(path))
      throw new Http4xxException("file not exits", 400);

    this.fileRepository.delete(path);
  }
}
