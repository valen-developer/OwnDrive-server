import fs from "fs";
import path from "path";
import { driveRouter } from "../../../app/routes/drive.routes";
import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { DirRepository } from "../domain/intrefaces/DirRepository.interface";

export class DirCreator {
  private dirRepository: DirRepository;

  constructor(dirRepository: DirRepository) {
    this.dirRepository = dirRepository;
  }

  createDir(pathToSave: string, name: string): void {
    const isCreated = this.dirRepository.createDir(pathToSave, name);

    if (!isCreated) throw new Http4xxException("dir can´t be created", 500);
  }
}
