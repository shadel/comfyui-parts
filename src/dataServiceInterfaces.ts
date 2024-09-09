
export interface IDataService {
    readFile(filePath: string | File): Promise<string>;
    fetchDbData(): Promise<IDataService>;
  }
  