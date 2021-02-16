import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { DirRepository } from "../../domain/intrefaces/DirRepository.interface";

export class FilesAndDirsLister {
  private dirRepository: DirRepository;

  constructor(dirRepository: DirRepository) {
    this.dirRepository = dirRepository;
  }

  public list(pathFrom: string): any {
    if (!this.dirRepository.exists(pathFrom))
      throw new Http4xxException("path don´t exits", 400);

    return this.dirRepository.list(pathFrom);
  }
}
