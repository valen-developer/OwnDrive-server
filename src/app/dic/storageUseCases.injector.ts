import { IOC } from "dic-ioc";
import { DirCreator } from "../../context/Storage/application/dirCreator";
import { DirDraft } from "../../context/Storage/application/dirDraft";
import { FileDraft } from "../../context/Storage/application/fileDraft";
import { FilesAndDirsLister } from "../../context/Storage/application/filesAndDirsLister";
import { FileUploader as FileUploader } from "../../context/Storage/application/fileUploader";
import { repositories } from "./repositories.injector";

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
    (c) => new DirCreator(c.get(repositories.FSDirRepository))
  );
  container.setService(
    storageUseCasesDependencies.DirDraft,
    (c) => new DirDraft(c.get(repositories.FSDirRepository))
  );
  container.setService(
    storageUseCasesDependencies.FileDraft,
    (c) => new FileDraft(c.get(repositories.ExpressFileRepository))
  );
  container.setService(
    storageUseCasesDependencies.FileUploader,
    (c) => new FileUploader(c.get(repositories.ExpressFileRepository))
  );
  container.setService(
    storageUseCasesDependencies.FilesAndDirsLister,
    (c) => new FilesAndDirsLister(c.get(repositories.FSDirRepository))
  );
};
