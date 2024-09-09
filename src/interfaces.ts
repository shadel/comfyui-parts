export interface IFileReader {
    readFile(filePath: string): Promise<string>;
  }
  
  export interface IDataProcessor {
    process(data: any, dbData: any): any;
  }
  
  export interface IFileSaver {
    save(data: any, filePath: string): Promise<void>;
  }
  