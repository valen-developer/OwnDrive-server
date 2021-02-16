import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { DirRepository } from "../domain/intrefaces/DirRepository.interface";

export class FileDraft {
  private dirRepository: DirRepository;

  constructor(dirRepository: DirRepository) {
    this.dirRepository = dirRepository;
  }

  public delete(path: string): void {
    if (!this.dirRepository.exists(path))
      throw new Http4xxException("file not exits", 400);

    this.dirRepository.deleteFile(path);
  }
}
