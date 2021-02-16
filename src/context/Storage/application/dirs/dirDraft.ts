import { DirRepository } from "../../domain/intrefaces/DirRepository.interface";

export class DirDraft {
  private dirRepository: DirRepository;

  constructor(dirRepository: DirRepository) {
    this.dirRepository = dirRepository;
  }

  delete(path: string): void {
    this.dirRepository.deleteDir(path);
  }
}
