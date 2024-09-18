import { IComfyUIManagerCustomNode } from "./nodes/IDatatype";

export interface IDataService {
    readFile(filePath: string | File): Promise<string>;
    fetchDbData(): Promise<IDataService>;

    findNodeByClassType(classType: string): Promise<string | null>;
    findNodeByName(classType: string): Promise<string | null>;
    findNodeByRegex(classType: string): Promise<string | null>;
    getNodesByUrls(urls: string[]): Promise<IComfyUIManagerCustomNode[]>
  }
  