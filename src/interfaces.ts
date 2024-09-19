import { IDataService } from "./dataServiceInterfaces";
import { IComfyWorkflowAPIItem, IIComfyWorkflowAPI } from "./IWorkflowAPI";
import { IComfyUIManagerCustomNode, IDataModelResult, IMissingModelByNode } from "./nodes/IDatatype";

export interface IDataProcessor {
  process(data: IIComfyWorkflowAPI, dataService: IDataService): Promise<{
    nodes: IComfyUIManagerCustomNode[];
    missingNodes: IComfyWorkflowAPIItem[];
    models: IDataModelResult[];
    missingModels: IMissingModelByNode[];
}>;
}

export interface IFileSaver {
  save(data: any, filePath: string): Promise<void>;
}
