import { IDataService } from "./dataServiceInterfaces";
import { IIComfyWorkflowAPI } from "./IWorkflowAPI";

export interface IDataProcessor {
  process(data: IIComfyWorkflowAPI, dataService: IDataService): any;
}

export interface IFileSaver {
  save(data: any, filePath: string): Promise<void>;
}
