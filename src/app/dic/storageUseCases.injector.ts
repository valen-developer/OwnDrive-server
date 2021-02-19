import { IOC } from "dic-ioc";
import { repositories } from "./repositories.injector";

import { DirCreator } from "../../context/Storage/application/dirs/dirCreator";
import { DirDraft } from "../../context/Storage/application/dirs/dirDraft";

import { FileDraft } from "../../context/Storage/application/files/fileDraft";
import { FileUploader } from "../../context/Storage/application/files/fileUploader";
import { FilesAndDirsLister } from "../../context/Storage/application/files/filesAndDirsLister";

export enum storageUseCasesDependencies {
  DirCreator = "DirCreator",
  DirDraft = "DirDraft",
  FileDraft = "FileDraft",
  FilesAndDirsLister = "FilesAndDirsLister",
  FileUploader = "FileUploader",
}

export const storageUsesCasesInjector = (container: IOC) => {
  container.setService(
    storageUseCasesDependencies.DirCreator,
    (c) => new DirCreator(c.get(repositories.DirRepository))
  );
  container.setService(
    storageUseCasesDependencies.DirDraft,
    (c) => new DirDraft(c.get(repositories.DirRepository))
  );
  container.setService(
    storageUseCasesDependencies.FileDraft,
    (c) => new FileDraft(c.get(repositories.FileRepository))
  );
  container.setService(
    storageUseCasesDependencies.FileUploader,
    (c) => new FileUploader(c.get(repositories.FileRepository))
  );
  container.setService(
    storageUseCasesDependencies.FilesAndDirsLister,
    (c) => new FilesAndDirsLister(c.get(repositories.DirRepository))
  );
};
