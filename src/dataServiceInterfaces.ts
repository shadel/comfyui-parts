import { IComfyUIManagerCustomNode, IDataModelResult } from "./nodes/IDatatype";

export interface IDataService {
    fetchDbData(): Promise<IDataService>;

    findNodeByClassType(classType: string): Promise<string | null>;
    getNodesByUrls(urls: string[]): Promise<IComfyUIManagerCustomNode[]>;
    getModelsByName(modelName: string): Promise<IDataModelResult[]>
    checkModelNodeIgnore(classType: string): Promise<boolean>
  }
  