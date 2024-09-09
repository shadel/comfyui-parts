import { IDataService } from "./dataServiceInterfaces";

export interface IDataProcessor {
  process(data: any, dataService: IDataService): any;
}

export interface IFileSaver {
  save(data: any, filePath: string): Promise<void>;
}
