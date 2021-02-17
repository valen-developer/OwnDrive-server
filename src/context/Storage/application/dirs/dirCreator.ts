import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { DirRepository } from "../../domain/intrefaces/DirRepository.interface";

export class DirCreator {
  private dirRepository: DirRepository;

  constructor(dirRepository: DirRepository) {
    this.dirRepository = dirRepository;
  }

  createDir(pathToSave: string, name: string): void {
    if (!name) throw new Http4xxException("dir name shouldn´t be null", 400);

    const isCreated = this.dirRepository.createDir(pathToSave, name);

    if (!isCreated) throw new Http4xxException("dir can´t be created", 500);
  }
}
