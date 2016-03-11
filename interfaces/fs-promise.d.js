declare module "fs-promise" {
  declare class writeFile {
    (to: string, content: string): Promise
  }
  declare interface fsPromise {
    writeFile: writeFile
  }
  declare var exports: fsPromise;
}
