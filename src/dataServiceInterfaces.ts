import { IComfyUIManagerCustomNode, IDataModelResult } from "./services/IDatatype";

export interface IDataService {
    connect(): Promise<IDataService>;

    findNodeByClassType(classType: string): Promise<string | null>;
    getNodesByUrls(urls: string[]): Promise<IComfyUIManagerCustomNode[]>;
    getModelsByName(modelName: string): Promise<IDataModelResult[]>
    checkModelNodeIgnore(classType: string): Promise<boolean>
  }
  